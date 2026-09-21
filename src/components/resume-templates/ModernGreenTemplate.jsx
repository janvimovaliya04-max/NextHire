
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ModernGreenTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#059669";

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
                backgroundColor: "#f0fdf4",
                color: "#1f2937",
                minHeight: "1120px",
                padding: {
                    xs: "24px 20px",
                    sm: "40px 48px",
                    md: "54px 64px",
                },
                fontFamily: "Arial, Helvetica, sans-serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* Green Header */}
            <Box
                sx={{
                    backgroundColor: "#064e3b",
                    color: "#ffffff",
                    padding: {
                        xs: "26px 22px",
                        sm: "36px 40px",
                    },
                    borderRadius: "10px",
                    borderBottom: "5px solid #34d399",
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                    boxShadow: "0 6px 18px rgba(6, 78, 59, 0.12)",
                }}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "1.9rem",
                            sm: "2.7rem",
                            md: "3rem",
                        },
                        fontWeight: 800,
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
                            color: "#a7f3d0",
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1.05rem",
                            },
                            fontWeight: 600,
                            letterSpacing: "0.3px",
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
                            color: "#ecfdf5",
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
                            color: "#d1fae5",
                            lineHeight: 1.9,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {socialDetails}
                    </Typography>
                )}
            </Box>

            {/* Green Divider */}
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

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="modern-green"
            />
        </Box>
    );
}