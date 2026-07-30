import NotificationData from "../../data/NotificationC.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Typography,
  Paper,
  Box,
  Button,
  Avatar,
  CircularProgress
} from "@mui/material";
import {
  FaUserPlus,
  FaCalendarAlt,
  FaClipboardCheck,
  FaAward,
  FaCheckDouble,
} from "react-icons/fa";

export default function CandidateNotifications() {
  const { darkMode } = useTheme();
  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle =
    darkMode
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(0, 0, 0, 0.05)";

  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState(NotificationData);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const LOAD_LIMIT = 10;

  useEffect(() => {
    const filtered =
      activeFilter === "All"
        ? notifications
        : notifications.filter(
          (item) => item.category === activeFilter
        );

    setVisibleNotifications(filtered.slice(0, LOAD_LIMIT));
    setHasMore(filtered.length > LOAD_LIMIT);
  }, [notifications, activeFilter]);

  const loadMoreNotifications = () => {
    const filtered =
      activeFilter === "All"
        ? notifications
        : notifications.filter(
          (item) => item.category === activeFilter
        );

    const nextItems = filtered.slice(
      visibleNotifications.length,
      visibleNotifications.length + LOAD_LIMIT
    );

    setTimeout(() => {
      setVisibleNotifications((prev) => [
        ...prev,
        ...nextItems,
      ]);

      if (
        visibleNotifications.length + nextItems.length >=
        filtered.length
      ) {
        setHasMore(false);
      }
    }, 1000);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "user":
        return <FaUserPlus size={16} />;
      case "assessment":
        return <FaClipboardCheck size={16} />;
      case "calendar":
        return <FaCalendarAlt size={16} />;
      case "award":
        return <FaAward size={16} />;
      default:
        return <FaUserPlus size={16} />;
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "candidateNotifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // Filtering Logic //
  const handleMarkAllRead = () => {
    const updated = notifications.map((item) => ({
      ...item,
      unread: false,
    }));

    setNotifications(updated);
  };

  return (
    <CandidateLayout>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: darkMode ? "#0f172a" : "#f8fafc",
          pb: 2,
        }}
      >
        {/* Title Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            gap: {
              xs: 1.5,
              sm: 2,
            },

            mb: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 850,
                letterSpacing: "-0.03em",
                mb: 0.5,
                color: darkMode ? "#fff" : "#0f172a",
                fontSize: {
                  xs: "1.45rem",
                  sm: "1.8rem",
                  md: "2rem",
                  lg: "2.2rem",
                },
              }}
            >
              Notification Center
            </Typography>

            <Typography
              sx={{
                mb: -2,
                fontSize: {
                  xs: ".82rem",
                  sm: ".88rem",
                  md: ".9rem",
                },
                color: subText
              }}
            >
              {notifications.filter(n => n.unread).length} unread notifications
            </Typography>
          </Box>

          <Button
            fullWidth={false}
            variant="outlined"
            disabled={!notifications.some((item) => item.unread)}
            onClick={handleMarkAllRead}
            startIcon={<FaCheckDouble size={11} />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              py: {
                xs: 1,
                sm: 1.1,
                md: 1.2,
              },

              px: {
                xs: 2,
                sm: 2.3,
                md: 2.5,
              },

              fontSize: {
                xs: ".8rem",
                sm: ".84rem",
                md: ".85rem",
              },

              borderRadius: {
                xs: "8px",
                sm: "10px",
              },
              fontWeight: 700,
              textTransform: "none",
              color: darkMode ? "#cbd5e1" : "#475569",
              borderColor: borderStyle,
              "&:hover": {
                borderColor: "#10b981",
                color: "#10b981",
                bgcolor: darkMode ? "rgba(16,185,129,0.03)" : "rgba(16,185,129,0.02)",
              }
            }}
          >
            Mark all as read
          </Button>
        </Box>

        {/* Filter panel options */}
        <Box
          sx={{
            display: "flex",

            overflowX: "auto",

            flexWrap: {
              xs: "nowrap",
              md: "wrap",
            },

            "&::-webkit-scrollbar": {
              display: "none",
            },

            scrollbarWidth: "none",

            gap: {
              xs: 1,
              sm: 1.2,
            },

            pb: 1,

            mb: {
              xs: 1,
              sm: 1,
              md: 1,
            },
          }}
        >
          {["All", "Applications", "Tests", "Schedule"].map((filter) => (
            <Button
              key={filter}
              variant="outlined"
              size="small"
              onClick={() => { setActiveFilter(filter) }}
              sx={{
                borderRadius: {
                  xs: "14px",
                  sm: "18px",
                  md: "20px",
                },
                textTransform: "none",
                fontWeight: 700,
                fontSize: {
                  xs: ".76rem",
                  sm: ".8rem",
                  md: ".82rem",
                },
                px: {
                  xs: 1.5,
                  sm: 2,
                  md: 2.2,
                },
                py: {
                  xs: 0.55,
                  sm: 0.65,
                  md: 0.7,
                },
                color: activeFilter === filter ? "#fff" : darkMode ? "#cbd5e1" : "#475569",
                borderColor: activeFilter === filter ? "#10b981" : borderStyle,
                background:
                  activeFilter === filter
                    ? "linear-gradient(90deg,#10b981,#059669)"
                    : "transparent",
                boxShadow: activeFilter === filter ? "0 4px 10px rgba(16,185,129,0.2)" : "none",
                "&:hover": {
                  borderColor: "#10b981",
                  background:
                    activeFilter === filter
                      ? "linear-gradient(90deg,#059669,#047857)"
                      : undefined,
                }
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Stacked Cards Feed */}
      <Box
        id="notificationScroll"
        sx={{
          height: {
            xs: "calc(100vh - 290px)",
            sm: "calc(100vh - 275px)",
            md: "calc(100vh - 255px)",
          },

          overflowY: "auto",
          pr: {
            xs: 0,
            md: 1,
          },

          "&::-webkit-scrollbar": {
            width: 8,
          },

          "&::-webkit-scrollbar-thumb": {
            background: "#94a3b8",
            borderRadius: "20px",
          },

          display: "flex",
          flexDirection: "column",

          gap: {
            xs: 2,
            sm: 2.3,
            md: 2.5,
          },
        }}
      >
        {visibleNotifications.length > 0 ? (
          <InfiniteScroll
            scrollableTarget="notificationScroll"
            dataLength={visibleNotifications.length}
            next={loadMoreNotifications}
            hasMore={hasMore}
            scrollThreshold="80%"
            endMessage={
              <Typography
                align="center"
                sx={{
                  py: {
                    xs: 2.5,
                    sm: 3,
                  },
                  color: subText,
                  fontWeight: 600,
                }}
              >
                No more notifications.
              </Typography>
            }
            loader={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 80,
                  py: 2,
                  width: "100%",
                }}
              >
                <CircularProgress
                  size={34}
                  thickness={4}
                  sx={{ color: "#10b981" }}
                />
              </Box>
            }
          >
            {
              visibleNotifications.map((item) => (

                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: {
                      xs: 2,
                      sm: 2.5,
                      md: 3,
                    },
                    borderRadius: {
                      xs: 3,
                      sm: 4,
                    },
                    bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${borderStyle}`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    "&:hover": {
                      transform: {
                        xs: "none",
                        md: "translateY(-5px)",
                      },
                      boxShadow: darkMode
                        ? "0 16px 35px rgba(16,185,129,.15)"
                        : "0 12px 30px rgba(16,185,129,.08)",
                      borderColor: item.color,
                    },
                  }}
                >
                  {/* Unread indicator dot on the left border */}
                  {item.unread && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: {
                          xs: 4,
                          sm: 5,
                        },

                        height: {
                          xs: 36,
                          sm: 45,
                        },
                        borderRadius: "0 8px 8px 0",
                        bgcolor: "#10b981", // Matches candidate layout color
                        boxShadow: "0 0 10px #10b981",
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                      justifyContent: "space-between",
                      alignItems: {
                        xs: "flex-start",
                        sm: "flex-start",
                      },
                      gap: {
                        xs: 1.5,
                        sm: 2,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 1.5, sm: 2 }, }}>
                      {/* Accent-Colored Icon Badge */}
                      <Avatar
                        sx={{
                          width: {
                            xs: 38,
                            sm: 42,
                          },
                          height: {
                            xs: 38,
                            sm: 42,
                          },
                          bgcolor: darkMode ? item.bgDark : item.bgLight,
                          color: item.color,
                          borderRadius: 2.5,
                          flexShrink: 0,
                        }}
                      >
                        {getIcon(item.icon)}
                      </Avatar>

                      <Box>
                        <Typography sx={{ color: darkMode ? "#ffffff" : "#0f172a", fontWeight: 800, fontSize: { xs: ".92rem", sm: ".97rem", md: "1rem" }, mb: 0.5, letterSpacing: "-0.01em" }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ color: darkMode ? "#cbd5e1" : "#475569", fontSize: { xs: ".8rem", sm: ".85rem", md: ".88rem", }, lineHeight: 1.65 }}>
                          {item.message}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Date / Time */}
                    <Typography
                      sx={{
                        fontSize: {
                          xs: ".74rem",
                          sm: ".78rem",
                          md: ".8rem",
                        },
                        color: subText,
                        fontWeight: 600,
                        alignSelf: {
                          xs: "flex-start",
                          sm: "flex-end",
                        },
                        mt: {
                          xs: 1,
                          sm: 0,
                        },
                        flexShrink: 0,
                      }}
                    >
                      {item.time}
                    </Typography>
                  </Box>
                </Paper>
              ))
            }
          </InfiniteScroll>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                sm: 4,
                md: 6,
              },
              borderRadius: 4,
              bgcolor: darkMode ? "rgba(30, 41, 59, 0.25)" : "#ffffff",
              border: `1px solid ${borderStyle}`,
              textAlign: "center",
              color: subText,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: {
                  xs: 1.5,
                  sm: 2,
                }
              }}
            >
              <FaCheckDouble
                size={32}
                color="#10b981"
              />
            </Box>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "1rem",
                  sm: "1.05rem",
                  md: "1.1rem",
                },
                mb: 1
              }}
            >
              You're all caught up!
            </Typography>

            <Typography
              sx={{
                color: subText
              }}
            >
              No notifications available.
            </Typography>
          </Paper>
        )}
      </Box>
    </CandidateLayout>
  );
}