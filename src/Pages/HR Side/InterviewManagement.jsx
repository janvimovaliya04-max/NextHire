import { useState, useMemo } from "react";
import interviewsData from "../../data/interviews.json";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Link } from "react-router-dom";
import HRLayout from "../../Layouts/HRLayout";
import {
  Paper,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  Box,
  IconButton,
  Checkbox,
  Tooltip,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Plus, User, Search } from "lucide-react";

export default function InterviewManagement() {

  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const interviews = interviewsData;

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const [activeFilter, setActiveFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

  const filteredByStatus = useMemo(() =>
    interviews.filter((item) => activeFilter === "All" || item.status === activeFilter),
    [interviews, activeFilter]
  );

  const getStatusChip = (status) => {
    const styles = {
      Scheduled: { bg: `${primary}12`, color: primary },
      Rescheduled: { bg: "rgba(245,158,11,.12)", color: "#f59e0b" },
      Completed: { bg: "rgba(16,185,129,.12)", color: "#10b981" },
      Cancelled: { bg: "rgba(239,68,68,.12)", color: "#ef4444" },
    };
    const current = styles[status] || styles.Scheduled;
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          fontWeight: 800,
          fontSize: { xs: ".65rem", md: ".73rem" },
          height: { xs: 24, md: 28 },
          bgcolor: current.bg,
          color: current.color,
          border: `1px solid ${current.color}33`,
        }}
      />
    );
  };

  const columns = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          size="small"
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          sx={{ color: subText, "&.Mui-checked": { color: primary } }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          size="small"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          sx={{ color: subText, "&.Mui-checked": { color: primary } }}
        />
      ),
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: "candidateId",
      header: "Candidate Id",
      cell: ({ getValue }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2 } }}>
          <Avatar
            sx={{
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 },
              background: `linear-gradient(135deg,${primary},${secondary || primary})`,
              fontWeight: 700,
              boxShadow: `0 6px 14px ${primary}40`,
            }}
          >
            <User size={16} />
          </Avatar>
          <Typography sx={{ fontSize: { xs: ".82rem", md: ".95rem" }, color: textColor }}>
            {getValue()}
          </Typography>
        </Box>
      ),
    },
    {
      accessorKey: "round",
      header: "Round",
      cell: ({ getValue }) => (
        <Typography sx={{ color: textColor }}>{getValue()}</Typography>
      ),
    },
    {
      id: "schedule",
      accessorFn: (row) => `${row.date} • ${row.time}`,
      header: "Schedule",
      cell: ({ getValue }) => (
        <Typography sx={{ fontSize: { xs: ".8rem", md: ".92rem" }, color: textColor }}>
          {getValue()}
        </Typography>
      ),
    },
    {
      accessorKey: "interviewer",
      header: "Interviewer",
      cell: ({ row }) => (
        <Box>
          <Typography sx={{ fontWeight: 600, color: textColor }}>
            {row.original.interviewer}
          </Typography>
          <Typography variant="caption" sx={{ color: subText }}>
            {row.original.mode}
          </Typography>
        </Box>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => getStatusChip(getValue()),
    },
  ], [primary, secondary, textColor, subText]);

  const table = useReactTable({
    data: filteredByStatus,
    columns,
    state: { sorting, globalFilter, rowSelection, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    globalFilterFn: (row, columnId, filterValue) => {
      const v = filterValue.toLowerCase();
      return (
        row.original.candidateId.toLowerCase().includes(v) ||
        row.original.interviewer.toLowerCase().includes(v)
      );
    },
  });

  return (
    <HRLayout>

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
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 3
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
              mb: { xs: 0, md: 0.5 },
              fontWeight: 850,
              letterSpacing: "-0.03em",
            }}
          >
            Interview Management
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: { xs: "wrap", md: "nowrap" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: { xs: "100%", md: 300 },
                bgcolor: colors.input,
                border: `1px solid ${borderStyle}`,
                borderRadius: "10px",
                px: 2,
                transition: ".2s",
                "&:hover": { borderColor: primary },
                "&:focus-within": { borderColor: primary },
              }}
            >
              <Search color={subText} />

              <input
                type="text"
                placeholder="Search candidate or interviewer..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: textColor,
                  fontSize: ".9rem",
                }}
              />
            </Box>

            <Button
              component={Link}
              to="/hr/interview-schedule"
              variant="contained"
              startIcon={<Plus size={11} />}
              sx={{
                px: { xs: 2, md: 3.2 },
                py: { xs: 1, md: 1.3 },
                fontSize: { xs: ".82rem", md: ".9rem" },
                width: { xs: "100%", sm: "auto" },
                flexShrink: 0,
                whiteSpace: "nowrap",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                background: `linear-gradient(135deg,${primary},${secondary || primary})`,
                boxShadow: `0 8px 18px ${primary}48`,
                transition: ".25s",
                "&:hover": {
                  background: `linear-gradient(135deg,${primary},${primary})`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 24px ${primary}59`,
                },
              }}
            >
              New Interview
            </Button>
          </Box>
        </Box>

        {/* Filter Pills */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            pb: 1,
            flexShrink: 0,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {["All", "Scheduled", "Completed", "Cancelled", "Rescheduled"].map((filter) => (
            <Button
              key={filter}
              size="small"
              variant="outlined"
              onClick={() => setActiveFilter(filter)}
              sx={{
                flexShrink: 0,
                borderRadius: "30px",
                px: { xs: 1.6, sm: 2.2, md: 2.4 },
                py: { xs: .6, md: .8 },
                fontSize: { xs: ".67rem", sm: ".8rem", md: ".82rem" },
                textTransform: "none",
                fontWeight: 700,
                borderColor: activeFilter === filter ? primary : borderStyle,
                color: activeFilter === filter ? "#fff" : subText,
                bgcolor: activeFilter === filter ? primary : "transparent",
                boxShadow: activeFilter === filter ? `0 6px 14px ${primary}38` : "none",
                "&:hover": {
                  borderColor: primary,
                  bgcolor: activeFilter === filter ? primary : `${primary}08`,
                },
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Premium Card */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "75vh",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          p: { xs: 1.5, sm: 2.5, md: 4 },
          borderRadius: { xs: 3, md: "22px" },
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
        <TableContainer
          sx={{
            width: "100%",
            flex: 1,
            overflowX: "auto",
            overflowY: "auto",
            "&::-webkit-scrollbar": { height: 8, width: 8 },
            "&::-webkit-scrollbar-thumb": { background: "#94a3b8", borderRadius: 10 },
          }}
        >
          <Table
            stickyHeader
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                py: 0.75,
                px: 1.5,
                fontSize: "0.78rem",
                lineHeight: 1.2,
              },
              minWidth: { xs: 850, md: 1000 },
            }}
          >
            <TableHead sx={{
              "& .MuiTableCell-root": {
                fontSize: { xs: ".9rem", md: "0.88rem" },
                fontWeight: 700,
                bgcolor: colors.background,
              },
            }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  sx={{ bgcolor: colors.background, borderBottom: `1px solid ${borderStyle}` }}
                >
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      align="center"
                      sx={{
                        color: textColor,
                        fontWeight: 700,
                        fontSize: { xs: ".82rem", md: "1rem" },
                        borderBottom: `1px solid ${borderStyle}`,
                        cursor: header.column.getCanSort() ? "pointer" : "default",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  fontSize: { xs: "0.74rem", md: "0.82rem" },
                  py: 1,
                },
              }}
            >
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    selected={row.getIsSelected()}
                    sx={{
                      borderBottom: `1px solid ${borderStyle}`,
                      bgcolor: row.getIsSelected() ? `${primary}10` : "transparent",
                      "&:hover": { bgcolor: `${primary}08` },
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} align="center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 6, color: subText }}>
                    No interviews found matching this filter or search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

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
          <Typography sx={{ fontSize: ".82rem", color: subText }}>
            {Object.keys(rowSelection).length > 0
              ? `${Object.keys(rowSelection).length} of ${table.getFilteredRowModel().rows.length} row(s) selected`
              : `Total: ${table.getFilteredRowModel().rows.length} interviews`}
          </Typography>

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

            {Array.from({ length: table.getPageCount() }, (_, i) => i)
              .filter((i) =>
                i === 0 ||
                i === table.getPageCount() - 1 ||
                Math.abs(i - table.getState().pagination.pageIndex) <= 1
              )
              .reduce((acc, i, idx, arr) => {
                if (idx > 0 && i - arr[idx - 1] > 1) acc.push("...");
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: ".82rem", color: subText }}>Rows per page:</Typography>
            <select
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              style={{
                background: colors.input,
                color: textColor,
                border: `1px solid ${borderStyle}`,
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: ".82rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </Box>
        </Box>
      </Paper>
    </HRLayout>
  );
}