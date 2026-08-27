import interviewsData from "../../data/assignedInterviews.json";
import { TextField, InputAdornment } from "@mui/material";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Search } from "lucide-react";
import SEO from "../../components/common/SEO"; // SEO Component Import Added

const STATUS_FILTERS = ["All", "Scheduled", "Completed", "Cancelled", "Rescheduled"];

export default function AssignedInterviews() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const STATUS_COLORS = {
    Scheduled: { main: primary, bgLight: `${primary}0f`, bgDark: `${primary}1f` },
    Completed: { main: secondary || primary, bgLight: `${secondary || primary}0f`, bgDark: `${secondary || primary}1f` },
    Cancelled: { main: "#ef4444", bgLight: "rgba(239,68,68,.06)", bgDark: "rgba(239,68,68,.12)" },
    Rescheduled: { main: "#eab308", bgLight: "rgba(234,179,8,.08)", bgDark: "rgba(234,179,8,.15)" },
  };

  const getStatusColors = (status) =>
    STATUS_COLORS[status] || {
      main: subText,
      bgLight: "rgba(100,116,139,.06)",
      bgDark: "rgba(100,116,139,.12)",
    };

  const [activeFilter, setActiveFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const filteredByStatus = useMemo(() =>
    interviewsData.filter((row) => activeFilter === "All" || row.status === activeFilter),
    [activeFilter]
  );

  const columns = useMemo(() => [
    {
      accessorKey: "candidate",
      header: "Candidate",
      cell: ({ getValue }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              boxShadow: `0 6px 18px ${primary}4d`,
              color: "#ffffff",
              fontWeight: "bold",
              width: 36,
              height: 36,
              fontSize: ".9rem",
            }}
          >
            {getValue().charAt(0)}
          </Avatar>
          <Typography sx={{ color: textColor, fontWeight: 700, fontSize: "0.95rem" }}>
            {getValue()}
          </Typography>
        </Box>
      ),
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ getValue }) => (
        <Typography sx={{ color: textColor, fontWeight: 600, fontSize: "0.9rem" }}>
          {getValue()}
        </Typography>
      ),
    },
    {
      id: "dateTime",
      accessorFn: (row) => `${row.date} ${row.time}`,
      header: "Date & Time",
      cell: ({ row }) => (
        <Box>
          <Typography sx={{ color: textColor, fontWeight: 600, fontSize: "0.9rem" }}>
            {row.original.date}
          </Typography>
          <Typography variant="caption" sx={{ display: "block", mt: .25, color: subText }}>
            {row.original.time}
          </Typography>
        </Box>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const statusColors = getStatusColors(getValue());
        return (
          <Chip
            label={getValue()}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: darkMode ? statusColors.bgDark : statusColors.bgLight,
              color: statusColors.main,
              border: `1px solid ${statusColors.main}4D`,
            }}
          />
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      enableSorting: false,
      cell: ({ row }) => (
        <Button
          component={Link}
          to="/interviewer/join-interview"
          state={{ interview: row.original }}
          variant="contained"
          size="small"
          sx={{
            background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
            boxShadow: `0 4px 14px ${primary}4d`,
            "&:hover": {
              background: `linear-gradient(135deg, ${primary}, ${primary})`,
              boxShadow: `0 8px 20px ${primary}66`,
            },
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.8rem",
            px: 2.5,
            py: 0.95,
          }}
        >
          Join
        </Button>
      ),
    },
  ], [primary, secondary, textColor, subText, darkMode]);

  const table = useReactTable({
    data: filteredByStatus,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const v = filterValue.toLowerCase();
      const item = row.original;
      return (
        item.candidate.toLowerCase().includes(v) ||
        item.position.toLowerCase().includes(v) ||
        item.date.toLowerCase().includes(v) ||
        item.time.toLowerCase().includes(v) ||
        item.status.toLowerCase().includes(v)
      );
    },
  });

  const handleFilterChange = (status) => {
    setActiveFilter(status);
    table.setPageIndex(0);
  };

  return (
    <InterviewerLayout>
      {/* Dynamic SEO Tags Injection */}
      <SEO
        title="Assigned Interviews"
        description="Manage job postings, candidates, and interview schedules on NextHire HR Portal."
        canonicalUrl="/interviewer/assigned-interviews"
      />

      {/* Title & Banner Area */}
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
              fontWeight: 800,
              color: textColor,
              fontSize: { xs: "1.5rem", md: "2rem" }
            }}
          >
            Interviews
          </Typography>

          <TextField
            size="small"
            placeholder="Search candidate..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color={primary} />
                  </InputAdornment>
                ),
                "aria-label": "Search candidate",
              },
            }}
            sx={{
              width: { xs: "100%", sm: "320px", md: "360px" },
              mb: -1,
              "& .MuiOutlinedInput-root": {
                height: 46,
                borderRadius: "14px",
                color: textColor,
                bgcolor: colors.input || colors.card,
                "& fieldset": { borderColor: borderStyle },
                "&:hover fieldset": { borderColor: primary },
                "&.Mui-focused fieldset": { borderColor: primary },
              }
            }}
          />

        </Box>

        {/* Status Filter Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 1.2,
            overflowX: { xs: "auto", md: "visible" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            whiteSpace: "nowrap",
            width: "100%",
            pb: 1,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {STATUS_FILTERS.map((status) => (
            <Button
              key={status}
              variant="outlined"
              size="small"
              onClick={() => handleFilterChange(status)}
              sx={{
                flexShrink: 0,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: { xs: ".75rem", md: ".85rem" },
                px: { xs: 1.5, md: 2.2 },
                py: { xs: 0.5, md: 0.7 },
                color: activeFilter === status ? "#fff" : subText,
                borderColor: activeFilter === status ? primary : borderStyle,
                bgcolor: activeFilter === status ? primary : "transparent",
                boxShadow: activeFilter === status ? `0 12px 22px ${primary}40` : "none",
                "&:hover": {
                  borderColor: primary,
                  bgcolor: activeFilter === status ? primary : `${primary}0d`,
                },
              }}
            >
              {status}
            </Button>
          ))}
        </Box>

      </Paper>

      {/* MAIN PAPER  */}
      <Paper
        elevation={0}
        sx={{
          height: {
            xs: "calc(100vh - 265px)",
            md: "calc(100vh - 240px)",
            lg: "calc(100vh - 210px)",
          },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "22px",
          width: "100%",
          maxWidth: "100%",
          p: 0,
          bgcolor: colors.card,
          backdropFilter: "blur(16px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
          transition: ".3s",
        }}
      >
        <TableContainer
          sx={{
            flex: 1,
            overflow: "auto",
            px: 3,
            pt: 3,
            pb: 0,
            p: { xs: 2, md: 3 },
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: 8 }
          }}
        >
          <Table
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                py: 0.75,
                px: 1.5,
                fontSize: "0.78rem",
                lineHeight: 1.2,
              },
              minWidth: { xs: 780, md: 900 },
            }}
          >
            <TableHead sx={{
              "& .MuiTableCell-root": {
                fontSize: { xs: ".9rem", md: "0.88rem" },
                fontWeight: 700,
                bgcolor: colors.input || colors.card,
              },
            }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  sx={{ bgcolor: `${primary}08`, borderBottom: `1px solid ${borderStyle}` }}
                >
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      align={header.column.id === "actions" ? "center" : "left"}
                      onClick={header.column.getToggleSortingHandler()}
                      sx={{
                        color: textColor,
                        fontWeight: 700,
                        fontSize: "1rem",
                        borderBottom: `1px solid ${borderStyle}`,
                        cursor: header.column.getCanSort() ? "pointer" : "default",
                        userSelect: "none",
                        pr: header.column.id === "actions" ? 4 : 1.5,
                      }}
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
                    sx={{
                      borderBottom: `1px solid ${borderStyle}`,
                      transition: "all 0.2s ease",
                      "&:hover": { bgcolor: `${primary}0d`, cursor: "pointer" },
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        align={cell.column.id === "actions" ? "right" : "left"}
                        sx={{ borderBottom: `1px solid ${borderStyle}`, pr: cell.column.id === "actions" ? 4 : 1.5 }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 6, color: subText }}>
                    No interviews found matching the selected status filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer info, Rows Per Page & Pagination */}
        <Box
          sx={{
            p: { xs: 1.5, md: 2.5 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 1.5, md: 2 },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            borderTop: `1px solid ${borderStyle}`,
            bgcolor: `${primary}05`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 1, sm: 2.5 },
            }}
          >
            <Typography sx={{ mb: -1, color: subText, fontSize: "0.82rem" }}>
              Total <strong>{table.getFilteredRowModel().rows.length}</strong> interviews
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Tooltip title="First page">
              <span>
                <IconButton
                  size="small"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="First page"
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
                  aria-label="Previous page"
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
                    aria-label={`Go to page ${item + 1}`}
                    aria-current={table.getState().pagination.pageIndex === item ? "page" : undefined}
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
                  aria-label="Next page"
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
                  aria-label="Last page"
                  sx={{ color: textColor, "&:disabled": { opacity: 0.3 } }}
                >
                  <LastPageIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography id="rows-per-page-label" sx={{ fontSize: ".82rem", color: subText }}>
              Rows per page:
            </Typography>
            <select
              value={pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              aria-label="Rows per page"
              aria-labelledby="rows-per-page-label"
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
    </InterviewerLayout>
  );
}