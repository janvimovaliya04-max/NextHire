
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ProfessionalTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#1e3a8a";

    const contactDetails = [
        resumeData.email,
        resumeData.phone,
        resumeData.location,
    ]
        .filter((item) => item && String(item).trim())
        .join("  |  ");

    const socialDetails = [
        resumeData.linkedin,
        resumeData.github,
    ]
        .filter((item) => item && String(item).trim())
        .join("  |  ");

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#1f2937",
                minHeight: "1120px",
                padding: {
                    xs: "28px 22px",
                    sm: "45px 55px",
                },
                fontFamily: "Arial, Helvetica, sans-serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: "#f5f6f8",
                    borderTop: {
                        xs: `5px solid ${accentColor}`,
                        sm: `7px solid ${accentColor}`,
                    },
                    padding: {
                        xs: "24px 22px",
                        sm: "30px 34px",
                    },
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                }}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "1.85rem",
                            sm: "2.55rem",
                        },
                        fontWeight: 800,
                        color: "#1f2937",
                        lineHeight: 1.2,
                        letterSpacing: "-0.6px",
                        overflowWrap: "anywhere",
                    }}
                >
                    {resumeData.fullName || "Your Name"}
                </Typography>

                {resumeData.jobTitle?.trim() && (
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1rem",
                            },
                            color: accentColor,
                            fontWeight: 600,
                            lineHeight: 1.5,
                            marginTop: 1,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Divider
                    sx={{
                        borderColor: "#d1d5db",
                        marginY: 2,
                    }}
                />

                {contactDetails && (
                    <Typography
                        sx={{
                            fontSize: "0.78rem",
                            color: "#4b5563",
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
                            color: "#4b5563",
                            lineHeight: 1.8,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {socialDetails}
                    </Typography>
                )}
            </Box>

            {/* Resume Sections */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="professional"
            />
        </Box>
    );
}