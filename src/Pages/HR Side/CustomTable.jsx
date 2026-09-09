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
    MoreHorizontal, Plus, Trash2,
    Check, Copy, CalendarDays,
    Hash, Type, CircleCheck,
    Eye, EyeOff, WrapText,
} from "lucide-react";

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

const createRow = (columns) => {
    const cells = {};

    columns.forEach((column) => {
        cells[column.id] = "";
    });

    return {
        id: `row-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        cells,
    };
};

const createInitialRows = (columns) =>
    Array.from({ length: 10 }, () => createRow(columns));

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
            })
        );
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 2000);
    };

    /* =====================================================
       CELL CHANGE
    ===================================================== */

    const handleCellChange = (
        rowId,
        columnId,
        value
    ) => {
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
        const newRow = createRow(columns);
        setRows((previous) => [
            ...previous,
            newRow,
        ]);
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
        if (
            selectedRows.length ===
            filteredRows.length
        ) {
            setSelectedRows([]);
        } else {
            setSelectedRows(
                filteredRows.map(
                    (row) => row.id
                ));
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
       FILTER
    ===================================================== */

    const filteredRows = rows.filter((row) => {
        // Search
        if (searchValue.trim()) {
            const search = searchValue
                .trim()
                .toLowerCase();
            const matchesSearch = columns.some(
                (column) => {
                    if (
                        !visibleColumns.includes(
                            column.id
                        )
                    ) {
                        return false;
                    }
                    const cellValue = String(
                        row.cells[column.id] ?? ""
                    ).toLowerCase();
                    return cellValue.includes(search);
                }
            );
            if (!matchesSearch) {
                return false;
            }
        }

        // Filter
        if (filterColumn) {
            const cellValue = String(
                row.cells[filterColumn] ?? ""
            )
                .trim()
                .toLowerCase();
            const filter = filterValue
                .trim()
                .toLowerCase();

            // If column selected but filter value empty,
            // don't hide any rows.
            if (filter && !cellValue.includes(filter)) {
                return false;
            }
        }
        return true;
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
                filteredRows[rowIndex];
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
        const updatedRows = [...rows];
        while (
            filteredRows.length <
            startRowIndex +
            pastedRows.length
        ) {
            const newRow =
                createRow(columns);
            updatedRows.push(newRow);
            filteredRows.push(newRow);
        }
        pastedRows.forEach(
            (pastedRow, rowOffset) => {
                const targetFilteredRow =
                    filteredRows[
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
                        updatedRows[
                            actualRowIndex
                        ] = {
                            ...updatedRows[
                            actualRowIndex
                            ],
                            cells: {
                                ...updatedRows[
                                    actualRowIndex
                                ].cells,
                                [targetColumn.id]:
                                    value,
                            },
                        };
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
                                                key={column.id}
                                                sx={{
                                                    position: "relative",
                                                    minWidth: 170,
                                                    backgroundColor: darkMode
                                                        ? "#1e293b"
                                                        : "#f8fafc",
                                                    borderBottom: `1px solid ${borderColor}`,
                                                    color: textColor,
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
                                {filteredRows.map(
                                    (
                                        row,
                                        rowIndex
                                    ) => (
                                        <TableRow
                                            key={row.id}
                                            hover
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
                                                            borderBottom: `1px solid ${borderColor}`,
                                                            backgroundColor: darkMode
                                                                ? "#0f172a"
                                                                : "#ffffff",
                                                            verticalAlign: "top",
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