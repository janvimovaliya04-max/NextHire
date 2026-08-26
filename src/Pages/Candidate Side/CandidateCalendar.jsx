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
import myinterviews from "../../data/myinterviews.json";
import CandidateLayout from "../../Layouts/HRLayout";
import SEO from "../../components/common/SEO";

export default function CandidateCalendar() {
    const { darkMode } = useTheme();
    const colors = useThemeColors();
    const primary = colors.primary;
    const secondary = colors.secondary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");
    const [modeFilter, setModeFilter] = useState("All");

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

    // Helper to safely parse "10:00 AM" into "10:00:00" for valid ISO format
    const convertTimeTo24Hr = (timeStr) => {
        if (!timeStr) return "09:00:00";
        const parts = timeStr.trim().split(" ");
        if (parts.length < 2) return `${parts[0]}:00`;

        const [time, modifier] = parts;
        let [hours, minutes] = time.split(":");
        let hrs = parseInt(hours, 10);

        if (modifier.toUpperCase() === "PM" && hrs < 12) hrs += 12;
        if (modifier.toUpperCase() === "AM" && hrs === 12) hrs = 0;

        return `${String(hrs).padStart(2, "0")}:${minutes}:00`;
    };

    // Flexible Filter matching JSON schema variants
    const filteredInterviews = myinterviews.filter((item) => {
        const itemStatus = item.status?.toLowerCase() || "";
        const itemMode = item.mode?.toLowerCase() || "";

        const matchesStatus =
            statusFilter === "All" ||
            itemStatus === statusFilter.toLowerCase() ||
            (statusFilter === "Scheduled" && itemStatus === "upcoming");

        const matchesMode =
            modeFilter === "All" ||
            itemMode === modeFilter.toLowerCase() ||
            (modeFilter === "Online" && itemMode === "video") ||
            (modeFilter === "Offline" && itemMode === "in-person");

        return matchesStatus && matchesMode;
    });

    const formatInterviewsToEvents = (interviews) => {
        return interviews.map((interview) => ({
            id: interview.interviewId,
            title: `${interview.round || interview.type || "Interview"} - ${interview.company || interview.interviewer}`,
            start: `${interview.date}T${convertTimeTo24Hr(interview.time)}`,
            extendedProps: {
                candidateName: interview.candidateName || interview.company || "N/A",
                company: interview.company || "N/A",
                position: interview.position || "N/A",
                jobId: interview.jobId || "N/A",
                recruiterId: interview.recruiterId || "N/A",
                mode: interview.mode,
                platform: interview.platform || interview.mode,
                status: interview.status,
                result: interview.result,
                remarks: interview.remarks || interview.duration,
            },
        }));
    };

    const formatEventDateTime = (dateObj) => {
        if (!dateObj) return "N/A";
        const date = new Date(dateObj);
        return date.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <CandidateLayout>
            <SEO
                title="Candidate Schedule Calendar"
                description="Manage your interview schedules and stay updated on upcoming meetings."
                canonicalUrl="/candidate/candidate-calendar"
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
                        justifyContent: "space-between",
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
                            Candidate Schedule Calendar
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
                        <Chip
                            label={`Mode: ${modeFilter}`}
                            onClick={() => {
                                const modes = ["All", "Online", "Offline"];
                                const nextIndex = (modes.indexOf(modeFilter) + 1) % modes.length;
                                setModeFilter(modes[nextIndex]);
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

                        /* FullCalendar Dynamic Theme Overrides */
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
                        "& .fc-list-event:hover": {
                            opacity: 0.9,
                            filter: "brightness(1.1)",
                        },
                        "& .fc-list-event:hover td, & .fc-list-event:hover a": {
                            background: "transparent !important",
                            color: "#ffffff !important",
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
                            "&:focus, &:active": {
                                boxShadow: "none !important",
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
                        "& .fc-event-title": {
                            fontWeight: 600,
                        },
                        "& .fc-more-link": {
                            color: primary,
                            fontWeight: 700,
                        },
                    }}
                >
                    <FullCalendar
                        key={`${statusFilter}-${modeFilter}`}
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        initialDate="2026-07-01"
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

                {/* Glassmorphic Modal with Corrected Padding */}
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
                            WebkitBackdropFilter: "blur(20px)",
                            border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.8)"}`,
                            boxShadow: darkMode
                                ? "0 20px 40px rgba(0, 0, 0, 0.6)"
                                : "0 20px 40px rgba(15, 23, 42, 0.15)",
                            color: textColor,
                            width: "100%",
                            maxWidth: "460px",
                            margin: { xs: 2, sm: 3 },
                            overflow: "hidden",
                            backgroundImage: "none",
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
                                        "&:hover": {
                                            bgcolor: darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.1)",
                                        },
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Divider sx={{ borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)", mb: 2.5 }} />

                            {/* Details List */}
                            <Stack spacing={2}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText, flexShrink: 0 }}>
                                        Company / Candidate
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, textAlign: "right", wordBreak: "break-word" }}>
                                        {selectedEvent.candidateName}
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
                                        Date & Time
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, textAlign: "right" }}>
                                        {formatEventDateTime(selectedEvent.start)}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText, flexShrink: 0 }}>
                                        Mode
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, textAlign: "right" }}>
                                        {selectedEvent.mode} ({selectedEvent.platform})
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
                                            bgcolor: `${primary}22`,
                                            color: primary,
                                            fontWeight: 700,
                                            height: "24px",
                                            borderRadius: "8px",
                                            fontSize: "0.78rem"
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText, flexShrink: 0 }}>
                                        Result
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: textColor, textAlign: "right" }}>
                                        {selectedEvent.result || "Pending"}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, pt: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: subText }}>
                                        Remarks / Duration
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            p: 1.75,
                                            borderRadius: "14px",
                                            bgcolor: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                                            border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
                                            color: textColor,
                                            fontSize: "0.85rem",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {selectedEvent.remarks || "No remarks available."}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    )}
                </Dialog>
            </Box>
        </CandidateLayout>
    );
}