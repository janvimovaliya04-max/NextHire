import myinterviews from "../../data/myinterviews.json";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { TextField } from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
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
  GripVertical,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable wrapper for a single interview card
function SortableInterviewCard({ interview, primary, secondary, textColor, subText, borderStyle, colors, statusColor }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: interview.interviewId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={6}
      sx={{
        position: "relative",
        p: { xs: 2, sm: 2.5, md: 3 },
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
          transform: isDragging ? undefined : "translateY(-6px)",
          borderColor: primary,
          boxShadow: colors.shadow,
        },
      }}
    >
      {/* Drag handle */}
      <Box
        {...attributes}
        {...listeners}
        sx={{
          position: "absolute",
          top: 14,
          right: 14,
          cursor: "grab",
          color: subText,
          display: "flex",
          alignItems: "center",
          touchAction: "none",
          zIndex: 2,
          "&:active": { cursor: "grabbing" },
        }}
      >
        <GripVertical size={16} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
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
              width: { xs: 44, sm: 52, md: 56 },
              height: { xs: 44, sm: 52, md: 56 },
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
              fontWeight: "bold",
              boxShadow: 2,
            }}
          >
            {interview.company.charAt(0)}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
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
                fontSize: { xs: "0.82rem", sm: "0.9rem" }
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
                  xs: "repeat(2, 1fr)",
                  sm: "1fr",
                },
                gap: 1.2,
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, color: subText }}>
                <Calendar size={14} color={primary} />
                <Typography variant="body2">
                  {interview.date}
                  <br />
                  {interview.time}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, color: subText }}>
                <UserRound size={14} color={secondary || primary} />
                <Typography variant="body2">
                  {interview.interviewer}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: subText }}>
                <Clock size={14} color="#f59e0b" />
                <Typography variant="body2">
                  {interview.duration}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: subText }}>
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
            flexDirection: { xs: "row", sm: "column" },
            justifyContent: { xs: "space-between", sm: "space-between" },
            width: { xs: "100%", sm: "auto" },
            alignItems: { xs: "center", sm: "flex-end" },
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
              mt: { xs: 0, sm: 2.5 },
            }}
          />

          {interview.status === "Upcoming" && (
            <Button
              component={Link}
              to="/candidate/join-interview-c"
              state={{ interview }}
              variant="contained"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                width: {
                  xs: "calc(100% - 120px)",
                  sm: 170,
                  md: 180,
                },
                minWidth: 0,
                maxWidth: { xs: "220px", sm: "none" },
                height: 44,
                px: 2,
                fontSize: { xs: "0.82rem", sm: "0.9rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
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
  );
}

export default function MyInterviews() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const [globalFilter, setGlobalFilter] = useState("");

  const PER_LOAD = 4;

  // Headless columns — no visual cells needed, cards render manually below
  const columns = useMemo(() => [
    { accessorKey: "company" },
    { accessorKey: "position" },
    { accessorKey: "interviewer" },
    { accessorKey: "status" },
    { accessorKey: "mode" },
  ], []);

  const table = useReactTable({
    data: myinterviews,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const v = filterValue.toLowerCase();
      const item = row.original;
      return (
        item.company.toLowerCase().includes(v) ||
        item.position.toLowerCase().includes(v) ||
        item.interviewer.toLowerCase().includes(v) ||
        item.status.toLowerCase().includes(v) ||
        item.mode.toLowerCase().includes(v)
      );
    },
  });

  const filteredInterviews = table.getFilteredRowModel().rows.map((row) => row.original);

  // NEW: drag & drop order — tracks order of all currently filtered interviews.
  // Resyncs whenever the search/filter changes (new result set).
  // const [interviewOrder, setInterviewOrder] = useState(() =>
  //   filteredInterviews.map((i) => i.interviewId)
  // );

  const [interviewOrder, setInterviewOrder] = useState(() => {
    const savedOrder = localStorage.getItem("myInterviewsOrder");
    return savedOrder ? JSON.parse(savedOrder) : filteredInterviews.map((i) => i.interviewId);
  });


  // Final ordered list = filteredInterviews reshuffled by interviewOrder
  const orderedInterviews = interviewOrder
    .map((id) => filteredInterviews.find((i) => i.interviewId === id))
    .filter(Boolean);

  const [visibleCount, setVisibleCount] = useState(PER_LOAD);
  const [hasMore, setHasMore] = useState(true);

  // useEffect(() => {
  //   setInterviewOrder(filteredInterviews.map((i) => i.interviewId));
  //   setVisibleCount(PER_LOAD);
  //   setHasMore(filteredInterviews.length > PER_LOAD);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [globalFilter]);


  useEffect(() => {
    const savedOrder = localStorage.getItem("myInterviewsOrder");
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      const currentFilteredIds = filteredInterviews.map((i) => i.interviewId);

      // Filter existing items based on search results
      const updated = parsedOrder.filter((id) => currentFilteredIds.includes(id));

      // Push new items if missing
      currentFilteredIds.forEach((id) => {
        if (!updated.includes(id)) updated.push(id);
      });
      setInterviewOrder(updated);
    } else {
      setInterviewOrder(filteredInterviews.map((i) => i.interviewId));
    }

    setVisibleCount(PER_LOAD);
    setHasMore(filteredInterviews.length > PER_LOAD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalFilter]);

  useEffect(() => {
    setHasMore(visibleCount < orderedInterviews.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, filteredInterviews.length]);

  const visibleInterviews = orderedInterviews.slice(0, visibleCount);

  const loadMore = () => {
    setTimeout(() => {
      setVisibleCount((prev) => {
        const next = prev + PER_LOAD;
        if (next >= orderedInterviews.length) setHasMore(false);
        return next;
      });
    }, 700);
  };

  // NEW: dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // NEW: drag end handler — reorders immediately, no refresh needed
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setInterviewOrder((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const newOrder = arrayMove(prev, oldIndex, newIndex);

      // Save to localStorage
      localStorage.setItem("myInterviewsOrder", JSON.stringify(newOrder));

      return newOrder;
    });
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
      <Paper
        elevation={0}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          p: { xs: 2, md: 3 },
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
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 3
          }}
        >
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-0.03em",
              color: textColor,
              mb: -1,
              fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem", lg: "2.2rem" },
            }}
          >
            My Interviews
          </Typography>

          <TextField
            placeholder="Search interviews..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            sx={{
              width: { xs: "100%", md: 350 },
              mb: { xs: 1, md: 2 },
              "& .MuiOutlinedInput-root": {
                fontSize: { xs: ".85rem", md: ".95rem" },
                "& input": { py: { xs: 1.3, md: 1.7 } },
                borderRadius: "14px",
                bgcolor: colors.card,
                color: textColor,
                "& fieldset": { borderColor: borderStyle },
                "&:hover fieldset": { borderColor: primary },
                "&.Mui-focused fieldset": { borderColor: primary },
              },
              "& input::placeholder": { color: subText, opacity: 1 },
            }}
          />
        </Box>
      </Paper>

      <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
        <InfiniteScroll
          dataLength={visibleInterviews.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "center" },
                bgcolor: colors.background || (darkMode ? "#0f172a" : "#f8fafc"),
                gap: 2,
                justifyContent: "center",
                py: 3,
              }}
            >
              <CircularProgress sx={{ color: primary }} />
            </Box>
          }
        >
          {/* MAIN CARDS */}

          {filteredInterviews.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={visibleInterviews.map((i) => i.interviewId)}
                strategy={rectSortingStrategy}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
                    gap: 3,
                  }}
                >
                  {visibleInterviews.map((interview) => (
                    <SortableInterviewCard
                      key={interview.interviewId}
                      interview={interview}
                      primary={primary}
                      secondary={secondary}
                      textColor={textColor}
                      subText={subText}
                      borderStyle={borderStyle}
                      colors={colors}
                      statusColor={statusColor}
                    />
                  ))}
                </Box>
              </SortableContext>
            </DndContext>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
                gap: 3,
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 3, sm: 5, md: 6 },
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
                  to="/candidate/browse-jobs"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${primary}, ${primary})`,
                    },
                  }}
                >
                  Browse Jobs
                </Button>
              </Paper>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </CandidateLayout>
  );
}