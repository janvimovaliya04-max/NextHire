
import { Box, Typography, Divider } from "@mui/material";

export default function ModernTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#1e40af";

    const sectionHeadingSx = {
        fontSize: "0.95rem",
        fontWeight: 800,
        color: accentColor,
        textTransform: "uppercase",
        letterSpacing: "1px",
        borderBottom: `2px solid ${accentColor}`,
        paddingBottom: "7px",
        marginBottom: "16px",
    };

    const contentTextSx = {
        fontSize: "0.88rem",
        lineHeight: 1.75,
        color: "#374151",
        whiteSpace: "pre-line",
        overflowWrap: "anywhere",
    };

    const secondaryTextSx = {
        fontSize: "0.85rem",
        color: "#6b7280",
        lineHeight: 1.6,
        overflowWrap: "anywhere",
    };

    const itemTitleSx = {
        fontSize: "0.98rem",
        fontWeight: 700,
        color: "#111827",
        lineHeight: 1.5,
        overflowWrap: "anywhere",
    };

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                color: "#333333",
                fontFamily: "Arial, sans-serif",
                minHeight: "1120px",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: accentColor,
                    color: "#ffffff",
                    px: { xs: 3, sm: 5 },
                    py: { xs: 3.5, sm: 4.5 },
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
                        lineHeight: 1.25,
                        letterSpacing: "0.3px",
                        wordBreak: "break-word",
                    }}
                >
                    {resumeData.fullName || "Your Name"}
                </Typography>

                {resumeData.jobTitle && (
                    <Typography
                        sx={{
                            fontSize: { xs: "0.95rem", sm: "1.05rem" },
                            mt: 1,
                            fontWeight: 600,
                            lineHeight: 1.5,
                            wordBreak: "break-word",
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                {/* Contact Details */}
                <Typography
                    sx={{
                        fontSize: "0.8rem",
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
                        .join(" | ")}
                </Typography>

                {/* Social Links */}
                {(resumeData.linkedin || resumeData.github) && (
                    <Typography
                        sx={{
                            fontSize: "0.78rem",
                            mt: 0.5,
                            lineHeight: 1.8,
                            wordBreak: "break-word",
                        }}
                    >
                        {[resumeData.linkedin, resumeData.github]
                            .filter(Boolean)
                            .join(" | ")}
                    </Typography>
                )}
            </Box>

            {/* Resume Content */}
            <Box
                sx={{
                    px: { xs: 2.5, sm: 4.5 },
                    py: { xs: 3, sm: 4 },
                }}
            >
                {/* Summary */}
                {resumeData.summary?.trim() && (
                    <Box sx={{ mb: 3.5 }}>
                        <Typography sx={sectionHeadingSx}>
                            Professional Summary
                        </Typography>

                        <Typography sx={contentTextSx}>
                            {resumeData.summary}
                        </Typography>
                    </Box>
                )}

                {/* Education */}
                {resumeData.education?.length > 0 && (
                    <Box sx={{ mb: 3.5 }}>
                        <Typography sx={sectionHeadingSx}>
                            Education
                        </Typography>

                        {resumeData.education.map((education, index) => (
                            <Box
                                key={index}
                                sx={{
                                    mb:
                                        index ===
                                            resumeData.education.length - 1
                                            ? 0
                                            : 2.5,
                                }}
                            >
                                <Typography sx={itemTitleSx}>
                                    {education.degree}
                                </Typography>

                                <Typography sx={secondaryTextSx}>
                                    {education.institution}
                                </Typography>

                                <Typography
                                    sx={{
                                        ...secondaryTextSx,
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    {[
                                        education.startYear &&
                                            education.endYear
                                            ? `${education.startYear} - ${education.endYear}`
                                            : education.startYear ||
                                            education.endYear,
                                        education.grade &&
                                        `Grade: ${education.grade}`,
                                    ]
                                        .filter(Boolean)
                                        .join(" | ")}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Experience */}
                {resumeData.experience?.length > 0 && (
                    <Box sx={{ mb: 3.5 }}>
                        <Typography sx={sectionHeadingSx}>
                            Work Experience
                        </Typography>

                        {resumeData.experience.map((experience, index) => (
                            <Box
                                key={index}
                                sx={{
                                    mb:
                                        index ===
                                            resumeData.experience.length - 1
                                            ? 0
                                            : 3,
                                }}
                            >
                                <Typography sx={itemTitleSx}>
                                    {experience.jobPosition}
                                </Typography>

                                <Typography sx={secondaryTextSx}>
                                    {experience.companyName}
                                </Typography>

                                <Typography
                                    sx={{
                                        ...secondaryTextSx,
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    {[
                                        experience.experienceStartYear &&
                                            experience.experienceEndYear
                                            ? `${experience.experienceStartYear} - ${experience.experienceEndYear}`
                                            : experience.experienceStartYear ||
                                            experience.experienceEndYear,
                                    ]
                                        .filter(Boolean)
                                        .join("")}
                                </Typography>

                                {experience.jobDescription?.trim() && (
                                    <Typography
                                        sx={{
                                            ...contentTextSx,
                                            mt: 1,
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
                    <Box sx={{ mb: 3.5 }}>
                        <Typography sx={sectionHeadingSx}>
                            Skills
                        </Typography>

                        <Typography sx={contentTextSx}>
                            {resumeData.skills
                                .filter(Boolean)
                                .join(" • ")}
                        </Typography>
                    </Box>
                )}

                {/* Projects */}
                {resumeData.projects?.length > 0 && (
                    <Box sx={{ mb: 3.5 }}>
                        <Typography sx={sectionHeadingSx}>
                            Projects
                        </Typography>

                        {resumeData.projects.map((project, index) => (
                            <Box
                                key={index}
                                sx={{
                                    mb:
                                        index ===
                                            resumeData.projects.length - 1
                                            ? 0
                                            : 3,
                                }}
                            >
                                <Typography sx={itemTitleSx}>
                                    {project.projectName}
                                </Typography>

                                {project.projectTechStack?.trim() && (
                                    <Typography sx={secondaryTextSx}>
                                        <Box
                                            component="span"
                                            sx={{ fontWeight: 700 }}
                                        >
                                            Technologies:
                                        </Box>{" "}
                                        {project.projectTechStack}
                                    </Typography>
                                )}

                                {project.projectDescription?.trim() && (
                                    <Typography
                                        sx={{
                                            ...contentTextSx,
                                            mt: 1,
                                        }}
                                    >
                                        {project.projectDescription}
                                    </Typography>
                                )}

                                {project.projectLink?.trim() && (
                                    <Typography
                                        sx={{
                                            fontSize: "0.82rem",
                                            color: accentColor,
                                            mt: 1,
                                            overflowWrap: "anywhere",
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
                {resumeData.certifications?.trim() && (
                    <Box sx={{ mb: 3.5 }}>
                        <Typography sx={sectionHeadingSx}>
                            Certifications
                        </Typography>

                        <Typography sx={contentTextSx}>
                            {resumeData.certifications}
                        </Typography>
                    </Box>
                )}

                {/* Languages */}
                {resumeData.languages?.trim() && (
                    <Box sx={{ mb: 1 }}>
                        <Typography sx={sectionHeadingSx}>
                            Languages
                        </Typography>

                        <Typography sx={contentTextSx}>
                            {resumeData.languages}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}