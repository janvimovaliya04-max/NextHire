
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ExecutiveTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#334155";

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
                color: "#1f2937",
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
            {/* Executive Header */}
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
                            sm: "3rem",
                        },
                        fontWeight: 700,
                        letterSpacing: {
                            xs: "0.5px",
                            sm: "1.2px",
                        },
                        color: "#111827",
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
                                xs: "0.95rem",
                                sm: "1.08rem",
                            },
                            marginTop: 1.5,
                            color: accentColor,
                            fontStyle: "italic",
                            fontWeight: 500,
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
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontSize: "0.76rem",
                            color: "#4b5563",
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
                            fontSize: "0.76rem",
                            color: "#4b5563",
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
                    borderBottomWidth: 3,
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                    opacity: 0.9,
                }}
            />

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="executive"
            />
        </Box>
    );
}