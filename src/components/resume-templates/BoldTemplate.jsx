
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function BoldTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#7c3aed";

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
                color: "#111827",
                minHeight: "1120px",
                padding: {
                    xs: "24px 20px",
                    sm: "42px 50px",
                    md: "54px 64px",
                },
                fontFamily: "Arial, Helvetica, sans-serif",
                overflowWrap: "anywhere",
            }}
        >
            {/* Bold Header */}
            <Box
                sx={{
                    backgroundColor: "#111827",
                    color: "#ffffff",
                    padding: {
                        xs: "26px 22px",
                        sm: "36px 40px",
                    },
                    borderRadius: "6px",
                    borderBottom: `7px solid ${accentColor}`,
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                    boxShadow: "0 6px 18px rgba(17, 24, 39, 0.12)",
                }}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "1.8rem",
                            sm: "2.7rem",
                            md: "3.1rem",
                        },
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: {
                            xs: "0.5px",
                            sm: "1.5px",
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
                            color: "#ddd6fe",
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1.05rem",
                            },
                            fontWeight: 700,
                            letterSpacing: "0.4px",
                            marginTop: 1.3,
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
                            color: "#e5e7eb",
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
                            color: "#c4b5fd",
                            lineHeight: 1.9,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {socialDetails}
                    </Typography>
                )}
            </Box>

            {/* Accent Divider */}
            <Divider
                sx={{
                    borderColor: accentColor,
                    borderBottomWidth: 3,
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
                variant="bold"
            />
        </Box>
    );
}