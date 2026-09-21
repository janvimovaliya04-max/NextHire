import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function CreativeTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#7c3aed";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#1f2937",
                minHeight: "1120px",
                padding: { xs: 3, sm: 5 },
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative Shape */}
            <Box
                sx={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    opacity: 0.12,
                }}
            />

            {/* Header */}
            <Box
                sx={{
                    position: "relative",
                    borderLeft: `8px solid ${accentColor}`,
                    paddingLeft: 3,
                    mb: 5,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "2rem",
                            sm: "3rem",
                        },
                        fontWeight: 900,
                        lineHeight: 1.1,
                        color: "#111827",
                        letterSpacing: "-1px",
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            color: accentColor,
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            mt: 1.5,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontSize: "0.8rem",
                        color: "#6b7280",
                        mt: 2,
                        lineHeight: 1.8,
                        wordBreak: "break-word",
                    }}
                >
                    {[
                        resumeData.email,
                        resumeData.phone,
                        resumeData.location,
                    ]
                        .filter(Boolean)
                        .join("  •  ")}
                </Typography>

                {(resumeData.linkedin || resumeData.github) && (
                    <Typography
                        sx={{
                            fontSize: "0.8rem",
                            color: "#6b7280",
                            lineHeight: 1.8,
                            wordBreak: "break-word",
                        }}
                    >
                        {[resumeData.linkedin, resumeData.github]
                            .filter(Boolean)
                            .join("  •  ")}
                    </Typography>
                )}
            </Box>

            {/* Creative Divider */}
            <Divider
                sx={{
                    borderColor: accentColor,
                    borderBottomWidth: 3,
                    mb: 4,
                }}
            />

            {/* Resume Sections */}
            <ResumeSections
                resumeData={resumeData} 
                accentColor={accentColor}
                variant="creative"
            />
        </Box>
    );
}