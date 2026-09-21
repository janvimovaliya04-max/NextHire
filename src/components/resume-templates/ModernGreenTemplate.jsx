
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ModernGreenTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#059669";

    return (
        <Box
            sx={{
                backgroundColor: "#f0fdf4",
                color: "#1f2937",
                minHeight: "1120px",
                p: { xs: 3, sm: 5, md: 6 },
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Green Header */}
            <Box
                sx={{
                    backgroundColor: "#064e3b",
                    color: "#ffffff",
                    p: { xs: 3, sm: 4 },
                    borderRadius: 2,
                    mb: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "2rem", sm: "2.8rem" },
                        fontWeight: 700,
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            color: "#a7f3d0",
                            fontSize: "1rem",
                            mt: 1,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontSize: "0.78rem",
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

            <Divider
                sx={{
                    borderColor: accentColor,
                    borderBottomWidth: 2,
                    mb: 4,
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