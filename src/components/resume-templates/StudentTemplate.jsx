
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function StudentTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#2563eb";

    const contactDetails = [
        resumeData.email,
        resumeData.phone,
        resumeData.location,
        resumeData.linkedin,
        resumeData.github,
    ]
        .filter((item) => item && String(item).trim())
        .join("  |  ");

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#1e293b",
                minHeight: "1120px",
                padding: {
                    xs: "28px 22px",
                    sm: "45px 55px",
                    md: "55px 65px",
                },
                fontFamily: "Arial, Helvetica, sans-serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* Student Header */}
            <Box
                sx={{
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
                            sm: "2.7rem",
                        },
                        fontWeight: 700,
                        color: accentColor,
                        lineHeight: 1.2,
                        letterSpacing: "-0.7px",
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
                            color: "#64748b",
                            fontWeight: 500,
                            lineHeight: 1.5,
                            marginTop: 0.7,
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
                            color: "#475569",
                            marginTop: 1.8,
                            lineHeight: 1.9,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {contactDetails}
                    </Typography>
                )}
            </Box>

            {/* Header Divider */}
            <Divider
                sx={{
                    borderColor: accentColor,
                    borderBottomWidth: 2,
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                    opacity: 0.85,
                }}
            />

            {/* Student Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="student"
            />
        </Box>
    );
}