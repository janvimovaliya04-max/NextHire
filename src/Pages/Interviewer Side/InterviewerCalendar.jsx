import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Dialog,
    Chip,
    Stack,
    Divider,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import interviewsData from "../../data/assignedInterviews.json";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import SEO from "../../components/common/SEO";

export default function InterviewerCalendar() {
    const { darkMode } = useTheme();
    const colors = useThemeColors();
    const primary = colors.primary;
    const secondary = colors.secondary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");

    const handleEventClick = (info) => {
        setSelectedEvent({
            title: info.event.title,
            start: info.event.start,
            ...info.event.extendedProps,
        });
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    // Filter logic updated based on new JSON fields
    const filteredInterviews = interviewsData.filter((item) => {
        return statusFilter === "All" || item.status === statusFilter;
    });

    // Helper to convert "10 June 2026" & "01:00 PM - 02:00 PM" into FullCalendar compatible format
    const formatInterviewsToEvents = (interviews) => {
        return interviews.map((interview) => {
            let startDateTime = interview.date;

            if (interview.time) {
                // Split start time (e.g. "01:00 PM" from "01:00 PM - 02:00 PM")
                const startTimeStr = interview.time.split("-")[0].trim();
                startDateTime = `${interview.date} ${startTimeStr}`;
            }

            const parsedDate = new Date(startDateTime);
            const isoStart = !isNaN(parsedDate) ? parsedDate.toISOString() : undefined;

            return {
                id: interview.id,
                title: `${interview.candidate} - ${interview.position}`,
                start: isoStart || interview.date,
                extendedProps: {
                    candidate: interview.candidate,
                    position: interview.position,
                    status: interview.status,
                    time: interview.time,
                    date: interview.date
                },
            };
        });
    };

    return (
        <InterviewerLayout>
            <SEO
                title="Interviewer Schedule Calendar"
                description="Manage your interview schedules and stay updated on upcoming meetings."
                canonicalUrl="/interviewer/interviewer-calendar"
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 3, md: 4 },
                    pb: { xs: 2, md: 0 },
                }}
            >
                {/* Page Header */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justify: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
                                mb: { xs: 0, md: 0.5 },
                                fontWeight: 850,
                                letterSpacing: "-0.03em",
                                color: textColor,
                            }}
                        >
                            Interviewer Schedule Calendar
                        </Typography>
                    </Box>

                    {/* Filter Action Chips */}
                    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                        <Chip
                            label={`Status: ${statusFilter}`}
                            onClick={() => {
                                const statuses = ["All", "Scheduled", "Completed", "Cancelled"];
                                const nextIndex = (statuses.indexOf(statusFilter) + 1) % statuses.length;
                                setStatusFilter(statuses[nextIndex]);
                            }}
                            sx={{
                                bgcolor: colors.input,
                                color: textColor,
                                border: `1px solid ${borderStyle}`,
                                fontWeight: 700,
                                borderRadius: "10px",
                                "&:hover": { bgcolor: `${primary}15`, borderColor: primary, color: primary }
                            }}
                        />
                    </Stack>
                </Box>

                {/* Calendar Container Paper */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        borderRadius: { xs: 3, md: "22px" },
                        bgcolor: colors.card,
                        backdropFilter: "blur(12px)",
                        border: `1px solid ${borderStyle}`,
                        boxShadow: colors.shadow,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: darkMode
                                ? `0 24px 55px rgba(0,0,0,.42)`
                                : `0 26px 55px rgba(15,23,42,.12)`,
                        },
                        "& .fc": {
                            color: textColor,
                            fontFamily: "inherit",
                        },
                        "& .fc-list-event": {
                            background: `linear-gradient(135deg, ${primary}, ${secondary || primary}) !important`,
                            cursor: "pointer",
                        },
                        "& .fc-list-event td": {
                            borderColor: `${borderStyle} !important`,
                            background: "transparent !important",
                        },
                        "& .fc-list-event-title, & .fc-list-event-time, & .fc-list-event-title a, & .fc-list-event-time a": {
                            color: "#ffffff !important",
                            fontWeight: 600,
                        },
                        "& .fc-list-day-cushion": {
                            backgroundColor: `${colors.input} !important`,
                        },
                        "& .fc-list-day-text, & .fc-list-day-side-text": {
                            color: `${textColor} !important`,
                            fontWeight: 700,
                        },
                        "& .fc-toolbar-title": {
                            fontSize: { xs: "1.1rem", md: "1.4rem" },
                            fontWeight: 800,
                            color: textColor,
                        },
                        "& .fc-button-group": {
                            gap: "8px",
                        },
                        "& .fc-button-group > .fc-button": {
                            borderRadius: "10px !important",
                        },
                        "& .fc-button": {
                            backgroundColor: colors.input,
                            borderColor: borderStyle,
                            color: textColor,
                            fontWeight: 700,
                            gap: "4px",
                            padding: "6px 14px",
                            fontSize: "0.85rem",
                            borderRadius: "10px !important",
                            textTransform: "capitalize",
                            boxShadow: "none",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: `${primary}15`,
                                borderColor: primary,
                                color: primary,
                            },
                        },
                        "& .fc-button-primary:not(:disabled).fc-button-active, & .fc-button-primary:not(:disabled):active": {
                            background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                            borderColor: "transparent",
                            color: "#fff",
                        },
                        "& .fc-theme-standard td, & .fc-theme-standard th, & .fc-theme-standard .fc-scrollgrid": {
                            borderColor: borderStyle,
                        },
                        "& .fc-col-header-cell": {
                            padding: "10px 0",
                            backgroundColor: colors.input,
                        },
                        "& .fc-col-header-cell-cushion": {
                            color: subText,
                            fontWeight: 700,
                            fontSize: "0.88rem",
                        },
                        "& .fc-daygrid-day-number": {
                            color: textColor,
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            padding: "8px",
                        },
                        "& .fc-day-today": {
                            backgroundColor: `${primary}10 !important`,
                        },
                        "& .fc-event": {
                            borderRadius: "8px",
                            padding: "2px 6px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            border: "none",
                            background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                            boxShadow: `0 2px 6px ${primary}33`,
                            cursor: "pointer",
                            color: "#ffffff !important",
                            transition: "transform 0.2s ease",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        },
                    }}
                >
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        initialDate="2026-06-01" // 10 June 2026 ડેટા જોવા માટે initialDate 2026-06 રાખેલ છે
                        events={formatInterviewsToEvents(filteredInterviews)}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                        }}
                        buttonText={{
                            dayGridMonth: "Month",
                            timeGridWeek: "Weekly Schedule",
                            timeGridDay: "Daily Agenda",
                            listWeek: "List View",
                        }}
                        dayMaxEvents={2}
                        height="auto"
                        editable={true}
                        selectable={true}
                    />
                </Paper>

                {/* Event Detail Modal */}
                <Dialog
                    open={Boolean(selectedEvent)}
                    onClose={handleCloseModal}
                    slotProps={{
                        backdrop: {
                            sx: {
                                backdropFilter: "blur(8px)",
                                backgroundColor: darkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(15, 23, 42, 0.25)",
                            },
                        },
                    }}
                    PaperProps={{
                        sx: {
                            borderRadius: "24px",
                            background: darkMode
                                ? "linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.75))"
                                : "linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.6))",
                            backdropFilter: "blur(20px)",
                            border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.8)"}`,
                            boxShadow: darkMode
                                ? "0 20px 40px rgba(0, 0, 0, 0.6)"
                                : "0 20px 40px rgba(15, 23, 42, 0.15)",
                            color: textColor,
                            width: "100%",
                            maxWidth: "460px",
                            margin: { xs: 2, sm: 3 },
                            overflow: "hidden",
                        },
                    }}
                >
                    {selectedEvent && (
                        <Box sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                            {/* Modal Header */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, mb: 1.5 }}>
                                <Typography variant="h6" fontWeight={800} sx={{ color: textColor, fontSize: "1.1rem", lineHeight: 1.3 }}>
                                    {selectedEvent.title}
                                </Typography>
                                <IconButton
                                    onClick={handleCloseModal}
                                    size="small"
                                    sx={{
                                        color: textColor,
                                        bgcolor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                                        flexShrink: 0,
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Divider sx={{ borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)", mb: 2.5 }} />

                            {/* Details List (Updated with new Json fields) */}
                            <Stack spacing={2}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText, flexShrink: 0 }}>
                                        Candidate
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, textAlign: "right" }}>
                                        {selectedEvent.candidate}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText, flexShrink: 0 }}>
                                        Position
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, textAlign: "right" }}>
                                        {selectedEvent.position}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText, flexShrink: 0 }}>
                                        Date
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, textAlign: "right" }}>
                                        {selectedEvent.date}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText, flexShrink: 0 }}>
                                        Time
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, textAlign: "right" }}>
                                        {selectedEvent.time}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText, flexShrink: 0 }}>
                                        Status
                                    </Typography>
                                    <Chip
                                        label={selectedEvent.status}
                                        size="small"
                                        sx={{
                                            bgcolor: selectedEvent.status === "Cancelled" ? "#f4433622" : `${primary}22`,
                                            color: selectedEvent.status === "Cancelled" ? "#f44336" : primary,
                                            fontWeight: 700,
                                            height: "24px",
                                            borderRadius: "8px",
                                            fontSize: "0.78rem"
                                        }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    )}
                </Dialog>
            </Box>
        </InterviewerLayout>
    );
}