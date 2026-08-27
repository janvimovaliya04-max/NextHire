import notificationsData from "../../data/notifications.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import HRLayout from "../../Layouts/HRLayout";
import {
  Typography,
  Paper,
  Box,
  Button,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";

import {
  Bell,
  UserPlus,
  Calendar,
  ClipboardCheck,
  ListChecks,
} from "lucide-react";
import SEO from "../../components/common/SEO";

export default function Notifications() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const [activeFilter, setActiveFilter] = useState("All");
  const notifications = notificationsData;
  const NOTIFICATIONS_PER_LOAD = 6;

  const [visibleNotifications, setVisibleNotifications] = useState(
    notifications.slice(0, NOTIFICATIONS_PER_LOAD)
  );

  const [loading, setLoading] = useState(true);

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  useEffect(() => {
    localStorage.setItem(
      "notificationsData",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = notifications.filter((notification) =>
    activeFilter === "All" ? true : notification.category === activeFilter
  );

  const handleMarkAllRead = () => {
    setVisibleNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  const loadMoreNotifications = () => {
    setTimeout(() => {
      setVisibleNotifications((prev) => [
        ...prev,
        ...notifications.slice(prev.length, prev.length + NOTIFICATIONS_PER_LOAD),
      ]);
    }, 800);
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Hiring":
        return { bg: `${primary}1f`, color: primary };
      case "Interviews":
        return { bg: "rgba(16, 185, 129, 0.12)", color: "#10b981" };
      default:
        return { bg: "rgba(245, 158, 11, 0.12)", color: "#f59e0b" };
    }
  };

  return (
    <HRLayout>
      {/* Dynamic SEO Tags Injection */}
      <SEO
        title="Notifications"
        description="Manage job postings, candidates, and interview schedules on NextHire HR Portal."
        canonicalUrl="/hr-portal/dashboard"
      />

      {/* Title & Banner Header */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          top: 0,
          zIndex: 20,
          p: { xs: 2, md: 3 },
          mb: 2,
          borderRadius: "20px",
          bgcolor: colors.card,
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.35rem",
                  sm: "1.7rem",
                  md: "2rem",
                  lg: "2.2rem",
                },
                fontWeight: 850,
                letterSpacing: "-0.03em",
                color: textColor,
              }}
            >
              Notifications Center
            </Typography>
          </Box>

          <Button
            fullWidth={{ xs: true, sm: false }}
            variant="outlined"
            onClick={handleMarkAllRead}
            startIcon={<ListChecks size={14} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: { xs: 1, md: 1.2 },
              px: { xs: 2, md: 2.5 },
              fontSize: { xs: ".78rem", md: ".85rem" },
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              color: subText,
              borderColor: borderStyle,
              "&:hover": {
                borderColor: primary,
                color: primary,
                bgcolor: `${primary}08`,
              },
            }}
          >
            Mark all as read
          </Button>
        </Box>

        {/* Filter panel options */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {["All", "Hiring", "Interviews"].map((filter) => (
            <Button
              key={filter}
              variant="outlined"
              size="small"
              onClick={() => setActiveFilter(filter)}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                minWidth: { xs: 70, md: 95 },
                fontSize: { xs: ".74rem", md: ".82rem" },
                px: { xs: 1.5, md: 2.2 },
                py: { xs: 0.55, md: 0.7 },
                color: activeFilter === filter ? "#fff" : subText,
                borderColor: activeFilter === filter ? primary : borderStyle,
                bgcolor: activeFilter === filter ? primary : "transparent",
                boxShadow:
                  activeFilter === filter ? `0 4px 10px ${primary}33` : "none",
                "&:hover": {
                  borderColor: primary,
                  bgcolor: activeFilter === filter ? primary : `${primary}08`,
                },
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Stacked Cards Feed */}
      <Box
        id="notificationScroll"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: 2,
            md: 4,
          },
          maxHeight: "75vh",
          overflow: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {filteredNotifications.length > 0 ? (
          <InfiniteScroll
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              overflow: "visible",
            }}
            dataLength={visibleNotifications.length}
            next={loadMoreNotifications}
            hasMore={visibleNotifications.length < notifications.length}
            loader={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 2,
                }}
              >
                <CircularProgress size={30} sx={{ color: primary }} />
              </Box>
            }
            scrollableTarget="notificationScroll"
          >
            {visibleNotifications
              .filter((item) =>
                activeFilter === "All"
                  ? true
                  : item.category === activeFilter
              )
              .map((item, index) => {
                const categoryStyle = getCategoryStyle(item.category);
                return (
                  <Paper
                    key={item.id ? `${item.id}-${index}` : `notification-${index}`}
                    elevation={0}
                    sx={{
                      position: "relative",
                      overflow: "auto",
                      cursor: "pointer",
                      p: {
                        xs: 1.5,
                        sm: 2.5,
                        md: 4,
                      },
                      borderRadius: {
                        xs: 3,
                        md: 5,
                      },
                      bgcolor: colors.card,
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${borderStyle}`,
                      boxShadow: darkMode
                        ? `
            0 10px 20px rgba(0,0,0,0.30),
            0 4px 8px rgba(0,0,0,0.20)
          `
                        : `
            0 12px 24px rgba(15,23,42,0.08),
            0 2px 6px rgba(15,23,42,0.05)
          `,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px) scale(1)",
                        borderColor: item.color || primary,
                        boxShadow: darkMode
                          ? "0 18px 38px rgba(0,0,0,.45)"
                          : `0 18px 40px ${primary}1f`,
                      },
                    }}
                  >
                    {/* Unread dot indicator on the left border */}
                    {item.unread && (
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: {
                            xs: 3,
                            md: 4,
                          },
                          height: {
                            xs: 24,
                            md: 32,
                          },
                          borderRadius: "0 4px 4px 0",
                          bgcolor: primary,
                          boxShadow: `0 0 10px ${primary}`,
                        }}
                      />
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: {
                              xs: 38,
                              sm: 44,
                              md: 48,
                            },
                            height: {
                              xs: 38,
                              sm: 44,
                              md: 48,
                            },
                            bgcolor: categoryStyle.bg,
                            color: categoryStyle.color,
                          }}
                        >
                          {item.category === "Hiring" ? (
                            <UserPlus size={window.innerWidth < 600 ? 13 : 16} />
                          ) : item.category === "Interviews" ? (
                            <Calendar size={window.innerWidth < 600 ? 13 : 16} />
                          ) : (
                            <ClipboardCheck size={window.innerWidth < 600 ? 13 : 16} />
                          )}
                        </Avatar>

                        <Box>
                          <Typography
                            sx={{
                              color: textColor,
                              fontWeight: 800,
                              fontSize: {
                                xs: ".88rem",
                                sm: ".98rem",
                                md: "1.08rem",
                              },
                              mb: 0.5,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: subText,
                              fontSize: {
                                xs: ".76rem",
                                sm: ".84rem",
                                md: ".9rem",
                              },
                              opacity: 0.9,
                              lineHeight: 1.5,
                            }}
                          >
                            {item.message}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Date / Time element */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "row", sm: "column" },
                          justifyContent: "space-between",
                          alignItems: { xs: "center", sm: "flex-end" },
                          width: { xs: "100%", sm: "auto" },
                          gap: 1,
                        }}
                      >
                        {item.unread && (
                          <Chip
                            label="NEW"
                            size="small"
                            sx={{
                              bgcolor: item.color || primary,
                              color: "#fff",
                              fontWeight: 700,
                              height: {
                                xs: 20,
                                md: 22,
                              },
                              fontSize: {
                                xs: ".6rem",
                                md: ".68rem",
                              },
                            }}
                          />
                        )}

                        <Typography
                          sx={{
                            fontSize: {
                              xs: ".7rem",
                              md: ".78rem",
                            },
                            color: subText,
                            fontWeight: 600,
                          }}
                        >
                          {item.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
          </InfiniteScroll>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                md: 6,
              },
              borderRadius: {
                xs: 3,
                md: 4,
              },
              bgcolor: colors.card,
              border: `1px solid ${borderStyle}`,
              textAlign: "center",
              color: subText,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  width: {
                    xs: 56,
                    md: 70,
                  },
                  height: {
                    xs: 56,
                    md: 70,
                  },
                  bgcolor: `${primary}15`,
                  color: primary,
                }}
              >
                <Bell size={window.innerWidth < 600 ? 22 : 26} />
              </Avatar>

              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    md: "1.2rem",
                  },
                  fontWeight: 700,
                  color: textColor,
                }}
              >
                No Notifications
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: ".82rem",
                    md: ".95rem",
                  },
                  color: subText,
                }}
              >
                You're all caught up.
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </HRLayout>
  );
}