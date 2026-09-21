
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function CreativeTemplate({
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
                position: "relative",
                overflow: "hidden",
                minHeight: "1120px",
                padding: {
                    xs: "30px 24px",
                    sm: "45px 55px",
                },
                backgroundColor: "#ffffff",
                color: "#1f2937",
                overflowWrap: "anywhere",
            }}
        >
            {/* Decorative Shapes */}
            <Box
                sx={{
                    position: "absolute",
                    top: -120,
                    right: -100,
                    width: {
                        xs: 220,
                        sm: 300,
                    },
                    height: {
                        xs: 220,
                        sm: 300,
                    },
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    opacity: 0.1,
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: -100,
                    left: -120,
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    border: `35px solid ${accentColor}`,
                    opacity: 0.05,
                    pointerEvents: "none",
                }}
            />

            {/* Header */}
            <Box
                sx={{
                    position: "relative",
                    marginBottom: {
                        xs: 3,
                        sm: 3.5,
                    },
                }}
            >
                {/* Profile + Name Row */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: {
                            xs: 2,
                            sm: 3,
                        },
                        borderLeft: {
                            xs: `4px solid ${accentColor}`,
                            sm: `6px solid ${accentColor}`,
                        },
                        paddingLeft: {
                            xs: 2,
                            sm: 3,
                        },
                    }}
                >
                    {/* Profile Image */}
                    {resumeData.profileImage && (
                        <Box
                            component="img"
                            src={resumeData.profileImage}
                            alt="Profile"
                            sx={{
                                width: {
                                    xs: 80,
                                    sm: 100,
                                },
                                height: {
                                    xs: 80,
                                    sm: 100,
                                },
                                objectFit: "cover",
                                borderRadius: "12px",
                                border: `3px solid ${accentColor}`,
                                flexShrink: 0,
                            }}
                        />
                    )}

                    {/* Name + Job Title */}
                    <Box
                        sx={{
                            minWidth: 0,
                            paddingTop: {
                                xs: 0.5,
                                sm: 1,
                            },
                        }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    sm: "3rem",
                                },
                                fontWeight: 900,
                                lineHeight: 1.1,
                                color: "#111827",
                                letterSpacing: {
                                    xs: "-0.6px",
                                    sm: "-1.2px",
                                },
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
                                        xs: "0.85rem",
                                        sm: "1.1rem",
                                    },
                                    fontWeight: 700,
                                    lineHeight: 1.5,
                                    marginTop: 1.5,
                                    overflowWrap: "anywhere",
                                }}
                            >
                                {resumeData.jobTitle}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Contact Details */}
                {contactDetails && (
                    <Typography
                        sx={{
                            fontSize: "0.78rem",
                            color: "#6b7280",
                            marginTop: 2,
                            lineHeight: 1.8,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {contactDetails}
                    </Typography>
                )}

                {/* Social Details */}
                {socialDetails && (
                    <Typography
                        sx={{
                            fontSize: "0.78rem",
                            color: "#6b7280",
                            lineHeight: 1.8,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {socialDetails}
                    </Typography>
                )}
            </Box>

            {/* Creative Divider */}
            <Divider
                sx={{
                    position: "relative",
                    borderColor: accentColor,
                    borderBottomWidth: 3,
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                    opacity: 0.85,
                }}
            />

            {/* Resume Sections */}
            <Box sx={{ position: "relative" }}>
                <ResumeSections
                    resumeData={resumeData}
                    accentColor={accentColor}
                    variant="creative"
                />
            </Box>
        </Box>
    );
}