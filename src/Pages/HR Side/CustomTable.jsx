import { useEffect, useRef, useState } from "react";
import {
    Paper, Typography, Box, Button,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead, TableRow,
    TextField, Checkbox,
    Chip, IconButton, Divider,
    Dialog, DialogTitle,
    DialogContent, DialogActions, Tooltip,
} from "@mui/material";

import {
    Search, Settings2,
    MoreHorizontal, Plus, Trash2, Pencil,
    Check, Copy, CalendarDays,
    Hash, Type, CircleCheck,
    Eye, EyeOff, WrapText,
    Download, Upload,
} from "lucide-react";

import * as XLSX from "xlsx";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import HRLayout from "../../Layouts/HRLayout";

const STORAGE_KEY = "nexthire-custom-table";

const DEFAULT_COLUMNS = [
    { id: "col-name", name: "Full Name", type: "text", multipleChoice: false, },
    { id: "col-employee-id", name: "Employee ID", type: "text", multipleChoice: false, },
    { id: "col-department", name: "Department", type: "text", multipleChoice: false, },
    { id: "col-job-title", name: "Job Title", type: "text", multipleChoice: false, },
    { id: "col-email", name: "Email", type: "text", multipleChoice: false, },
    { id: "col-phone", name: "Phone Number", type: "number", multipleChoice: false, },
    { id: "col-joining-date", name: "Date Of Joining", type: "date", multipleChoice: false, },
    { id: "col-manager", name: "Reporting Manager", type: "text", multipleChoice: false, },
    { id: "col-status", name: "Employment Status", type: "status", multipleChoice: false, },
    { id: "col-location", name: "Location", type: "text", multipleChoice: false, },
];

const DEFAULT_STATUS_OPTIONS = [
    { id: "status-active", name: "Active", color: "#22c55e", },
    { id: "status-pending", name: "Pending", color: "#f59e0b", },
    { id: "status-rejected", name: "Rejected", color: "#ef4444", },
    { id: "status-completed", name: "Completed", color: "#3b82f6", },
];

const createRow = (columns, originalIndex = 0) => {
    const cells = {};

    columns.forEach((column) => {
        cells[column.id] = "";
    });

    return {
        id: `row-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        originalIndex,
        cells,
    };
};

const createInitialRows = (columns) =>
    Array.from({ length: 10 }, (_, index) =>
        createRow(columns, index)
    );

const CustomTable = () => {
    const { darkMode } = useTheme();

    const {
        textColor,
        subText,
        borderColor,
        glassBg,
        primary,
    } = useThemeColors();

    const [columns, setColumns] =
        useState([]);
    const [draggedColumnId, setDraggedColumnId] =
        useState(null);
    const [draggedRowId, setDraggedRowId] =
        useState(null);
    const [columnWidths, setColumnWidths] =
        useState({});
    const [resizingColumnId, setResizingColumnId] =
        useState(null);
    const [sortConfig, setSortConfig] = useState({
        columnId: null,
        direction: null,
    });
    const [showSortOptions, setShowSortOptions] =
        useState(false);
    const [rows, setRows] =
        useState([]);
    const [statusOptions, setStatusOptions] =
        useState(DEFAULT_STATUS_OPTIONS);
    const [selectedRows, setSelectedRows] =
        useState([]);
    const [visibleColumns, setVisibleColumns] =
        useState([]);
    const [searchValue, setSearchValue] =
        useState("");
    const [showViewSettings, setShowViewSettings] =
        useState(false);
    const [showFilter, setShowFilter] =
        useState(false);
    const [showMore, setShowMore] =
        useState(false);
    const [showAddProperty, setShowAddProperty] =
        useState(false);
    const [showStatusList, setShowStatusList] =
        useState(false);
    const [activeColumnMenu, setActiveColumnMenu] =
        useState(null);
    const [activeStatusCell, setActiveStatusCell] =
        useState(null);
    const [filterColumn, setFilterColumn] =
        useState("");
    const [filterValue, setFilterValue] =
        useState("");
    const [wrapEnabledColumns, setWrapEnabledColumns] =
        useState({});
    const [isSaved, setIsSaved] =
        useState(false);
    const [cellErrors, setCellErrors] =
        useState({});
    const [pinnedColumns, setPinnedColumns] =
        useState({
            left: [],
            right: [],
        });
    const [isLoading, setIsLoading] =
        useState(true);
    const [deleteConfirmation, setDeleteConfirmation] =
        useState(null);
    const [newStatusName, setNewStatusName] =
        useState("");
    const [newStatusColor, setNewStatusColor] =
        useState("#3b82f6");
    const [statusToDelete, setStatusToDelete] =
        useState(null);
    const [statusToRename, setStatusToRename] =
        useState(null);
    const [renameStatusName, setRenameStatusName] =
        useState("");
    const [cellSelectionStart, setCellSelectionStart] =
        useState(null);
    const [cellSelectionEnd, setCellSelectionEnd] =
        useState(null);
    const [selectionComplete, setSelectionComplete] =
        useState(false);

    const undoStackRef = useRef([]);
    const redoStackRef = useRef([]);
    const editingCellRef = useRef(null);
    const editingColumnRef = useRef(null);
    const viewSettingsRef = useRef(null);
    const filterRef = useRef(null);
    const moreRef = useRef(null);
    const addPropertyRef = useRef(null);

    /* =====================================================
       LOAD DATA
    ===================================================== */

    useEffect(() => {
        const loadTable = () => {
            try {
                const savedData =
                    localStorage.getItem(STORAGE_KEY);
                if (savedData) {
                    const parsed = JSON.parse(savedData);
                    const loadedColumns =
                        parsed.columns?.length
                            ? parsed.columns
                            : DEFAULT_COLUMNS;
                    const loadedRows =
                        parsed.rows?.length
                            ? parsed.rows
                            : createInitialRows(loadedColumns);
                    setColumns(loadedColumns);
                    setRows(loadedRows);
                    setStatusOptions(
                        parsed.statusOptions?.length
                            ? parsed.statusOptions
                            : DEFAULT_STATUS_OPTIONS
                    );
                    setVisibleColumns(
                        parsed.visibleColumns?.length
                            ? parsed.visibleColumns
                            : loadedColumns.map((column) => column.id)
                    );
                    setWrapEnabledColumns(
                        parsed.wrapEnabledColumns || {}
                    );
                    setSortConfig(
                        parsed.sortConfig || {
                            columnId: null,
                            direction: null,
                        }
                    );
                    setColumnWidths(parsed.columnWidths || {});
                    setSearchValue(parsed.searchValue || "");
                    setFilterColumn(parsed.filterColumn || "");
                    setFilterValue(parsed.filterValue || "");
                    setPinnedColumns(
                        parsed.pinnedColumns || {
                            left: [],
                            right: [],
                        }
                    );
                } else {
                    const initialRows =
                        createInitialRows(DEFAULT_COLUMNS);
                    setColumns(DEFAULT_COLUMNS);
                    setRows(initialRows);
                    setStatusOptions(DEFAULT_STATUS_OPTIONS);
                    setVisibleColumns(
                        DEFAULT_COLUMNS.map((column) => column.id)
                    );
                    setWrapEnabledColumns({});
                }
            } catch (error) {
                console.error(
                    "Failed to load custom table:",
                    error
                );
                setColumns(DEFAULT_COLUMNS);
                setRows(createInitialRows(DEFAULT_COLUMNS));
                setVisibleColumns(
                    DEFAULT_COLUMNS.map((column) => column.id)
                );
            } finally {
                setIsLoading(false);
            }
        };
        loadTable();
    }, []);

    /* =====================================================
       SNAPSHOT / UNDO / REDO
    ===================================================== */

    const createSnapshot = () => ({
        columns: structuredClone(columns),
        rows: structuredClone(rows),
        visibleColumns: [...visibleColumns],
        wrapEnabledColumns: structuredClone(wrapEnabledColumns),
        selectedRows: [...selectedRows],
        statusOptions: structuredClone(statusOptions),
        pinnedColumns: structuredClone(pinnedColumns),
    });
    const pushHistory = () => {
        undoStackRef.current.push(createSnapshot());
        if (undoStackRef.current.length > 100) {
            undoStackRef.current.shift();
        }
        redoStackRef.current = [];
    };
    const handleUndo = () => {
        if (!undoStackRef.current.length) return;
        const previous =
            undoStackRef.current.pop();
        redoStackRef.current.push(createSnapshot());
        setColumns(previous.columns);
        setRows(previous.rows);
        setVisibleColumns(previous.visibleColumns);
        setWrapEnabledColumns(previous.wrapEnabledColumns);
        setSelectedRows(previous.selectedRows);
        setStatusOptions(previous.statusOptions);
        setPinnedColumns(
            previous.pinnedColumns || {
                left: [],
                right: [],
            }
        );
        setIsSaved(false);
    };
    const handleRedo = () => {
        if (!redoStackRef.current.length) return;
        const next = redoStackRef.current.pop();
        undoStackRef.current.push(createSnapshot());
        setColumns(next.columns);
        setRows(next.rows);
        setVisibleColumns(next.visibleColumns);
        setWrapEnabledColumns(next.wrapEnabledColumns);
        setSelectedRows(next.selectedRows);
        setStatusOptions(next.statusOptions);
        setPinnedColumns(
            next.pinnedColumns || {
                left: [],
                right: [],
            }
        );
        setIsSaved(false);
    };

    /* =====================================================
       OUTSIDE CLICK
    ===================================================== */

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const target = event.target;
            if (
                viewSettingsRef.current &&
                !viewSettingsRef.current.contains(target)
            ) {
                setShowViewSettings(false);
            }
            if (
                filterRef.current &&
                !filterRef.current.contains(target)
            ) {
                setShowFilter(false);
            }
            if (
                moreRef.current &&
                !moreRef.current.contains(target)
            ) {
                setShowMore(false);
            }
            if (
                addPropertyRef.current &&
                !addPropertyRef.current.contains(target)
            ) {
                setShowAddProperty(false);
            }
            if (
                !target.closest(
                    "[data-column-menu-root]"
                )
            ) {
                setActiveColumnMenu(null);
            }
            if (
                !target.closest(
                    "[data-status-cell-root]"
                )
            ) {
                setActiveStatusCell(null);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    /* =====================================================
       Excel Export function
    ===================================================== */

    const handleExportExcel = () => {
        const exportData = rows.map((row) => {
            const rowData = {};

            columns.forEach((column) => {
                rowData[column.name] =
                    row.cells?.[column.id] ?? "";
            });

            return rowData;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Table"
        );

        XLSX.writeFile(workbook, "NextHire_Table.xlsx");
    };

    /* =====================================================
       Excel Import function
    ===================================================== */

    const handleImportExcel = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {
                    type: "array",
                });

                const worksheet =
                    workbook.Sheets[workbook.SheetNames[0]];

                const importedData = XLSX.utils.sheet_to_json(
                    worksheet,
                    {
                        header: 1,
                        defval: "",
                    }
                );

                const [, ...dataRows] = importedData;

                if (!importedData.length) {
                    return;
                }

                const importedErrors = {};
                const importedRows = dataRows
                    .filter((row) =>
                        row.some(
                            (cell) =>
                                String(cell).trim() !== ""
                        )
                    )
                    .map((excelRow, index) => {
                        const rowId = `row-${Date.now()}-${index}`;
                        const rowCells = {};
                        // const rowErrors = {};

                        columns.forEach((column, columnIndex) => {
                            const value = String(
                                excelRow[columnIndex] ?? ""
                            ).trim();

                            rowCells[column.id] = value;

                            const errorKey = `${rowId}-${column.id}`;

                            if (
                                column.name.toLowerCase() ===
                                "phone number" &&
                                value !== ""
                            ) {
                                const phoneRegex = /^\d{10}$/;

                                if (!phoneRegex.test(value)) {
                                    importedErrors[errorKey] =
                                        "Phone number must be 10 digits";
                                }
                            }

                            if (
                                column.name.toLowerCase() ===
                                "email" &&
                                value !== ""
                            ) {
                                const emailRegex =
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                if (!emailRegex.test(value)) {
                                    importedErrors[errorKey] =
                                        "Invalid email address";
                                }
                            }
                        });

                        return {
                            id: rowId,
                            originalIndex: index,
                            cells: rowCells,
                        };
                    });

                pushHistory();
                setRows(importedRows);
                setCellErrors(importedErrors);
                setIsSaved(false);
            } catch (error) {
                console.error(
                    "Excel import failed:",
                    error
                );
            }
        };

        reader.readAsArrayBuffer(file);

        event.target.value = "";
    };

    /* =====================================================
       SAVE
    ===================================================== */

    const handleSave = () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                columns,
                rows,
                statusOptions,
                visibleColumns,
                wrapEnabledColumns,
                sortConfig,
                columnWidths,
                searchValue,
                filterColumn,
                filterValue,
                pinnedColumns,
            })
        );
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 2000);
    };

    /* =====================================================
     Pin/Unpin handlers
  ===================================================== */

    const handlePinColumn = (columnId, position) => {
        pushHistory();
        setPinnedColumns((previous) => {
            const left = previous.left.filter(
                (id) => id !== columnId
            );

            const right = previous.right.filter(
                (id) => id !== columnId
            );

            if (position === "left") {
                return {
                    left: [...left, columnId],
                    right,
                };
            }

            if (position === "right") {
                return {
                    left,
                    right: [...right, columnId],
                };
            }

            return {
                left,
                right,
            };
        });

        setIsSaved(false);
    };

    /* =====================================================
       CELL CHANGE
    ===================================================== */

    const handleCellChange = (
        rowId,
        columnId,
        value
    ) => {
        const column = columns.find(
            (item) => item.id === columnId
        );

        const errorKey = `${rowId}-${columnId}`;

        // Phone number validation
        if (
            column?.name.toLowerCase() === "phone number" &&
            value.trim() !== ""
        ) {
            const phoneRegex = /^\d{10}$/;

            if (!phoneRegex.test(value.trim())) {
                setCellErrors((previous) => ({
                    ...previous,
                    [errorKey]: "Phone number must be 10 digits",
                }));
            } else {
                setCellErrors((previous) => {
                    const updated = { ...previous };
                    delete updated[errorKey];
                    return updated;
                });
            }
        } else if (
            column?.name.toLowerCase() === "phone number"
        ) {
            setCellErrors((previous) => {
                const updated = { ...previous };
                delete updated[errorKey];
                return updated;
            });
        }

        // Email validation
        if (
            column?.name.toLowerCase() === "email" &&
            value.trim() !== ""
        ) {
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value.trim())) {
                setCellErrors((previous) => ({
                    ...previous,
                    [errorKey]: "Invalid email address",
                }));
            } else {
                setCellErrors((previous) => {
                    const updated = { ...previous };
                    delete updated[errorKey];
                    return updated;
                });
            }
        } else if (
            column?.name.toLowerCase() === "email"
        ) {
            setCellErrors((previous) => {
                const updated = { ...previous };
                delete updated[errorKey];
                return updated;
            });
        }

        const editKey =
            `${rowId}-${columnId}`;

        if (
            editingCellRef.current !== editKey
        ) {
            pushHistory();
            editingCellRef.current = editKey;
        }

        setRows((previous) =>
            previous.map((row) =>
                row.id === rowId
                    ? {
                        ...row,
                        cells: {
                            ...row.cells,
                            [columnId]: value,
                        },
                    }
                    : row
            )
        );

        setIsSaved(false);
    };

    /* =====================================================
       COLUMN NAME
    ===================================================== */

    const handleColumnNameChange = (
        columnId,
        value
    ) => {
        if (
            editingColumnRef.current !==
            columnId
        ) {
            pushHistory();
            editingColumnRef.current = columnId;
        }
        setColumns((previous) =>
            previous.map((column) =>
                column.id === columnId
                    ? {
                        ...column,
                        name: value,
                    }
                    : column
            )
        );
        setIsSaved(false);
    };

    /* =====================================================
       ADD ROW
    ===================================================== */

    const handleAddRow = () => {
        pushHistory();
        const nextOriginalIndex = rows.length
            ? Math.max(
                ...rows.map((row) => row.originalIndex ?? -1)
            ) + 1
            : 0;

        const newRow = createRow(columns, nextOriginalIndex);
        setRows((previous) => [
            ...previous,
            newRow,
        ]);
        setIsSaved(false);
    };

    // =====================================================
    // Drag & Drop reorder Row
    // =====================================================

    const handleRowDrop = (targetRowId) => {
        if (!draggedRowId || draggedRowId === targetRowId) {
            return;
        }

        pushHistory();

        setRows((previous) => {
            const draggedIndex = previous.findIndex(
                (row) => row.id === draggedRowId
            );

            const targetIndex = previous.findIndex(
                (row) => row.id === targetRowId
            );

            if (draggedIndex === -1 || targetIndex === -1) {
                return previous;
            }

            const updatedRows = [...previous];
            const [draggedRow] = updatedRows.splice(
                draggedIndex,
                1
            );

            updatedRows.splice(
                targetIndex,
                0,
                draggedRow
            );

            return updatedRows;
        });

        setDraggedRowId(null);
        setIsSaved(false);
    };

    // =====================================================
    //    Drag & Drop reorder colomn
    // =====================================================

    const handleColumnDrop = (targetColumnId) => {
        if (!draggedColumnId || draggedColumnId === targetColumnId) {
            setDraggedColumnId(null);
            return;
        }

        pushHistory();

        setColumns((previousColumns) => {
            const draggedIndex = previousColumns.findIndex(
                (column) => column.id === draggedColumnId
            );

            const targetIndex = previousColumns.findIndex(
                (column) => column.id === targetColumnId
            );

            if (
                draggedIndex === -1 ||
                targetIndex === -1
            ) {
                return previousColumns;
            }

            const updatedColumns = [...previousColumns];

            const [draggedColumn] =
                updatedColumns.splice(draggedIndex, 1);

            const adjustedTargetIndex =
                draggedIndex < targetIndex
                    ? targetIndex - 1
                    : targetIndex;

            updatedColumns.splice(
                adjustedTargetIndex,
                0,
                draggedColumn
            );

            return updatedColumns;
        });

        setDraggedColumnId(null);
        setIsSaved(false);
    };

    // =====================================================
    // Resize handler
    // ===================================================== 

    const handleColumnResize = (columnId, width) => {
        setColumnWidths((previous) => ({
            ...previous,
            [columnId]: Math.max(100, width),
        }));

        setIsSaved(false);
    };

    // Resize start handler

    const handleResizeStart = (event, columnId) => {
        pushHistory();
        event.preventDefault();
        event.stopPropagation();

        const startX = event.clientX;
        const currentWidth =
            columnWidths[columnId] ||
            document.getElementById(`column-${columnId}`)?.offsetWidth ||
            160;

        setResizingColumnId(columnId);

        const handleMouseMove = (moveEvent) => {
            const newWidth = currentWidth + (moveEvent.clientX - startX);

            handleColumnResize(columnId, newWidth);
        };

        const handleMouseUp = () => {
            setResizingColumnId(null);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    /* =====================================================
  sort handler
  ===================================================== */

    const handleSort = (columnId, direction) => {
        pushHistory();
        setSortConfig({
            columnId,
            direction,
        });

        setShowSortOptions(false);
        setIsSaved(false);
    };

    /* =====================================================
       SELECT ROW
    ===================================================== */

    const handleSelectRow = (rowId) => {
        setSelectedRows((previous) =>
            previous.includes(rowId)
                ? previous.filter(
                    (id) => id !== rowId
                )
                : [...previous, rowId]
        );
    };

    const handleSelectAll = () => {
        const allFilteredSelected = filteredRows.every(
            (row) => selectedRows.includes(row.id)
        );

        if (allFilteredSelected) {
            setSelectedRows((previous) =>
                previous.filter(
                    (id) =>
                        !filteredRows.some(
                            (row) => row.id === id
                        )
                )
            );
        } else {
            setSelectedRows((previous) => [
                ...new Set([
                    ...previous,
                    ...filteredRows.map(
                        (row) => row.id
                    ),
                ]),
            ]);
        }
    };

    /* =====================================================
       ADD COLUMN
    ===================================================== */

    const handleAddColumn = (type) => {
        pushHistory();
        const names = {
            text: "New Column",
            number: "New Number",
            date: "New Date",
            status: "New Status",
            checkbox: "New Checkbox",
        };
        const newColumn = {
            id: `col-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 7)}`,
            name: names[type],
            type,
            multipleChoice:
                type === "status"
                    ? false
                    : false,
        };
        const updatedColumns = [
            ...columns,
            newColumn,
        ];
        const updatedRows = rows.map((row) => ({
            ...row,
            cells: {
                ...row.cells,
                [newColumn.id]: "",
            },
        }));
        setColumns(updatedColumns);
        setRows(updatedRows);
        setVisibleColumns((previous) => [
            ...previous,
            newColumn.id,
        ]);
        setShowAddProperty(false);
        setIsSaved(false);
    };

    /* =====================================================
       DUPLICATE COLUMN
    ===================================================== */

    const handleDuplicateColumn = (
        columnId
    ) => {
        const index = columns.findIndex(
            (column) =>
                column.id === columnId
        );
        if (index === -1) return;
        pushHistory();
        const original = columns[index];
        const newColumn = {
            ...original,
            id: `col-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 7)}`,
            name: `${original.name} copy`,
        };
        const updatedColumns = [
            ...columns,
        ];
        updatedColumns.splice(
            index + 1,
            0,
            newColumn
        );
        const updatedRows = rows.map(
            (row) => ({
                ...row,
                cells: {
                    ...row.cells,
                    [newColumn.id]:
                        row.cells[
                        original.id
                        ] ?? "",
                },
            }));
        setColumns(updatedColumns);
        setRows(updatedRows);
        setVisibleColumns((previous) => [
            ...previous,
            newColumn.id,
        ]);
        setWrapEnabledColumns(
            (previous) => ({
                ...previous,
                [newColumn.id]:
                    previous[
                    original.id
                    ] ?? false,
            }));
        setActiveColumnMenu(null);
        setIsSaved(false);
    };

    /* =====================================================
       COLUMN TYPE
    ===================================================== */

    const handleColumnTypeChange = (
        columnId,
        type
    ) => {
        pushHistory();
        setColumns((previous) =>
            previous.map((column) =>
                column.id === columnId
                    ? {
                        ...column,
                        type,
                        multipleChoice:
                            type === "status"
                                ? column.multipleChoice ??
                                false
                                : false,
                    }
                    : column
            ));
        setActiveColumnMenu(null);
        setIsSaved(false);
    };

    /* =====================================================
       COLUMN VISIBILITY
    ===================================================== */

    const handleToggleColumn = (
        columnId
    ) => {
        pushHistory();
        setVisibleColumns((previous) => {
            if (previous.includes(columnId)) {
                if (previous.length === 1) {
                    return previous;
                }
                return previous.filter(
                    (id) =>
                        id !== columnId
                );
            }
            return [
                ...previous,
                columnId,
            ];
        });
        setIsSaved(false);
    };

    /* =====================================================
       WRAP COLUMN
    ===================================================== */

    const handleToggleWrap = (
        columnId
    ) => {
        pushHistory();
        setWrapEnabledColumns(
            (previous) => ({
                ...previous,
                [columnId]:
                    !previous[columnId],
            }));
        setIsSaved(false);
        setActiveColumnMenu(null);
    };

    /* =====================================================
       DELETE
    ===================================================== */

    const askDeleteRow = (rowId) => {
        setDeleteConfirmation({
            type: "row",
            rowId,
        });
    };
    const askDeleteSelected = () => {
        if (!selectedRows.length) return;
        setDeleteConfirmation({
            type: "selected",
        });
    };

    const askDeleteColumn = (
        columnId
    ) => {
        if (columns.length <= 1) return;
        setDeleteConfirmation({
            type: "column",
            columnId,
        });
    };
    const confirmDelete = () => {
        if (!deleteConfirmation) return;
        pushHistory();
        if (
            deleteConfirmation.type ===
            "row"
        ) {
            setRows((previous) =>
                previous.filter(
                    (row) =>
                        row.id !==
                        deleteConfirmation.rowId
                )
            );
            setSelectedRows((previous) =>
                previous.filter(
                    (id) =>
                        id !==
                        deleteConfirmation.rowId
                ));
        }
        if (
            deleteConfirmation.type ===
            "selected"
        ) {
            setRows((previous) =>
                previous.filter(
                    (row) =>
                        !selectedRows.includes(
                            row.id
                        )
                ));
            setSelectedRows([]);
        }
        if (
            deleteConfirmation.type ===
            "column"
        ) {
            const columnId =
                deleteConfirmation.columnId;
            setColumns((previous) =>
                previous.filter(
                    (column) =>
                        column.id !==
                        columnId
                )
            );
            setRows((previous) =>
                previous.map((row) => {
                    const cells = {
                        ...row.cells,
                    };
                    delete cells[columnId];
                    return {
                        ...row,
                        cells,
                    };
                }));
            setVisibleColumns((previous) =>
                previous.filter(
                    (id) =>
                        id !== columnId
                )
            );
            setWrapEnabledColumns(
                (previous) => {
                    const updated = {
                        ...previous,
                    };
                    delete updated[
                        columnId
                    ];
                    return updated;
                });

            setPinnedColumns((previous) => ({
                left: previous.left.filter(
                    (id) => id !== columnId
                ),
                right: previous.right.filter(
                    (id) => id !== columnId
                ),
            }));
        }
        setDeleteConfirmation(null);
        setActiveColumnMenu(null);
        setIsSaved(false);
    };

    /* =====================================================
       STATUS
    ===================================================== */

    const handleStatusChange = (
        rowId,
        column,
        status
    ) => {
        const row = rows.find(
            (item) =>
                item.id === rowId
        );
        if (!row) return;
        const current =
            row.cells[column.id] || "";
        if (column.multipleChoice) {
            const selected = current
                ? current
                    .split(",")
                    .map(
                        (item) =>
                            item.trim()
                    )
                    .filter(Boolean)
                : [];
            const exists =
                selected.includes(
                    status.name
                );
            const updated = exists
                ? selected.filter(
                    (item) =>
                        item !==
                        status.name
                )
                : [
                    ...selected,
                    status.name,
                ];
            handleCellChange(
                rowId,
                column.id,
                updated.join(", ")
            );
        } else {
            handleCellChange(
                rowId,
                column.id,
                status.name
            );
            setActiveStatusCell(null);
        }
    };

    /* =====================================================
       ADD STATUS
    ===================================================== */

    const handleAddStatus = () => {
        const name =
            newStatusName.trim();
        if (!name) return;
        if (
            statusOptions.some(
                (status) =>
                    status.name.toLowerCase() ===
                    name.toLowerCase()
            )
        ) {
            return;
        }
        pushHistory();
        setStatusOptions((previous) => [
            ...previous,
            {
                id: `status-${Date.now()}`,
                name,
                color: newStatusColor,
            },
        ]);
        setNewStatusName("");
        setIsSaved(false);
    };

    /* =====================================================
       DELETE STATUS
    ===================================================== */

    const handleDeleteStatus = () => {
        if (!statusToDelete) return;
        pushHistory();
        const statusName =
            statusToDelete.name;
        setStatusOptions((previous) =>
            previous.filter(
                (status) =>
                    status.id !==
                    statusToDelete.id
            ));
        setRows((previous) =>
            previous.map((row) => {
                const cells = {
                    ...row.cells,
                };
                columns.forEach((column) => {
                    if (
                        column.type !==
                        "status"
                    ) {
                        return;
                    }
                    const values =
                        (
                            cells[
                            column.id
                            ] || ""
                        )
                            .split(",")
                            .map(
                                (item) =>
                                    item.trim()
                            )
                            .filter(
                                (item) =>
                                    item &&
                                    item !==
                                    statusName
                            );
                    cells[
                        column.id
                    ] = values.join(", ");
                });
                return {
                    ...row,
                    cells,
                };
            })
        );
        setStatusToDelete(null);
        setIsSaved(false);
    };

    /* =====================================================
       RENAME STATUS
    ===================================================== */

    const handleRenameStatus = () => {
        if (!statusToRename) return;

        const newName = renameStatusName.trim();

        if (!newName) return;

        if (
            statusOptions.some(
                (status) =>
                    status.id !== statusToRename.id &&
                    status.name.toLowerCase() ===
                    newName.toLowerCase()
            )
        ) {
            return;
        }

        pushHistory();

        const oldName = statusToRename.name;

        setStatusOptions((previous) =>
            previous.map((status) =>
                status.id === statusToRename.id
                    ? {
                        ...status,
                        name: newName,
                    }
                    : status
            )
        );

        setRows((previousRows) =>
            previousRows.map((row) => {
                const updatedCells = {
                    ...row.cells,
                };

                Object.keys(updatedCells).forEach(
                    (columnId) => {
                        const column = columns.find(
                            (item) =>
                                item.id === columnId
                        );

                        if (
                            column?.type === "status" &&
                            updatedCells[columnId] === oldName
                        ) {
                            updatedCells[columnId] = newName;
                        }
                    }
                );

                return {
                    ...row,
                    cells: updatedCells,
                };
            })
        );

        setStatusToRename(null);
        setRenameStatusName("");
        setIsSaved(false);
    };

    /* =====================================================
       FILTER
    ===================================================== */

    const filteredRows = rows.filter((row) => {
        if (searchValue.trim()) {
            const search = searchValue.trim().toLowerCase();

            const matchesSearch = columns.some((column) => {
                if (!visibleColumns.includes(column.id)) return false;

                const cellValue = String(
                    row.cells[column.id] ?? ""
                ).toLowerCase();

                return cellValue.includes(search);
            });

            if (!matchesSearch) return false;
        }

        if (filterColumn) {
            const cellValue = String(
                row.cells[filterColumn] ?? ""
            )
                .trim()
                .toLowerCase();

            const filter = filterValue.trim().toLowerCase();

            if (filter && !cellValue.includes(filter)) {
                return false;
            }
        }

        return true;
    });

    // =======================================
    // Sorting
    // =======================================

    const sortedRows =
        !sortConfig.columnId || !sortConfig.direction
            ? filteredRows
            : [...filteredRows].sort((a, b) => {
                if (!sortConfig.columnId || !sortConfig.direction) {
                    return 0;
                }

                // Original = unique ID / original row order
                if (sortConfig.direction === "original") {
                    return a.originalIndex - b.originalIndex;
                }

                const aValue = String(
                    a.cells[sortConfig.columnId] ?? ""
                ).trim();

                const bValue = String(
                    b.cells[sortConfig.columnId] ?? ""
                ).trim();

                const comparison = aValue.localeCompare(
                    bValue,
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base",
                    }
                );

                return sortConfig.direction === "asc"
                    ? comparison
                    : -comparison;
            });

    const displayedColumns =
        columns.filter((column) =>
            visibleColumns.includes(
                column.id
            )
        );

    /* =====================================================
       CELL RANGE SELECTION
    ===================================================== */

    const handleCellClick = (
        rowIndex,
        columnIndex
    ) => {
        if (
            !cellSelectionStart ||
            selectionComplete
        ) {
            setCellSelectionStart({
                rowIndex,
                columnIndex,
            });
            setCellSelectionEnd({
                rowIndex,
                columnIndex,
            });
            setSelectionComplete(false);
            return;
        }
        setCellSelectionEnd({
            rowIndex,
            columnIndex,
        });
        setSelectionComplete(true);
    };
    const isCellSelected = (
        rowIndex,
        columnIndex
    ) => {
        if (
            !cellSelectionStart ||
            !cellSelectionEnd
        ) {
            return false;
        }
        const minRow = Math.min(
            cellSelectionStart.rowIndex,
            cellSelectionEnd.rowIndex
        );
        const maxRow = Math.max(
            cellSelectionStart.rowIndex,
            cellSelectionEnd.rowIndex
        );
        const minColumn = Math.min(
            cellSelectionStart.columnIndex,
            cellSelectionEnd.columnIndex
        );
        const maxColumn = Math.max(
            cellSelectionStart.columnIndex,
            cellSelectionEnd.columnIndex
        );
        return (
            rowIndex >= minRow &&
            rowIndex <= maxRow &&
            columnIndex >= minColumn &&
            columnIndex <= maxColumn
        );
    };

    /* =====================================================
       COPY
    ===================================================== */

    const handleCopyCells = async () => {
        if (
            !cellSelectionStart ||
            !cellSelectionEnd
        ) {
            return;
        }
        const minRow = Math.min(
            cellSelectionStart.rowIndex,
            cellSelectionEnd.rowIndex
        );
        const maxRow = Math.max(
            cellSelectionStart.rowIndex,
            cellSelectionEnd.rowIndex
        );
        const minColumn = Math.min(
            cellSelectionStart.columnIndex,
            cellSelectionEnd.columnIndex
        );
        const maxColumn = Math.max(
            cellSelectionStart.columnIndex,
            cellSelectionEnd.columnIndex
        );
        const copied = [];
        for (
            let rowIndex = minRow;
            rowIndex <= maxRow;
            rowIndex++
        ) {
            const row =
                sortedRows[rowIndex];
            if (!row) continue;
            const values = [];
            for (
                let columnIndex =
                    minColumn;
                columnIndex <=
                maxColumn;
                columnIndex++
            ) {
                const column =
                    displayedColumns[
                    columnIndex
                    ];
                if (!column) continue;
                values.push(
                    row.cells[
                    column.id
                    ] ?? ""
                );
            }
            copied.push(
                values.join("\t")
            );
        }
        try {
            await navigator.clipboard.writeText(
                copied.join("\n")
            );
        } catch (error) {
            console.error(
                "Copy failed:",
                error
            );
        }
    };

    /* =====================================================
       PASTE
    ===================================================== */

    const handlePasteCells = async () => {
        if (!cellSelectionStart) {
            return;
        }
        let clipboardText = "";
        try {
            clipboardText =
                await navigator.clipboard.readText();
        } catch (error) {
            console.error(
                "Paste failed:",
                error
            );
            return;
        }
        if (!clipboardText) return;
        pushHistory();
        const pastedRows =
            clipboardText
                .replace(/\r\n/g, "\n")
                .replace(/\r/g, "\n")
                .split("\n");
        if (
            pastedRows.length > 1 &&
            pastedRows[
            pastedRows.length - 1
            ] === ""
        ) {
            pastedRows.pop();
        }
        const startRowIndex =
            cellSelectionStart.rowIndex;
        const startColumnIndex =
            cellSelectionStart.columnIndex;
        const importedErrors = {};
        const updatedRows = [...rows];
        const workingRows = [...sortedRows];

        while (
            workingRows.length <
            startRowIndex + pastedRows.length
        ) {
            const nextOriginalIndex = updatedRows.length
                ? Math.max(
                    ...updatedRows.map(
                        (row) => row.originalIndex ?? -1
                    )
                ) + 1
                : 0;

            const newRow = createRow(
                columns,
                nextOriginalIndex
            );

            updatedRows.push(newRow);
            workingRows.push(newRow);
        }
        pastedRows.forEach(
            (pastedRow, rowOffset) => {
                const targetFilteredRow =
                    workingRows[
                    startRowIndex +
                    rowOffset
                    ];
                if (!targetFilteredRow) {
                    return;
                }
                const actualRowIndex =
                    updatedRows.findIndex(
                        (row) =>
                            row.id ===
                            targetFilteredRow.id
                    );
                if (
                    actualRowIndex === -1
                ) {
                    return;
                }
                const values =
                    pastedRow.split("\t");
                values.forEach(
                    (
                        value,
                        columnOffset
                    ) => {
                        const columnIndex =
                            startColumnIndex +
                            columnOffset;
                        const targetColumn =
                            displayedColumns[
                            columnIndex
                            ];
                        if (
                            !targetColumn
                        ) {
                            return;
                        }
                        updatedRows[actualRowIndex] = {
                            ...updatedRows[actualRowIndex],
                            cells: {
                                ...updatedRows[actualRowIndex].cells,
                                [targetColumn.id]: value,
                            },
                        };

                        if (
                            targetColumn.id === "phone" ||
                            targetColumn.id === "email"
                        ) {
                            const errorKey = `${updatedRows[actualRowIndex].id}-${targetColumn.id}`;

                            if (targetColumn.id === "phone") {
                                const phoneRegex = /^[0-9]{10}$/;

                                if (!phoneRegex.test(String(value).trim())) {
                                    importedErrors[errorKey] = "Invalid phone number";
                                } else {
                                    delete importedErrors[errorKey];
                                }
                            }

                            if (targetColumn.id === "email") {
                                const emailRegex =
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                if (!emailRegex.test(String(value).trim())) {
                                    importedErrors[errorKey] = "Invalid email";
                                } else {
                                    delete importedErrors[errorKey];
                                }
                            }
                        }
                    });
            });
        setRows(updatedRows);
        setIsSaved(false);
    };

    /* =====================================================
       KEYBOARD
    ===================================================== */

    useEffect(() => {
        const handleKeyboard = async (
            event
        ) => {
            if (
                !(event.ctrlKey ||
                    event.metaKey)
            ) {
                return;
            }
            const key =
                event.key.toLowerCase();
            if (key === "z") {
                event.preventDefault();
                handleUndo();
            }
            if (key === "y") {
                event.preventDefault();
                handleRedo();
            }
            if (
                key === "c" &&
                selectionComplete
            ) {
                event.preventDefault();
                await handleCopyCells();
            }
            if (
                key === "v" &&
                cellSelectionStart
            ) {
                event.preventDefault();
                await handlePasteCells();
            }
        };
        document.addEventListener(
            "keydown",
            handleKeyboard
        );
        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyboard
            );
        };
    }, [
        selectionComplete,
        cellSelectionStart,
        cellSelectionEnd,
        rows,
        columns,
        filteredRows,
        sortedRows,
        displayedColumns,
    ]);

    /* =====================================================
       CELL RENDER
    ===================================================== */

    const renderCell = (
        row,
        column,
        rowIndex,
        columnIndex
    ) => {
        const value =
            row.cells[column.id] ?? "";
        const selected =
            isCellSelected(
                rowIndex,
                columnIndex
            );
        if (column.type === "status") {
            const selectedStatuses =
                value
                    ? value
                        .split(",")
                        .map(
                            (item) =>
                                item.trim()
                        )
                        .filter(Boolean)
                    : [];
            return (
                <Box
                    data-status-cell-root
                    sx={{
                        position: "relative",
                    }}
                >
                    <Button
                        fullWidth
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveStatusCell(
                                activeStatusCell ===
                                    `${row.id}-${column.id}`
                                    ? null
                                    : `${row.id}-${column.id}`
                            );
                        }}
                        sx={{
                            justifyContent: "flex-start",
                            textTransform: "none",
                            minHeight: 38,
                            px: 1,
                            borderRadius: "6px",
                            border: `1px solid ${borderColor}`,
                            color: textColor,
                            backgroundColor: darkMode
                                ? "#0f172a"
                                : "#ffffff",
                        }}
                    >
                        {selectedStatuses.length ===
                            0 ? (
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: subText,
                                }}
                            >
                                Select status
                            </Typography>
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 0.5,
                                    flexWrap: "wrap",
                                }}
                            >
                                {selectedStatuses.map(
                                    (
                                        statusName
                                    ) => {
                                        const status =
                                            statusOptions.find(
                                                (item) =>
                                                    item.name ===
                                                    statusName
                                            );
                                        return (
                                            <Chip
                                                key={statusName}
                                                label={statusName}
                                                size="small"
                                                sx={{
                                                    height: 23,
                                                    fontSize: "11px",
                                                    color:
                                                        status?.color ||
                                                        textColor,
                                                    backgroundColor:
                                                        status
                                                            ? `${status.color}18`
                                                            : "transparent",
                                                }}
                                            />
                                        );
                                    }
                                )}
                            </Box>
                        )}
                    </Button>

                    {activeStatusCell ===
                        `${row.id}-${column.id}` && (
                            <Paper
                                elevation={0}
                                sx={{
                                    position: "absolute",
                                    top: "calc(100% + 5px)",
                                    left: 0,
                                    width: 220,
                                    zIndex: 3000,
                                    p: 0.75,
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: "6px",
                                    backgroundColor:
                                        darkMode
                                            ? "#1e293b"
                                            : "#ffffff",
                                    boxShadow:
                                        "0 10px 30px rgba(0,0,0,0.15)",
                                }}
                            >
                                {statusOptions.map(
                                    (status) => {
                                        const selectedStatus =
                                            selectedStatuses.includes(
                                                status.name
                                            );

                                        return (
                                            <Button
                                                key={status.id}
                                                fullWidth
                                                onClick={() =>
                                                    handleStatusChange(
                                                        row.id,
                                                        column,
                                                        status
                                                    )
                                                }
                                                sx={{
                                                    justifyContent: "space-between",
                                                    textTransform: "none",
                                                    color: status.color,
                                                    fontSize: "12px",
                                                    borderRadius: "6px",
                                                    px: 1,
                                                    py: 0.75,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "6px",
                                                            backgroundColor:
                                                                status.color,
                                                        }}
                                                    />

                                                    {status.name}
                                                </Box>
                                                {selectedStatus && (
                                                    <Check size={14} />
                                                )}
                                            </Button>
                                        );
                                    })}

                                <Divider sx={{ my: 0.5, }} />

                                <Button
                                    fullWidth
                                    startIcon={<Plus size={14} />}
                                    onClick={() =>
                                        setShowStatusList(true)
                                    }
                                    sx={{
                                        justifyContent: "flex-start",
                                        textTransform: "none",
                                        fontSize: "12px",
                                        color: textColor,
                                    }}
                                >
                                    Manage statuses
                                </Button>
                            </Paper>
                        )}
                </Box>
            );
        }
        if (column.type === "checkbox") {
            return (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Checkbox
                        checked={value === "true"}
                        onChange={(event) =>
                            handleCellChange(
                                row.id,
                                column.id,
                                event.target.checked
                                    ? "true"
                                    : "false"
                            )}
                    />
                </Box>
            );
        }
        return (
            <TextField
                fullWidth
                error={Boolean(
                    cellErrors[`${row.id}-${column.id}`]
                )}
                helperText={
                    cellErrors[`${row.id}-${column.id}`] || ""
                }
                multiline={
                    column.type === "text"
                }
                rows={
                    column.type === "text" &&
                        wrapEnabledColumns[
                        column.id
                        ]
                        ? 2
                        : 1
                }
                type={
                    column.type === "number"
                        ? "number"
                        : column.type === "date"
                            ? "date"
                            : "text"
                }
                value={value}
                onChange={(event) =>
                    handleCellChange(
                        row.id,
                        column.id,
                        event.target.value
                    )
                }
                onClick={() =>
                    handleCellClick(
                        rowIndex,
                        columnIndex
                    )
                }
                InputLabelProps={{
                    shrink:
                        column.type ===
                        "date",
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        fontSize: "12px",
                        color: textColor,
                        backgroundColor: darkMode
                            ? "#0f172a"
                            : "#ffffff",
                        borderRadius: "10px",
                        "& fieldset": {
                            borderColor: selected
                                ? primary
                                : borderColor,
                            borderWidth: selected ? "2px" : "1px",
                            borderRadius: "10px",
                        },
                        "&:hover fieldset": {
                            borderColor: primary,
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: primary,
                            borderWidth: "2px",
                        },
                    },
                }}
            />
        );
    };

    /* =====================================================
       LOADING
    ===================================================== */

    if (isLoading) {
        return (
            <HRLayout>
                <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: subText,
                    }}
                >
                    Loading table...
                </Box>
            </HRLayout>
        );
    }
    return (
        <HRLayout>
            <Box
                sx={{
                    minHeight: "100vh",
                    p: { xs: 1, sm: 2, md: 1, },
                    backgroundColor: darkMode
                        ? "#0f172a"
                        : "#f8fafc",
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: "100%",
                        border: `1px solid ${borderColor}`,
                        borderRadius: "6px",
                        background: glassBg,
                        overflow: "visible",
                    }}
                >
                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <Box
                        sx={{
                            px: { xs: 2, md: 3, },
                            py: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                            borderBottom: `1px solid ${borderColor}`,
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: "18px", sm: "20px", },
                                    fontWeight: 600,
                                    color: textColor,
                                }}
                            >
                                Custom Table
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 0.5,
                                    fontSize: "12px",
                                    color: subText,
                                }}
                            >
                                Manage your HR data with a customizable table.
                            </Typography>
                        </Box>

                        {/* Search */}

                        <TextField
                            size="small"
                            placeholder="Search employees..."
                            value={searchValue}
                            onChange={(event) =>
                                setSearchValue(event.target.value)
                            }
                            InputProps={{
                                startAdornment: (
                                    <Search size={17} />
                                ),
                            }}
                            sx={{
                                flex: 1,
                                maxWidth: 620,
                                minWidth: { xs: "100%", md: 350, },
                                "& .MuiOutlinedInput-root": {
                                    height: 42,
                                    fontSize: "13px",
                                    borderRadius: "10px",
                                    color: textColor,
                                    backgroundColor: darkMode
                                        ? "#0f172a"
                                        : "#ffffff",
                                    "& fieldset": {
                                        borderColor: borderColor,
                                    },
                                    "&:hover fieldset": {
                                        borderColor: primary,
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: primary,
                                    },
                                },
                                "& input::placeholder": {
                                    color: subText,
                                    opacity: 1,
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "6px",
                                    backgroundColor: primary,
                                }}
                            >
                                {isSaved
                                    ? "Saved"
                                    : "Save Changes"}
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<Download size={18} />}
                                onClick={handleExportExcel}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "6px",
                                }}
                            >
                                Export
                            </Button>

                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<Upload size={18} />}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "6px",
                                }}
                            >
                                Import
                                <input
                                    type="file"
                                    hidden
                                    accept=".xlsx,.xls"
                                    onChange={handleImportExcel}
                                />
                            </Button>

                        </Box>
                    </Box>

                    {/* =================================================
                        TOOLBAR
                    ================================================= */}

                    <Box
                        sx={{
                            p: 1.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            borderBottom: `1px solid ${borderColor}`,
                        }}
                    >

                        {/* View Settings */}

                        <Box
                            ref={viewSettingsRef}
                            sx={{
                                position: "relative",
                            }}
                        >
                            <Button
                                startIcon={
                                    <Settings2 size={15} />
                                }
                                onClick={() => {
                                    setShowViewSettings(
                                        (previous) =>
                                            !previous
                                    );
                                    setShowFilter(false);
                                    setShowMore(false);
                                }}
                                sx={{
                                    textTransform: "none",
                                    fontSize: "12px",
                                    color: textColor,
                                }}
                            >
                                View Settings
                            </Button>

                            {showViewSettings && (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        position: "absolute",
                                        top: "calc(100% + 5px)",
                                        left: 0,
                                        width: 240,
                                        zIndex: 3000,
                                        p: 1,
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: "6px",
                                        backgroundColor:
                                            darkMode
                                                ? "#1e293b"
                                                : "#ffffff",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            px: 1,
                                            py: 0.5,
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: textColor,
                                        }}
                                    >
                                        View Settings
                                    </Typography>

                                    <Typography
                                        sx={{
                                            px: 1,
                                            pb: 1,
                                            fontSize: "11px",
                                            color: subText,
                                        }}
                                    >
                                        Show or hide columns
                                    </Typography>

                                    {columns.map(
                                        (
                                            column
                                        ) => {
                                            const visible =
                                                visibleColumns.includes(
                                                    column.id
                                                );
                                            return (
                                                <Button
                                                    key={column.id}
                                                    fullWidth
                                                    onClick={() =>
                                                        handleToggleColumn(
                                                            column.id
                                                        )
                                                    }
                                                    sx={{
                                                        justifyContent: "space-between",
                                                        textTransform: "none",
                                                        fontSize: "12px",
                                                        color: textColor,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: 1,
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {visible ? (
                                                            <Eye size={14} />
                                                        ) : (
                                                            <EyeOff size={14} />
                                                        )}

                                                        {column.name}
                                                    </Box>

                                                    {visible && (
                                                        <Check size={14} />
                                                    )}
                                                </Button>
                                            );
                                        })}
                                </Paper>
                            )}
                        </Box>

                        {/* Add Property */}

                        <Box
                            ref={addPropertyRef}
                            sx={{ position: "relative", }}
                        >
                            <Button
                                startIcon={<Plus size={15} />}
                                onClick={() =>
                                    setShowAddProperty(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                sx={{
                                    textTransform: "none",
                                    fontSize: "12px",
                                    color: textColor,
                                }}
                            >
                                Add Property
                            </Button>

                            {showAddProperty && (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        position: "absolute",
                                        top: "calc(100% + 5px)",
                                        left: 0,
                                        width: 220,
                                        zIndex: 3000,
                                        p: 1,
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: "6px",
                                        backgroundColor: darkMode
                                            ? "#1e293b"
                                            : "#ffffff",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            px: 1,
                                            py: 0.5,
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: textColor,
                                        }}
                                    >
                                        Add Property
                                    </Typography>

                                    {[
                                        ["text", "Text", Type],
                                        ["number", "Number", Hash],
                                        ["date", "Date", CalendarDays],
                                        ["status", "Status", CircleCheck],
                                        ["checkbox", "Checkbox", Check],
                                    ].map(
                                        ([type, label, Icon]) => (
                                            <Button
                                                key={type}
                                                fullWidth
                                                startIcon={<Icon size={14} />}
                                                onClick={() =>
                                                    handleAddColumn(type)
                                                }
                                                sx={{
                                                    justifyContent: "flex-start",
                                                    textTransform: "none",
                                                    fontSize: "12px",
                                                    color: textColor,
                                                }}
                                            >
                                                {label}
                                            </Button>
                                        ))}
                                </Paper>
                            )}
                        </Box>

                        {/* Selected Actions */}

                        {selectedRows.length >
                            0 && (
                                <Button
                                    startIcon={<Trash2 size={15} />}
                                    onClick={askDeleteSelected}
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "12px",
                                        color: "#ef4444",
                                    }}
                                >
                                    Delete
                                    ( {selectedRows.length})
                                </Button>
                            )}
                        <Box sx={{ ml: "auto" }}>
                            <Typography
                                sx={{
                                    fontSize: "11px",
                                    color: subText,
                                }}
                            >
                                {filteredRows.length}
                                {" "}
                                rows
                            </Typography>
                        </Box>
                    </Box>

                    {/* =================================================
                        TABLE
                    ================================================= */}

                    <TableContainer
                        sx={{
                            width: "100%",
                            overflowX: "auto",
                            overflowY: "visible",
                        }}
                    >
                        <Table
                            stickyHeader
                            sx={{ minWidth: 1100, }}
                        >
                            <TableHead>
                                <TableRow>

                                    {/* SELECT */}

                                    <TableCell
                                        padding="checkbox"
                                        sx={{
                                            position: "sticky",
                                            left: 0,
                                            zIndex: 2,
                                            backgroundColor: darkMode
                                                ? "#1e293b"
                                                : "#f8fafc",
                                            borderBottom: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        <Checkbox
                                            size="small"
                                            checked={
                                                filteredRows.length > 0 &&
                                                selectedRows.length ===
                                                filteredRows.length
                                            }
                                            indeterminate={
                                                selectedRows.length > 0 &&
                                                selectedRows.length <
                                                filteredRows.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    {displayedColumns.map(
                                        (
                                            column,
                                            columnIndex
                                        ) => (
                                            <TableCell
                                                id={`column-${column.id}`}
                                                key={column.id}
                                                draggable
                                                onDragStart={() => {
                                                    setDraggedColumnId(column.id);
                                                }}
                                                onDragOver={(event) => {
                                                    event.preventDefault();
                                                }}
                                                onDrop={() => {
                                                    handleColumnDrop(column.id);
                                                }}
                                                onDragEnd={() => {
                                                    setDraggedColumnId(null);
                                                }}
                                                sx={{
                                                    width: columnWidths[column.id] || 160,
                                                    minWidth: columnWidths[column.id] || 160,
                                                    position: pinnedColumns.right.includes(column.id)
                                                        ? "sticky"
                                                        : "relative",
                                                    right: pinnedColumns.right.includes(column.id)
                                                        ? pinnedColumns.right
                                                            .slice(pinnedColumns.right.indexOf(column.id) + 1)
                                                            .reduce(
                                                                (total, id) =>
                                                                    total + (columnWidths[id] || 160),
                                                                0
                                                            )
                                                        : undefined,
                                                    zIndex: pinnedColumns.right.includes(column.id)
                                                        ? 6
                                                        : undefined,
                                                    backgroundColor:
                                                        pinnedColumns.left.includes(column.id) ||
                                                            pinnedColumns.right.includes(column.id)
                                                            ? darkMode
                                                                ? "rgba(59, 130, 246, 0.12)"
                                                                : "rgba(59, 130, 246, 0.08)"
                                                            : darkMode
                                                                ? "#1e293b"
                                                                : "#f8fafc",

                                                    boxShadow:
                                                        pinnedColumns.left.includes(column.id)
                                                            ? "4px 0 10px -8px rgba(59, 130, 246, 0.6)"
                                                            : pinnedColumns.right.includes(column.id)
                                                                ? "-4px 0 10px -8px rgba(59, 130, 246, 0.6)"
                                                                : "none",

                                                    borderBottom: `1px solid ${borderColor}`,
                                                    color: textColor,
                                                    opacity:
                                                        draggedColumnId === column.id
                                                            ? 0.5
                                                            : 1,
                                                    cursor: "grab",
                                                    transition: "opacity 0.15s ease",
                                                    "&:active": {
                                                        cursor: "grabbing",
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <TextField
                                                        variant="standard"
                                                        value={column.name}
                                                        onChange={(event) =>
                                                            handleColumnNameChange(
                                                                column.id,
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        InputProps={{
                                                            disableUnderline: true,
                                                        }}
                                                        sx={{
                                                            flex: 1,
                                                            "& .MuiInputBase-input":
                                                            {
                                                                fontSize: "12px",
                                                                fontWeight: 600,
                                                                color: textColor,
                                                            },
                                                        }}
                                                    />

                                                    <IconButton
                                                        size="small"
                                                        data-column-menu-root
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setActiveColumnMenu(
                                                                activeColumnMenu ===
                                                                    column.id
                                                                    ? null
                                                                    : column.id
                                                            );
                                                        }}
                                                        sx={{ color: subText, }}
                                                    >
                                                        <MoreHorizontal size={16} />
                                                    </IconButton>
                                                </Box>

                                                <Box
                                                    onMouseDown={(event) =>
                                                        handleResizeStart(event, column.id)
                                                    }
                                                    sx={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 0,
                                                        width: "2px",
                                                        height: "100%",
                                                        cursor: "col-resize",
                                                        zIndex: 10,
                                                        backgroundColor:
                                                            resizingColumnId === column.id
                                                                ? primary
                                                                : "transparent",
                                                        "&:hover": {
                                                            backgroundColor: primary,
                                                        },
                                                    }}
                                                />

                                                {activeColumnMenu ===
                                                    column.id && (
                                                        <Paper
                                                            elevation={0}
                                                            data-column-menu-root
                                                            sx={{
                                                                position: "absolute",
                                                                top: "calc(100% + 5px)",
                                                                left: 0,
                                                                width: 220,
                                                                zIndex: 3000,
                                                                p: 1,
                                                                border: `1px solid ${borderColor}`,
                                                                borderRadius: "10px",
                                                                backgroundColor: darkMode
                                                                    ? "#1e293b"
                                                                    : "#ffffff",
                                                                boxShadow: darkMode
                                                                    ? "0 12px 32px rgba(0, 0, 0, 0.35)"
                                                                    : "0 10px 30px rgba(15, 23, 42, 0.15)",
                                                                overflow: "hidden",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    px: 1,
                                                                    py: 0.5,
                                                                    fontSize: "11px",
                                                                    color: subText,
                                                                }}
                                                            >
                                                                Property
                                                                type
                                                            </Typography>
                                                            {[
                                                                ["text", "Text", Type],
                                                                ["number", "Number", Hash],
                                                                ["date", "Date", CalendarDays],
                                                                ["status", "Status", CircleCheck],
                                                                ["checkbox", "Checkbox", Check],
                                                            ].map(
                                                                ([type, label, Icon,]) => (
                                                                    <Button
                                                                        key={type}
                                                                        fullWidth
                                                                        startIcon={<Icon size={13} />}
                                                                        onClick={() =>
                                                                            handleColumnTypeChange(
                                                                                column.id,
                                                                                type
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            width: "100%",
                                                                            minHeight: 38,
                                                                            justifyContent: "flex-start",
                                                                            textTransform: "none",
                                                                            fontSize: "15px",
                                                                            fontWeight: 400,
                                                                            color: textColor,
                                                                            borderRadius: "7px",
                                                                            px: 1.25,
                                                                            gap: 1,
                                                                            mb: -1,
                                                                            transition:
                                                                                "background-color 0.15s ease, transform 0.15s ease",
                                                                            "&:hover": {
                                                                                backgroundColor: darkMode
                                                                                    ? "rgba(255, 255, 255, 0.08)"
                                                                                    : "#f1f5f9",
                                                                            },
                                                                        }}
                                                                    >
                                                                        {label}
                                                                        {column.type ===
                                                                            type && (
                                                                                <Check size={13}
                                                                                    style={{ marginLeft: "auto", }}
                                                                                />
                                                                            )}
                                                                    </Button>
                                                                ))}

                                                            <Divider sx={{ my: 0.5, }} />

                                                            <Box sx={{ position: "relative" }}>
                                                                <Button
                                                                    fullWidth
                                                                    startIcon={<Settings2 size={13} />}
                                                                    onClick={() => setShowSortOptions((previous) => !previous)}
                                                                    sx={{
                                                                        justifyContent: "flex-start",
                                                                        textTransform: "none",
                                                                        fontSize: "12px",
                                                                        color: textColor,
                                                                    }}
                                                                >
                                                                    Sort
                                                                </Button>

                                                                {showSortOptions && (
                                                                    <Box
                                                                        sx={{
                                                                            position: "absolute",
                                                                            top: "100%",
                                                                            left: 0,
                                                                            width: "100%",
                                                                            mt: 0.5,
                                                                            p: 0.5,
                                                                            borderRadius: "8px",
                                                                            backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                                                                            border: `1px solid ${borderColor}`,
                                                                            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                                                                            zIndex: 3100,
                                                                        }}
                                                                    >
                                                                        <Button
                                                                            fullWidth
                                                                            onClick={() => handleSort(activeColumnMenu, "asc")}
                                                                            sx={{
                                                                                justifyContent: "flex-start",
                                                                                textTransform: "none",
                                                                                fontSize: "12px",
                                                                                color: textColor,
                                                                            }}
                                                                        >
                                                                            Ascending (A → Z)
                                                                        </Button>

                                                                        <Button
                                                                            fullWidth
                                                                            onClick={() => handleSort(activeColumnMenu, "desc")}
                                                                            sx={{
                                                                                justifyContent: "flex-start",
                                                                                textTransform: "none",
                                                                                fontSize: "12px",
                                                                                color: textColor,
                                                                            }}
                                                                        >
                                                                            Descending (Z → A)
                                                                        </Button>

                                                                        <Button
                                                                            fullWidth
                                                                            onClick={() => handleSort(activeColumnMenu, "original")}
                                                                            sx={{
                                                                                justifyContent: "flex-start",
                                                                                textTransform: "none",
                                                                                fontSize: "12px",
                                                                                color: textColor,
                                                                            }}
                                                                        >
                                                                            Original
                                                                        </Button>
                                                                    </Box>
                                                                )}
                                                            </Box>

                                                            <Button
                                                                fullWidth
                                                                startIcon={
                                                                    pinnedColumns.right.includes(column.id) ? (
                                                                        <EyeOff size={13} />
                                                                    ) : (
                                                                        <Eye size={13} />
                                                                    )
                                                                }
                                                                onClick={() => {
                                                                    handlePinColumn(
                                                                        column.id,
                                                                        pinnedColumns.right.includes(column.id)
                                                                            ? null
                                                                            : "right"
                                                                    );
                                                                    setActiveColumnMenu(null);
                                                                }}
                                                                sx={{
                                                                    width: "100%",
                                                                    minHeight: 38,
                                                                    justifyContent: "flex-start",
                                                                    textTransform: "none",
                                                                    fontSize: "13px",
                                                                    fontWeight: 400,
                                                                    color: textColor,
                                                                    borderRadius: "7px",
                                                                    px: 1.25,
                                                                    gap: 1,
                                                                    mb: -1,
                                                                    transition: "background-color 0.15s ease",
                                                                    "&:hover": {
                                                                        backgroundColor: darkMode
                                                                            ? "rgba(255, 255, 255, 0.08)"
                                                                            : "#f1f5f9",
                                                                    },
                                                                }}
                                                            >
                                                                {pinnedColumns.right.includes(column.id)
                                                                    ? "Unpin"
                                                                    : "Pin"}
                                                            </Button>

                                                            <Button
                                                                fullWidth
                                                                startIcon={<Copy size={13} />}
                                                                onClick={() =>
                                                                    handleDuplicateColumn(column.id)
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                    minHeight: 38,
                                                                    justifyContent: "flex-start",
                                                                    textTransform: "none",
                                                                    fontSize: "13px",
                                                                    fontWeight: 400,
                                                                    color: textColor,
                                                                    borderRadius: "7px",
                                                                    px: 1.25,
                                                                    gap: 1,
                                                                    mb: -1,
                                                                    transition:
                                                                        "background-color 0.15s ease, transform 0.15s ease",
                                                                    "&:hover": {
                                                                        backgroundColor: darkMode
                                                                            ? "rgba(255, 255, 255, 0.08)"
                                                                            : "#f1f5f9",
                                                                    },
                                                                }}
                                                            >
                                                                Duplicate property
                                                            </Button>
                                                            <Button
                                                                fullWidth
                                                                startIcon={<WrapText size={13} />}
                                                                onClick={() =>
                                                                    handleToggleWrap(column.id)
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                    minHeight: 38,
                                                                    justifyContent: "flex-start",
                                                                    textTransform: "none",
                                                                    fontSize: "13px",
                                                                    fontWeight: 400,
                                                                    color: textColor,
                                                                    borderRadius: "7px",
                                                                    px: 1.25,
                                                                    gap: 1,
                                                                    mb: -1,
                                                                    transition:
                                                                        "background-color 0.15s ease, transform 0.15s ease",
                                                                    "&:hover": {
                                                                        backgroundColor: darkMode
                                                                            ? "rgba(255, 255, 255, 0.08)"
                                                                            : "#f1f5f9",
                                                                    },
                                                                }}
                                                            >
                                                                {wrapEnabledColumns[
                                                                    column.id
                                                                ]
                                                                    ? "Disable wrap"
                                                                    : "Wrap text"}
                                                            </Button>
                                                            <Button
                                                                fullWidth
                                                                startIcon={<Trash2 size={13} />}
                                                                onClick={() =>
                                                                    askDeleteColumn(column.id)
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                    minHeight: 38,
                                                                    justifyContent: "flex-start",
                                                                    textTransform: "none",
                                                                    fontSize: "13px",
                                                                    fontWeight: 400,
                                                                    color: "#ef4444",
                                                                    borderRadius: "7px",
                                                                    px: 1.25,
                                                                    gap: 1,
                                                                    transition: "background-color 0.15s ease",
                                                                    "&:hover": {
                                                                        backgroundColor: darkMode
                                                                            ? "rgba(239, 68, 68, 0.12)"
                                                                            : "#fef2f2",
                                                                    },
                                                                }}
                                                            >
                                                                Delete property
                                                            </Button>
                                                        </Paper>
                                                    )}
                                            </TableCell>
                                        ))}
                                    <TableCell
                                        sx={{
                                            width: 50,
                                            minWidth: 50,
                                            backgroundColor: darkMode
                                                ? "#1e293b"
                                                : "#f8fafc",
                                            borderBottom: `1px solid ${borderColor}`,
                                        }}
                                    >
                                        <Tooltip title="Add property">
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    setShowAddProperty(true)
                                                }
                                            >
                                                <Plus size={17} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedRows.map(
                                    (
                                        row,
                                        rowIndex
                                    ) => (
                                        <TableRow
                                            key={row.id}
                                            hover
                                            draggable
                                            sx={{
                                                opacity: draggedRowId === row.id ? 0.55 : 1,
                                                backgroundColor:
                                                    draggedRowId === row.id
                                                        ? darkMode
                                                            ? "rgba(59, 130, 246, 0.12)"
                                                            : "rgba(59, 130, 246, 0.06)"
                                                        : "transparent",
                                                transition: "opacity 0.15s ease, background-color 0.15s ease",
                                            }}
                                            onDragStart={() => setDraggedRowId(row.id)}
                                            onDragOver={(event) => event.preventDefault()}
                                            onDrop={() => handleRowDrop(row.id)}
                                            onDragEnd={() => setDraggedRowId(null)}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                sx={{
                                                    borderBottom: `1px solid ${borderColor}`,
                                                    position: "sticky",
                                                    left: 0,
                                                    zIndex: 1,
                                                    backgroundColor: darkMode
                                                        ? "#0f172a"
                                                        : "#ffffff",
                                                }}
                                            >
                                                <Checkbox
                                                    size="small"
                                                    checked={selectedRows.includes(row.id)}
                                                    onChange={() =>
                                                        handleSelectRow(row.id)}
                                                />
                                            </TableCell>
                                            {displayedColumns.map(
                                                (
                                                    column,
                                                    columnIndex
                                                ) => (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={{
                                                            p: 1,
                                                            width: columnWidths[column.id] || 160,
                                                            minWidth: columnWidths[column.id] || 160,
                                                            borderBottom: `1px solid ${borderColor}`,
                                                            backgroundColor:
                                                                pinnedColumns.left.includes(column.id) ||
                                                                    pinnedColumns.right.includes(column.id)
                                                                    ? darkMode
                                                                        ? "rgba(59, 130, 246, 0.10)"
                                                                        : "rgba(59, 130, 246, 0.06)"
                                                                    : darkMode
                                                                        ? "#0f172a"
                                                                        : "#ffffff",

                                                            verticalAlign: "top",

                                                            ...(pinnedColumns.left.includes(column.id) && {
                                                                position: "sticky",
                                                                left:
                                                                    48 +
                                                                    displayedColumns
                                                                        .slice(0, columnIndex)
                                                                        .filter((col) =>
                                                                            pinnedColumns.left.includes(col.id)
                                                                        )
                                                                        .reduce(
                                                                            (total, col) =>
                                                                                total +
                                                                                (columnWidths[col.id] || 160),
                                                                            0
                                                                        ),
                                                                zIndex: 4,
                                                                boxShadow:
                                                                    pinnedColumns.left[
                                                                        pinnedColumns.left.length - 1
                                                                    ] === column.id
                                                                        ? darkMode
                                                                            ? "4px 0 8px rgba(0,0,0,0.25)"
                                                                            : "4px 0 8px rgba(15,23,42,0.08)"
                                                                        : "none",
                                                            }),

                                                            ...(pinnedColumns.right.includes(column.id) && {
                                                                position: "sticky",
                                                                right: pinnedColumns.right
                                                                    .slice(
                                                                        pinnedColumns.right.indexOf(column.id) + 1
                                                                    )
                                                                    .reduce(
                                                                        (total, id) =>
                                                                            total + (columnWidths[id] || 160),
                                                                        0
                                                                    ),
                                                                zIndex: 4,
                                                                boxShadow:
                                                                    pinnedColumns.right[
                                                                        pinnedColumns.right.length - 1
                                                                    ] === column.id
                                                                        ? darkMode
                                                                            ? "-4px 0 8px rgba(0,0,0,0.25)"
                                                                            : "-4px 0 8px rgba(15,23,42,0.08)"
                                                                        : "none",
                                                            }),
                                                        }}
                                                    >
                                                        {renderCell(
                                                            row,
                                                            column,
                                                            rowIndex,
                                                            columnIndex
                                                        )}
                                                    </TableCell>
                                                ))}

                                            <TableCell
                                                sx={{
                                                    borderBottom: `1px solid ${borderColor}`,
                                                }}
                                            />
                                        </TableRow>
                                    ))}

                                {filteredRows.length ===
                                    0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={displayedColumns.length + 2}
                                                sx={{
                                                    py: 6,
                                                    textAlign: "center",
                                                    borderBottom: `1px solid ${borderColor}`,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                        color: subText,
                                                    }}
                                                >
                                                    No rows found
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* =================================================
                        Add Row
                    ================================================= */}

                    <Box
                        sx={{
                            px: 2,
                            py: 1,
                            borderTop: `1px solid ${borderColor}`,
                        }}
                    >
                        <Button
                            startIcon={<Plus size={15} />}
                            onClick={handleAddRow}
                            sx={{
                                textTransform: "none",
                                fontSize: "12px",
                                color: subText,
                                borderRadius: "6px",
                                px: 1,
                                "&:hover": {
                                    backgroundColor: darkMode
                                        ? "rgba(255,255,255,0.05)"
                                        : "rgba(0,0,0,0.04)",
                                },
                            }}
                        >
                            Add Row
                        </Button>
                    </Box>

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <Box
                        sx={{
                            px: 2,
                            py: 1.25,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderTop: `1px solid ${borderColor}`,
                        }}
                    >
                        {selectedRows.length >
                            0 && (
                                <Typography
                                    sx={{
                                        fontSize: "11px",
                                        color: primary,
                                    }}
                                >
                                    {selectedRows.length}
                                    {" "}
                                    selected
                                </Typography>
                            )}
                    </Box>
                </Paper>
            </Box>

            {/* =====================================================
                DELETE DIALOG
            ===================================================== */}

            <Dialog
                open={!!deleteConfirmation}
                onClose={() =>
                    setDeleteConfirmation(null)
                }
                PaperProps={{
                    sx: {
                        borderRadius: "6px",
                        backgroundColor: darkMode
                            ? "#1e293b"
                            : "#ffffff",
                        border: `1px solid ${borderColor}`,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: textColor,
                    }}
                >
                    Delete Property?
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            color: subText,
                        }}
                    >
                        Are you sure you want to delete this item?
                        This action can be undone using Undo.
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        px: 2, pb: 2,
                    }}
                >
                    <Button
                        onClick={() =>
                            setDeleteConfirmation(null)
                        }
                        sx={{
                            textTransform: "none",
                            color: subText,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#ef4444",
                            "&:hover": {
                                backgroundColor: "#dc2626",
                            },
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* =====================================================
                STATUS MANAGEMENT
            ===================================================== */}

            <Dialog
                open={showStatusList}
                onClose={() =>
                    setShowStatusList(false)
                }
                PaperProps={{
                    sx: {
                        borderRadius: "6px",
                        backgroundColor: darkMode
                            ? "#1e293b"
                            : "#ffffff",
                        border: `1px solid ${borderColor}`,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontSize: "15px",
                        color: textColor,
                    }}
                >
                    Manage Statuses
                </DialogTitle>
                <DialogContent
                    sx={{
                        minWidth: { xs: 280, sm: 400, },
                    }}
                >
                    {statusOptions.map(
                        (status) => (
                            <Box
                                key={status.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    py: 0.75,
                                }}
                            >
                                <Chip
                                    label={status.name}
                                    size="small"
                                    sx={{
                                        color: status.color,
                                        backgroundColor: `${status.color}18`,
                                    }}
                                />

                                <Box sx={{ display: "flex", gap: 0.5 }}>

                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setStatusToRename(status);
                                            setRenameStatusName(status.name);
                                        }}
                                        sx={{ color: subText }}
                                    >
                                        <Pencil size={14} />
                                    </IconButton>

                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            setStatusToDelete(status)
                                        }
                                        sx={{ color: subText, }}
                                    >
                                        <Trash2 size={14} />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}

                    <Divider sx={{ my: 1.5, }} />

                    <TextField
                        fullWidth
                        size="small"
                        label="New status"
                        value={newStatusName}
                        onChange={(event) =>
                            setNewStatusName(
                                event
                                    .target
                                    .value
                            )
                        }
                    />

                    <Box
                        sx={{
                            mt: 1,
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        {[
                            "#3b82f6",
                            "#22c55e",
                            "#f59e0b",
                            "#ef4444",
                            "#8b5cf6",
                        ].map(
                            (color) => (
                                <Box
                                    key={color}
                                    onClick={() =>
                                        setNewStatusColor(color)
                                    }
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        backgroundColor: color,
                                        border: newStatusColor ===
                                            color
                                            ? `2px solid ${textColor}`
                                            : "2px solid transparent",
                                    }}
                                />
                            ))}
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAddStatus}
                        disabled={!newStatusName.trim()}
                        sx={{
                            mt: 1.5,
                            textTransform: "none",
                            backgroundColor: primary,
                        }}
                    >
                        Add Status
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            setShowStatusList(false)
                        }
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={Boolean(statusToRename)}
                onClose={() => {
                    setStatusToRename(null);
                    setRenameStatusName("");
                }}
                PaperProps={{
                    sx: {
                        borderRadius: "6px",
                        backgroundColor: darkMode
                            ? "#1e293b"
                            : "#ffffff",
                        border: `1px solid ${borderColor}`,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontSize: "15px",
                        color: textColor,
                    }}
                >
                    Rename Status
                </DialogTitle>

                <DialogContent
                    sx={{
                        minWidth: { xs: 280, sm: 400 },
                    }}
                >
                    <TextField
                        fullWidth
                        autoFocus
                        size="small"
                        label="Status name"
                        value={renameStatusName}
                        onChange={(event) =>
                            setRenameStatusName(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleRenameStatus();
                            }
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setStatusToRename(null);
                            setRenameStatusName("");
                        }}
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleRenameStatus}
                        disabled={!renameStatusName.trim()}
                        sx={{
                            textTransform: "none",
                            backgroundColor: primary,
                        }}
                    >
                        Rename
                    </Button>
                </DialogActions>
            </Dialog>

            {/* =====================================================
                DELETE STATUS DIALOG
            ===================================================== */}

            <Dialog
                open={!!statusToDelete}
                onClose={() =>
                    setStatusToDelete(null)
                }
            >
                <DialogTitle>
                    Delete Status?
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            color: subText,
                        }}
                    >
                        Deleting this status will
                        remove it from existing cells.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            setStatusToDelete(null)
                        }
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteStatus}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#ef4444",
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </HRLayout>
    );
};

export default CustomTable;