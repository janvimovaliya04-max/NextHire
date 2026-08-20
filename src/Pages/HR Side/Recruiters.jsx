import recruitersData from "../../data/recruiters.json";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import HRLayout from "../../Layouts/HRLayout";
import {
    Box,
    Paper,
    Typography,
    Button,
    Avatar,
    Chip,
    TextField,
    IconButton,
    Checkbox,
    Tooltip,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
    Plus,
    UserRound,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Building2,
    GripVertical,
} from "lucide-react";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable wrapper for a single recruiter card
function SortableRecruiterCard({ r, primary, subText, textColor, borderStyle, darkMode }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: r.recruiterId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 10 : "auto",
    };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            elevation={0}
            sx={{
                position: "relative",
                cursor: "pointer",
                p: { xs: 1.5, sm: 2.5, md: 3 },
                borderRadius: { xs: 3, md: 5 },
                bgcolor: "background.paper",
                backdropFilter: "blur(12px)",
                border: `1px solid ${borderStyle}`,
                boxShadow: darkMode
                    ? `0 10px 20px rgba(0,0,0,0.30), 0 4px 8px rgba(0,0,0,0.20)`
                    : `0 12px 24px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.05)`,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: isDragging ? undefined : "translateY(-3px)",
                    borderColor: primary,
                    boxShadow: darkMode
                        ? "0 18px 38px rgba(0,0,0,.45)"
                        : `0 18px 40px ${primary}1f`,
                },
            }}
        >
            {/* Drag handle */}
            <Box
                {...attributes}
                {...listeners}
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "grab",
                    color: subText,
                    display: "flex",
                    alignItems: "center",
                    touchAction: "none",
                    "&:active": { cursor: "grabbing" },
                }}
            >
                <GripVertical size={16} />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 1.5, sm: 2 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 1.5, sm: 2 },
                        width: "100%",
                    }}
                >
                    <Avatar
                        src={r.profileImage}
                        sx={{
                            width: { xs: 38, sm: 44 },
                            height: { xs: 38, sm: 44 },
                            bgcolor: primary,
                            fontSize: { xs: ".95rem", sm: "1.1rem" },
                            fontWeight: 700,
                        }}
                    >
                        {r.fullName.split(" ").map(x => x[0]).join("")}
                    </Avatar>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: ".88rem", sm: ".98rem" },
                                fontWeight: 800,
                                color: textColor,
                                mb: .3,
                            }}
                        >
                            {r.fullName}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.7 }}>
                            <UserRound size={13} color={primary} />
                            <Typography
                                sx={{
                                    color: primary,
                                    fontWeight: 700,
                                    fontSize: { xs: ".8rem", sm: ".88rem" },
                                }}
                            >
                                {r.designation}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <Building2 size={12} color={subText} />
                            <Typography sx={{ color: subText, fontSize: { xs: ".78rem", sm: ".84rem" } }}>
                                {r.department}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <Mail size={12} color={subText} />
                            <Typography
                                sx={{
                                    color: subText,
                                    fontSize: { xs: ".78rem", sm: ".84rem" },
                                    wordBreak: "break-word",
                                }}
                            >
                                {r.email}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 0.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Phone size={11} color={subText} />
                                <Typography sx={{ color: subText, fontSize: { xs: ".78rem", sm: ".84rem" } }}>
                                    {r.phone}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <MapPin size={11} color={subText} />
                                <Typography sx={{ color: subText, fontSize: { xs: ".78rem", sm: ".84rem" } }}>
                                    {r.city}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <Briefcase size={12} color={subText} />
                            <Typography sx={{ color: subText, fontSize: { xs: ".78rem", sm: ".84rem" } }}>
                                {r.experience}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                color: subText,
                                fontSize: { xs: ".78rem", sm: ".84rem" },
                                mb: { xs: .25, md: .35 },
                            }}
                        >
                            Assigned Jobs: {r.assignedJobs.length}
                        </Typography>
                    </Box>
                </Box>
                <Chip
                    label={r.status}
                    sx={{
                        alignSelf: { xs: "flex-start", sm: "center" },
                        bgcolor: r.status === "Active" ? "rgba(34,197,94,.15)" : "rgba(234,179,8,.15)",
                        color: r.status === "Active" ? "#22c55e" : "#f59e0b",
                        fontWeight: 700,
                        fontSize: { xs: ".68rem", md: ".78rem" },
                        height: { xs: 22, md: 28 },
                        border: r.status === "Active"
                            ? "1px solid rgba(34,197,94,.3)"
                            : "1px solid rgba(245,158,11,.3)",
                    }}
                />
            </Box>
        </Paper>
    );
}

export default function Recruiters() {
    const { darkMode } = useTheme();
    const colors = useThemeColors(); const [recruiters, setRecruiters] = useState(() => {
        const saved = localStorage.getItem("recruiters_order");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error loading saved order", e);
            }
        }
        return recruitersData;
    });

    const primary = colors.primary;
    const secondary = colors.secondary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;

    const [activeFilter, setActiveFilter] = useState("All");
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 });

    const filteredByStatus = useMemo(() =>
        recruiters.filter((r) => activeFilter === "All" || r.status === activeFilter),
        [recruiters, activeFilter]
    );

    // Headless columns — no visual cells needed since we render cards, not a <table>
    const columns = useMemo(() => [
        { accessorKey: "fullName" },
        { accessorKey: "email" },
        { accessorKey: "status" },
    ], []);

    const table = useReactTable({
        data: filteredByStatus,
        columns,
        state: { globalFilter, pagination, rowSelection },
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableRowSelection: true,
        globalFilterFn: (row, columnId, filterValue) => {
            const v = filterValue.toLowerCase();
            return (
                row.original.fullName.toLowerCase().includes(v) ||
                row.original.email.toLowerCase().includes(v)
            );
        },
    });

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        table.setPageIndex(0);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // NEW: drag end handler — updates immediately, no refresh needed
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setRecruiters((prev) => {
            const oldIndex = prev.findIndex((r) => r.recruiterId === active.id);
            const newIndex = prev.findIndex((r) => r.recruiterId === over.id);

            if (oldIndex === -1 || newIndex === -1) return prev;

            const updated = arrayMove(prev, oldIndex, newIndex);
            // LocalStorage update to persist order across sessions
            localStorage.setItem("recruiters_order", JSON.stringify(updated));
            return updated;
        });
    };

    const currentRecruiters = table.getRowModel().rows.map((row) => row.original);

    return (
        <HRLayout>
            {/* Title & Banner Header */}
            <Paper
                elevation={0}
                sx={{
                    position: "relative",
                    top: 0,
                    zIndex: 20,
                    p: { xs: 2, md: 3 },
                    mb: 1,
                    borderRadius: "20px",
                    bgcolor: colors.card,
                    border: `1px solid ${borderStyle}`,
                    boxShadow: colors.shadow,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: { xs: 1.5, md: 2 },
                        mb: { xs: 3, md: 4 }
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
                            mb: { xs: 0, md: -4 },
                            fontWeight: 850,
                            letterSpacing: "-0.03em",
                            color: textColor,
                        }}
                    >
                        Recruiter Management
                    </Typography>
                    <Button
                        component={Link}
                        to="/hr/add-recruiter"
                        variant="contained"
                        startIcon={<Plus size={11} />}
                        sx={{
                            width: { xs: "100%", sm: "auto" },
                            py: { xs: 1, md: 1 },
                            px: { xs: 2, md: 2 },
                            fontSize: { xs: ".78rem", md: ".9rem" },
                            fontWeight: 700,
                            textTransform: "none",
                            borderRadius: "10px",
                            background: `linear-gradient(135deg,${primary},${secondary || primary})`,
                            boxShadow: `0 4px 12px ${primary}33`,
                            transition: "all .2s",
                            "&:hover": {
                                background: `linear-gradient(135deg,${primary},${primary})`,
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        Add Recruiter
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search recruiter..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    sx={{
                        mb: { xs: 2, md: 2 },
                        "& .MuiOutlinedInput-root": {
                            fontSize: { xs: ".85rem", md: ".95rem" },
                            "& input": { py: { xs: 1.3, md: 1.7 } },
                            borderRadius: "14px",
                            bgcolor: colors.input,
                            color: textColor,
                            "& fieldset": { borderColor: borderStyle },
                            "&:hover fieldset": { borderColor: primary },
                            "&.Mui-focused fieldset": { borderColor: primary },
                        },
                        "& input::placeholder": { color: subText, opacity: 1 },
                    }}
                />

                {/* Filter panel options */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: { xs: 1.5, md: 2 },
                        mb: { xs: 1, md: 2 }
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>
                        {["All", "Active", "On Leave"].map(f =>
                            <Button
                                key={f}
                                variant="outlined"
                                size="small"
                                onClick={() => handleFilterChange(f)}
                                sx={{
                                    mb: -2,
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: { xs: ".74rem", md: ".82rem" },
                                    px: { xs: 1.5, md: 2.2 },
                                    py: { xs: .55, md: .7 },
                                    minWidth: { xs: 80, md: 95 },
                                    color: activeFilter === f ? "#fff" : subText,
                                    borderColor: activeFilter === f ? primary : borderStyle,
                                    bgcolor: activeFilter === f ? primary : "transparent",
                                    boxShadow: activeFilter === f ? `0 4px 10px ${primary}33` : "none",
                                    "&:hover": {
                                        borderColor: primary,
                                        bgcolor: activeFilter === f ? primary : `${primary}08`,
                                    }
                                }}
                            >
                                {f}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>

            {/* Cards Panel */}
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: { xs: "calc(100vh - 170px)", md: "75vh" },
                    overflow: "hidden",
                    p: { xs: 2.5, md: 4 },
                    borderRadius: "22px",
                    bgcolor: colors.card,
                    backdropFilter: "blur(16px)",
                    border: `1px solid ${borderStyle}`,
                    boxShadow: colors.shadow,
                    transition: ".3s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: darkMode
                            ? `0 24px 55px rgba(0,0,0,.42)`
                            : `0 26px 55px rgba(15,23,42,.12)`,
                    },
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        overflowX: "auto",
                        pr: 1,
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": { height: 8, width: 8 },
                        "&::-webkit-scrollbar-thumb": { background: "#94a3b8", borderRadius: 10 },
                    }}
                >
                    {currentRecruiters.length > 0 ? (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={currentRecruiters.map((r) => r.recruiterId)}
                                strategy={rectSortingStrategy}
                            >
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                        gap: { xs: 2, md: 3 },
                                    }}
                                >
                                    {currentRecruiters.map(r =>
                                        <SortableRecruiterCard
                                            key={r.recruiterId}
                                            r={r}
                                            primary={primary}
                                            subText={subText}
                                            textColor={textColor}
                                            borderStyle={borderStyle}
                                            darkMode={darkMode}
                                        />
                                    )}
                                </Box>
                            </SortableContext>
                        </DndContext>
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                            <Typography sx={{ color: subText }}>
                                No recruiters found matching this filter or search.
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* TanStack Pagination */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1,
                        pt: 2,
                        borderTop: `1px solid ${borderStyle}`,
                    }}
                >
                    {/* Row selection info */}
                    <Typography sx={{ fontSize: ".82rem", color: subText }}>
                        {Object.keys(rowSelection).length > 0
                            ? `${Object.keys(rowSelection).length} of ${table.getFilteredRowModel().rows.length} row(s) selected`
                            : `Total: ${table.getFilteredRowModel().rows.length} Recruiters`}
                    </Typography>

                    {/* Pagination controls */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Tooltip title="First page">
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                    sx={{ color: textColor, "&:disabled": { opacity: 0.3 } }}
                                >
                                    <FirstPageIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title="Previous page">
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    sx={{ color: textColor, "&:disabled": { opacity: 0.3 } }}
                                >
                                    <ChevronLeftIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </Tooltip>

                        {/* Page number buttons */}
                        {Array.from({ length: table.getPageCount() }, (_, i) => i)
                            .filter((i) =>
                                i === 0 ||
                                i === table.getPageCount() - 1 ||
                                Math.abs(i - table.getState().pagination.pageIndex) <= 1
                            )
                            .reduce((acc, i, idx, arr) => {
                                if (idx > 0 && i - arr[idx - 1] > 1) {
                                    acc.push("...");
                                }
                                acc.push(i);
                                return acc;
                            }, [])
                            .map((item, idx) =>
                                item === "..." ? (
                                    <Typography key={`dots-${idx}`} sx={{ px: 1, color: subText }}>...</Typography>
                                ) : (
                                    <IconButton
                                        key={item}
                                        size="small"
                                        onClick={() => table.setPageIndex(item)}
                                        sx={{
                                            minWidth: 32,
                                            height: 32,
                                            borderRadius: 1.5,
                                            fontSize: ".82rem",
                                            fontWeight: 700,
                                            bgcolor: table.getState().pagination.pageIndex === item ? primary : "transparent",
                                            color: table.getState().pagination.pageIndex === item ? "#fff" : textColor,
                                            border: `1px solid ${table.getState().pagination.pageIndex === item ? primary : borderStyle}`,
                                            "&:hover": {
                                                bgcolor: table.getState().pagination.pageIndex === item ? `${primary}dd` : `${primary}15`,
                                            },
                                        }}
                                    >
                                        {item + 1}
                                    </IconButton>
                                )
                            )}

                        <Tooltip title="Next page">
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    sx={{ color: textColor, "&:disabled": { opacity: 0.3 } }}
                                >
                                    <ChevronRightIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title="Last page">
                            <span>
                                <IconButton
                                    size="small"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                    sx={{ color: textColor, "&:disabled": { opacity: 0.3 } }}
                                >
                                    <LastPageIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </HRLayout>
    );
}