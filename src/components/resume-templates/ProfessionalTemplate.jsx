import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ProfessionalTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#1e3a8a";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#1f2937",
                minHeight: "1120px",
                padding: { xs: 3, sm: 5 },
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: "#f5f5f5",
                    borderTop: `6px solid ${accentColor}`,
                    padding: { xs: 3, sm: 4 },
                    mb: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "1.8rem",
                            sm: "2.5rem",
                        },
                        fontWeight: 800,
                        color: "#1f2937",
                        lineHeight: 1.2,
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: accentColor,
                            fontWeight: 600,
                            mt: 1,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Divider
                    sx={{
                        borderColor: "#d1d5db",
                        my: 2,
                    }}
                />

                <Typography
                    sx={{
                        fontSize: "0.8rem",
                        color: "#4b5563",
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
                        .join(" | ")}
                </Typography>

                {(resumeData.linkedin || resumeData.github) && (
                    <Typography
                        sx={{
                            fontSize: "0.8rem",
                            color: "#4b5563",
                            lineHeight: 1.8,
                            wordBreak: "break-word",
                        }}
                    >
                        {[resumeData.linkedin, resumeData.github]
                            .filter(Boolean)
                            .join(" | ")}
                    </Typography>
                )}
            </Box>

            {/* Resume Sections */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="professional"
            />
        </Box>
    );
}