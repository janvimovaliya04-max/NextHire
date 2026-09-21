
import { Box, Typography, Divider } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function StudentTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#2563eb";

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#1e293b",
                minHeight: "1120px",
                p: { xs: 3, sm: 5, md: 6 },
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Student Header */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    sx={{
                        fontSize: { xs: "2rem", sm: "2.7rem" },
                        fontWeight: 700,
                        color: accentColor,
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: "#64748b",
                            mt: 0.5,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontSize: "0.8rem",
                        color: "#475569",
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

            <Divider
                sx={{
                    borderColor: accentColor,
                    borderBottomWidth: 2,
                    mb: 3,
                }}
            />

            {/* Student Content */}
            <ResumeSections
                resumeData={resumeData}
                accentColor={accentColor}
                variant="student"
            />
        </Box>
    );
}