import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Box, Button, Paper, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import SEO from "../../components/common/SEO";

import { resumeTemplates } from "../../data/resumeTemplates";

export default function ResumeTemplates() {
    const location = useLocation();
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const colors = useThemeColors();

    const resumeData = location.state?.resumeData;

    useEffect(() => {
        if (!resumeData) {
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
                    onClick={() => navigate(-1)}
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
                                p: 3,
                                border: `1px solid ${borderStyle}`,
                                backgroundColor: colors.card,
                                borderRadius: "16px",
                                transition: "0.2s",
                                "&:hover": {
                                    borderColor: primary,
                                    transform: "translateY(-4px)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    height: 220,
                                    mb: 2,
                                    borderRadius: "10px",
                                    backgroundColor: `${template.accentColor}12`,
                                    border: `2px solid ${template.accentColor}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
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