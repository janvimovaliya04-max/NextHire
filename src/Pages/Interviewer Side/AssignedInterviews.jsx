import interviewsData from "../../data/assignedInterviews.json";
import { TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
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

import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const STATUS_FILTERS = ["All", "Scheduled", "Completed", "Cancelled", "Rescheduled"];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function AssignedInterviews() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Dashboard / Settings / Interviews)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Status color map — semantic (not brand), "Completed" ties to theme secondary for variety
  const STATUS_COLORS = {
    Scheduled: { main: primary, bgLight: `${primary}0f`, bgDark: `${primary}1f` },
    Completed: { main: secondary || primary, bgLight: `${secondary || primary}0f`, bgDark: `${secondary || primary}1f` },
    Cancelled: { main: "#ef4444", bgLight: "rgba(239,68,68,.06)", bgDark: "rgba(239,68,68,.12)" },
    Rescheduled: { main: "#eab308", bgLight: "rgba(234,179,8,.08)", bgDark: "rgba(234,179,8,.15)" },
  };

  const [search, setSearch] = useState("");

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
      main: subText,
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

          bgcolor: colors.card,

          border: `1px solid ${borderStyle}`,

          boxShadow: colors.shadow,
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
              color: textColor,
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
                  <Search color={primary} />
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
                    : subText,
                borderColor:
                  activeFilter === status
                    ? primary
                    : borderStyle,
                bgcolor:
                  activeFilter === status
                    ? primary
                    : "transparent",
                boxShadow:
                  activeFilter === status
                    ? `0 12px 22px ${primary}40`
                    : "none",
                "&:hover": {
                  borderColor: primary,
                  bgcolor:
                    activeFilter === status
                      ? primary
                      : `${primary}0d`,
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
          p: 0,
          bgcolor: colors.card,
          backdropFilter: "blur(16px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
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
                  Date & Time
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}` }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ color: textColor, fontWeight: 700, fontSize: "1rem", borderBottom: `1px solid ${borderStyle}`, pr: 4 }}>
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
                              background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                              boxShadow: `0 6px 18px ${primary}4d`,
                              color: "#ffffff",
                              fontWeight: "bold",
                              width: 36,
                              height: 36,
                              fontSize: ".9rem",
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
                      <TableCell sx={{ color: textColor, borderBottom: `1px solid ${borderStyle}`, fontWeight: 600, fontSize: "0.9rem" }}>
                        {row.position}
                      </TableCell>

                      {/* Date & Time */}
                      <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                        <Box>
                          <Typography sx={{ color: textColor, fontWeight: 600, fontSize: "0.9rem" }}>
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
                            background: `linear-gradient(90deg, ${primary}, ${secondary || primary})`,
                            boxShadow: `0 4px 14px ${primary}4d`,
                            "&:hover": {
                              background: `linear-gradient(90deg, ${primary}, ${primary})`,
                              boxShadow: `0 8px 20px ${primary}66`,
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
                  color: textColor,
                  height: { xs: 28, md: 32 },
                  minWidth: { xs: 50, md: 68 },
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
                  status: activeFilter,
                  page: String(currentPage - 1),
                  perPage: interviewsPerPage,
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
                  status: activeFilter,
                  page: String(currentPage + 1),
                  perPage: interviewsPerPage,
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