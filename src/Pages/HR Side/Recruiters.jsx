import { useState, useMemo, useEffect } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
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
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
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
    Trash2,
    Edit,
    ToggleLeft,
    ToggleRight,
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
import SEO from "../../components/common/SEO";

// Sortable wrapper for a single recruiter card
function SortableRecruiterCard({
    r,
    primary,
    subText,
    textColor,
    borderStyle,
    darkMode,
    onDelete,
    onStatusToggle,
    onEdit,
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: r.recruiterId || r._id || r.id });

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
                    justify: "space-between",
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
                    <Avatar sx={{ bgcolor: primary }}>
                        {r.fullName ? r.fullName[0].toUpperCase() : "R"}
                    </Avatar>
                    <Box sx={{ width: "100%" }}>
                        <Typography
                            sx={{
                                fontSize: { xs: ".88rem", sm: ".98rem" },
                                fontWeight: 800,
                                color: textColor,
                                mb: 0.3,
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
                                mb: { xs: 0.25, md: 0.35 },
                            }}
                        >
                            Assigned Jobs: {Array.isArray(r.assignedJobs) ? r.assignedJobs.length : r.assignedJobs || 0}
                        </Typography>
                    </Box>
                </Box>

                {/* Status & Action Buttons */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, minWidth: 100 }}>
                    <Chip
                        label={r.status}
                        sx={{
                            alignSelf: { xs: "flex-start", sm: "flex-end" },
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

                    {/* Action Controls */}
                    <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
                        {/* PATCH Status Toggle */}
                        <Tooltip title={`Mark as ${r.status === "Active" ? "On Leave" : "Active"}`}>
                            <IconButton size="small" onClick={() => onStatusToggle(r)} sx={{ color: primary }}>
                                {r.status === "Active" ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                            </IconButton>
                        </Tooltip>

                        {/* PUT Edit */}
                        <Tooltip title="Edit Recruiter">
                            <IconButton size="small" onClick={() => onEdit(r)} sx={{ color: primary }}>
                                <Edit size={16} />
                            </IconButton>
                        </Tooltip>

                        {/* DELETE Action */}
                        <Tooltip title="Delete Recruiter">
                            <IconButton size="small" onClick={() => onDelete(r)} sx={{ color: "#ef4444" }}>
                                <Trash2 size={16} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}

export default function Recruiters() {
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const colors = useThemeColors();
    const [activeFilter, setActiveFilter] = useState("All");
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 });

    // API & State Integration
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(false);

    // Delete Modal Confirmation State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);

    // GET: Fetch All Recruiters
    const fetchRecruiters = async () => {
        setLoading(true);
        try {
            const response = await api.get("/recruiters");
            setRecruiters(response.data);
        } catch (error) {
            console.error("Error fetching recruiters:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecruiters();
    }, []);

    // GET with Query Params (Live Search & Filter)
    useEffect(() => {
        const searchRecruiters = async () => {
            try {
                const params = {};
                if (globalFilter.trim()) params.fullName = globalFilter;
                if (activeFilter !== "All") params.status = activeFilter;

                const response = await api.get("/recruiters", { params });
                setRecruiters(response.data);
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            } catch (error) {
                console.error("Error filtering recruiters:", error);
            }
        };

        const timeoutId = setTimeout(() => {
            searchRecruiters();
        }, 300); // 300ms Debounce

        return () => clearTimeout(timeoutId);
    }, [globalFilter, activeFilter]);

    // PATCH: Toggle Status Quick Action
    const handleStatusToggle = async (recruiter) => {
        const recruiterId = recruiter.recruiterId || recruiter._id || recruiter.id;
        const updatedStatus = recruiter.status === "Active" ? "On Leave" : "Active";

        try {
            const response = await api.patch(`/recruiters/${recruiterId}`, {
                status: updatedStatus,
            });

            setRecruiters((prev) =>
                prev.map((r) =>
                    (r.recruiterId || r._id || r.id) === recruiterId
                        ? { ...r, status: response.data.status || updatedStatus }
                        : r
                )
            );
        } catch (error) {
            console.error("Error updating recruiter status:", error);
        }
    };

    // DELETE: Recruiter Action
    const handleDeleteClick = (recruiter) => {
        setSelectedRecruiter(recruiter);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedRecruiter) return;
        const id = selectedRecruiter.recruiterId || selectedRecruiter._id || selectedRecruiter.id;

        try {
            await api.delete(`/recruiters/${id}`);
            setRecruiters((prev) => prev.filter((r) => (r.recruiterId || r._id || r.id) !== id));
            setDeleteModalOpen(false);
            setSelectedRecruiter(null);
        } catch (error) {
            console.error("Error deleting recruiter:", error);
        }
    };

    // PUT: Navigate to Edit Page with recruiter data
    const handleEditClick = (recruiter) => {
        navigate("/hr/add-recruiter", { state: { recruiter, isEdit: true } });
    };

    const primary = colors.primary;
    const secondary = colors.secondary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;

    const filteredByStatus = useMemo(
        () =>
            recruiters.filter(
                (r) => activeFilter === "All" || r.status === activeFilter
            ),
        [recruiters, activeFilter]
    );

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
    });

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        table.setPageIndex(0);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setRecruiters((prev) => {
            const oldIndex = prev.findIndex((r) => (r.recruiterId || r._id || r.id) === active.id);
            const newIndex = prev.findIndex((r) => (r.recruiterId || r._id || r.id) === over.id);

            if (oldIndex === -1 || newIndex === -1) return prev;

            const updated = arrayMove(prev, oldIndex, newIndex);
            localStorage.setItem("recruiters_order", JSON.stringify(updated));
            return updated;
        });
    };

    const currentRecruiters = table.getRowModel().rows.map((row) => row.original);

    return (
        <HRLayout>
            <SEO
                title="Recruiters"
                description="Manage job postings, candidates, and interview schedules on NextHire HR Portal."
                canonicalUrl="/hr-portal/dashboard"
            />

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
                        {["All", "Active", "On Leave"].map(f => (
                            <Button
                                key={f}
                                variant="outlined"
                                size="small"
                                onClick={() => handleFilterChange(f)}
                                sx={{
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: { xs: ".74rem", md: ".82rem" },
                                    px: { xs: 1.5, md: 2.2 },
                                    py: { xs: 0.55, md: 0.7 },
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
                        ))}
                    </Box>
                </Box>
            </Paper>

            {/* Content Display */}
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
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        pr: 1,
                        scrollbarWidth: "thin",
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <CircularProgress sx={{ color: primary }} />
                        </Box>
                    ) : currentRecruiters.length > 0 ? (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={currentRecruiters.map((r) => r.recruiterId || r._id || r.id)}
                                strategy={rectSortingStrategy}
                            >
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                        gap: { xs: 2, md: 3 },
                                    }}
                                >
                                    {currentRecruiters.map((r) => (
                                        <SortableRecruiterCard
                                            key={r.recruiterId || r._id || r.id}
                                            r={r}
                                            primary={primary}
                                            subText={subText}
                                            textColor={textColor}
                                            borderStyle={borderStyle}
                                            darkMode={darkMode}
                                            onDelete={handleDeleteClick}
                                            onStatusToggle={handleStatusToggle}
                                            onEdit={handleEditClick}
                                        />
                                    ))}
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

                {/* TanStack Pagination Controls */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justify: "space-between",
                        flexWrap: "wrap",
                        gap: 1,
                        pt: 2,
                        borderTop: `1px solid ${borderStyle}`,
                    }}
                >
                    <Typography sx={{ fontSize: ".82rem", color: subText }}>
                        Total: {table.getFilteredRowModel().rows.length} Recruiters
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <IconButton
                            size="small"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <FirstPageIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeftIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRightIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <LastPageIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>

            {/* Confirm Delete Dialog */}
            <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete recruiter "{selectedRecruiter?.fullName}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </HRLayout>
    );
}