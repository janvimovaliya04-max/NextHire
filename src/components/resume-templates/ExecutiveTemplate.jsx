import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ExecutiveTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#334155";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#1f2937",
                minHeight: "1120px",
                padding: { xs: 3, sm: 5, md: 6 },
                fontFamily: "Georgia, serif",
            }}
        >
            {/* Executive Header */}
            <Box
                sx={{
                    textAlign: "center",
                    mb: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "2rem",
                            sm: "3rem",
                        },
                        fontWeight: 700,
                        letterSpacing: "1px",
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
                            fontSize: "1.05rem",
                            mt: 1.5,
                            color: accentColor,
                            fontStyle: "italic",
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
                    borderBottomWidth: 3,
                    mb: 4,
                }}
            />

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="executive"
            />
        </Box>
    );
}