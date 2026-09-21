
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function SimpleTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#374151";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#374151",
                minHeight: "1120px",
                p: { xs: 3, sm: 5, md: 6 },
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Simple Header */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    sx={{
                        fontSize: { xs: "1.9rem", sm: "2.5rem" },
                        fontWeight: 700,
                        color: "#111827",
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
                            mt: 0.7,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontSize: "0.78rem",
                        mt: 1.5,
                        lineHeight: 1.8,
                        wordBreak: "break-word",
                    }}
                >
                    {[
                        resumeData.email,
                        resumeData.phone,
                        resumeData.location,
                        resumeData.linkedin,
                        resumeData.github,
                    ]
                        .filter(Boolean)
                        .join(" • ")}
                </Typography>
            </Box>

            <Divider
                sx={{
                    borderColor: "#d1d5db",
                    mb: 3,
                }}
            />

            {/* Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="simple"
            />
        </Box>
    );
}