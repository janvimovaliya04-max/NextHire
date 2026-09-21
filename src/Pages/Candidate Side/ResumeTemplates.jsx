import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Box, Button, Paper, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import SEO from "../../components/common/SEO";

import { resumeTemplates } from "../../data/resumeTemplates";

const RESUME_STORAGE_KEY = "nexthire-resume-data";

export default function ResumeTemplates() {
    const location = useLocation();
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const colors = useThemeColors();

    const [resumeData, setResumeData] = useState(
        location.state?.resumeData || null
    );

    useEffect(() => {
        if (resumeData) return;

        const savedData = localStorage.getItem(RESUME_STORAGE_KEY);

        if (savedData) {
            try {
                setResumeData(JSON.parse(savedData));
            } catch (error) {
                console.error("Failed to load resume data:", error);
                navigate("/candidate/resume-builder", {
                    replace: true,
                });
            }
        } else {
            navigate("/candidate/resume-builder", {
                replace: true,
            });
        }
    }, [resumeData, navigate]);

    const primary = colors.primary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;



    const handleTemplateSelect = (templateId) => {
        navigate(`/candidate/resume-preview/${templateId}`, {
            state: {
                resumeData,
                templateId,
            },
        });
    };

    return (
        <CandidateLayout>
            <SEO
                title="Choose Resume Template"
                description="Choose a professional resume template."
                canonicalUrl="/candidate/resume-templates"
            />

            <Box sx={{ mb: 3 }}>
                <Button
                    onClick={() =>
                        navigate("/candidate/resume-builder", {
                            state: { resumeData },
                        })
                    }
                    startIcon={<ArrowLeft size={16} />}
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        color: textColor,
                    }}
                >
                    Back
                </Button>
            </Box>

            <Box sx={{ maxWidth: "1100px", mx: "auto" }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        fontSize: {
                            xs: "1.7rem",
                            sm: "2.2rem",
                        },
                        color: textColor,
                        mb: 1,
                    }}
                >
                    Choose Your Resume Template
                </Typography>

                <Typography
                    sx={{
                        color: subText,
                        mb: 4,
                    }}
                >
                    Select a template to preview your professional resume.
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {resumeTemplates.map((template) => (
                        <Paper
                            key={template.id}
                            sx={{
                                p: { xs: 2, sm: 3 },
                                border: `1px solid ${borderStyle}`,
                                backgroundColor: colors.card,
                                borderRadius: "16px",
                                transition:
                                    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

                                boxShadow: darkMode
                                    ? "0 4px 16px rgba(0, 0, 0, 0.25)"
                                    : "0 4px 16px rgba(0, 0, 0, 0.06)",

                                "&:hover": {
                                    borderColor: primary,
                                    transform: "translateY(-5px)",

                                    boxShadow: darkMode
                                        ? "0 8px 24px rgba(0, 0, 0, 0.4)"
                                        : "0 8px 24px rgba(0, 0, 0, 0.12)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    height: { xs: 180, sm: 220 },
                                    mb: 2,
                                    borderRadius: "10px",
                                    backgroundColor: darkMode
                                        ? `${template.accentColor}20`
                                        : `${template.accentColor}12`,
                                    border: `2px solid ${template.accentColor}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "transform 0.25s ease, box-shadow 0.25s ease",

                                    "&:hover": {
                                        transform: "scale(1.02)",
                                        boxShadow: `0 4px 12px ${template.accentColor}25`,
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: template.accentColor,
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    {template.name}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    color: textColor,
                                    fontWeight: 700,
                                    mb: 1,
                                }}
                            >
                                {template.name}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: subText,
                                    mb: 3,
                                }}
                            >
                                {template.description}
                            </Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => handleTemplateSelect(template.id)}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    backgroundColor: primary,
                                    "&:hover": {
                                        backgroundColor: primary,
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                Select Template
                            </Button>
                        </Paper>
                    ))}
                </Box>
            </Box>
        </CandidateLayout>
    );
}