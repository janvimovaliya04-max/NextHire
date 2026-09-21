
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function AtsTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#000000";

    const contactDetails = [
        resumeData.email,
        resumeData.phone,
        resumeData.location,
        resumeData.linkedin,
        resumeData.github,
    ]
        .filter((item) => item && String(item).trim())
        .join(" | ");

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                minHeight: "1120px",
                padding: {
                    xs: "28px 22px",
                    sm: "44px 54px",
                    md: "56px 68px",
                },
                fontFamily: "Arial, Helvetica, sans-serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* ATS Header */}
            <Box
                sx={{
                    textAlign: "left",
                    borderBottom: "1.5px solid #000000",
                    paddingBottom: {
                        xs: 1.8,
                        sm: 2.2,
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
                            xs: "1.75rem",
                            sm: "2.35rem",
                            md: "2.6rem",
                        },
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: {
                            xs: "0.3px",
                            sm: "0.8px",
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
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1rem",
                            },
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
                            marginTop: 1.5,
                            lineHeight: 1.9,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {contactDetails}
                    </Typography>
                )}
            </Box>

            {/* ATS Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="ats-friendly"
            />
        </Box>
    );
}