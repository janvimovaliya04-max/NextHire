import { useLocation, useNavigate, useParams } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import useThemeColors from "../../hooks/useThemeColors";
import { Box, Button, Paper, Typography } from "@mui/material";
import { ArrowLeft, Download } from "lucide-react";
import SEO from "../../components/common/SEO";
import html2pdf from "html2pdf.js";
import { resumeTemplates } from "../../data/resumeTemplates";

import ModernTemplate from "../../components/resume-templates/ModernTemplate";
import ClassicTemplate from "../../components/resume-templates/ClassicTemplate";
import TwoColumnTemplate from "../../components/resume-templates/TwoColumnTemplate";
import MinimalTemplate from "../../components/resume-templates/MinimalTemplate";
import CreativeTemplate from "../../components/resume-templates/CreativeTemplate";
import AtsTemplate from "../../components/resume-templates/AtsTemplate";
import ProfessionalTemplate from "../../components/resume-templates/ProfessionalTemplate";
import ExecutiveTemplate from "../../components/resume-templates/ExecutiveTemplate";
import TechTemplate from "../../components/resume-templates/TechTemplate";
import StudentTemplate from "../../components/resume-templates/StudentTemplate";
import ElegantTemplate from "../../components/resume-templates/ElegantTemplate";
import CorporateTemplate from "../../components/resume-templates/CorporateTemplate";
import SimpleTemplate from "../../components/resume-templates/SimpleTemplate";
import ModernGreenTemplate from "../../components/resume-templates/ModernGreenTemplate";
import BoldTemplate from "../../components/resume-templates/BoldTemplate";

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


    const renderSelectedTemplate = () => {
        const templateProps = {
            resumeData,
            selectedTemplate,
        };

        switch (selectedTemplate?.layout) {
            case "modern":
                return <ModernTemplate {...templateProps} />;

            case "classic":
                return <ClassicTemplate {...templateProps} />;

            case "two-column":
                return <TwoColumnTemplate {...templateProps} />;

            case "minimal":
                return <MinimalTemplate {...templateProps} />;

            case "creative":
                return <CreativeTemplate {...templateProps} />;

            case "professional":
                return <ProfessionalTemplate {...templateProps} />;

            case "executive":
                return <ExecutiveTemplate {...templateProps} />;

            case "tech":
                return <TechTemplate {...templateProps} />;

            case "student":
                return <StudentTemplate {...templateProps} />;

            case "elegant":
                return <ElegantTemplate {...templateProps} />;

            case "corporate":
                return <CorporateTemplate {...templateProps} />;

            case "simple":
                return <SimpleTemplate {...templateProps} />;

            case "modern-green":
                return <ModernGreenTemplate {...templateProps} />;

            case "bold":
                return <BoldTemplate {...templateProps} />;

            case "ats-friendly":
                return <AtsTemplate {...templateProps} />;

            default:
                return <ModernTemplate {...templateProps} />;
        }
    };

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
                        navigate("/candidate/resume-templates", {
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
                    p: 0,
                    backgroundColor: "#ffffff",
                    color: "#333333",
                    borderRadius: { xs: 2, sm: 3 },
                    border: `1px solid ${borderStyle}`,
                    overflow: "hidden",
                    boxSizing: "border-box",
                }}
            >
                {renderSelectedTemplate()}
            </Paper>
        </CandidateLayout>
    );
}