import evaluationsData from "../../data/evaluations.json";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import { TextField, InputAdornment, BottomNavigation } from "@mui/material";
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
  Select,
  MenuItem,
} from "@mui/material";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RESULT_FILTERS = ["All", "Recommended", "Good Fit", "Strong Match", "Not Selected", "On Hold"];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

// Central color map for results — used by both the chips and the filter buttons
const RESULT_COLORS = {
  Recommended: { main: "#10b981", bgLight: "rgba(16,185,129,.08)", bgDark: "rgba(16,185,129,.15)" },
  "Good Fit": { main: "#1b80a6", bgLight: "rgba(59,130,246,.08)", bgDark: "rgba(59,130,246,.15)" },
  "Strong Match": { main: "#5b5cb6", bgLight: "rgba(139,92,246,.08)", bgDark: "rgba(139,92,246,.15)" },
  "Not Selected": { main: "#ef4444", bgLight: "rgba(239,68,68,.08)", bgDark: "rgba(239,68,68,.15)" },
  "On Hold": { main: "#f59e0b", bgLight: "rgba(245,158,11,.08)", bgDark: "rgba(245,158,11,.15)" },
};

export default function Evaluations() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const subText = darkMode ? "#9CA3AF" : "#6B7280";
  const textColor = darkMode ? "#ffffff" : "#0f172a";

  const borderStyle = darkMode
    ? "rgba(255,255,255,.08)"
    : "rgba(15,23,42,.08)";

  // Filtering Logic
  const [searchParams, setSearchParams] = useSearchParams();
  const resultFilter = searchParams.get("result") || "All";

  const currentPage =
    Number(searchParams.get("page")) || 1;

  const evaluationsPerPage =
    Number(searchParams.get("perPage")) || 10;

  const filteredEvaluations = evaluationsData.filter((row) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      row.candidate.toLowerCase().includes(keyword) ||
      row.position.toLowerCase().includes(keyword) ||
      row.reslt.toLowerCase().includes(keyword) ||
      row.score.toLowerCase().includes(keyword)

    const matchesResult =
      resultFilter === "All" || row.result === resultFilter;

    return matchSearch && matchesResult;
  });

  // Pagination Logic //
  const totalPages = Math.ceil(
    filteredEvaluations.length / evaluationsPerPage
  );

  const indexOfLastEvaluation =
    currentPage * evaluationsPerPage;

  const indexOfFirstEvaluation =
    indexOfLastEvaluation - evaluationsPerPage;

  const currentEvaluations = filteredEvaluations.slice(
    indexOfFirstEvaluation,
    indexOfLastEvaluation
  );

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const handleFilterChange = (result) => {
    setSearchParams({ result, page: 1, perPage: evaluationsPerPage });
  };

  const handleRowsPerPageChange = (event) => {
    setSearchParams({ result: resultFilter, page: 1, perPage: Number(event.target.value) });
  };

  const getResultColors = (result) =>
    RESULT_COLORS[result] || {
      main: "#64748b",
      bgLight: "rgba(100,116,139,.08)",
      bgDark: "rgba(100,116,139,.15)",
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
          bgcolor: darkMode
            ? "rgba(30,41,59,.72)"
            : "#fff",
          border: `1px solid ${borderStyle}`,
          boxShadow: darkMode
            ? "0 12px 35px rgba(0,0,0,.25)"
            : "0 10px 30px rgba(0,0,0,.06)"
        }}
      >

        {/* Title & Banner Area */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row"
            },
            alignItems: {
              xs: "stretch",
              md: "center"
            },
            justifyContent: "space-between",
            gap: 2,
            mb: 3
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
            }}
          >
            Candidate Evaluations
          </Typography>

          {/* SEARCH BAR */}
          <TextField
            size="small"
            placeholder="Search Candidate..."
            label="Search Candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch color="#14b8a6" />
                </InputAdornment>
              ),
            }}
            sx={{
              widdth: {
                xs: "100%",
                sm: "320px",
                md: "360px"
              },
              mb: -1,
              "& .MuiOutlinedInput-root": {
                height: 46,
                borderRadius: "14px",
                bgcolor: darkMode ? "#1e293b" : "#fff"
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
            "&::-webkit-scrollbar": {
              display: "none"
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
        >
          {RESULT_FILTERS.map((result) => {
            const isActive = resultFilter === result;
            const colors =
              result === "All"
                ? { main: "#14b8a6" }
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
                  fontSize: {
                    xs: ".75rem",
                    md: ".85rem"
                  },
                  px: {
                    xs: 1.5,
                    md: 2.2
                  },
                  py: {
                    xs: .5,
                    md: .7
                  },
                  color: isActive ? "#fff" : colors.main,
                  borderColor: isActive
                    ? colors.main
                    : borderStyle,
                  bgcolor: isActive
                    ? colors.main
                    : "transparent",
                  boxShadow: isActive
                    ? `0 12px 22px ${colors.main}40`
                    : "none",
                  "&:hover": {
                    borderColor: colors.main,
                    bgcolor: isActive
                      ? colors.main
                      : darkMode
                        ? `${colors.main}22`
                        : `${colors.main}15`,
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
          bgcolor: darkMode
            ? "rgba(30,41,59,.72)"
            : "#ffffff",
          backdropFilter: "blur(16px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: darkMode
            ? `
              0 18px 45px rgba(0,0,0,.35),
              inset 0 1px 0 rgba(255,255,255,.04)
            `
            : `
              0 18px 40px rgba(15,23,42,.08),
              0 4px 12px rgba(15,23,42,.05)
            `,
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
            flex: 1,
            width: "100%",
            overflow: "auto",
            px: 3,
            pt: 3,
            pb: 0,
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
            
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                py: 0.75,
                px: 1.5,
                fontSize: "0.78rem",
                lineHeight: 1.2,
              },
              minWidth: {
                xs: 700,
                md: 800,
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
                bgcolor: darkMode
                  ? "#1e293b"
                  : "#f8fafc",
              },
            }}
            >
              <TableRow
                sx={{
                  bgcolor: darkMode
                    ? "rgba(20,184,166,.08)"
                    : "#F8FAFC",
                  borderBottom: `1px solid ${borderStyle}`,
                }}
              >
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Candidate
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Position
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Score
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Result
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  fontSize: {
                    xs: "0.74rem",
                    md: "0.82rem",
                  },
                  py: 1,
                },
              }}
            >
              {filteredEvaluations.length > 0 ? (
                currentEvaluations.map((row) => {
                  const resultColors = getResultColors(row.result);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        borderBottom: `1px solid ${borderStyle}`,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: darkMode
                            ? "rgba(20,184,166,.08)"
                            : "#ECFDF9",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {/* Candidate Name & Avatar */}
                      <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              fontSize: ".9rem",
                              background: "linear-gradient(135deg,#14b8a6,#0f766e)",
                              fontWeight: 800,
                              boxShadow: "0 8px 20px rgba(20,184,166,.30)"
                            }}
                          >
                            {row.candidate.charAt(0)}
                          </Avatar>
                          <Typography sx={{ color: textColor, fontWeight: 700, fontSize: "0.95rem" }}>
                            {row.candidate}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Position */}
                      <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                        <Typography sx={{ fontWeight: 600, color: subText, fontSize: "0.9rem" }}>
                          {row.position}
                        </Typography>
                      </TableCell>

                      {/* Score */}
                      <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: darkMode ? "#2dd4bf" : "#0f766e",
                            fontSize: "0.9rem",
                          }}
                        >
                          {row.score}
                        </Typography>
                      </TableCell>

                      {/* Result Chip */}
                      <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                        <Chip
                          label={row.result}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: "0.72rem",
                            bgcolor: darkMode
                              ? resultColors.bgDark
                              : resultColors.bgLight,
                            color: resultColors.main,
                            border: `1px solid ${resultColors.main}40`,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6, color: subText }}>
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
            p: {
              xs: 1.5,
              md: 2.5
            },
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: {
              xs: 1.5,
              md: 2
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            borderTop: `1px solid ${borderStyle}`,
            bgcolor: darkMode ? "rgba(20,184,166,.05)" : "#F8FAFC",
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
            <Typography
              sx={{
                color: subText,
                fontSize: "0.82rem",
              }}
            > Showing{" "}
              <strong>
                {indexOfFirstEvaluation + 1}-
                {Math.min(indexOfLastEvaluation, filteredEvaluations.length)}
              </strong>{" "}
              of{" "}
              <strong>{filteredEvaluations.length}</strong>{" "}
              evaluations
            </Typography>

            {/* Rows Per Page Selector */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ color: subText, fontSize: "0.8rem" }}>
                Rows per page:
              </Typography>
              <Select
                size="small"
                value={evaluationsPerPage}
                onChange={handleRowsPerPageChange}
                sx={{
                  fontSize: "0.8rem",
                  color: textColor,
                  height: 32,
                  minWidth: 68,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: borderStyle,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#14b8a6",
                  },
                  "& .MuiSvgIcon-root": {
                    color: textColor,
                  },
                }}
              >
                {ROWS_PER_PAGE_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: .1,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: {
                xs: "center",
                md: "flex-end",
              },
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
          >

            <Button
              size="small"
              disabled={currentPage === 1}
              onClick={() =>
                setSearchParams({
                  result: resultFilter,
                  page: String(currentPage - 1),
                  perPage: evaluationsPerPage,
                })
              }
            >
              <FaChevronLeft />
            </Button>

            {getVisiblePages().map((page, index) =>
              page === "..." ? (
                <Typography
                  key={index}
                  sx={{
                    px: 1,
                    color: darkMode ? "#fff" : "#000",
                    fontWeight: 700,
                  }}
                >
                  ...
                </Typography>
              ) : (
                <Button
                  key={`${page}-${index}`}
                  size="small"
                  onClick={() => {
                    if (page !== "...") {
                      setSearchParams({
                        result: resultFilter,
                        page: String(page),
                        perPage: evaluationsPerPage,
                      });
                    }
                  }}
                  variant={Number(currentPage) === Number(page) ? "contained" : "text"}
                  sx={{
                    minWidth: {
                      xs: "30px",
                      md: "35px"
                    },

                    height: {
                      xs: 30,
                      md: 35
                    },

                    fontSize: {
                      xs: ".75rem",
                      md: ".9rem"
                    },
                    bgcolor: Number(currentPage) === Number(page) ? "#14b8a6" : "transparent",
                    color:
                      Number(currentPage) === Number(page)
                        ? "#fff"
                        : darkMode
                          ? "#fff"
                          : "#0f172a",
                    "&:hover": {
                      bgcolor:
                        Number(currentPage) === Number(page)
                          ? "#0d9488"
                          : "rgba(20,184,166,.08)",
                    },
                  }}
                >
                  {page}
                </Button>
              )
            )}

            <Button
              size="small"
              disabled={currentPage === totalPages}
              onClick={() =>
                setSearchParams({
                  result: resultFilter,
                  page: String(currentPage + 1),
                  perPage: evaluationsPerPage,
                })
              }
            >
              <FaChevronRight />
            </Button>

          </Box>

        </Box>
      </Paper>
    </InterviewerLayout>
  );
}