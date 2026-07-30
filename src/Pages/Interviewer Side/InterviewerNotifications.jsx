import { useState, useEffect, useRef, useCallback } from "react";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EventIcon from "@mui/icons-material/Event";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// Adjust this path to match where you place the JSON file
import allNotifications from "../../data/interviewerNotifications.json";

const PAGE_SIZE = 10;
const READ_STORAGE_KEY = "interviewer_read_notifications";

export default function InterviewerNotifications() {
  const { darkMode } = useTheme();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Track which notification ids have been read, persisted in localStorage
  const [readIds, setReadIds] = useState(() => {
    try {
      const stored = localStorage.getItem(READ_STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...readIds]));
    } catch {
      // localStorage unavailable — ignore
    }
  }, [readIds]);

  const notifications = allNotifications.slice(0, visibleCount);
  const hasMore = visibleCount < allNotifications.length;
  const unreadCount = allNotifications.filter((n) => !readIds.has(n.id)).length;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    // Simulate async fetch delay; replace with a real API call if needed
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allNotifications.length));
      setLoading(false);
    }, 400);
  }, [loading, hasMore]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore]);

  const markAsRead = (id) => {
    setReadIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const markAllAsRead = () => {
    setReadIds(new Set(allNotifications.map((n) => n.id)));
  };

  const getIcon = (type) => {
    const iconStyle = { fontSize: 22 };

    switch (type) {
      case "assigned":
        return <PersonAddAlt1Icon sx={iconStyle} />;

      case "scheduled":
        return <EventIcon sx={iconStyle} />;

      case "pending":
        return <HourglassEmptyIcon sx={iconStyle} />;

      case "submitted":
        return <AssignmentTurnedInIcon sx={iconStyle} />;

      default:
        return <EventIcon sx={iconStyle} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "assigned":
        return "#2563eb";

      case "scheduled":
        return "#f59e0b";

      case "pending":
        return "#ef4444";

      case "submitted":
        return "#10b981";

      default:
        return "#8b5cf6";
    }
  };

  return (
    <InterviewerLayout>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-0.03em",
              fontSize: {
                xs: "1.6rem",
                sm: "2rem",
                md: "2.2rem",
              },
              color: darkMode ? "#ffffff" : "#0f172a",
            }}
          >
            Notifications
          </Typography>

          {unreadCount > 0 && (
            <Box
              sx={{
                bgcolor: "#ef4444",
                color: "#fff",
                fontWeight: 700,
                fontSize: ".75rem",
                borderRadius: "999px",
                px: 1.3,
                py: 0.3,
                lineHeight: 1.4,
              }}
            >
              {unreadCount} new
            </Box>
          )}
        </Box>

        <Button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          startIcon={<DoneAllIcon sx={{ fontSize: 18 }} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: ".85rem",
            borderRadius: 3,
            px: 2.2,
            py: 0.9,
            color: unreadCount === 0 ? (darkMode ? "#475569" : "#94a3b8") : "#14b8a6",
            border: `1px solid ${unreadCount === 0
              ? darkMode ? "#334155" : "#e2e8f0"
              : "rgba(20,184,166,.4)"
              }`,
            "&:hover": {
              bgcolor: unreadCount === 0
                ? "transparent"
                : darkMode ? "rgba(20,184,166,.1)" : "rgba(20,184,166,.06)",
              borderColor: unreadCount === 0
                ? darkMode ? "#334155" : "#e2e8f0"
                : "#14b8a6",
            },
          }}
        >
          Mark all as read
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, maxWidth: 850, mx: "auto" }}>
        {notifications.map((item) => {
          const isRead = readIds.has(item.id);
          return (
            <Paper
              key={item.id}
              elevation={0}
              onClick={() => markAsRead(item.id)}
              sx={{
                p: {
                  xs: 2.5,
                  sm: 3,
                  md: 3.5,
                },

                borderRadius: 5,
                cursor: "pointer",

                bgcolor: isRead
                  ? darkMode ? "#1e293b" : "#ffffff"
                  : darkMode ? "rgba(20,184,166,.05)" : "rgba(20,184,166,.035)",

                backdropFilter: "blur(10px)",

                color: darkMode
                  ? "#ffffff"
                  : "#0f172a",

                border: `1px solid ${darkMode
                  ? "#334155"
                  : "#e2e8f0"
                  }`,

                borderLeft: `5px solid ${getColor(item.type)}`,

                opacity: isRead ? 0.72 : 1,

                transition: "all .3s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                  filter: "brightness(1.03)",
                  opacity: 1,
                  boxShadow: darkMode
                    ? "0 18px 40px rgba(0,0,0,.45)"
                    : "0 18px 40px rgba(0,0,0,.08)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: {
                    xs: 2,
                    sm: 2.5,
                  },
                }}
              >
                {/* Icon Container */}
                <Box
                  sx={{
                    width: {
                      xs: 42,
                      sm: 48,
                    },

                    height: {
                      xs: 42,
                      sm: 48,
                    },

                    borderRadius: 4,
                    bgcolor: darkMode
                      ? `${getColor(item.type)}22`
                      : `${getColor(item.type)}15`,

                    color: getColor(item.type),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 6px 18px ${getColor(item.type)}30`
                  }}
                >
                  {getIcon(item.type)}
                </Box>

                {/* Content */}
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {!isRead && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "#14b8a6",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <Typography variant="h6" fontWeight="800" sx={{
                      fontSize: {
                        xs: ".95rem",
                        sm: "1.08rem"
                      }, lineHeight: 1.2, mb: 0.5
                    }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: ".82rem",
                        sm: ".92rem",
                      },
                      color: darkMode ? "#94a3b8" : "#64748b",
                      mb: 1,
                    }}
                  >
                    {item.message}
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: darkMode
                      ? "rgba(148,163,184,.8)"
                      : "#94a3b8",

                    letterSpacing: ".03em", fontWeight: 700, fontSize: ".75rem"
                  }}>
                    {item.time}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        })}

        {/* Sentinel element + loading indicator for infinite scroll */}
        {hasMore && (
          <Box
            ref={loaderRef}
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 3,
            }}
          >
            <CircularProgress size={28} sx={{ color: "#14b8a6" }} />
          </Box>
        )}

        {!hasMore && notifications.length > 0 && (
          <Typography
            sx={{
              textAlign: "center",
              py: 3,
              fontSize: ".85rem",
              fontWeight: 600,
              color: darkMode ? "#64748b" : "#94a3b8",
            }}
          >
            You're all caught up
          </Typography>
        )}
      </Box>

    </InterviewerLayout>
  );
}