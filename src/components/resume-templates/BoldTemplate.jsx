
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function BoldTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#7c3aed";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#111827",
                minHeight: "1120px",
                p: { xs: 3, sm: 5, md: 6 },
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Bold Header */}
            <Box
                sx={{
                    backgroundColor: "#111827",
                    color: "#ffffff",
                    p: { xs: 3, sm: 4 },
                    borderRadius: 2,
                    mb: 4,
                    borderBottom: `7px solid ${accentColor}`,
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "2rem", sm: "3rem" },
                        fontWeight: 900,
                        textTransform: "uppercase",
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
                            fontWeight: 700,
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
                    borderBottomWidth: 3,
                    mb: 4,
                }}
            />

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="bold"
            />
        </Box>
    );
}