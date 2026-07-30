import myinterviews from "../../data/myinterviews.json";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import { TextField, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import {
  Typography,
  Paper,
  Box,
  Button,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  FaCalendarAlt,
  FaUserTie,
  FaClock,
  FaLaptop,
} from "react-icons/fa";

export default function MyInterviews() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");

  const PER_LOAD = 4;

  const filteredInterviews = myinterviews.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.company.toLowerCase().includes(keyword) ||
      item.position.toLowerCase().includes(keyword) ||
      item.interviewer.toLowerCase().includes(keyword) ||
      item.status.toLowerCase().includes(keyword) ||
      item.mode.toLowerCase().includes(keyword)
    );
  });

  const [visibleInterviews, setVisibleInterviews] = useState(
    filteredInterviews.slice(0, PER_LOAD)
  );

  useEffect(() => {
    setVisibleInterviews(filteredInterviews.slice(0, PER_LOAD));
    setHasMore(filteredInterviews.length > PER_LOAD);
  }, [search]);

  const loadMore = () => {
    setTimeout(() => {
      const next = filteredInterviews.slice(
        visibleInterviews.length,
        visibleInterviews.length + PER_LOAD
      );
      if (next.length === 0) {
        setHasMore(false);
        return;
      }
      setVisibleInterviews((prev) => [...prev, ...next]);
    }, 700);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("interviewScroll");

    if (saved) {
      window.scrollTo(0, Number(saved));
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.setItem(
        "interviewScroll",
        window.scrollY
      );
    };
  }, []);

  const [hasMore, setHasMore] = useState(true);

  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle =
    darkMode
      ? "rgba(255,255,255,.06)"
      : "rgba(0,0,0,.05)";

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  return (
    <CandidateLayout>

      {/* STICKY HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,

          bgcolor: darkMode ? "#0f172a" : "#f8fafc",
          px: { xs: 2, md: 4 },
          py: 2,
          mb: 3,

          borderBottom: `1px solid ${borderStyle}`,

          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },

          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            md: "center",
          },

          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 850,
            letterSpacing: "-0.03em",
            color: darkMode ? "#fff" : "#0f172a",

            mb: -1,
            fontSize: {
              xs: "1.45rem",
              sm: "1.75rem",
              md: "2rem",
              lg: "2.2rem",
            },
          }}
        >
          My Interviews
        </Typography>

        <TextField

          placeholder="Search interviews..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{
            width: {
              xs: "100%",
              md: 350
            },
            mb: { xs: 1, md: 2, },
            "& .MuiOutlinedInput-root": {
              fontSize: { xs: ".85rem", md: ".95rem" },
              "& input": {
                py: { xs: 1.3, md: 1.7 }
              },
              borderRadius: "14px",
              bgcolor: darkMode
                ? "rgba(30,41,59,.45)"
                : "#fff",
              color: darkMode ? "#fff" : "#0f172a",
              "& fieldset": {
                borderColor: borderStyle,
              },
              "&:hover fieldset": {
                borderColor: "#2563eb",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2563eb",
              },
            },
            "& input::placeholder": {
              color: darkMode ? "#94a3b8" : "#64748b",
              opacity: 1,
            },
          }}
        />
      </Box>

      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 3
        }}
      >
        <InfiniteScroll
          dataLength={visibleInterviews.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <Box
              sx={{
                display: "flex",

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },

                alignItems: {
                  xs: "center",
                  sm: "center",
                },
                bgcolor: darkMode ? "#0f172a" : "#f8fafc",
                gap: 2,
                justifyContent: "center",
                py: 3,
              }}
            >
              <CircularProgress sx={{ color: "#10b981" }} />
            </Box>
          }
          endMessage={
            <Typography
              align="center"
              sx={{ py: 3, color: subText }}
            >
              All interviews loaded.
            </Typography>
          }
        >

          {/* MAIN CARDS */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2,1fr)",
              },
              gap: 3,
            }}
          >
            {filteredInterviews.length > 0 ? (
              visibleInterviews.map((interview) => (
                <Paper
                  key={interview.interviewId}
                  elevation={6}
                  sx={{
                    p: {
                      xs: 2,
                      sm: 2.5,
                      md: 3,
                    },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 5,
                    bgcolor: darkMode
                      ? "rgba(30,41,59,.45)"
                      : "#ffffff",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${borderStyle}`,
                    boxShadow: darkMode
                      ? "0 10px 30px rgba(0,0,0,.25)"
                      : "0 10px 30px rgba(0,0,0,.02)",
                    color: darkMode ? "#ffffff" : "#000000",
                    transition: "all .25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "#10b981",
                      boxShadow: 10,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        flex: 1,
                        width: "100%",
                        minWidth: 0,
                      }}
                    >
                      <Avatar
                        sx={{
                          background: "linear-gradient(135deg,#10b981,#059669)",
                          width: {
                            xs: 44,
                            sm: 52,
                            md: 56,
                          },

                          height: {
                            xs: 44,
                            sm: 52,
                            md: 56,
                          },

                          fontSize: {
                            xs: "1rem",
                            sm: "1.2rem",
                            md: "1.35rem",
                          },
                          fontWeight: "bold",
                          boxShadow: 2,
                        }}
                      >
                        {interview.company.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "1rem",
                              sm: "1.15rem",
                              md: "1.25rem",
                            },
                            fontWeight: 800,
                            letterSpacing: "-0.01em",
                            color: darkMode ? "#fff" : "#0f172a",
                          }}
                        >
                          {interview.company}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: subText,
                            fontWeight: 600,
                            fontSize: {
                              xs: "0.82rem",
                              sm: "0.9rem"
                            }
                          }}
                        >
                          {interview.position}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "#10b981",
                            fontWeight: 600,
                            mt: 0.5,
                          }}
                        >
                          {interview.type}
                        </Typography>

                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: {
                              xs: "repeat(2, 1fr)", // mobile: 2 columns
                              sm: "1fr",            // tablet+: single column
                            },
                            gap: 1.2,
                            mt: 1,
                          }}
                        >
                          {/* Date & Time */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              color: darkMode ? "#cbd5e1" : "#475569",
                            }}
                          >
                            <FaCalendarAlt size={14} color="#10b981" />
                            <Typography variant="body2">
                              {interview.date}
                              <br />
                              {interview.time}
                            </Typography>
                          </Box>

                          {/* Interviewer */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              color: subText,
                            }}
                          >
                            <FaUserTie size={14} color="#3b82f6" />
                            <Typography variant="body2">
                              {interview.interviewer}
                            </Typography>
                          </Box>

                          {/* Duration */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color: subText,
                            }}
                          >
                            <FaClock size={14} color="#f59e0b" />
                            <Typography variant="body2">
                              {interview.duration}
                            </Typography>
                          </Box>

                          {/* Mode */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color: subText,
                            }}
                          >
                            <FaLaptop size={14} color="#8b5cf6" />
                            <Typography variant="body2">
                              {interview.mode}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "row",
                          sm: "column",
                        },
                        justifyContent: {
                          xs: "space-between",
                          sm: "space-between",
                        },
                        width: {
                          xs: "100%",
                          sm: "auto",
                        },
                        alignItems: {
                          xs: "center",
                          sm: "flex-end",
                        },
                        gap: 2,
                      }}
                    >
                      <Chip
                        label={interview.status}
                        sx={{
                          fontWeight: 700,
                          bgcolor:
                            interview.status === "Upcoming"
                              ? "rgba(59,130,246,.12)"
                              : interview.status === "Completed"
                                ? "rgba(16,185,129,.12)"
                                : interview.status === "Cancelled"
                                  ? "rgba(239,68,68,.12)"
                                  : "rgba(245,158,11,.12)",

                          color:
                            interview.status === "Upcoming"
                              ? "#3b82f6"
                              : interview.status === "Completed"
                                ? "#10b981"
                                : interview.status === "Cancelled"
                                  ? "#ef4444"
                                  : "#f59e0b",

                          border: "1px solid",
                          borderColor:
                            interview.status === "Upcoming"
                              ? "rgba(59,130,246,.25)"
                              : interview.status === "Completed"
                                ? "rgba(16,185,129,.25)"
                                : interview.status === "Cancelled"
                                  ? "rgba(239,68,68,.25)"
                                  : "rgba(245,158,11,.25)",
                        }}
                      />

                      {interview.status === "Upcoming" && (
                        <Button
                          component={Link}
                          to="/join-interview-c"
                          state={{ interview }}
                          variant="contained"
                          sx={{
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 700,

                            width: {
                              xs: "calc(100% - 120px)", // remaining space beside chip
                              sm: 170,
                              md: 180,
                            },

                            minWidth: 0,
                            maxWidth: {
                              xs: "220px",
                              sm: "none",
                            },

                            height: 44,

                            px: 2,

                            fontSize: {
                              xs: "0.82rem",
                              sm: "0.9rem",
                            },

                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",

                            background: "linear-gradient(90deg,#10b981,#059669)",

                            "&:hover": {
                              background: "linear-gradient(90deg,#10b981,#059669)",
                              transform: "translateY(-1px)",
                              boxShadow: "0 6px 16px rgba(16,185,129,.3)",
                            },
                          }}
                        >
                          Join Interview
                        </Button>
                      )}

                    </Box>
                  </Box>
                </Paper>
              ))
            ) : (
              <Paper
                elevation={6}
                sx={{
                  p: {
                    xs: 3,
                    sm: 5,
                    md: 6,
                  },
                  borderRadius: 5,
                  bgcolor: darkMode ? "#1e293b" : "#ffffff",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      bgcolor: "rgba(16,185,129,.1)",
                      color: "#10b981",
                      fontSize: 34,
                    }}
                  >
                    📅
                  </Avatar>
                  No Interviews Scheduled
                </Typography>

                <Typography sx={{ color: darkMode ? "#94a3b8" : "#64748b", mb: 3 }}>
                  You don't have any interviews yet.
                </Typography>

                <Button
                  component={Link}
                  to="/browse-jobs"
                  variant="contained"
                  sx={{
                    bgcolor: "#16a34a",
                    "&:hover": {
                      bgcolor: "#15803d",
                    },
                  }}
                >
                  Browse Jobs
                </Button>
              </Paper>
            )}
          </Box>
        </InfiniteScroll>
      </Box>
    </CandidateLayout>
  );
}