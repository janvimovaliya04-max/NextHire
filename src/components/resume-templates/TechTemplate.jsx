
import { Box, Typography, Chip, Divider } from "@mui/material";
import { Code2, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import ResumeSections from "./ResumeSections";

export default function TechTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#0891b2";

    return (
        <Box
            sx={{
                backgroundColor: "#0f172a",
                color: "#e2e8f0",
                minHeight: "1120px",
                p: { xs: 3, sm: 5, md: 6 },
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    borderLeft: `5px solid ${accentColor}`,
                    pl: 3,
                    mb: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "2rem", sm: "2.8rem" },
                        fontWeight: 800,
                        color: "#f8fafc",
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            color: accentColor,
                            fontSize: "1rem",
                            mt: 1,
                            fontWeight: 600,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {resumeData.email && (
                        <Box sx={{ display: "flex", gap: 0.7, alignItems: "center" }}>
                            <Mail size={14} color={accentColor} />
                            <Typography sx={{ fontSize: "0.78rem" }}>
                                {resumeData.email}
                            </Typography>
                        </Box>
                    )}

                    {resumeData.phone && (
                        <Box sx={{ display: "flex", gap: 0.7, alignItems: "center" }}>
                            <Phone size={14} color={accentColor} />
                            <Typography sx={{ fontSize: "0.78rem" }}>
                                {resumeData.phone}
                            </Typography>
                        </Box>
                    )}

                    {resumeData.location && (
                        <Box sx={{ display: "flex", gap: 0.7, alignItems: "center" }}>
                            <MapPin size={14} color={accentColor} />
                            <Typography sx={{ fontSize: "0.78rem" }}>
                                {resumeData.location}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {(resumeData.github || resumeData.linkedin) && (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mt: 1.5,
                        }}
                    >
                        {resumeData.github && (
                            <Box sx={{ display: "flex", gap: 0.7, alignItems: "center" }}>
                                <Github size={14} color={accentColor} />
                                <Typography sx={{ fontSize: "0.78rem" }}>
                                    {resumeData.github}
                                </Typography>
                            </Box>
                        )}

                        {resumeData.linkedin && (
                            <Box sx={{ display: "flex", gap: 0.7, alignItems: "center" }}>
                                <Linkedin size={14} color={accentColor} />
                                <Typography sx={{ fontSize: "0.78rem" }}>
                                    {resumeData.linkedin}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>

            <Divider
                sx={{
                    borderColor: "#334155",
                    mb: 4,
                }}
            />

            {/* Tech Badge */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <Code2 size={20} color={accentColor} />
                <Typography
                    sx={{
                        color: accentColor,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        letterSpacing: "1px",
                    }}
                >
                    TECHNICAL PROFILE
                </Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 2,
                    p: { xs: 2, sm: 3 },
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