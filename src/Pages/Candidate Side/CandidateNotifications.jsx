import NotificationData from "../../data/NotificationC.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import {
  Typography,
  Paper,
  Box,
  Button,
  Avatar,
  CircularProgress
} from "@mui/material";
import {
  UserPlus,
  Calendar,
  ClipboardCheck,
  Award,
  ListChecks,
} from "lucide-react";

export default function CandidateNotifications() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Assessment / BrowseJobs / Dashboard)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState(NotificationData);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const LOAD_LIMIT = 10;

  // NotificationC.json ships each item with its own `color`/`bgLight`/`bgDark`
  // (that's where the earlier green came from). We ignore those and cycle
  // through the theme's primary/secondary instead, so this page always
  // matches whatever theme is active.
  const accentFor = (idx) => (idx % 2 === 0 ? primary : (secondary || primary));

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
        return <UserPlus size={16} />;
      case "assessment":
        return <ClipboardCheck size={16} />;
      case "calendar":
        return <Calendar size={16} />;
      case "award":
        return <Award size={16} />;
      default:
        return <UserPlus size={16} />;
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
          bgcolor: colors.background,
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
                color: textColor,
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
            startIcon={<ListChecks size={11} />}
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
              color: subText,
              borderColor: borderStyle,
              "&:hover": {
                borderColor: primary,
                color: primary,
                bgcolor: `${primary}08`,
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
                color: activeFilter === filter ? "#fff" : subText,
                borderColor: activeFilter === filter ? primary : borderStyle,
                background:
                  activeFilter === filter
                    ? `linear-gradient(90deg, ${primary}, ${secondary || primary})`
                    : "transparent",
                boxShadow: activeFilter === filter ? `0 4px 10px ${primary}33` : "none",
                "&:hover": {
                  borderColor: primary,
                  background:
                    activeFilter === filter
                      ? `linear-gradient(90deg, ${primary}, ${primary})`
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
            background: subText,
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
                  sx={{ color: primary }}
                />
              </Box>
            }
          >
            {
              visibleNotifications.map((item, idx) => {
                const accent = accentFor(idx);
                return (
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
                      bgcolor: colors.card,
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${borderStyle}`,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      "&:hover": {
                        transform: {
                          xs: "none",
                          md: "translateY(-5px)",
                        },
                        boxShadow: colors.shadow,
                        borderColor: accent,
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
                          bgcolor: primary,
                          boxShadow: `0 0 10px ${primary}`,
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
                        {/* Accent-Colored Icon Badge — theme-driven, not item.color */}
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
                            bgcolor: `${accent}14`,
                            color: accent,
                            borderRadius: 2.5,
                            flexShrink: 0,
                          }}
                        >
                          {getIcon(item.icon)}
                        </Avatar>

                        <Box>
                          <Typography sx={{ color: textColor, fontWeight: 800, fontSize: { xs: ".92rem", sm: ".97rem", md: "1rem" }, mb: 0.5, letterSpacing: "-0.01em" }}>
                            {item.title}
                          </Typography>
                          <Typography sx={{ color: subText, fontSize: { xs: ".8rem", sm: ".85rem", md: ".88rem", }, lineHeight: 1.65 }}>
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
                );
              })
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
              bgcolor: colors.card,
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
              <ListChecks
                size={32}
                color={primary}
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