
import { Box, Typography } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function MinimalTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#475569";

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
                backgroundColor: "#ffffff",
                color: "#374151",
                minHeight: "1120px",
                padding: {
                    xs: "30px 24px",
                    sm: "45px 55px",
                    md: "55px 65px",
                },
                fontFamily: "Arial, Helvetica, sans-serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* Header */}
            <Box
                sx={{
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
                            sm: "2.8rem",
                        },
                        fontWeight: 400,
                        letterSpacing: {
                            xs: "-0.8px",
                            sm: "-1.4px",
                        },
                        color: "#111827",
                        lineHeight: 1.15,
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
                                sm: "0.98rem",
                            },
                            color: accentColor,
                            marginTop: 1.5,
                            letterSpacing: "0.4px",
                            fontWeight: 600,
                            lineHeight: 1.5,
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
                            fontSize: "0.76rem",
                            color: "#6b7280",
                            lineHeight: 1.8,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {socialDetails}
                    </Typography>
                )}

                <Box
                    sx={{
                        width: 48,
                        height: "2px",
                        backgroundColor: accentColor,
                        marginTop: 2.5,
                    }}
                />
            </Box>

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="minimal"
            />
        </Box>
    );
}