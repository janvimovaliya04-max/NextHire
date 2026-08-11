import evaluationsData from "../../data/evaluations.json";
import { useState, useMemo } from "react";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { TextField, InputAdornment } from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
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
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Search } from "lucide-react";

const RESULT_FILTERS = ["All", "Recommended", "Good Fit", "Strong Match", "Not Selected", "On Hold"];

export default function Evaluations() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const RESULT_COLORS = {
    Recommended: { main: primary, bgLight: `${primary}14`, bgDark: `${primary}26` },
    "Good Fit": { main: "#1b80a6", bgLight: "rgba(59,130,246,.08)", bgDark: "rgba(59,130,246,.15)" },
    "Strong Match": { main: secondary || primary, bgLight: `${secondary || primary}14`, bgDark: `${secondary || primary}26` },
    "Not Selected": { main: "#ef4444", bgLight: "rgba(239,68,68,.08)", bgDark: "rgba(239,68,68,.15)" },
    "On Hold": { main: "#f59e0b", bgLight: "rgba(245,158,11,.08)", bgDark: "rgba(245,158,11,.15)" },
  };

  const getResultColors = (result) =>
    RESULT_COLORS[result] || {
      main: subText,
      bgLight: "rgba(100,116,139,.08)",
      bgDark: "rgba(100,116,139,.15)",
    };

  const [resultFilter, setResultFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const filteredByResult = useMemo(() =>
    evaluationsData.filter((row) => resultFilter === "All" || row.result === resultFilter),
    [resultFilter]
  );

  const columns = useMemo(() => [
    {
      accessorKey: "candidate",
      header: "Candidate",
      cell: ({ getValue }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              fontSize: ".9rem",
              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
              fontWeight: 800,
              boxShadow: `0 8px 20px ${primary}4d`
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
        <Typography sx={{ fontWeight: 600, color: subText, fontSize: "0.9rem" }}>
          {getValue()}
        </Typography>
      ),
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ getValue }) => (
        <Typography sx={{ fontWeight: 800, color: primary, fontSize: "0.9rem" }}>
          {getValue()}
        </Typography>
      ),
    },
    {
      accessorKey: "result",
      header: "Result",
      cell: ({ getValue }) => {
        const resultColors = getResultColors(getValue());
        return (
          <Chip
            label={getValue()}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: darkMode ? resultColors.bgDark : resultColors.bgLight,
              color: resultColors.main,
              border: `1px solid ${resultColors.main}40`,
            }}
          />
        );
      },
    },
  ], [primary, secondary, textColor, subText, darkMode]);

  const table = useReactTable({
    data: filteredByResult,
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
        item.result.toLowerCase().includes(v) ||
        String(item.score).toLowerCase().includes(v)
      );
    },
  });

  const handleFilterChange = (result) => {
    setResultFilter(result);
    table.setPageIndex(0);
  };

  return (
    <InterviewerLayout>

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

        {/* Title & Banner Area */}
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
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Candidate Evaluations
          </Typography>

          {/* SEARCH BAR */}
          <TextField
            size="small"
            placeholder="Search Candidate..."
            label="Search Candidate..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color={primary} />
                </InputAdornment>
              ),
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
              },
            }}
          />
        </Box>

        {/* Result Filter Buttons */}
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
            msOverflowStyle: "none"
          }}
        >
          {RESULT_FILTERS.map((result) => {
            const isActive = resultFilter === result;
            const resultBtnColors =
              result === "All"
                ? { main: primary }
                : getResultColors(result);

            return (
              <Button
                key={result}
                variant="outlined"
                size="small"
                onClick={() => handleFilterChange(result)}
                sx={{
                  flexShrink: 0,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: { xs: ".75rem", md: ".85rem" },
                  px: { xs: 1.5, md: 2.2 },
                  py: { xs: .5, md: .7 },
                  color: isActive ? "#fff" : resultBtnColors.main,
                  borderColor: isActive ? resultBtnColors.main : borderStyle,
                  bgcolor: isActive ? resultBtnColors.main : "transparent",
                  boxShadow: isActive ? `0 12px 22px ${resultBtnColors.main}40` : "none",
                  "&:hover": {
                    borderColor: resultBtnColors.main,
                    bgcolor: isActive
                      ? resultBtnColors.main
                      : darkMode
                        ? `${resultBtnColors.main}22`
                        : `${resultBtnColors.main}15`,
                  },
                }}
              >
                {result}
              </Button>
            );
          })}
        </Box>
      </Paper>

      {/* MAIN PAPER */}
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
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          p: 0,
          borderRadius: "22px",
          bgcolor: colors.card,
          backdropFilter: "blur(16px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
          transition: ".3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: colors.shadow,
          },
        }}
      >
        <TableContainer
          sx={{
            flex: 1,
            width: "100%",
            overflow: "auto",
            px: 3,
            pt: 3,
            pb: 0,
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-thumb": { background: subText, borderRadius: 10 },
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
              minWidth: { xs: 700, md: 800 },
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
                      onClick={header.column.getToggleSortingHandler()}
                      sx={{
                        color: textColor,
                        fontWeight: 700,
                        fontSize: "1rem",
                        borderBottom: `1px solid ${borderStyle}`,
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
                      <TableCell key={cell.id} sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 6, color: subText }}>
                    No evaluations found matching the selected result filter.
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
            <Typography sx={{ color: subText, fontSize: "0.82rem" }}>
              Total <strong>{table.getFilteredRowModel().rows.length}</strong> evaluations
            </Typography>
          </Box>

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
    </InterviewerLayout>
  );
}