import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function AtsTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#000000";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                minHeight: "1120px",
                padding: { xs: 3, sm: 5 },
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    textAlign: "left",
                    borderBottom: "1px solid #000000",
                    pb: 2,
                    mb: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "1.8rem",
                            sm: "2.4rem",
                        },
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
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
                            mt: 1,
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
                        .join(" | ")}
                </Typography>
            </Box>

            {/* ATS Resume Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="ats-friendly"
            />
        </Box>
    );
}