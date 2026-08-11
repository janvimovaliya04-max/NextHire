import myinterviews from "../../data/myinterviews.json";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { TextField } from "@mui/material";
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
  Calendar,
  UserRound,
  Clock,
  Laptop,
} from "lucide-react";

export default function MyInterviews() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Dashboard / Assessment / BrowseJobs)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

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

  const [hasMore, setHasMore] = useState(true);

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

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  // Status accents — semantic (not brand), kept distinct from theme primary/secondary
  const statusColor = (status) =>
    status === "Upcoming"
      ? "#3b82f6"
      : status === "Completed"
        ? primary
        : status === "Cancelled"
          ? "#ef4444"
          : "#f59e0b";

  return (
    <CandidateLayout>

      {/* STICKY HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,

          bgcolor: colors.background || (darkMode ? "#0f172a" : "#f8fafc"),
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
            color: textColor,

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
              bgcolor: colors.card,
              color: textColor,
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
            "& input::placeholder": {
              color: subText,
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
                bgcolor: colors.background || (darkMode ? "#0f172a" : "#f8fafc"),
                gap: 2,
                justifyContent: "center",
                py: 3,
              }}
            >
              <CircularProgress sx={{ color: primary }} />
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
                    bgcolor: colors.card,
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${borderStyle}`,
                    boxShadow: colors.shadow,
                    color: textColor,
                    transition: "all .25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: primary,
                      boxShadow: colors.shadow,
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
                          background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
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
                            color: textColor,
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
                            color: primary,
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
                              color: subText,
                            }}
                          >
                            <Calendar size={14} color={primary} />
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
                            <UserRound size={14} color={secondary || primary} />
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
                            <Clock size={14} color="#f59e0b" />
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
                            <Laptop size={14} color={secondary || primary} />
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
                          bgcolor: `${statusColor(interview.status)}1f`,
                          color: statusColor(interview.status),
                          border: "1px solid",
                          borderColor: `${statusColor(interview.status)}40`,
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

                            background: `linear-gradient(90deg, ${primary}, ${secondary || primary})`,
                            boxShadow: `0 4px 12px ${primary}33`,

                            "&:hover": {
                              background: `linear-gradient(135deg, ${primary}, ${primary})`,
                              transform: "translateY(-1px)",
                              boxShadow: `0 10px 22px ${primary}59`,
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
                  bgcolor: colors.card,
                  border: `1px solid ${borderStyle}`,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: textColor }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      bgcolor: `${primary}1a`,
                      color: primary,
                      fontSize: 34,
                    }}
                  >
                    📅
                  </Avatar>
                  No Interviews Scheduled
                </Typography>

                <Typography sx={{ color: subText, mb: 3 }}>
                  You don't have any interviews yet.
                </Typography>

                <Button
                  component={Link}
                  to="/browse-jobs"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    background: `linear-gradient(90deg, ${primary}, ${secondary || primary})`,
                    "&:hover": {
                      background: `linear-gradient(90deg, ${primary}, ${primary})`,
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