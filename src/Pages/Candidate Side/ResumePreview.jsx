
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import useThemeColors from "../../hooks/useThemeColors";
import { Box, Button, Paper, Typography, Divider } from "@mui/material";
import { ArrowLeft, Download } from "lucide-react";
import SEO from "../../components/common/SEO";
import html2pdf from "html2pdf.js";
import { resumeTemplates } from "../../data/resumeTemplates";

const RESUME_STORAGE_KEY = "nexthire-resume-data";

export default function ResumePreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const { templateId } = useParams();
    const colors = useThemeColors();

    const resumeData =
        location.state?.resumeData ||
        JSON.parse(localStorage.getItem(RESUME_STORAGE_KEY) || "null");

    const selectedTemplate =
        resumeTemplates.find(
            (template) => template.id === templateId
        ) || resumeTemplates[0];

    const templateStyles = {
        modern: {
            headerBg: selectedTemplate.accentColor,
            headerColor: "#ffffff",
            sectionColor: selectedTemplate.accentColor,
            fontFamily: "Arial, sans-serif",
        },

        classic: {
            headerBg: "transparent",
            headerColor: "#222222",
            sectionColor: "#222222",
            fontFamily: "Georgia, serif",
        },

        minimal: {
            headerBg: "transparent",
            headerColor: "#333333",
            sectionColor: selectedTemplate.accentColor,
            fontFamily: "Arial, sans-serif",
        },

        bold: {
            headerBg: selectedTemplate.accentColor,
            headerColor: "#ffffff",
            sectionColor: selectedTemplate.accentColor,
            fontFamily: "Arial, sans-serif",
        },
    };

    const currentStyle =
        templateStyles[selectedTemplate.layout] ||
        templateStyles.modern;

    const isTwoColumn = selectedTemplate.layout === "two-column";

    const primary = colors.primary;
    const textColor = colors.text;
    const borderStyle = colors.border;

    if (!resumeData) {
        return (
            <CandidateLayout>
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography sx={{ color: textColor, mb: 3 }}>
                        Resume data not found.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/candidate/resume-builder")}
                        sx={{
                            backgroundColor: primary,
                            textTransform: "none",
                        }}
                    >
                        Create Resume
                    </Button>
                </Box>
            </CandidateLayout>
        );
    }

    const handleDownload = async () => {
        const resumeElement = document.getElementById("resume-preview");

        if (!resumeElement) {
            return;
        }

        const options = {
            margin: 0,
            filename: `${resumeData.fullName || "resume"}-resume.pdf`,
            image: {
                type: "jpeg",
                quality: 0.98,
            },
            html2canvas: {
                scale: 2,
                useCORS: true,
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            },
        };

        try {
            await html2pdf()
                .set(options)
                .from(resumeElement)
                .save();

            localStorage.removeItem(RESUME_STORAGE_KEY);

            console.log("Resume downloaded successfully.");
        } catch (error) {
            console.error("Resume download failed:", error);
        }
    };

    return (
        <CandidateLayout>
            <SEO
                title="Resume Preview"
                description="Preview your professional resume."
                canonicalUrl={`/candidate/resume-preview/${templateId}`}
            />

            {/* Header Actions */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                    flexWrap: "wrap",
                }}
            >
                <Button
                    onClick={() =>
                        navigate("/candidate/resume-builder", {
                            state: { resumeData },
                        })
                    }
                    startIcon={<ArrowLeft size={16} />}
                    sx={{
                        color: textColor,
                        textTransform: "none",
                        fontWeight: 700,
                    }}
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    startIcon={<Download size={16} />}
                    onClick={handleDownload}
                    sx={{
                        backgroundColor: primary,
                        textTransform: "none",
                        fontWeight: 700,
                        "&:hover": {
                            backgroundColor: primary,
                            opacity: 0.9,
                        },
                    }}
                >
                    Download Resume
                </Button>
            </Box>

            {/* Resume Preview */}
            <Paper
                id="resume-preview"
                elevation={0}
                sx={{
                    maxWidth: "850px",
                    mx: "auto",
                    p: { xs: 2.5, sm: 4, md: 6 },
                    backgroundColor: "#ffffff",
                    color: "#333333",
                    borderRadius: { xs: 2, sm: 3 },
                    border: `1px solid ${borderStyle}`,
                    fontFamily: currentStyle.fontFamily,
                    boxSizing: "border-box",
                }}
            >
                {/* Main Layout */}
                <Box
                    sx={
                        isTwoColumn
                            ? {
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "240px 1fr",
                                },
                                gap: 4,
                            }
                            : {}
                    }
                >
                    {/* Sidebar */}
                    {isTwoColumn && (
                        <Box
                            sx={{
                                backgroundColor: selectedTemplate.accentColor,
                                color: "#ffffff",
                                p: 3,
                                borderRadius: 2,
                                height: "100%",
                                alignSelf: "stretch",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: 800,
                                    mb: 3,
                                }}
                            >
                                CONTACT
                            </Typography>

                            <Typography
                                sx={{
                                    mb: 2,
                                    fontSize: "0.85rem",
                                    wordBreak: "break-word",
                                }}
                            >
                                {resumeData.email}
                            </Typography>

                            <Typography
                                sx={{ mb: 2, fontSize: "0.85rem" }}
                            >
                                {resumeData.phone}
                            </Typography>

                            <Typography
                                sx={{ mb: 3, fontSize: "0.85rem" }}
                            >
                                {resumeData.location}
                            </Typography>

                            {resumeData.linkedin && (
                                <Typography
                                    sx={{
                                        mb: 2,
                                        fontSize: "0.8rem",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {resumeData.linkedin}
                                </Typography>
                            )}

                            {resumeData.github && (
                                <Typography
                                    sx={{
                                        mb: 3,
                                        fontSize: "0.8rem",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {resumeData.github}
                                </Typography>
                            )}

                            <Divider
                                sx={{
                                    borderColor: "rgba(255,255,255,0.6)",
                                    mb: 3,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: 800,
                                    mb: 2,
                                }}
                            >
                                SKILLS
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "0.85rem",
                                    lineHeight: 2,
                                }}
                            >
                                {resumeData.skills
                                    ?.filter(Boolean)
                                    .join(" • ")}
                            </Typography>

                            <Divider
                                sx={{
                                    borderColor: "rgba(255,255,255,0.6)",
                                    my: 3,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "1.2rem",
                                    fontWeight: 800,
                                    mb: 2,
                                }}
                            >
                                LANGUAGES
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "0.85rem",
                                    lineHeight: 1.8,
                                }}
                            >
                                {resumeData.languages}
                            </Typography>
                        </Box>
                    )}

                    {/* Right Content */}
                    <Box>
                        {/* Personal Information */}
                        <Box
                            sx={{
                                textAlign: isTwoColumn
                                    ? "left"
                                    : "center",
                                mb: 3,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "1.7rem",
                                        sm: "2.2rem",
                                    },
                                    fontWeight: 800,
                                    backgroundColor:
                                        currentStyle.headerBg,
                                    color: currentStyle.headerColor,
                                    padding: 3,
                                    borderRadius: 1,
                                    wordBreak: "break-word",
                                }}
                            >
                                {resumeData.fullName}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        sm: "1.2rem",
                                    },
                                    fontWeight: 600,
                                    color: "#555555",
                                    mt: 1,
                                }}
                            >
                                {resumeData.jobTitle}
                            </Typography>

                            {!isTwoColumn && (
                                <>
                                    <Typography
                                        sx={{
                                            fontSize: "0.85rem",
                                            color: "#555555",
                                            mt: 1,
                                        }}
                                    >
                                        {resumeData.email} |{" "}
                                        {resumeData.phone} |{" "}
                                        {resumeData.location}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "0.85rem",
                                            color: "#555555",
                                            mt: 0.5,
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {resumeData.linkedin &&
                                            `${resumeData.linkedin} `}
                                        {resumeData.github &&
                                            `| ${resumeData.github}`}
                                    </Typography>
                                </>
                            )}
                        </Box>

                        <Divider
                            sx={{
                                borderColor: "#cccccc",
                                mb: 3,
                            }}
                        />

                        {/* Professional Summary */}
                        {resumeData.summary && (
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                        color: currentStyle.sectionColor,
                                        mb: 1,
                                    }}
                                >
                                    PROFESSIONAL SUMMARY
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        lineHeight: 1.7,
                                        color: "#444444",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {resumeData.summary}
                                </Typography>
                            </Box>
                        )}

                        {/* Education */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    fontSize: "1.1rem",
                                    color: currentStyle.sectionColor,
                                    mb: 1.5,
                                }}
                            >
                                EDUCATION
                            </Typography>

                            {resumeData.education?.map(
                                (education, index) => (
                                    <Box
                                        key={index}
                                        sx={{ mb: 2 }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                color: "#333333",
                                            }}
                                        >
                                            {education.degree}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#555555",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            {education.institution}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#555555",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            {education.startYear} -{" "}
                                            {education.endYear}{" "}
                                            {education.grade &&
                                                `| ${education.grade}`}
                                        </Typography>
                                    </Box>
                                )
                            )}
                        </Box>

                        {/* Work Experience */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    fontSize: "1.1rem",
                                    color: currentStyle.sectionColor,
                                    mb: 1.5,
                                }}
                            >
                                WORK EXPERIENCE
                            </Typography>

                            {resumeData.experience?.map(
                                (experience, index) => (
                                    <Box
                                        key={index}
                                        sx={{ mb: 2 }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                color: "#333333",
                                            }}
                                        >
                                            {experience.jobPosition}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#555555",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            {experience.companyName}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#555555",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            {
                                                experience.experienceStartYear
                                            }{" "}
                                            -{" "}
                                            {
                                                experience.experienceEndYear
                                            }
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 1,
                                                fontSize: "0.9rem",
                                                lineHeight: 1.7,
                                                color: "#444444",
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            {experience.jobDescription}
                                        </Typography>
                                    </Box>
                                )
                            )}
                        </Box>

                        {/* Skills */}
                        {!isTwoColumn && (
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                        color: currentStyle.sectionColor,
                                        mb: 1,
                                    }}
                                >
                                    SKILLS
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#444444",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {resumeData.skills
                                        ?.filter(Boolean)
                                        .join(" • ")}
                                </Typography>
                            </Box>
                        )}

                        {/* Projects */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    fontSize: "1.1rem",
                                    color: currentStyle.sectionColor,
                                    mb: 1.5,
                                }}
                            >
                                PROJECTS
                            </Typography>

                            {resumeData.projects?.map(
                                (project, index) => (
                                    <Box
                                        key={index}
                                        sx={{ mb: 2 }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                color: "#333333",
                                            }}
                                        >
                                            {project.projectName}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#555555",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            Technologies:{" "}
                                            {project.projectTechStack}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 1,
                                                fontSize: "0.9rem",
                                                lineHeight: 1.7,
                                                color: "#444444",
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            {project.projectDescription}
                                        </Typography>

                                        {project.projectLink && (
                                            <Typography
                                                sx={{
                                                    mt: 1,
                                                    fontSize: "0.85rem",
                                                    color: "#444444",
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                Project Link:{" "}
                                                {project.projectLink}
                                            </Typography>
                                        )}
                                    </Box>
                                )
                            )}
                        </Box>

                        {/* Certifications */}
                        {resumeData.certifications && (
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                        color: currentStyle.sectionColor,
                                        mb: 1,
                                    }}
                                >
                                    CERTIFICATIONS
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#444444",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {resumeData.certifications}
                                </Typography>
                            </Box>
                        )}

                        {/* Languages */}
                        {!isTwoColumn && (
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                        color: currentStyle.sectionColor,
                                        mb: 1,
                                    }}
                                >
                                    LANGUAGES
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#444444",
                                    }}
                                >
                                    {resumeData.languages}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Paper>
        </CandidateLayout>
    );
}