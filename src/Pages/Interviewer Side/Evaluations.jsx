import evaluationsData from "../../data/evaluations.json";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { TextField, InputAdornment } from "@mui/material";
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

import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const RESULT_FILTERS = ["All", "Recommended", "Good Fit", "Strong Match", "Not Selected", "On Hold"];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function Evaluations() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Dashboard / Settings / Interviews)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Central color map for results — used by both the chips and the filter buttons
  // "Recommended" and "Strong Match" tie to theme primary/secondary; the rest stay semantic
  const RESULT_COLORS = {
    Recommended: { main: primary, bgLight: `${primary}14`, bgDark: `${primary}26` },
    "Good Fit": { main: "#1b80a6", bgLight: "rgba(59,130,246,.08)", bgDark: "rgba(59,130,246,.15)" },
    "Strong Match": { main: secondary || primary, bgLight: `${secondary || primary}14`, bgDark: `${secondary || primary}26` },
    "Not Selected": { main: "#ef4444", bgLight: "rgba(239,68,68,.08)", bgDark: "rgba(239,68,68,.15)" },
    "On Hold": { main: "#f59e0b", bgLight: "rgba(245,158,11,.08)", bgDark: "rgba(245,158,11,.15)" },
  };

  const [search, setSearch] = useState("");

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
      main: subText,
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
          bgcolor: colors.card,
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
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
              color: textColor,
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
                  <Search color={primary} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: {
                xs: "100%",
                sm: "320px",
                md: "360px"
              },
              mb: -1,
              "& .MuiOutlinedInput-root": {
                height: 46,
                borderRadius: "14px",
                color: textColor,
                bgcolor: colors.input || colors.card,
                "& fieldset": {
                  borderColor: borderStyle,
                },
                "&:hover fieldset": {
                  borderColor: primary,
                },
                "&.Mui-focused fieldset": {
                  borderColor: primary,
                },
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
                  color: isActive ? "#fff" : resultBtnColors.main,
                  borderColor: isActive
                    ? resultBtnColors.main
                    : borderStyle,
                  bgcolor: isActive
                    ? resultBtnColors.main
                    : "transparent",
                  boxShadow: isActive
                    ? `0 12px 22px ${resultBtnColors.main}40`
                    : "none",
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
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              background: subText,
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
                bgcolor: colors.input || colors.card,
              },
            }}
            >
              <TableRow
                sx={{
                  bgcolor: `${primary}08`,
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
                          bgcolor: `${primary}0d`,
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
                              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                              fontWeight: 800,
                              boxShadow: `0 8px 20px ${primary}4d`
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
                            color: primary,
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
                    borderColor: primary,
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
              sx={{ color: textColor }}
            >
              <ChevronLeft />
            </Button>

            {getVisiblePages().map((page, index) =>
              page === "..." ? (
                <Typography
                  key={index}
                  sx={{
                    px: 1,
                    color: textColor,
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
                    bgcolor: Number(currentPage) === Number(page) ? primary : "transparent",
                    color:
                      Number(currentPage) === Number(page)
                        ? "#fff"
                        : textColor,
                    "&:hover": {
                      bgcolor:
                        Number(currentPage) === Number(page)
                          ? primary
                          : `${primary}14`,
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
              sx={{ color: textColor }}
            >
              <ChevronRight />
            </Button>

          </Box>

        </Box>
      </Paper>
    </InterviewerLayout>
  );
}