import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import interviewsData from "../../data/interviews.json";
import { useTheme } from "../../context/ThemeContext";
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
} from "@mui/material";

import {
  FaPlus,
  FaUser,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function InterviewManagement() {

  const { darkMode } = useTheme();

  // Interview Data //
  const interviews = interviewsData;

  // Filter + Search State //
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Filter Logic //
  const filteredInterviews = interviews.filter((item) => {
    const matchesStatus =
      activeFilter === "All" ? true : item.status === activeFilter;

    const matchesSearch =
      search.trim() === ""
        ? true
        : item.candidateId.toLowerCase().includes(search.toLowerCase()) ||
        item.interviewer.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Pagination //
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage =
    Number(searchParams.get("page")) || 1;

  const interviewsPerPage = 20;

  const totalPages = Math.ceil(
    filteredInterviews.length / interviewsPerPage
  );

  const indexOfLastInterview =
    currentPage * interviewsPerPage;

  const indexOfFirstInterview =
    indexOfLastInterview - interviewsPerPage;

  const currentInterviews =
    filteredInterviews.slice(
      indexOfFirstInterview,
      indexOfLastInterview
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

  // Theme //
  const primaryColor = "#2563eb";
  const subText = darkMode
    ? "#94a3b8"
    : "#64748b";

  const borderStyle = darkMode
    ? "rgba(255,255,255,.08)"
    : "rgba(15,23,42,.08)";

  // Status Chip //
  const getStatusChip = (status) => {
    const styles = {
      Scheduled: {
        bg: "rgba(37,99,235,.12)",
        color: "#2563eb",
      },

      Rescheduled: {
        bg: "rgba(245,158,11,.12)",
        color: "#f59e0b",
      },

      Completed: {
        bg: "rgba(16,185,129,.12)",
        color: "#10b981",
      },

      Cancelled: {
        bg: "rgba(239,68,68,.12)",
        color: "#ef4444",
      },
    };

    const current = styles[status] || styles.Scheduled;

    return (
      <Chip
        label={status}
        size="small"
        sx={{
          fontWeight: 800,
          fontSize: {
            xs: ".65rem",
            md: ".73rem"
          },
          height: {
            xs: 24,
            md: 28
          },
          bgcolor: current.bg,
          color: current.color,
          border: `1px solid ${current.color}33`,
        }}
      />
    );
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
        {/* Page Header + Search */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: {
              xs: 1.5,
              md: 2
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "1.45rem",
                sm: "1.7rem",
                md: "2rem",
                lg: "2.2rem",
              },
              mb: {
                xs: 0,
                md: 0.5,
              },
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
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: {
                  xs: "100%",
                  md: 300,
                },
                bgcolor: darkMode ? "#1e293b" : "#fff",
                border: `1px solid ${borderStyle}`,
                borderRadius: "10px",
                px: 2,
              }}
            >
              <FaSearch color={darkMode ? "#94a3b8" : "#64748b"} />

              <input
                type="text"
                placeholder="Search candidate or interviewer..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchParams({ page: "1" });
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: darkMode ? "#fff" : "#111827",
                  fontSize: ".9rem",
                }}
              />
            </Box>

            <Button
              component={Link}
              to="/interview-schedule"
              variant="contained"
              startIcon={<FaPlus size={11} />}
              sx={{
                px: {
                  xs: 2,
                  md: 3.2
                },

                py: {
                  xs: 1,
                  md: 1.3
                },

                fontSize: {
                  xs: ".82rem",
                  md: ".9rem"
                },
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                flexShrink: 0,
                whiteSpace: "nowrap",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                background:
                  "linear-gradient(135deg,#2563eb,#1d4ed8)",
                boxShadow:
                  "0 8px 18px rgba(37,99,235,.28)",
                transition: ".25s",
                "&:hover": {
                  background:
                    "linear-gradient(135deg,#1d4ed8,#1e40af)",
                  transform: "translateY(-2px)",
                  boxShadow:
                    "0 12px 24px rgba(37,99,235,.35)",
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
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {[
            "All",
            "Scheduled",
            "Completed",
            "Cancelled",
            "Rescheduled",
          ].map((filter) => (
            <Button
              key={filter}
              size="small"
              variant="outlined"
              onClick={() => {
                setActiveFilter(filter);
                setSearchParams({ page: "1" });
              }}
              sx={{
                flexShrink: 0,
                borderRadius: "30px",
                px: {
                  xs: 1.6,
                  sm: 2.2,
                  md: 2.4
                },

                py: {
                  xs: .6,
                  md: .8
                },

                fontSize: {
                  xs: ".67rem",
                  sm: ".8rem",
                  md: ".82rem"
                },
                textTransform: "none",
                fontWeight: 700,
                borderColor:
                  activeFilter === filter
                    ? primaryColor
                    : borderStyle,
                color:
                  activeFilter === filter
                    ? "#fff"
                    : darkMode
                      ? "#cbd5e1"
                      : "#475569",
                bgcolor:
                  activeFilter === filter
                    ? primaryColor
                    : "transparent",
                boxShadow:
                  activeFilter === filter
                    ? "0 6px 14px rgba(37,99,235,.22)"
                    : "none",
                "&:hover": {
                  borderColor: primaryColor,
                  bgcolor:
                    activeFilter === filter
                      ? "#1d4ed8"
                      : darkMode
                        ? "rgba(255,255,255,.05)"
                        : "rgba(37,99,235,.05)",
                },
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      </Box>

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
            width: "100%",
            flex: 1,
            overflowX: "auto",
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
                bgcolor: darkMode
                  ? "#1e293b"
                  : "#f8fafc",
              },
            }}
            >
              <TableRow
                sx={{
                  bgcolor: darkMode
                    ? "rgba(15,23,42,.55)"
                    : "#f8fafc",
                }}
              >
                <TableCell align="center"
                  sx={{
                    color: darkMode ? "#fff" : "#0f172a",
                    fontWeight: 700,
                    fontSize: {
                      xs: ".82rem",
                      md: "1rem"
                    },
                    borderBottom: `1px solid ${borderStyle}`
                  }}
                >
                  Candidate Id
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#0f172a",
                    fontWeight: 700,
                    fontSize: {
                      xs: ".82rem",
                      md: "1rem"
                    },
                    borderBottom: `1px solid ${borderStyle}`
                  }}
                >
                  Round
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#0f172a",
                    fontWeight: 700,
                    fontSize: {
                      xs: ".82rem",
                      md: "1rem"
                    },
                    borderBottom: `1px solid ${borderStyle}`
                  }}
                >
                  Schedule
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#0f172a",
                    fontWeight: 700,
                    fontSize: {
                      xs: ".82rem",
                      md: "1rem"
                    },
                    borderBottom: `1px solid ${borderStyle}`
                  }}
                >
                  Interviewer
                </TableCell>

                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#0f172a",
                    fontWeight: 700,
                    fontSize: {
                      xs: ".82rem",
                      md: "1rem"
                    },
                    borderBottom: `1px solid ${borderStyle}`
                  }}
                >
                  Status
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
              {currentInterviews.length > 0 ? (
                currentInterviews.map((interview) => (
                  <TableRow key={interview.interviewId}>

                    <TableCell
                      sx={{
                        fontSize: {
                          xs: ".8rem",
                          md: ".92rem"
                        },
                        color: darkMode ? "#fff" : "#0f172a",
                      }}
                    >
                      <Box sx={{
                        display: "flex", alignItems: "center", gap: {
                          xs: 1.5,
                          md: 2
                        }
                      }}>
                        <Avatar
                          sx={{
                            width: {
                              xs: 32,
                              md: 40
                            },

                            height: {
                              xs: 32,
                              md: 40
                            },
                            background:
                              "linear-gradient(135deg,#2563eb,#7c3aed)",
                            fontWeight: 700,
                            boxShadow: "0 6px 14px rgba(37,99,235,.25)",
                          }}
                        >
                          <FaUser size={16} />
                        </Avatar>

                        <Typography
                          sx={{
                            fontSize: {
                              xs: ".82rem",
                              md: ".95rem"
                            },
                            color: darkMode ? "#fff" : "#0f172a",
                          }}
                        >
                          {interview.candidateId}
                        </Typography>
                      </Box>
                    </TableCell>


                    <TableCell
                      sx={{
                        color: darkMode ? "#e2e8f0" : "#0f172a",
                      }}
                    >
                      {interview.round}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: {
                          xs: ".8rem",
                          md: ".92rem"
                        },
                        color: darkMode ? "#e2e8f0" : "#0f172a",
                      }}
                    >
                      {`${interview.date} • ${interview.time}`}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: {
                          xs: ".8rem",
                          md: ".92rem"
                        },
                        color: darkMode ? "#e2e8f0" : "#0f172a",
                      }}
                    >
                      <Box>
                        <Typography fontWeight={600}>
                          {interview.interviewer}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {interview.mode}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      {getStatusChip(interview.status)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6, color: subText }}>
                    No interviews found matching this filter or search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer info & Pagination */}
        <Box
          sx={{
            p: { xs: 1.5, md: 2.5 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 1.5, md: 2 },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            borderTop: `1px solid ${borderStyle}`,
            bgcolor: darkMode ? "rgba(59,130,246,.05)" : "#F8FAFC",
          }}
        >
          <Typography sx={{ color: subText, fontSize: { xs: ".72rem", md: ".82rem" }, }}>
            {filteredInterviews.length > 0 ? (
              <>
                Page {currentPage} of {totalPages} • Showing <strong>{indexOfFirstInterview + 1}</strong>-
                <strong>
                  {Math.min(indexOfLastInterview, filteredInterviews.length)}
                </strong>{" "}
                of <strong>{filteredInterviews.length}</strong> Interviews
              </>
            ) : (
              "No interviews found"
            )}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "space-between",
                sm: "center",
                md: "flex-end",
              },
              width: {
                xs: "100%",
                md: "auto",
              },
              gap: {
                xs: 0.3,
                sm: 0.5,
              },
              flexWrap: {
                xs: "nowrap",
                md: "wrap",
              },
              overflowX: "auto",
              overflowY: "hidden",
              pb: 0.5,

              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            <Button
              size="small"
              disabled={currentPage === 1}
              sx={{
                minWidth: { xs: 34, md: 36 },
                width: { xs: 34, md: 36 },
                height: { xs: 34, md: 36 },
                p: 0,
                flexShrink: 0,
              }}
              onClick={() =>
                setSearchParams({
                  page: String(Math.max(currentPage - 1, 1)),
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
                        page: String(page),
                      });
                    }
                  }}
                  variant={Number(currentPage) === Number(page) ? "contained" : "text"}
                  sx={{
                    minWidth: { xs: 34, md: 36 },
                    width: { xs: 34, md: 36 },
                    height: { xs: 34, md: 36 },
                    p: 0,
                    flexShrink: 0,
                    fontSize: {
                      xs: ".72rem",
                      md: ".9rem",
                    },
                    bgcolor:
                      Number(currentPage) === Number(page)
                        ? "#3B82F6"
                        : "transparent",
                    color:
                      Number(currentPage) === Number(page)
                        ? "#fff"
                        : darkMode
                          ? "#fff"
                          : "#0f172a",
                    "&:hover": {
                      bgcolor:
                        Number(currentPage) === Number(page)
                          ? "#2563EB"
                          : "rgba(59,130,246,.08)",
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
              sx={{
                minWidth: { xs: 34, md: 36 },
                width: { xs: 34, md: 36 },
                height: { xs: 34, md: 36 },
                p: 0,
                flexShrink: 0,
              }}
              onClick={() =>
                setSearchParams({
                  page: String(Math.min(currentPage + 1, totalPages)),
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