
import { Box, Typography, Divider } from "@mui/material";
import { Code2, Mail, Phone, MapPin } from "lucide-react";
import ResumeSections from "./ResumeSections";

export default function TechTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#0891b2";

    const contactItems = [
        {
            value: resumeData.email,
            icon: Mail,
        },
        {
            value: resumeData.phone,
            icon: Phone,
        },
        {
            value: resumeData.location,
            icon: MapPin,
        },
    ].filter((item) => item.value && String(item.value).trim());

    const socialItems = [
        resumeData.github,
        resumeData.linkedin,
    ].filter((item) => item && String(item).trim());

    return (
        <Box
            sx={{
                backgroundColor: "#0f172a",
                color: "#e2e8f0",
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
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 3,
                    borderLeft: {
                        xs: `4px solid ${accentColor}`,
                        sm: `5px solid ${accentColor}`,
                    },
                    paddingLeft: {
                        xs: 2,
                        sm: 3,
                    },
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                }}
            >
                {/* Left Header Content */}
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        component="h1"
                        sx={{
                            fontSize: {
                                xs: "2rem",
                                sm: "2.8rem",
                            },
                            fontWeight: 800,
                            color: "#f8fafc",
                            lineHeight: 1.15,
                            letterSpacing: "-0.8px",
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
                                    xs: "0.9rem",
                                    sm: "1rem",
                                },
                                marginTop: 1,
                                fontWeight: 600,
                                lineHeight: 1.5,
                                overflowWrap: "anywhere",
                            }}
                        >
                            {resumeData.jobTitle}
                        </Typography>
                    )}

                    {/* Contact Information */}
                    {contactItems.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: {
                                    xs: 1.2,
                                    sm: 2,
                                },
                                marginTop: 2.5,
                            }}
                        >
                            {contactItems.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <Box
                                        key={`${item.value}-${index}`}
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 0.7,
                                            minWidth: 0,
                                            maxWidth: "100%",
                                        }}
                                    >
                                        <Icon
                                            size={14}
                                            color={accentColor}
                                            style={{
                                                flexShrink: 0,
                                                marginTop: 3,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                color: "#cbd5e1",
                                                fontSize: "0.75rem",
                                                lineHeight: 1.6,
                                                overflowWrap: "anywhere",
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    )}

                    {/* Social Links */}
                    {socialItems.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                                marginTop: 1.5,
                            }}
                        >
                            {socialItems.map((item, index) => (
                                <Typography
                                    key={`${item}-${index}`}
                                    sx={{
                                        color: "#94a3b8",
                                        fontSize: "0.75rem",
                                        lineHeight: 1.6,
                                        overflowWrap: "anywhere",
                                    }}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Right Profile Image - Square */}
                {resumeData.profileImage && (
                    <Box
                        component="img"
                        src={resumeData.profileImage}
                        alt="Profile"
                        sx={{
                            width: {
                                xs: 75,
                                sm: 110,
                                md: 140,
                            },
                            height: {
                                xs: 75,
                                sm: 110,
                                md: 140,
                            },
                            objectFit: "cover",
                            borderRadius: "4px",
                            border: `2px solid ${accentColor}`,
                            flexShrink: 0,
                        }}
                    />
                )}
            </Box>

            {/* Divider */}
            <Divider
                sx={{
                    borderColor: "#334155",
                    marginBottom: {
                        xs: 3,
                        sm: 4,
                    },
                }}
            />

            {/* Technical Profile Heading */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginBottom: 2.5,
                }}
            >
                <Code2 size={20} color={accentColor} />

                <Typography
                    sx={{
                        color: accentColor,
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        letterSpacing: "1.4px",
                    }}
                >
                    TECHNICAL PROFILE
                </Typography>
            </Box>

            {/* Resume Content */}
            <Box
                sx={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 2,
                    padding: {
                        xs: "20px 16px",
                        sm: "28px 30px",
                    },
                    minWidth: 0,
                }}
            >
                <ResumeSections
                    resumeData={resumeData}
                    accentColor={accentColor}
                    variant="tech"
                />
            </Box>
        </Box>
    );
}