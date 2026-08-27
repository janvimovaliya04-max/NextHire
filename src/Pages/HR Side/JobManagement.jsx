import jobsData from "../../data/jobs.json"
// removed InfiniteScroll — replaced by TanStack pagination
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
  Avatar,
  Chip,
  Box,
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
  Search,
  Briefcase,
  MapPin,
  Users,
} from "lucide-react";
import SEO from "../../components/common/SEO"; // SEO Component Import Added

export default function JobManagement() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const [activeFilter, setActiveFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const jobs = jobsData;

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Filter data by status tab first
  const filteredByStatus = useMemo(() =>
    jobs.filter((job) =>
      activeFilter === "All" || job.status === activeFilter
    ),
    [jobs, activeFilter]
  );

  // TanStack column definitions
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
          slotProps={{
            input: {
              "aria-label": "Select all jobs",
            },
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          size="small"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          sx={{ color: subText, "&.Mui-checked": { color: primary } }}
          slotProps={{
            input: {
              "aria-label": `Select ${row.original.title}`,
            },
          }}
        />
      ),
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: "title",
      header: "Job Role",
      cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar sx={{ bgcolor: `${primary}15`, color: primary, width: { xs: 36, md: 44 }, height: { xs: 36, md: 44 } }}>
            <Briefcase size={window.innerWidth < 600 ? 13 : 16} />
          </Avatar>
          <Box>
            <Typography sx={{ color: textColor, fontWeight: 700, fontSize: { xs: ".8rem", md: ".95rem" } }}>
              {row.original.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: subText }}>
              <MapPin size={10} style={{ opacity: 0.7 }} />
              <Typography sx={{ fontSize: { xs: ".72rem", md: ".78rem" } }}>
                {row.original.location}
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      accessorKey: "salaryRange",
      header: "Salary Package",
      cell: ({ getValue }) => (
        <Typography sx={{ fontWeight: 500, fontSize: { xs: ".8rem", md: ".88rem" }, color: textColor }}>
          {getValue()}
        </Typography>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ getValue }) => (
        <Typography sx={{ color: textColor, fontSize: { xs: ".8rem", md: ".88rem" }, fontWeight: 700 }}>
          {getValue()}
        </Typography>
      ),
    },
    {
      accessorKey: "status",
      header: "Listing Status",
      cell: ({ getValue }) => getStatusChip(getValue()),
    },
    {
      id: "actions",
      header: "Action Panel",
      enableSorting: false,
      cell: () => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            component={Link}
            aria-label="Create assessment"
            to="/hr/create-assessment"
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: { xs: "7px", md: "8px" },
              px: { xs: 1.2, md: 2 },
              fontSize: { xs: ".7rem", sm: ".75rem", md: ".8rem" },
              width: { xs: "100%", sm: "auto" },
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              boxShadow: `0 4px 12px ${primary}33`,
              "&:hover": {
                background: `linear-gradient(135deg, ${primary}, ${primary})`,
                boxShadow: `0 6px 16px ${primary}4d`,
              },
            }}
          >
            Create Assessment
          </Button>
        </Box>
      ),
    },
  ], [primary, secondary, textColor, subText, borderStyle]);

  // TanStack table instance
  const table = useReactTable({
    data: filteredByStatus,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  // Dynamic Status Chip styling
  const getStatusChip = (status) => {
    switch (status) {
      case "Open":
        return (
          <Chip
            label="Open"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: { xs: ".68rem", md: ".72rem" },
              bgcolor: "rgba(16, 185, 129, 0.12)",
              color: "#047857",
              border: "1px solid rgba(4, 120, 87, 0.25)",
            }}
          />
        );

      case "Closed":
        return (
          <Chip
            label="Closed"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(239, 68, 68, 0.12)",
              color: "#b91c1c",
              border: "1px solid rgba(185, 28, 28, 0.25)",
            }}
          />
        );

      case "Draft":
        return (
          <Chip
            label="Draft"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(245, 158, 11, 0.12)",
              color: "#b45309",
              border: "1px solid rgba(180, 83, 9, 0.25)",
            }}
          />
        );

      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <HRLayout>
      {/* Dynamic SEO Tags Injection */}
      <SEO
        title="Job Management"
        description="Manage job postings, candidates, and interview schedules on NextHire HR Portal."
        canonicalUrl="/hr-portal/dashboard"
      />

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
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 3
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
              mb: { xs: 0, md: 0.5 },
              fontWeight: 850,
              letterSpacing: "-0.03em",
            }}
          >
            Job Management
          </Typography>

          {/* Search + Button */}

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
            <Search
              color={subText}
            />

            <input
              type="text"
              placeholder="Search jobs..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: textColor,
                fontSize: "0.9rem",
              }}
            />
          </Box>

          <Button
            component={Link}
            to="/hr/create-job"
            variant="contained"
            startIcon={<Plus size={11} />}
            sx={{
              flexShrink: 0,
              whiteSpace: "nowrap",
              py: 1.3,
              px: 3,
              fontSize: ".9rem",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              background: `linear-gradient(135deg,${primary},${secondary || primary})`,
              boxShadow: `0 4px 12px ${primary}33`,
              "&:hover": {
                background: `linear-gradient(135deg,${primary},${primary})`,
              },
            }}
          >
            Create New Job
          </Button>
        </Box>

        {/* Filter panel */}
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
          {["All", "Open", "Closed", "Draft"].map((filter) => (
            <Button
              key={filter}
              variant="outlined"
              size="small"
              aria-label="Filter by status"
              onClick={() => setActiveFilter(filter)}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: {
                  xs: ".75rem",
                  md: ".82rem"
                },

                px: {
                  xs: 1.6,
                  md: 2.2
                },

                py: {
                  xs: .55,
                  md: .7
                },
                color:
                  activeFilter ===
                    filter ? "#fff" : subText,
                borderColor:
                  activeFilter ===
                    filter ? primary : borderStyle,
                bgcolor:
                  activeFilter ===
                    filter ? primary : "transparent",
                boxShadow:
                  activeFilter ===
                    filter ? `0 4px 10px ${primary}33` : "none",
                "&:hover": {
                  borderColor: primary,
                  bgcolor: activeFilter === filter ? primary : `${primary}08`,
                }
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
                fontSize: {
                  xs: ".9rem",
                  md: "0.88rem",
                },
                fontWeight: 700,
                bgcolor: colors.background,
              },
            }}
            >
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
                    No job postings found matching this category filter.
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
                  aria-label="start from one"
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
                  aria-label="next page"
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
                    aria-label="next page"
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
                  aria-label="move to next page"
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
                  aria-label="last page"
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
              aria-label="Rows per page"
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