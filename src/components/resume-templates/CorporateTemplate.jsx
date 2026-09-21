
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function CorporateTemplate({
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
                    xs: "24px 20px",
                    sm: "40px 48px",
                    md: "52px 64px",
                },
                fontFamily: "Arial, Helvetica, sans-serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* Corporate Header */}
            <Box
                sx={{
                    backgroundColor: accentColor,
                    color: "#ffffff",
                    padding: {
                        xs: "24px 22px",
                        sm: "34px 38px",
                    },
                    borderRadius: "4px",
                    borderLeft: "7px solid rgba(255,255,255,0.65)",
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
                            xs: "1.8rem",
                            sm: "2.5rem",
                            md: "2.8rem",
                        },
                        fontWeight: 800,
                        letterSpacing: "-0.6px",
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
                                sm: "1.05rem",
                            },
                            fontWeight: 600,
                            letterSpacing: "0.4px",
                            color: "#dbeafe",
                            marginTop: 1.2,
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
                            color: "#f1f5f9",
                            marginTop: 2.2,
                            lineHeight: 1.9,
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
                            color: "#dbeafe",
                            lineHeight: 1.9,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {socialDetails}
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
                    opacity: 0.8,
                }}
            />

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="corporate"
            />
        </Box>
    );
}