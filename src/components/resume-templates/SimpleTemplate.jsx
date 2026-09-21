
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function SimpleTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#374151";

    const contactDetails = [
        resumeData.email,
        resumeData.phone,
        resumeData.location,
        resumeData.linkedin,
        resumeData.github,
    ]
        .filter((item) => item && String(item).trim())
        .join("  •  ");

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#374151",
                minHeight: "1120px",
                padding: {
                    xs: "28px 22px",
                    sm: "44px 54px",
                    md: "56px 70px",
                },
                fontFamily: "Arial, Helvetica, sans-serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* Simple Header */}
            <Box
                sx={{
                    marginBottom: {
                        xs: 2.5,
                        sm: 3.5,
                    },
                }}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "1.9rem",
                            sm: "2.6rem",
                            md: "2.8rem",
                        },
                        fontWeight: 700,
                        color: "#111827",
                        letterSpacing: "-0.7px",
                        lineHeight: 1.2,
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
                            marginTop: 1,
                            lineHeight: 1.5,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                {contactDetails && (
                    <Typography
                        sx={{
                            fontSize: "0.76rem",
                            color: "#6b7280",
                            marginTop: 1.8,
                            lineHeight: 1.9,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {contactDetails}
                    </Typography>
                )}
            </Box>

            {/* Minimal Divider */}
            <Divider
                sx={{
                    borderColor: "#d1d5db",
                    borderBottomWidth: 1.5,
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                }}
            />

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="simple"
            />
        </Box>
    );
}