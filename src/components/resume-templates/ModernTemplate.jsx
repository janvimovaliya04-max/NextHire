import { Box, Typography, Divider } from "@mui/material";

export default function ModernTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#1e40af";

    const sectionHeadingSx = {
        fontSize: "1.05rem",
        fontWeight: 800,
        color: accentColor,
        textTransform: "uppercase",
        letterSpacing: "0.7px",
        borderBottom: `2px solid ${accentColor}`,
        paddingBottom: "6px",
        marginBottom: "14px",
    };

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#333333",
                fontFamily: "Arial, sans-serif",
                minHeight: "1120px",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: accentColor,
                    color: "#ffffff",
                    padding: { xs: 3, sm: 4 },
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "1.8rem",
                            sm: "2.4rem",
                        },
                        fontWeight: 800,
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                            mt: 1,
                            fontWeight: 600,
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontSize: "0.85rem",
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
                            fontSize: "0.8rem",
                            mt: 1,
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

            {/* Resume Content */}
            <Box
                sx={{
                    padding: { xs: 2.5, sm: 4 },
                }}
            >
                {/* Summary */}
                {resumeData.summary && (
                    <Box sx={{ mb: 3 }}>
                        <Typography sx={sectionHeadingSx}>
                            Professional Summary
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                lineHeight: 1.8,
                                whiteSpace: "pre-line",
                            }}
                        >
                            {resumeData.summary}
                        </Typography>
                    </Box>
                )}

                {/* Education */}
                {resumeData.education?.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography sx={sectionHeadingSx}>
                            Education
                        </Typography>

                        {resumeData.education.map((education, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography sx={{ fontWeight: 700 }}>
                                    {education.degree}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#555555",
                                    }}
                                >
                                    {education.institution}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.85rem",
                                        color: "#666666",
                                    }}
                                >
                                    {education.startYear} -{" "}
                                    {education.endYear}
                                    {education.grade &&
                                        ` | ${education.grade}`}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Experience */}
                {resumeData.experience?.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography sx={sectionHeadingSx}>
                            Work Experience
                        </Typography>

                        {resumeData.experience.map((experience, index) => (
                            <Box key={index} sx={{ mb: 2.5 }}>
                                <Typography sx={{ fontWeight: 700 }}>
                                    {experience.jobPosition}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#555555",
                                    }}
                                >
                                    {experience.companyName}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.85rem",
                                        color: "#666666",
                                    }}
                                >
                                    {experience.experienceStartYear} -{" "}
                                    {experience.experienceEndYear}
                                </Typography>

                                {experience.jobDescription && (
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontSize: "0.9rem",
                                            lineHeight: 1.7,
                                            whiteSpace: "pre-line",
                                        }}
                                    >
                                        {experience.jobDescription}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Skills */}
                {resumeData.skills?.filter(Boolean).length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography sx={sectionHeadingSx}>
                            Skills
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                lineHeight: 1.8,
                            }}
                        >
                            {resumeData.skills
                                .filter(Boolean)
                                .join(" • ")}
                        </Typography>
                    </Box>
                )}

                {/* Projects */}
                {resumeData.projects?.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography sx={sectionHeadingSx}>
                            Projects
                        </Typography>

                        {resumeData.projects.map((project, index) => (
                            <Box key={index} sx={{ mb: 2.5 }}>
                                <Typography sx={{ fontWeight: 700 }}>
                                    {project.projectName}
                                </Typography>

                                {project.projectTechStack && (
                                    <Typography
                                        sx={{
                                            fontSize: "0.85rem",
                                            color: "#555555",
                                        }}
                                    >
                                        Technologies:{" "}
                                        {project.projectTechStack}
                                    </Typography>
                                )}

                                {project.projectDescription && (
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontSize: "0.9rem",
                                            lineHeight: 1.7,
                                            whiteSpace: "pre-line",
                                        }}
                                    >
                                        {project.projectDescription}
                                    </Typography>
                                )}

                                {project.projectLink && (
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontSize: "0.85rem",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        Project Link: {project.projectLink}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Certifications */}
                {resumeData.certifications && (
                    <Box sx={{ mb: 3 }}>
                        <Typography sx={sectionHeadingSx}>
                            Certifications
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                whiteSpace: "pre-line",
                            }}
                        >
                            {resumeData.certifications}
                        </Typography>
                    </Box>
                )}

                {/* Languages */}
                {resumeData.languages && (
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={sectionHeadingSx}>
                            Languages
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                            }}
                        >
                            {resumeData.languages}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}