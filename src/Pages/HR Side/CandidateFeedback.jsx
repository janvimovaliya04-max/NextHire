import feedbackData from "../../data/feedback.json";
import { useState, useMemo } from "react";
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
import HRLayout from "../../Layouts/HRLayout";
import {
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Search } from "lucide-react";

export default function Candidatefeedback() {

  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const [activeFilter, setActiveFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const feedbackData_ = feedbackData;

  const filteredByRecommendation = useMemo(() =>
    feedbackData_.filter((f) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Hire") return f.recommendation === "Hire";
      if (activeFilter === "Hold") return f.recommendation === "Hold";
      return f.recommendation === "Reject";
    }),
    [feedbackData_, activeFilter]
  );

  const columns = useMemo(() => [
    {
      accessorKey: "candidateId",
      header: "Candidate Id",
      cell: ({ getValue }) => (
        <Typography sx={{ whiteSpace: "nowrap", color: textColor, fontWeight: 700, fontSize: { xs: ".8rem", md: ".95rem" } }}>
          {getValue()}
        </Typography>
      ),
    },
    {
      accessorKey: "technicalRating",
      header: "Technical",
      cell: ({ getValue }) => (
        <Typography sx={{ whiteSpace: "nowrap", color: subText }}>{getValue()}/5</Typography>
      ),
    },
    {
      accessorKey: "communicationRating",
      header: "Communication",
      cell: ({ getValue }) => (
        <Typography sx={{ whiteSpace: "nowrap", color: subText }}>{getValue()}/5</Typography>
      ),
    },
    {
      accessorKey: "problemSolvingRating",
      header: "Problem solving",
      cell: ({ getValue }) => (
        <Typography sx={{ whiteSpace: "nowrap", color: subText }}>{getValue()}/5</Typography>
      ),
    },
    {
      accessorKey: "overallRating",
      header: "Overall",
      cell: ({ getValue }) => (
        <Typography sx={{ whiteSpace: "nowrap", color: primary, fontWeight: 800 }}>{getValue()}/5</Typography>
      ),
    },
    {
      accessorKey: "recommendation",
      header: "Recommendation",
      cell: ({ getValue }) => (
        <Chip
          size="small"
          label={getValue()}
          sx={{
            fontWeight: 700,
            fontSize: { xs: ".7rem", md: ".8rem" },
            bgcolor:
              getValue() === "Select"
                ? "rgba(16,185,129,.12)"
                : getValue() === "Reject"
                  ? "rgba(239,68,68,.12)"
                  : "rgba(245,158,11,.12)",
            color:
              getValue() === "Select"
                ? "#10b981"
                : getValue() === "Reject"
                  ? "#ef4444"
                  : "#f59e0b",
          }}
        />
      ),
    },
    {
      accessorKey: "submittedDate",
      header: "Date",
      cell: ({ getValue }) => (
        <Typography sx={{ whiteSpace: "nowrap", color: subText }}>{getValue()}</Typography>
      ),
    },
  ], [primary, textColor, subText]);

  const table = useReactTable({
    data: filteredByRecommendation,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) =>
      row.original.candidateId.toLowerCase().includes(filterValue.toLowerCase()),
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
              fontWeight: 850,
              letterSpacing: "-0.03em",
              fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2.1rem" },
            }}
          >
            Candidate Feedback
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", md: 330 },
              bgcolor: colors.card,
              border: `1px solid ${borderStyle}`,
              borderRadius: "10px",
              px: 2,
            }}
          >
            <Search color={darkMode ? "#94a3b8" : "#64748b"} />

            <input
              type="text"
              placeholder="Search Candidate ID..."
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
        </Box>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            pb: 1,
            flexShrink: 0,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {["All", "Hire", "Hold", "Rejected"].map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant="outlined"
              size="small"
              sx={{
                flexShrink: 0,
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: 700,
                color: activeFilter === filter ? "#fff" : colors.subText,
                bgcolor: activeFilter === filter ? primary : "transparent",
                borderColor: activeFilter === filter ? primary : colors.border,
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* MAIN PAPER */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: { xs: "68vh", sm: "72vh", md: "75vh" },
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          p: { xs: 1, sm: 2.5, md: 4 },
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
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
            flex: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": { height: 8, width: 8 },
            "&::-webkit-scrollbar-thumb": { background: "#94a3b8", borderRadius: 10 },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  sx={{
                    bgcolor: darkMode ? "rgba(59,130,246,.08)" : "#F8FAFC",
                    borderBottom: `1px solid ${borderStyle}`,
                  }}
                >
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      align="center"
                      onClick={header.column.getToggleSortingHandler()}
                      sx={{
                        py: { xs: 1, md: 2 },
                        px: { xs: 1, md: 2 },
                        whiteSpace: "nowrap",
                        color: textColor,
                        fontWeight: 700,
                        fontSize: { xs: "0.82rem", md: "1rem" },
                        borderBottom: `1px solid ${borderStyle}`,
                        bgcolor: colors.background,
                        cursor: header.column.getCanSort() ? "pointer" : "default",
                        userSelect: "none",
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ borderBottom: `1px solid ${borderStyle}` }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 } }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 6, color: subText }}>
                    No feedback records found matching this filter or search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer info & Pagination */}
        <Box
          sx={{
            flexShrink: 0,
            p: { xs: 1, sm: 1.5, md: 2.5 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 1.5, md: 2 },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: "center",
            borderTop: `1px solid ${borderStyle}`,
            bgcolor: colors.background,
          }}
        >
          <Typography sx={{ color: subText, fontSize: { xs: "0.72rem", md: "0.82rem" } }}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1} • Total{" "}
            <strong>{table.getFilteredRowModel().rows.length}</strong> Feedback Records
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
        </Box>
      </Paper>
    </HRLayout>
  );
}