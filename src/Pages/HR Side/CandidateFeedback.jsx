import feedbackData from "../../data/feedback.json";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
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
  Box,
} from "@mui/material";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function Candidatefeedback() {

  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const borderStyle = colors.border;

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const feedbackPerPage = 20;

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const textColor = colors.text;

  const subText = colors.subText;


  // filter //
  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Hire"
          ? feedback.recommendation === "Hire"
          : activeFilter === "Hold"
            ? feedback.recommendation === "Hold"
            : feedback.recommendation === "Reject";

    const matchesSearch =
      feedback.candidateId
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  //  Pagination  //

  const totalPages = Math.ceil(
    filteredFeedback.length / feedbackPerPage
  );

  const indexOfLastFeedback =
    currentPage * feedbackPerPage;

  const indexOfFirstFeedback =
    indexOfLastFeedback - feedbackPerPage;

  const currentFeedback =
    filteredFeedback.slice(
      indexOfFirstFeedback,
      indexOfLastFeedback
    );

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 3) {
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

  return (
    <HRLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 2,
          flexShrink: 0,
        }}
      >
        {/* Title + Search */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-0.03em",
              fontSize: {
                xs: "1.35rem",
                sm: "1.7rem",
                md: "2.1rem",
              },
            }}
          >
            Candidate Feedback
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: {
                xs: "100%",
                md: 330,
              },
              bgcolor: colors.card,
              border: `1px solid ${borderStyle}`,
              borderRadius: "10px",
              px: 2,
            }}
          >
            <FaSearch color={darkMode ? "#94a3b8" : "#64748b"} />

            <input
              type="text"
              placeholder="Search Candidate ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSearchParams({ page: 1 });
              }}
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
          {["All", "Hire", "Hold", "Rejected"].map((filter) => (
            <Button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setSearchParams({ page: 1 });
              }}
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
                    : colors.subText,

                bgcolor:
                  activeFilter === filter
                    ? primary
                    : "transparent",

                borderColor:
                  activeFilter === filter
                    ? primary
                    : colors.border,
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      </Box>

      {/* MAIN PAPER */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: {
            xs: "68vh",
            sm: "72vh",
            md: "75vh",
          },
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
              width: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#94a3b8",
              borderRadius: 10,
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: darkMode
                    ? "rgba(59,130,246,.08)"
                    : "#F8FAFC",
                  borderBottom: `1px solid ${borderStyle}`,
                }}
              >
                <TableCell align="center" sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: textColor, fontWeight: 700, fontSize: { xs: "0.82rem", md: "1rem" }, borderBottom: `1px solid ${borderStyle}`, bgcolor: colors.background }}>
                  Candidate Id
                </TableCell>
                <TableCell sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: textColor, fontWeight: 700, fontSize: { xs: "0.82rem", md: "1rem" }, borderBottom: `1px solid ${borderStyle}`, bgcolor: colors.background }}>
                  Technical
                </TableCell>
                <TableCell sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: textColor, fontWeight: 700, fontSize: { xs: "0.82rem", md: "1rem" }, borderBottom: `1px solid ${borderStyle}`, bgcolor: colors.background }}>
                  Communication
                </TableCell>
                <TableCell sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: textColor, fontWeight: 700, fontSize: { xs: "0.82rem", md: "1rem" }, borderBottom: `1px solid ${borderStyle}`, bgcolor: colors.background }}>
                  Problem solving
                </TableCell>
                <TableCell align="center" sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: textColor, fontWeight: 700, fontSize: { xs: "0.82rem", md: "1rem" }, borderBottom: `1px solid ${borderStyle}`, pr: 4, bgcolor: colors.background }}>
                  Overall
                </TableCell>
                <TableCell align="center" sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: textColor, fontWeight: 700, fontSize: { xs: "0.82rem", md: "1rem" }, borderBottom: `1px solid ${borderStyle}`, pr: 4, bgcolor: colors.background }}>
                  Recommendation
                </TableCell>
                <TableCell align="center" sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: textColor, fontWeight: 700, fontSize: { xs: "0.82rem", md: "1rem" }, borderBottom: `1px solid ${borderStyle}`, pr: 4, bgcolor: colors.background }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {currentFeedback.length > 0 ? (
                currentFeedback.map((feedback) => (
                  <TableRow
                    key={feedback.feedbackId}
                    hover
                    sx={{
                      borderBottom: `1px solid ${borderStyle}`,
                    }}
                  >

                    <TableCell
                      sx={{
                        py: { xs: 1, md: 2 },
                        px: { xs: 1, md: 2 },
                        whiteSpace: "nowrap",
                        color: textColor,
                        fontWeight: 700,
                        fontSize: {
                          xs: ".8rem",
                          md: ".95rem",
                        },
                      }}
                    >
                      {feedback.candidateId}
                    </TableCell>


                    <TableCell sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: subText }}>
                      {feedback.technicalRating}/5
                    </TableCell>


                    <TableCell sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: subText }}>
                      {feedback.communicationRating}/5
                    </TableCell>


                    <TableCell sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: subText }}>
                      {feedback.problemSolvingRating}/5
                    </TableCell>


                    <TableCell
                      sx={{
                        py: { xs: 1, md: 2 },
                        px: { xs: 1, md: 2 },
                        whiteSpace: "nowrap",
                        color: primary,
                        fontWeight: 800
                      }}
                    >
                      {feedback.overallRating}/5
                    </TableCell>


                    <TableCell>

                      <Chip
                        size="small"
                        label={feedback.recommendation}
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: ".7rem", md: ".8rem" },
                          bgcolor:
                            feedback.recommendation === "Select"
                              ? "rgba(16,185,129,.12)"
                              : feedback.recommendation === "Reject"
                                ? "rgba(239,68,68,.12)"
                                : "rgba(245,158,11,.12)",
                          color:
                            feedback.recommendation === "Select"
                              ? "#10b981"
                              : feedback.recommendation === "Reject"
                                ? "#ef4444"
                                : "#f59e0b",
                        }}
                      />

                    </TableCell>


                    <TableCell sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 }, whiteSpace: "nowrap", color: subText }}>
                      {feedback.submittedDate}
                    </TableCell>


                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6, color: subText }}>
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
            p: {
              xs: 1,
              sm: 1.5,
              md: 2.5,
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
            justifyContent: {
              xs: "center",
              md: "space-between",
            },
            alignItems: {
              xs: "center",
              md: "center",
            },
            borderTop: `1px solid ${borderStyle}`,
            bgcolor: colors.background,
          }}
        >
          <Typography sx={{ color: subText, fontSize: { xs: "0.72rem", md: "0.82rem" } }}>
            Page {currentPage} of {totalPages || 1} • Showing{" "}
            <strong>
              {filteredFeedback.length === 0 ? 0 : indexOfFirstFeedback + 1}-
              {Math.min(indexOfLastFeedback, filteredFeedback.length)}
            </strong>{" "}
            of{" "}
            <strong>{filteredFeedback.length}</strong>{" "}
            Feedback Records
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: .1,
              alignItems: "center",
              flexWrap: "nowrap",
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
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
                  page: String(currentPage - 1),
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
                        page: String(page),
                      });
                    }
                  }}
                  variant={Number(currentPage) === Number(page) ? "contained" : "text"}
                  sx={{
                    minWidth: {
                      xs: 26,
                      sm: 30,
                      md: 35,
                    },

                    height: {
                      xs: 26,
                      sm: 30,
                      md: 35,
                    },

                    px: {
                      xs: 0,
                      sm: 1,
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
                          ? `${primary}dd`
                          : `${primary}15`,
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
                  page: String(currentPage + 1),
                })
              }
            >
              <FaChevronRight />
            </Button>

          </Box>

        </Box>
      </Paper>
    </HRLayout>
  );
}