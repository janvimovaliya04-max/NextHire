
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ElegantTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#9d174d";

    return (
        <Box
            sx={{
                backgroundColor: "#fffafc",
                color: "#374151",
                minHeight: "1120px",
                p: { xs: 3, sm: 5, md: 6 },
                fontFamily: "Georgia, serif",
            }}
        >
            {/* Elegant Header */}
            <Box
                sx={{
                    textAlign: "center",
                    mb: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "2rem", sm: "2.8rem" },
                        fontWeight: 600,
                        color: "#4a044e",
                        letterSpacing: "1px",
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
                            fontStyle: "italic",
                            mt: 1,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontFamily: "Arial, sans-serif",
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
                            fontFamily: "Arial, sans-serif",
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
                    mb: 4,
                }}
            />

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="elegant"
            />
        </Box>
    );
}