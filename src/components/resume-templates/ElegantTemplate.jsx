
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ElegantTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#9d174d";

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
                backgroundColor: "#fffafc",
                color: "#374151",
                minHeight: "1120px",
                padding: {
                    xs: "30px 24px",
                    sm: "48px 58px",
                    md: "58px 70px",
                },
                fontFamily: "Georgia, 'Times New Roman', serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* Elegant Header */}
            <Box
                sx={{
                    textAlign: "center",
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
                            xs: "2rem",
                            sm: "2.8rem",
                        },
                        fontWeight: 600,
                        color: "#4a044e",
                        letterSpacing: {
                            xs: "0.5px",
                            sm: "1.2px",
                        },
                        lineHeight: 1.2,
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
                                xs: "0.92rem",
                                sm: "1.02rem",
                            },
                            fontStyle: "italic",
                            fontWeight: 500,
                            lineHeight: 1.5,
                            marginTop: 1.2,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                {contactDetails && (
                    <Typography
                        sx={{
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontSize: "0.75rem",
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
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            lineHeight: 1.8,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {socialDetails}
                    </Typography>
                )}
            </Box>

            {/* Elegant Divider */}
            <Divider
                sx={{
                    borderColor: accentColor,
                    borderBottomWidth: 1.5,
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                    opacity: 0.75,
                }}
            />

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="elegant"
            />
        </Box>
    );
}