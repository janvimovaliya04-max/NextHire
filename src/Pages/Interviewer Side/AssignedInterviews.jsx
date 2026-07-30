import interviewsData from "../../data/assignedInterviews.json";
import { TextField, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
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
  Select,
  MenuItem,
} from "@mui/material";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const STATUS_FILTERS = ["All", "Scheduled", "Completed", "Cancelled", "Rescheduled"];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

// Central color map for statuses — used by both the chips and the filter buttons
const STATUS_COLORS = {
  Scheduled: { main: "#14b8a6", bgLight: "rgba(20,184,166,.06)", bgDark: "rgba(20,184,166,.12)" },
  Completed: { main: "#0d9488", bgLight: "rgba(13,148,136,.06)", bgDark: "rgba(13,148,136,.12)" },
  Cancelled: { main: "#ef4444", bgLight: "rgba(239,68,68,.06)", bgDark: "rgba(239,68,68,.12)" },
  Rescheduled: { main: "#eab308", bgLight: "rgba(234,179,8,.08)", bgDark: "rgba(234,179,8,.15)" },
};

export default function AssignedInterviews() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const borderStyle = darkMode
    ? "rgba(255,255,255,.08)"
    : "rgba(15,23,42,.08)";
  const subText = darkMode ? "#9CA3AF" : "#6B7280";

  // Filtering Logic
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("status") || "All";
  const currentPage =
    Number(searchParams.get("page")) || 1;

  const interviewsPerPage =
    Number(searchParams.get("perPage")) || 10;

  const filteredInterviews = interviewsData.filter((row) => {
    const keyword = search.toLocaleLowerCase();

    const matchesSearch =
      row.candidate.toLowerCase().includes(keyword) ||
      row.position.toLowerCase().includes(keyword) ||
      row.date.toLowerCase().includes(keyword) ||
      row.time.toLowerCase().includes(keyword) ||
      row.status.toLowerCase().includes(keyword);

    const mathchesStatus =
      activeFilter === "All" || row.status === activeFilter;

    return matchesSearch && mathchesStatus;
  });

  // Pagination Logic //
  const totalPages = Math.ceil(
    filteredInterviews.length / interviewsPerPage
  );
  const indexOfLastInterview =
    currentPage * interviewsPerPage;
  const indexOfFirstInterview =
    indexOfLastInterview - interviewsPerPage;
  const currentInterviews = filteredInterviews.slice(
    indexOfFirstInterview,
    indexOfLastInterview
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

  const handleFilterChange = (status) => {
    setSearchParams({ status, page: 1, perPage: interviewsPerPage });
  };

  const handleRowsPerPageChange = (event) => {
    setSearchParams({ status: activeFilter, page: 1, perPage: Number(event.target.value) });
  };

  const getStatusColors = (status) =>
    STATUS_COLORS[status] || {
      main: "#64748b",
      bgLight: "rgba(100,116,139,.06)",
      bgDark: "rgba(100,116,139,.12)",
    };

  return (
    <InterviewerLayout>

      {/* Title & Banner Area */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          top: 0,
          zIndex: 20,
          p: {
            xs: 2,
            md: 3
          },

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
                md: "2rem"
              }
            }}
          >
            Interviews
          </Typography>

          <TextField
            size="small"
            placeholder="Search candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch color="#14b8a6" />
                </InputAdornment>
              )
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

                bgcolor: darkMode
                  ? "#1e293b"
                  : "#fff"
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
            "&::-webkit-scrollbar": {
              display: "none",
            },
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
                fontSize: {
                  xs: ".75rem",
                  md: ".85rem"
                },
                px: { xs: 1.5, md: 2.2 },
                py: { xs: 0.5, md: 0.7 },
                color:
                  activeFilter === status
                    ? "#fff"
                    : darkMode
                      ? "#cbd5e1"
                      : "#475569",
                borderColor:
                  activeFilter === status
                    ? "#14b8a6"
                    : borderStyle,
                bgcolor:
                  activeFilter === status
                    ? "#14b8a6"
                    : "transparent",
                boxShadow:
                  activeFilter === status
                    ? "0 12px 22px rgba(20,184,166,.25)"
                    : "none",
                "&:hover": {
                  borderColor: "#14b8a6",
                  bgcolor:
                    activeFilter === status
                      ? "#0d9488"
                      : darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
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
        }}
      >
        <TableContainer
          sx={{
            flex: 1,
            overflow: "auto",
            px: 3,
            pt: 3,
            pb: 0,
            p: {
              xs: 2,
              md: 3
            },

            overflowX: "auto",

            "&::-webkit-scrollbar": {

              height: 8
            }
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
                xs: 780,
                md: 900,
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
                  : "#f1f5f9",
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
                <TableCell sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Candidate
                </TableCell>
                <TableCell sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Position
                </TableCell>
                <TableCell sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Date & Time
                </TableCell>
                <TableCell sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}`, pr: 4 }}>
                  Action
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
              {filteredInterviews.length > 0 ? (
                currentInterviews.map((row) => {
                  const statusColors = getStatusColors(row.status);
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
                              bgcolor: "#0d9488",
                              boxShadow: "0 6px 18px rgba(20,184,166,.30)",
                              color: "#ffffff",
                              fontWeight: "bold",
                              width: 36,
                              height: 36,
                              fontSize: ".9rem",
                            }}
                          >
                            {row.candidate.charAt(0)}
                          </Avatar>
                          <Typography sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 700, fontSize: "0.95rem" }}>
                            {row.candidate}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Position */}
                      <TableCell sx={{ color: darkMode ? "#ffffff" : "#0f172a", borderBottom: `1px solid ${borderStyle}`, fontWeight: 600, fontSize: "0.9rem" }}>
                        {row.position}
                      </TableCell>

                      {/* Date & Time */}
                      <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                        <Box>
                          <Typography sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 600, fontSize: "0.9rem" }}>
                            {row.date}
                          </Typography>
                          <Typography variant="caption" sx={{ display: "block", mt: .25, color: subText }}>
                            {row.time}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Status Chip */}
                      <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: "0.72rem",
                            bgcolor: darkMode
                              ? statusColors.bgDark
                              : statusColors.bgLight,
                            color: statusColors.main,
                            border: `1px solid ${statusColors.main}4D`,
                          }}
                        />
                      </TableCell>

                      {/* Action */}
                      <TableCell align="right" sx={{ borderBottom: `1px solid ${borderStyle}`, pr: 4 }}>
                        <Button
                          component={Link}
                          to="/join-interview"
                          state={{ interview: row }}
                          variant="contained"
                          size="small"
                          sx={{
                            background: "linear-gradient(90deg,#14b8a6,#0d9488)",
                            boxShadow: "0 4px 14px rgba(20,184,166,.30)",
                            "&:hover": {
                              background: "linear-gradient(90deg,#0d9488,#115e59)",
                              boxShadow: "0 8px 20px rgba(20,184,166,.40)",
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
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6, color: subText }}>
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
                mb: -1,
                color: subText,
                fontSize: "0.82rem",
              }}
            > Showing{" "}
              <strong>
                {indexOfFirstInterview + 1}-
                {Math.min(indexOfLastInterview, filteredInterviews.length)}
              </strong>{" "}
              of{" "}
              <strong>{filteredInterviews.length}</strong>{" "}
              interviews
            </Typography>

            {/* Rows Per Page Selector */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ color: subText, fontSize: "0.8rem" }}>
                Rows per page:
              </Typography>
              <Select
                size="small"
                value={interviewsPerPage}
                onChange={handleRowsPerPageChange}
                sx={{
                  fontSize: "0.8rem",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  height: { xs: 28, md: 32 },
                  minWidth: { xs: 50, md: 68 },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: borderStyle,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#14b8a6",
                  },
                  "& .MuiSvgIcon-root": {
                    color: darkMode ? "#ffffff" : "#0f172a",
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
                  status: activeFilter,
                  page: String(currentPage - 1),
                  perPage: interviewsPerPage,
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
                        status: activeFilter,
                        page: String(page),
                        perPage: interviewsPerPage,
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
                  status: activeFilter,
                  page: String(currentPage + 1),
                  perPage: interviewsPerPage,
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