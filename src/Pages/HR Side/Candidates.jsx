import candidatesData from "../../data/candidates.json";
import { useSearchParams } from "react-router-dom";
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
  Avatar,
  Box,
} from "@mui/material";

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

  const [search, setSearch] = useState("");

  // Filtering Logic
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl =
    Number(searchParams.get("page")) || 1;
  const [candidates, setCandidates] = useState(candidatesData);

  const candidatesPerPage = 20;

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesStatus =
      activeFilter === "All" || candidate.status === activeFilter;

    const matchesSearch =
      candidate.fullName.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase()) ||
      candidate.position.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Pagination Logic //
  const totalPages = Math.ceil(
    filteredCandidates.length / candidatesPerPage
  );

  const currentPage = Math.min(
    Math.max(1, pageFromUrl),
    Math.max(totalPages, 1)
  );

  const indexOfLastCandidate =
    currentPage * candidatesPerPage;

  const indexOfFirstCandidate =
    indexOfLastCandidate - candidatesPerPage;

  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
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
      </Box>

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
              <TableRow
                sx={{
                  bgcolor: colors.background,
                  borderBottom: `1px solid ${borderStyle}`,
                }}
              >
                <TableCell align="center" sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Candidate
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Email Address
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Applied Role
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Availability Status
                </TableCell>
                <TableCell align="center" sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}`, pr: 4 }}>
                  Action Panel
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
              {currentCandidates.length > 0 ? (
                currentCandidates.map((candidate) => (
                  <TableRow
                    key={candidate.candidateId}
                    sx={{
                      borderBottom: `1px solid ${borderStyle}`,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: `${primary}08`,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {/* Candidate Name & Avatar */}
                    <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                        <Avatar sx={{ bgcolor: candidate.avatarBg, color: "#fff", fontWeight: 700, fontSize: "0.9rem", width: 40, height: 40, boxShadow: `0 10px 22px ${candidate.avatarBg}40` }}>
                          {candidate.fullName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </Avatar>
                        <Box>
                          <Typography sx={{ color: textColor, fontWeight: 700, fontSize: "0.95rem" }}>
                            {candidate.fullName}
                          </Typography>
                          <Typography
                            sx={{
                              color: subText,
                              fontSize: "0.8rem",
                            }}
                          >
                            {candidate.candidateId} • {candidate.experience} Years
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Email */}
                    <TableCell sx={{ borderBottom: `1px solid ${borderStyle}`, fontSize: "0.88rem", color: textColor }}>
                      {candidate.email}
                    </TableCell>

                    {/* Role */}
                    <TableCell sx={{ color: textColor, borderBottom: `1px solid ${borderStyle}`, fontWeight: 600, fontSize: "0.9rem" }}>
                      {candidate.position}
                    </TableCell>

                    {/* Status Chip */}
                    <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                      {getStatusChip(candidate.status)}
                    </TableCell>

                    {/* Profile View Trigger - Passing State */}
                    <TableCell align="right" sx={{ borderBottom: `1px solid ${borderStyle}`, pr: 4 }}>
                      <Button
                        component={Link}
                        to="/candidate-profile-v"
                        state={{ applicant: candidate }} // <-- Passes candidate state to Profile
                        fullWidth
                        variant="contained"
                        sx={{
                          py: {
                            xs: 0.8,
                            sm: 1.1,
                          },
                          px: {
                            xs: 1.2,
                            sm: 2,
                          },
                          minHeight: 42,
                          fontSize: {
                            xs: ".75rem",
                            sm: ".85rem",
                          },
                          fontWeight: 700,
                          whiteSpace: "nowrap",     // Prevents wrapping
                          borderRadius: "10px",
                          textTransform: "none",
                          background: `linear-gradient(90deg,${primary},${primary})`,
                          boxShadow: `0 10px 20px ${primary}20`,
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))

              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6, color: subText }}>
                    No candidates found matching the selected availability filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer info & Pagination */}
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
            bgcolor: colors.background,
          }}
        >
          <Typography
            sx={{
              color: subText,
              fontSize: "0.82rem",
            }}
          >
            Page {currentPage} of {totalPages || 1} • Showing{" "}
            <strong>
              {filteredCandidates.length === 0
                ? 0
                : indexOfFirstCandidate + 1}
              -
              {Math.min(indexOfLastCandidate, filteredCandidates.length)}
            </strong>{" "}
            of{" "}
            <strong>{filteredCandidates.length}</strong>{" "}
            candidates
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "center",
                md: "flex-end",
              },
              flexWrap: {
                xs: "nowrap",
                md: "wrap",
              },
              overflowX: {
                xs: "auto",
                md: "visible",
              },
              width: {
                xs: "100%",
                md: "auto",
              },
              gap: 0.5,
              pb: {
                xs: 0.5,
                md: 0,
              },

              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >

            <Button
              size="small"
              sx={{
                minWidth: {
                  xs: 30,
                  md: 35,
                },
                height: {
                  xs: 30,
                  md: 35,
                },
                fontSize: {
                  xs: ".75rem",
                  md: ".9rem",
                },
                color: textColor,
              }}
              disabled={currentPage === 1}
              onClick={() =>
                setSearchParams({
                  page: String(Math.max(1, currentPage - 1)),
                })
              }
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
                        page: String(page),
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
                          : `${primary}08`,
                    },
                  }}
                >
                  {page}
                </Button>
              )
            )}


            <Button
              size="small"
              sx={{
                minWidth: {
                  xs: 30,
                  md: 35,
                },
                height: {
                  xs: 30,
                  md: 35,
                },
                fontSize: {
                  xs: ".75rem",
                  md: ".9rem",
                },
                color: textColor,
              }}
              disabled={currentPage === totalPages}
              onClick={() =>
                setSearchParams({
                  page: String(
                    Math.min(currentPage + 1, totalPages)
                  ),
                })
              }
            >
              <ChevronRight />
            </Button>

          </Box>

        </Box>
      </Paper>
    </HRLayout>
  );
}