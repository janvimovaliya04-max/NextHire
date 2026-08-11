import candidatesData from "../../data/candidates.json";
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
import { Link } from "react-router-dom";
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
  Avatar,
  Box,
  IconButton,
  Checkbox,
  Tooltip,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Candidates() {

  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Filtering Logic
  const [activeFilter, setActiveFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const candidates = candidatesData;

  const filteredByStatus = useMemo(() =>
    candidates.filter((c) => activeFilter === "All" || c.status === activeFilter),
    [candidates, activeFilter]
  );

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
      accessorKey: "fullName",
      header: "Candidate",
      cell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          <Avatar sx={{ bgcolor: row.original.avatarBg, color: "#fff", fontWeight: 700, fontSize: "0.9rem", width: 40, height: 40, boxShadow: `0 10px 22px ${row.original.avatarBg}40` }}>
            {row.original.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </Avatar>
          <Box>
            <Typography sx={{ color: textColor, fontWeight: 700, fontSize: "0.95rem" }}>
              {row.original.fullName}
            </Typography>
            <Typography sx={{ color: subText, fontSize: "0.8rem" }}>
              {row.original.candidateId} • {row.original.experience} Years
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      accessorKey: "email",
      header: "Email Address",
      cell: ({ getValue }) => (
        <Typography sx={{ fontSize: "0.88rem", color: textColor }}>{getValue()}</Typography>
      ),
    },
    {
      accessorKey: "position",
      header: "Applied Role",
      cell: ({ getValue }) => (
        <Typography sx={{ color: textColor, fontWeight: 600, fontSize: "0.9rem" }}>{getValue()}</Typography>
      ),
    },
    {
      accessorKey: "status",
      header: "Availability Status",
      cell: ({ getValue }) => getStatusChip(getValue()),
    },
    {
      id: "actions",
      header: "Action Panel",
      enableSorting: false,
      cell: ({ row }) => (
        <Button
          component={Link}
          to="/candidate-profile-v"
          state={{ applicant: row.original }}
          fullWidth
          variant="contained"
          sx={{
            py: { xs: 0.8, sm: 1.1 },
            px: { xs: 1.2, sm: 2 },
            minHeight: 42,
            fontSize: { xs: ".75rem", sm: ".85rem" },
            fontWeight: 700,
            whiteSpace: "nowrap",
            borderRadius: "10px",
            textTransform: "none",
            background: `linear-gradient(135deg,${primary},${primary})`,
            boxShadow: `0 10px 20px ${primary}20`,
            "&:hover": { transform: "translateY(-2px)" },
          }}
        >
          View Details
        </Button>
      ),
    },
  ], [primary, textColor, subText]);

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
  });

  // Dynamic Status Chip styling
  const getStatusChip = (status) => {
    switch (status) {
      case "Applied":
        return (
          <Chip
            label="Applied"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: `${primary}15`,
              color: primary,
              border: `1px solid ${primary}20`,
            }}
          />
        );

      case "Under Review":
        return (
          <Chip
            label="Under Review"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(245,158,11,.15)",
              color: "#F59E0B",
              border: "1px solid rgba(245,158,11,.2)",
            }}
          />
        );

      case "Shortlisted":
        return (
          <Chip
            label="Shortlisted"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(124,58,237,.15)",
              color: "#7C3AED",
              border: "1px solid rgba(124,58,237,.2)",
            }}
          />
        );

      case "Interview Scheduled":
        return (
          <Chip
            label="Interview Scheduled"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(6,182,212,.15)",
              color: "#06B6D4",
              border: "1px solid rgba(6,182,212,.2)",
            }}
          />
        );

      case "Interview Completed":
        return (
          <Chip
            label="Interview Completed"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(99,102,241,.15)",
              color: "#6366F1",
              border: "1px solid rgba(99,102,241,.2)",
            }}
          />
        );

      case "Selected":
        return (
          <Chip
            label="Selected"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(16,185,129,.15)",
              color: "#10B981",
              border: "1px solid rgba(16,185,129,.2)",
            }}
          />
        );

      case "Rejected":
        return (
          <Chip
            label="Rejected"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(239,68,68,.15)",
              color: "#EF4444",
              border: "1px solid rgba(239,68,68,.2)",
            }}
          />
        );

      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <HRLayout>
      {/* Title + Search */}
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
            Talent Pool Directory
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: {
                xs: "100%",
                md: 330,
              },
              bgcolor: colors.input,
              border: `1px solid ${borderStyle}`,
              borderRadius: "10px",
              px: 2,
              transition: ".2s",
              "&:hover": {
                borderColor: primary,
              },
              "&:focus-within": {
                borderColor: primary,
              },
            }}
          >
            <Search color={subText} />

            <input
              type="text"
              placeholder="Search candidates..."
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

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {[
            "All",
            "Applied",
            "Under Review",
            "Shortlisted",
            "Interview Scheduled",
            "Interview Completed",
            "Selected",
            "Rejected",
          ].map((filter) => (
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

                color:
                  activeFilter === filter
                    ? "#fff"
                    : subText,

                bgcolor:
                  activeFilter === filter
                    ? primary
                    : "transparent",

                borderColor:
                  activeFilter === filter
                    ? primary
                    : borderStyle,

                "&:hover": {
                  borderColor: primary,
                  bgcolor:
                    activeFilter === filter
                      ? primary
                      : `${primary}08`,
                },
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Premium Glassmorphic Table Card */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "75vh",
          width: "100%",
          maxWidth: "100%",
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
              ? `
                0 24px 55px rgba(0,0,0,.42)
              `
              : `
                0 26px 55px rgba(15,23,42,.12)
              `,
          },
        }}
      >
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
            flex: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#94a3b8",
              borderRadius: 10,
            },
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
              minWidth: {
                xs: 850,
                md: 1000,
              },
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
                  sx={{
                    height: { xs: 60, md: 82 },
                    bgcolor: colors.background,
                    borderBottom: `1px solid ${borderStyle}`,
                  }}
                >
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      align="center"
                      sx={{
                        color: textColor,
                        fontWeight: 700,
                        fontSize: { xs: ".8rem", md: ".95rem" },
                        borderBottom: `1px solid ${borderStyle}`,
                        cursor: header.column.getCanSort() ? "pointer" : "default",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}

                      </Box>
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
                    selected={row.getIsSelected()}
                    sx={{
                      borderBottom: `1px solid ${borderStyle}`,
                      transition: "all 0.2s ease",
                      bgcolor: row.getIsSelected() ? `${primary}10` : "transparent",
                      "&:hover": {
                        bgcolor: `${primary}08`,
                      },
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        align="center"
                        sx={{ borderBottom: `1px solid ${borderStyle}` }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: { xs: 4, md: 6 }, color: subText, fontSize: { xs: ".85rem", md: "1rem" } }}
                  >
                    No candidates found matching the selected availability filter.
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
          {/* Row selection info */}
          <Typography sx={{ fontSize: ".82rem", color: subText }}>
            {Object.keys(rowSelection).length > 0
              ? `${Object.keys(rowSelection).length} of ${table.getFilteredRowModel().rows.length} row(s) selected`
              : `Total: ${table.getFilteredRowModel().rows.length} jobs`}
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

          {/* Page size selector */}
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