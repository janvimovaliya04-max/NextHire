
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import useThemeColors from "../../hooks/useThemeColors";
import { Box, Button, Paper, Typography, Divider } from "@mui/material";
import { ArrowLeft, Download } from "lucide-react";
import SEO from "../../components/common/SEO";

export default function ResumePreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const { templateId } = useParams();
    const colors = useThemeColors();

    const resumeData = location.state?.resumeData;

    const primary = colors.primary;
    const textColor = colors.text;
    const subText = colors.subText;
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

    const handleDownload = () => {
        window.print();
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
                    onClick={() => navigate(-1)}
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
                    color: "#222222",
                    borderRadius: { xs: 2, sm: 3 },
                    border: `1px solid ${borderStyle}`,
                }}
            >
                {/* Personal Information */}
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography
                        sx={{
                            fontSize: { xs: "1.7rem", sm: "2.2rem" },
                            fontWeight: 800,
                            color: "#111111",
                        }}
                    >
                        {resumeData.fullName}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                            fontWeight: 600,
                            color: "#555555",
                            mt: 0.5,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "0.85rem",
                            color: "#555555",
                            mt: 1,
                        }}
                    >
                        {resumeData.email} | {resumeData.phone} |{" "}
                        {resumeData.location}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "0.85rem",
                            color: "#555555",
                            mt: 0.5,
                        }}
                    >
                        {resumeData.linkedin && `${resumeData.linkedin} `}
                        {resumeData.github && `| ${resumeData.github}`}
                    </Typography>
                </Box>

                <Divider sx={{ borderColor: "#cccccc", mb: 3 }} />

                {/* Professional Summary */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "#222222",
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

                {/* Education */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "#222222",
                            mb: 1,
                        }}
                    >
                        EDUCATION
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: 700,
                            color: "#333333",
                        }}
                    >
                        {resumeData.degree}
                    </Typography>

                    <Typography sx={{ color: "#555555", fontSize: "0.9rem" }}>
                        {resumeData.institution}
                    </Typography>

                    <Typography sx={{ color: "#555555", fontSize: "0.85rem" }}>
                        {resumeData.startYear} - {resumeData.endYear} |{" "}
                        {resumeData.grade}
                    </Typography>
                </Box>

                {/* Work Experience */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "#222222",
                            mb: 1,
                        }}
                    >
                        WORK EXPERIENCE
                    </Typography>

                    <Typography sx={{ fontWeight: 700, color: "#333333" }}>
                        {resumeData.jobPosition}
                    </Typography>

                    <Typography sx={{ color: "#555555", fontSize: "0.9rem" }}>
                        {resumeData.companyName}
                    </Typography>

                    <Typography sx={{ color: "#555555", fontSize: "0.85rem" }}>
                        {resumeData.experienceStartYear} -{" "}
                        {resumeData.experienceEndYear}
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
                        {resumeData.jobDescription}
                    </Typography>
                </Box>

                {/* Skills */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "#222222",
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
                        {resumeData.skills}
                    </Typography>
                </Box>

                {/* Projects */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "#222222",
                            mb: 1,
                        }}
                    >
                        PROJECTS
                    </Typography>

                    <Typography sx={{ fontWeight: 700, color: "#333333" }}>
                        {resumeData.projectName}
                    </Typography>

                    <Typography sx={{ color: "#555555", fontSize: "0.85rem" }}>
                        Technologies: {resumeData.projectTechStack}
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
                        {resumeData.projectDescription}
                    </Typography>

                    {resumeData.projectLink && (
                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: "0.85rem",
                                color: "#444444",
                            }}
                        >
                            Project Link: {resumeData.projectLink}
                        </Typography>
                    )}
                </Box>

                {/* Certifications */}
                {resumeData.certifications && (
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                fontSize: "1.1rem",
                                color: "#222222",
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
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "#222222",
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
            </Paper>
        </CandidateLayout>
    );
}