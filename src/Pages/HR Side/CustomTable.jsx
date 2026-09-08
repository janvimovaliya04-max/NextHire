import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import HRLayout from "../../Layouts/HRLayout";

import {
    Paper,
    Typography,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";

import {
    MoreHorizontal,
    Trash2,
} from "lucide-react";

const CustomTable = () => {
    const { darkMode } = useTheme();
    const [openColumnMenu, setOpenColumnMenu] =
        useState(null);

    const [columnToDelete, setColumnToDelete] =
        useState(null);

    const [showAddColumnMenu, setShowAddColumnMenu] =
        useState(false);

    useEffect(() => {
        const handleClickOutside = () => {
            setOpenColumnMenu(null);
        };

        if (openColumnMenu) {
            document.addEventListener(
                "click",
                handleClickOutside
            );
        }

        return () => {
            document.removeEventListener(
                "click",
                handleClickOutside
            );
        };
    }, [openColumnMenu]);

    const {
        textColor,
        subText,
        borderColor,
        glassBg,
        primary,
    } = useThemeColors();

    const defaultColumns = [
        {
            id: "name",
            name: "Name",
            type: "text",
        },
        {
            id: "email",
            name: "Email",
            type: "text",
        },
        {
            id: "role",
            name: "Role",
            type: "text",
        },
        {
            id: "status",
            name: "Status",
            type: "status",
        },
    ];

    const [columns, setColumns] = useState(() => {
        const savedColumns =
            localStorage.getItem("nexthire-custom-table-columns");

        return savedColumns
            ? JSON.parse(savedColumns)
            : defaultColumns;
    });

    const createDefaultRows = () =>
        Array.from({ length: 10 }, (_, index) => ({
            id: `row-${index + 1}`,
            cells: {
                name: "",
                email: "",
                role: "",
                status: "",
            },
        }));

    const [rows, setRows] = useState(() => {
        const savedRows =
            localStorage.getItem("nexthire-custom-table-rows");

        return savedRows
            ? JSON.parse(savedRows)
            : createDefaultRows();
    });

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const handleSave = () => {
        localStorage.setItem(
            "nexthire-custom-table-columns",
            JSON.stringify(columns)
        );

        localStorage.setItem(
            "nexthire-custom-table-rows",
            JSON.stringify(rows)
        );

        setHasUnsavedChanges(false);
    };

    const handleCellChange = (
        rowId,
        columnId,
        value
    ) => {
        setHasUnsavedChanges(true);
        setRows((prevRows) =>
            prevRows.map((row) =>
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
    };

    const handleColumnNameChange = (
        columnId,
        value
    ) => {
        setHasUnsavedChanges(true);
        setColumns((prevColumns) =>
            prevColumns.map((column) =>
                column.id === columnId
                    ? {
                        ...column,
                        name: value,
                    }
                    : column
            )
        );
    };

    const handleAddColumn = () => {
        setShowAddColumnMenu(true);
    };

    const handleCreateColumn = (type) => {
        const newColumn = {
            id: `column-${Date.now()}`,
            name:
                type === "text"
                    ? "New Text"
                    : type === "number"
                        ? "New Number"
                        : type === "date"
                            ? "New Date"
                            : "New Status",
            type,
        };

        setColumns((prevColumns) => [
            ...prevColumns,
            newColumn,
        ]);

        setRows((prevRows) =>
            prevRows.map((row) => ({
                ...row,
                cells: {
                    ...row.cells,
                    [newColumn.id]: "",
                },
            }))
        );

        setShowAddColumnMenu(false);
    };

    const handleDeleteColumn = (columnId) => {
        const column = columns.find(
            (item) => item.id === columnId
        );

        if (!column) {
            return;
        }

        setColumnToDelete(column);
        setOpenColumnMenu(null);
    };

    const confirmDeleteColumn = (columnId) => {
        setColumns((prevColumns) =>
            prevColumns.filter(
                (column) => column.id !== columnId
            )
        );

        setRows((prevRows) =>
            prevRows.map((row) => {
                const updatedCells = {
                    ...row.cells,
                };

                delete updatedCells[columnId];

                return {
                    ...row,
                    cells: updatedCells,
                };
            })
        );

        setColumnToDelete(null);
    };

    const handleAddRow = () => {
        const newRow = {
            id: `row-${Date.now()}`,
            cells: {},
        };

        columns.forEach((column) => {
            newRow.cells[column.id] = "";
        });

        setRows((prevRows) => [
            ...prevRows,
            newRow,
        ]);
    };

    return (
        <>

            {columnToDelete && (
                <Box
                    onClick={() => setColumnToDelete(null)}
                    sx={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 2000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                            "rgba(15, 23, 42, 0.25)",
                    }}
                >
                    <Box
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        sx={{
                            width: "300px",
                            maxWidth: "calc(100vw - 32px)",
                            p: 2.25,
                            borderRadius: "10px",
                            border: `1px solid ${borderColor}`,
                            backgroundColor: darkMode
                                ? "#1e293b"
                                : "#ffffff",
                            boxShadow:
                                "0 12px 30px rgba(15, 23, 42, 0.18)",
                        }}
                    >
                        <Typography
                            sx={{
                                mb: 0.75,
                                fontSize: "14px",
                                fontWeight: 600,
                                color: textColor,
                            }}
                        >
                            Delete Property?
                        </Typography>

                        <Typography
                            sx={{
                                mb: 2,
                                fontSize: "12px",
                                lineHeight: 1.5,
                                color: subText,
                            }}
                        >
                            Are you sure you want to delete{" "}
                            <strong>
                                "{columnToDelete.name}"
                            </strong>
                            ?
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 1,
                            }}
                        >
                            <Button
                                onClick={() =>
                                    setColumnToDelete(null)
                                }
                                sx={{
                                    minWidth: 68,
                                    height: 32,
                                    textTransform: "none",
                                    fontSize: "12px",
                                    color: subText,
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: "6px",
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={() =>
                                    confirmDeleteColumn(
                                        columnToDelete.id
                                    )}
                                sx={{
                                    minWidth: 68,
                                    height: 32,
                                    textTransform: "none",
                                    fontSize: "12px",
                                    color: "#ffffff",
                                    backgroundColor: "#ef4444",
                                    borderRadius: "6px",
                                    "&:hover": {
                                        backgroundColor:
                                            "#dc2626",
                                    },
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}

            <HRLayout>
                <Box
                    sx={{
                        minHeight: "100vh",
                        p: {
                            xs: 2,
                            sm: 2,
                            md: 1,
                        },
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
                            borderRadius: "12px",
                            background: glassBg,
                            overflow: "hidden",
                        }}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                px: {
                                    xs: 2,
                                    sm: 3,
                                },
                                py: 2,
                                borderBottom: `1px solid ${borderColor}`,
                                display: "flex",
                                alignItems: {
                                    xs: "flex-start",
                                    sm: "center",
                                },
                                justifyContent: "space-between",
                                gap: 2,
                                flexDirection: {
                                    xs: "column",
                                    sm: "row",
                                },
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "18px",
                                            sm: "20px",
                                        },
                                        fontWeight: 600,
                                        color: textColor,
                                    }}
                                >
                                    Custom Table
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 0.5,
                                        fontSize: "13px",
                                        color: subText,
                                    }}
                                >
                                    Manage your HR data
                                    with a customizable
                                    table.
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                    <Button
                                        variant="contained"
                                        onClick={handleSave}
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: "7px",
                                            backgroundColor: primary,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Save Changes
                                    </Button>   

                                <Button
                                    variant="contained"
                                    onClick={handleAddRow}
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "7px",
                                        backgroundColor: primary,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    + Add Row
                                </Button>
                            </Box>
                        </Box>

                        {/* Table */}
                        <TableContainer
                            sx={{
                                width: "100%",
                                overflowX: "auto",
                            }}
                        >
                            <Table
                                sx={{
                                    minWidth: 700,
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        {columns.map(
                                            (column) => (
                                                <TableCell
                                                    key={
                                                        column.id
                                                    }
                                                    sx={{
                                                        position: "relative",
                                                        minWidth: 160,
                                                        fontWeight: 600,
                                                        fontSize: "13px",
                                                        color: textColor,
                                                        backgroundColor:
                                                            darkMode
                                                                ? "#1e293b"
                                                                : "#f8fafc",
                                                        borderBottom: `1px solid ${borderColor}`,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            gap: 1,
                                                        }}
                                                    >

                                                        {openColumnMenu === column.id && (
                                                            <Box
                                                                onClick={(event) =>
                                                                    event.stopPropagation()
                                                                }
                                                                sx={{
                                                                    position: "absolute",
                                                                    top: "calc(100% + 4px)",
                                                                    right: 4,
                                                                    zIndex: 1000,
                                                                    width: 150,
                                                                    padding: "5px",
                                                                    border: `1px solid ${borderColor}`,
                                                                    borderRadius: "7px",
                                                                    backgroundColor: darkMode
                                                                        ? "#1e293b"
                                                                        : "#ffffff",
                                                                    boxShadow:
                                                                        "0 6px 18px rgba(15, 23, 42, 0.15)",
                                                                }}
                                                            >
                                                                <Button
                                                                    fullWidth
                                                                    onClick={() =>
                                                                        handleDeleteColumn(column.id)
                                                                    }
                                                                    startIcon={<Trash2 size={14} />}
                                                                    sx={{
                                                                        justifyContent: "flex-start",
                                                                        textTransform: "none",
                                                                        fontSize: "12px",
                                                                        color: "#ef4444",
                                                                        borderRadius: "5px",
                                                                        "&:hover": {
                                                                            backgroundColor: darkMode
                                                                                ? "rgba(239, 68, 68, 0.12)"
                                                                                : "#fee2e2",
                                                                        },
                                                                    }}
                                                                >
                                                                    Delete property
                                                                </Button>
                                                            </Box>
                                                        )}

                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            size="small"
                                                            value={column.name}
                                                            onChange={(event) =>
                                                                handleColumnNameChange(
                                                                    column.id,
                                                                    event.target.value
                                                                )
                                                            }
                                                            InputProps={{
                                                                disableUnderline: true,
                                                            }}
                                                            sx={{
                                                                "& .MuiInputBase-input": {
                                                                    fontSize: "13px",
                                                                    fontWeight: 600,
                                                                    color: textColor,
                                                                    padding: "4px 0",
                                                                },
                                                            }}
                                                        />

                                                        <Button
                                                            onClick={(event) => {
                                                                event.stopPropagation();

                                                                setOpenColumnMenu(
                                                                    openColumnMenu === column.id
                                                                        ? null
                                                                        : column.id
                                                                );
                                                            }}
                                                            sx={{
                                                                minWidth: 28,
                                                                width: 28,
                                                                height: 28,
                                                                padding: 0,
                                                                color: subText,
                                                                borderRadius: "5px",
                                                            }}
                                                        >
                                                            <MoreHorizontal size={16} />
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            )
                                        )}

                                        <TableCell
                                            sx={{
                                                position: "relative",
                                                width: 50,
                                                minWidth: 50,
                                                padding: 0,
                                                textAlign: "center",
                                                borderBottom: `1px solid ${borderColor}`,
                                                backgroundColor: darkMode
                                                    ? "#1e293b"
                                                    : "#f8fafc",
                                            }}
                                        >
                                            <Button
                                                onClick={handleAddColumn}
                                                sx={{
                                                    minWidth: 36,
                                                    width: 36,
                                                    height: 36,
                                                    padding: 0,
                                                    fontSize: "20px",
                                                    fontWeight: 400,
                                                    color: subText,
                                                    textTransform: "none",
                                                    borderRadius: "6px",
                                                }}
                                            >
                                                +
                                            </Button>

                                            {showAddColumnMenu && (
                                                <Box
                                                    onClick={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                    sx={{
                                                        position: "absolute",
                                                        top: "calc(100% + 6px)",
                                                        right: 0,
                                                        zIndex: 2000,
                                                        width: 220,
                                                        p: 1,
                                                        border: `1px solid ${borderColor}`,
                                                        borderRadius: "8px",
                                                        backgroundColor: darkMode
                                                            ? "#1e293b"
                                                            : "#ffffff",
                                                        boxShadow:
                                                            "0 8px 24px rgba(15, 23, 42, 0.16)",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            px: 1,
                                                            py: 0.75,
                                                            fontSize: "12px",
                                                            fontWeight: 600,
                                                            color: textColor,
                                                        }}
                                                    >
                                                        Add Property
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            px: 1,
                                                            pb: 0.75,
                                                            fontSize: "11px",
                                                            color: subText,
                                                        }}
                                                    >
                                                        Choose a property type.
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: 0.25,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={() =>
                                                                handleCreateColumn("text")
                                                            }
                                                            sx={{
                                                                justifyContent: "flex-start",
                                                                textTransform: "none",
                                                                fontSize: "12px",
                                                                color: textColor,
                                                                borderRadius: "6px",
                                                                px: 1,
                                                                py: 0.75,
                                                            }}
                                                        >
                                                            Text
                                                        </Button>

                                                        <Button
                                                            onClick={() =>
                                                                handleCreateColumn("number")
                                                            }
                                                            sx={{
                                                                justifyContent: "flex-start",
                                                                textTransform: "none",
                                                                fontSize: "12px",
                                                                color: textColor,
                                                                borderRadius: "6px",
                                                                px: 1,
                                                                py: 0.75,
                                                            }}
                                                        >
                                                            Number
                                                        </Button>

                                                        <Button
                                                            onClick={() =>
                                                                handleCreateColumn("date")
                                                            }
                                                            sx={{
                                                                justifyContent: "flex-start",
                                                                textTransform: "none",
                                                                fontSize: "12px",
                                                                color: textColor,
                                                                borderRadius: "6px",
                                                                px: 1,
                                                                py: 0.75,
                                                            }}
                                                        >
                                                            Date
                                                        </Button>

                                                        <Button
                                                            onClick={() =>
                                                                handleCreateColumn("status")
                                                            }
                                                            sx={{
                                                                justifyContent: "flex-start",
                                                                textTransform: "none",
                                                                fontSize: "12px",
                                                                color: textColor,
                                                                borderRadius: "6px",
                                                                px: 1,
                                                                py: 0.75,
                                                            }}
                                                        >
                                                            Status
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            )}
                                        </TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            hover
                                        >
                                            {columns.map(
                                                (column) => (
                                                    <TableCell
                                                        key={
                                                            column.id
                                                        }
                                                        sx={{
                                                            borderBottom: `1px solid ${borderColor}`,
                                                            p: 1,
                                                        }}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            value={
                                                                row
                                                                    .cells[
                                                                column
                                                                    .id
                                                                ] ??
                                                                ""
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                handleCellChange(
                                                                    row.id,
                                                                    column.id,
                                                                    event
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={
                                                                column.name
                                                            }
                                                            sx={{
                                                                "& .MuiOutlinedInput-root":
                                                                {
                                                                    fontSize:
                                                                        "13px",
                                                                    color: textColor,
                                                                    backgroundColor:
                                                                        darkMode
                                                                            ? "#0f172a"
                                                                            : "#ffffff",
                                                                    borderRadius:
                                                                        "6px",
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>
                                                )
                                            )}

                                            <TableCell
                                                sx={{
                                                    width: 50,
                                                    minWidth: 50,
                                                    padding: 0,
                                                    borderBottom: `1px solid ${borderColor}`,
                                                }}
                                            />

                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Empty bottom spacing */}
                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                                color: subText,
                                fontSize: "12px",
                            }}
                        >
                            {rows.length}{" "}
                            {rows.length === 1
                                ? "row"
                                : "rows"}
                        </Box>
                    </Paper>
                </Box>
            </HRLayout>
        </>
    );
};

export default CustomTable;