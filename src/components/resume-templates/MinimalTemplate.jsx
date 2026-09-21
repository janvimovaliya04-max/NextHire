import { Box, Typography } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function MinimalTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#475569";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#374151",
                minHeight: "1120px",
                padding: { xs: 3, sm: 5, md: 6 },
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Header */}
            <Box sx={{ mb: 5 }}>
                <Typography
                    sx={{
                        fontSize: {
                            xs: "2rem",
                            sm: "2.8rem",
                        },
                        fontWeight: 400,
                        letterSpacing: "-1px",
                        color: "#111827",
                        lineHeight: 1.2,
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            fontSize: "0.95rem",
                            color: accentColor,
                            mt: 1.5,
                            letterSpacing: "0.5px",
                            fontWeight: 500,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontSize: "0.78rem",
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
                        .join(" • ")}
                </Typography>

                {(resumeData.linkedin || resumeData.github) && (
                    <Typography
                        sx={{
                            fontSize: "0.78rem",
                            color: "#6b7280",
                            lineHeight: 1.8,
                            wordBreak: "break-word",
                        }}
                    >
                        {[resumeData.linkedin, resumeData.github]
                            .filter(Boolean)
                            .join(" • ")}
                    </Typography>
                )}
            </Box>

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="minimal"
            />
        </Box>
    );
}