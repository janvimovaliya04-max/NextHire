
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function CreativeTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#7c3aed";

    const contactDetails = [
        resumeData.email,
        resumeData.phone,
        resumeData.location,
    ]
        .filter((item) => item && String(item).trim())
        .join("  •  ");

    const socialDetails = [
        resumeData.linkedin,
        resumeData.github,
    ]
        .filter((item) => item && String(item).trim())
        .join("  •  ");

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                minHeight: "1120px",
                padding: {
                    xs: "30px 24px",
                    sm: "45px 55px",
                },
                backgroundColor: "#ffffff",
                color: "#1f2937",
                overflowWrap: "anywhere",
            }}
        >
            {/* Decorative Shapes */}
            <Box
                sx={{
                    position: "absolute",
                    top: -120,
                    right: -100,
                    width: {
                        xs: 220,
                        sm: 300,
                    },
                    height: {
                        xs: 220,
                        sm: 300,
                    },
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    opacity: 0.1,
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: -100,
                    left: -120,
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    border: `35px solid ${accentColor}`,
                    opacity: 0.05,
                    pointerEvents: "none",
                }}
            />

            {/* Header */}
            <Box
                sx={{
                    position: "relative",
                    borderLeft: {
                        xs: `5px solid ${accentColor}`,
                        sm: `8px solid ${accentColor}`,
                    },
                    paddingLeft: {
                        xs: 2,
                        sm: 3,
                    },
                    marginBottom: {
                        xs: 4,
                        sm: 5,
                    },
                }}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "2rem",
                            sm: "3rem",
                        },
                        fontWeight: 900,
                        lineHeight: 1.1,
                        color: "#111827",
                        letterSpacing: {
                            xs: "-0.8px",
                            sm: "-1.2px",
                        },
                        overflowWrap: "anywhere",
                    }}
                >
                    {resumeData.fullName || "Your Name"}
                </Typography>

                {resumeData.jobTitle?.trim() && (
                    <Typography
                        sx={{
                            color: accentColor,
                            fontSize: {
                                xs: "0.95rem",
                                sm: "1.1rem",
                            },
                            fontWeight: 700,
                            lineHeight: 1.5,
                            marginTop: 1.5,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                {contactDetails && (
                    <Typography
                        sx={{
                            fontSize: "0.78rem",
                            color: "#6b7280",
                            marginTop: 2,
                            lineHeight: 1.8,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {contactDetails}
                    </Typography>
                )}

                {socialDetails && (
                    <Typography
                        sx={{
                            fontSize: "0.78rem",
                            color: "#6b7280",
                            lineHeight: 1.8,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {socialDetails}
                    </Typography>
                )}
            </Box>

            {/* Creative Divider */}
            <Divider
                sx={{
                    position: "relative",
                    borderColor: accentColor,
                    borderBottomWidth: 3,
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                    opacity: 0.85,
                }}
            />

            {/* Resume Sections */}
            <Box sx={{ position: "relative" }}>
                <ResumeSections
                    resumeData={resumeData}
                    accentColor={accentColor}
                    variant="creative"
                />
            </Box>
        </Box>
    );
}