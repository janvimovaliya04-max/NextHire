import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Box, Button } from "@mui/material";
import HRLayout from "../../Layouts/HRLayout";

import APIFlow from "../../ReactFlow/API/APIFlow";
import AntiCheatingFlow from "../../ReactFlow/AntiCheating/AntiCheatingFlow";
import CustomTableFlow from "../../ReactFlow/CustomTable/CustomTableFlow";
import CalendarFlow from "../../ReactFlow/Calendar/CalendarFlow";
import AnalyticsChartsFlow from "../../ReactFlow/AnalyticsCharts/AnalyticsChartsFlow";
import NotesFlow from "../../ReactFlow/Notes/NotesFlow";

import SEO from "../../components/common/SEO";

export default function WorkFlow() {
    const { darkMode } = useTheme();
    const colors = useThemeColors();

    const primary = colors.primary;
    const textColor = colors.text;
    const borderStyle = colors.border;

    const [activeFlow, setActiveFlow] = useState("api");

    const flows = [
        {
            id: "api",
            label: "API Workflow",
            component: <APIFlow />,
        },
        {
            id: "anti-cheating",
            label: "Anti-Cheating Workflow",
            component: <AntiCheatingFlow />,
        },
        {
            id: "custom-table",
            label: "Custom Table Workflow",
            component: <CustomTableFlow />,
        },
        {
            id: "calendar",
            label: "Calendar Workflow",
            component: <CalendarFlow />,
        },
        {
            id: "analytics",
            label: "Analytics Charts Workflow",
            component: <AnalyticsChartsFlow />,
        },
        {
            id: "notes",
            label: "Notes Workflow",
            component: <NotesFlow />,
        },
    ];

    const activeComponent = flows.find(
        (flow) => flow.id === activeFlow
    )?.component;

    return (
        <HRLayout>
        {/* Dynamic SEO Tags Injection */}
              <SEO
                title="WorkFlow"
                description="WorkFlow of every important pages."
                canonicalUrl="/hr-portal/dashboard"
              />
            <Box
                sx={{
                    width: "100%",
                    p: { xs: 1.5, md: 0.5 },
                    boxSizing: "border-box",
                }}
            >
                {/* WORKFLOW FILTERS */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        bgcolor: darkMode
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.03)",
                        p: 0.7,
                        borderRadius: "10px",
                        border: `1px solid ${borderStyle}`,
                        mb: 2,
                    }}
                >
                    {flows.map((flow) => (
                        <Button
                            key={flow.id}
                            size="small"
                            onClick={() => setActiveFlow(flow.id)}
                            sx={{
                                px: { xs: 1.5, md: 2.2 },
                                py: 0.8,
                                borderRadius: "8px",
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: {
                                    xs: "0.75rem",
                                    md: "0.82rem",
                                },
                                color:
                                    activeFlow === flow.id
                                        ? "#fff"
                                        : darkMode
                                            ? "#cbd5e1"
                                            : "#475569",
                                bgcolor:
                                    activeFlow === flow.id
                                        ? primary
                                        : "transparent",
                                boxShadow:
                                    activeFlow === flow.id
                                        ? `0 4px 10px ${primary}33`
                                        : "none",
                                "&:hover": {
                                    bgcolor:
                                        activeFlow === flow.id
                                            ? `${primary}dd`
                                            : darkMode
                                                ? "rgba(255,255,255,0.05)"
                                                : "rgba(0,0,0,0.05)",
                                },
                            }}
                        >
                            {flow.label}
                        </Button>
                    ))}
                </Box>

                {/* SELECTED FLOW */}
                <Box
                    sx={{
                        width: "100%",
                        bgcolor: colors.card,
                        border: `1px solid ${borderStyle}`,
                        borderRadius: {
                            xs: 2,
                            md: 3,
                        },
                        overflow: "hidden",
                    }}
                >
                    {activeComponent}
                </Box>
            </Box>
        </HRLayout>
    );
}