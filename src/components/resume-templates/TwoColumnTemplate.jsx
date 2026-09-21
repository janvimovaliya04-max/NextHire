import { Box, Typography, Divider, Chip } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function TwoColumnTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#0f766e";

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "260px 1fr",
                },
                minHeight: "1120px",
                backgroundColor: "#ffffff",
                color: "#1f2937",
            }}
        >
            {/* Left Sidebar */}
            <Box
                sx={{
                    backgroundColor: accentColor,
                    color: "#ffffff",
                    padding: { xs: 3, md: 3 },
                }}
            >
                {/* Profile */}
                <Typography
                    sx={{
                        fontSize: "1.6rem",
                        fontWeight: 800,
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
                            mt: 1,
                            opacity: 0.9,
                            wordBreak: "break-word",
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Divider
                    sx={{
                        borderColor: "rgba(255,255,255,0.5)",
                        my: 3,
                    }}
                />

                {/* Contact */}
                <Typography
                    sx={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        mb: 1.5,
                    }}
                >
                    Contact
                </Typography>

                {[
                    resumeData.email,
                    resumeData.phone,
                    resumeData.location,
                    resumeData.linkedin,
                    resumeData.github,
                ]
                    .filter(Boolean)
                    .map((item, index) => (
                        <Typography
                            key={`${item}-${index}`}
                            sx={{
                                fontSize: "0.78rem",
                                mb: 1,
                                lineHeight: 1.5,
                                overflowWrap: "anywhere",
                            }}
                        >
                            {item}
                        </Typography>
                    ))}

                {/* Skills */}
                {resumeData.skills?.filter(Boolean).length > 0 && (
                    <>
                        <Divider
                            sx={{
                                borderColor: "rgba(255,255,255,0.5)",
                                my: 3,
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                mb: 1.5,
                            }}
                        >
                            Skills
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.8,
                            }}
                        >
                            {resumeData.skills
                                .filter(Boolean)
                                .map((skill, index) => (
                                    <Chip
                                        key={`${skill}-${index}`}
                                        label={skill}
                                        size="small"
                                        sx={{
                                            color: "#ffffff",
                                            border: "1px solid rgba(255,255,255,0.6)",
                                            backgroundColor:
                                                "rgba(255,255,255,0.12)",
                                            fontSize: "0.7rem",
                                        }}
                                    />
                                ))}
                        </Box>
                    </>
                )}

                {/* Languages */}
                {resumeData.languages &&
                    String(resumeData.languages).trim() && (
                        <>
                            <Divider
                                sx={{
                                    borderColor: "rgba(255,255,255,0.5)",
                                    my: 3,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    mb: 1.5,
                                }}
                            >
                                Languages
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "0.8rem",
                                    lineHeight: 1.8,
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {resumeData.languages}
                            </Typography>
                        </>
                    )}
            </Box>

            {/* Right Content */}
            <Box
                sx={{
                    padding: { xs: 3, sm: 4 },
                    minWidth: 0,
                }}
            >
                <ResumeSections
                    resumeData={resumeData}
                    accentColor={accentColor}
                    variant="two-column"
                    showSkills={false}
                    showLanguages={false}
                />
            </Box>
        </Box>
    );
}