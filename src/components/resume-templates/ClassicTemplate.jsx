
import { Box, Typography } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ClassicTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#222222";

    const contactDetails = [
        resumeData.email,
        resumeData.phone,
        resumeData.location,
    ]
        .filter(Boolean)
        .join("  |  ");

    const socialDetails = [
        resumeData.linkedin,
        resumeData.github,
    ]
        .filter(Boolean)
        .join("  |  ");

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#222222",
                fontFamily: "Georgia, 'Times New Roman', serif",
                minHeight: "1120px",
                padding: {
                    xs: "28px 22px",
                    sm: "45px 55px",
                },
                overflowWrap: "anywhere",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    textAlign: "center",
                    borderBottom: `3px double ${accentColor}`,
                    paddingBottom: {
                        xs: 2.5,
                        sm: 3,
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
                        color: "#181818",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: {
                            xs: "1.85rem",
                            sm: "2.65rem",
                        },
                        fontWeight: 700,
                        lineHeight: 1.2,
                        letterSpacing: {
                            xs: "0.5px",
                            sm: "1.2px",
                        },
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName || "Your Name"}
                </Typography>

                {resumeData.jobTitle?.trim() && (
                    <Typography
                        sx={{
                            color: "#555555",
                            fontFamily: "Georgia, serif",
                            fontSize: {
                                xs: "0.95rem",
                                sm: "1.08rem",
                            },
                            fontStyle: "italic",
                            marginTop: 1,
                            lineHeight: 1.5,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                {contactDetails && (
                    <Typography
                        sx={{
                            color: "#444444",
                            fontFamily: "Arial, sans-serif",
                            fontSize: {
                                xs: "0.72rem",
                                sm: "0.8rem",
                            },
                            lineHeight: 1.7,
                            marginTop: 2,
                            wordBreak: "break-word",
                        }}
                    >
                        {contactDetails}
                    </Typography>
                )}

                {socialDetails && (
                    <Typography
                        sx={{
                            color: accentColor,
                            fontFamily: "Arial, sans-serif",
                            fontSize: {
                                xs: "0.7rem",
                                sm: "0.78rem",
                            },
                            lineHeight: 1.7,
                            marginTop: 0.4,
                            wordBreak: "break-word",
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
                variant="classic"
            />
        </Box>
    );
}