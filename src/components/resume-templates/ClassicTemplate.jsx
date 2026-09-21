
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function ClassicTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#222222";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#222222",
                fontFamily: "Georgia, serif",
                minHeight: "1120px",
                padding: { xs: 3, sm: 5 },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    textAlign: "center",
                    borderBottom: `3px double ${accentColor}`,
                    paddingBottom: 3,
                    mb: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "1.8rem",
                            sm: "2.5rem",
                        },
                        fontWeight: 700,
                        letterSpacing: "1px",
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            fontSize: "1.05rem",
                            mt: 1,
                            fontStyle: "italic",
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "0.8rem",
                        mt: 2,
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
                            fontFamily: "Arial, sans-serif",
                            fontSize: "0.8rem",
                            mt: 0.5,
                            wordBreak: "break-word",
                        }}
                    >
                        {[
                            resumeData.linkedin,
                            resumeData.github,
                        ]
                            .filter(Boolean)
                            .join(" | ")}
                    </Typography>
                )}
            </Box>

            {/* Resume Sections */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="classic"
            />
        </Box>
    );
}