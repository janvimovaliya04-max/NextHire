import { useState, useEffect, useRef, useCallback } from "react";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import {
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

import {
  UserPlus,
  CalendarDays,
  ClipboardCheck,
  Hourglass,
  ListChecks,
} from "lucide-react";

// Adjust this path to match where you place the JSON file
import allNotifications from "../../data/interviewerNotifications.json";

const PAGE_SIZE = 10;
const READ_STORAGE_KEY = "interviewer_read_notifications";

export default function InterviewerNotifications() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Dashboard / Settings / Evaluations)
  const primary = colors.primary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

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
        return <UserPlus sx={iconStyle} />;

      case "scheduled":
        return <CalendarDays sx={iconStyle} />;

      case "pending":
        return <Hourglass sx={iconStyle} />;

      case "submitted":
        return <ClipboardCheck sx={iconStyle} />;

      default:
        return <CalendarDays sx={iconStyle} />;
    }
  };

  // Single consistent accent for every notification card — theme primary
  const getColor = () => primary;

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
              color: textColor,
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
          startIcon={<ListChecks sx={{ fontSize: 18 }} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: ".85rem",
            borderRadius: 3,
            px: 2.2,
            py: 0.9,
            color: unreadCount === 0 ? subText : primary,
            border: `1px solid ${unreadCount === 0
              ? borderStyle
              : `${primary}66`
              }`,
            "&:hover": {
              bgcolor: unreadCount === 0
                ? "transparent"
                : `${primary}0f`,
              borderColor: unreadCount === 0
                ? borderStyle
                : primary,
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
                  ? colors.card
                  : `${primary}08`,

                backdropFilter: "blur(10px)",

                color: textColor,

                border: `1px solid ${borderStyle}`,

                borderLeft: `5px solid ${getColor()}`,

                opacity: isRead ? 0.72 : 1,

                transition: "all .3s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                  filter: "brightness(1.03)",
                  opacity: 1,
                  boxShadow: colors.shadow,
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
                      ? `${getColor()}22`
                      : `${getColor()}15`,

                    color: getColor(),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 6px 18px ${getColor()}30`
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
                          bgcolor: primary,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <Typography variant="h6" fontWeight="800" sx={{
                      fontSize: {
                        xs: ".95rem",
                        sm: "1.08rem"
                      }, lineHeight: 1.2, mb: 0.5, color: textColor
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
                      color: subText,
                      mb: 1,
                    }}
                  >
                    {item.message}
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: subText,

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
            <CircularProgress size={28} sx={{ color: primary }} />
          </Box>
        )}

        {!hasMore && notifications.length > 0 && (
          <Typography
            sx={{
              textAlign: "center",
              py: 3,
              fontSize: ".85rem",
              fontWeight: 600,
              color: subText,
            }}
          >
            You're all caught up
          </Typography>
        )}
      </Box>

    </InterviewerLayout>
  );
}