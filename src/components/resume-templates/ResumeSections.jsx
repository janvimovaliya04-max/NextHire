
import { Box, Typography } from "@mui/material";

export default function ResumeSections({
    resumeData,
    accentColor = "#1e40af",
    variant = "modern",
    showSkills = true,
    showLanguages = true,
}) {
    const sectionHeadingSx = {
        fontSize: "1.05rem",
        fontWeight: 800,
        color: accentColor,
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        borderBottom:
            variant === "minimal"
                ? "none"
                : `2px solid ${accentColor}`,
        paddingBottom: variant === "minimal" ? 0 : "6px",
        mb: 1.5,
    };

    return (
        <Box>
            {/* Professional Summary */}
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
                            color: "#444444",
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
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: "#333333",
                                }}
                            >
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

            {/* Work Experience */}
            {resumeData.experience?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Typography sx={sectionHeadingSx}>
                        Work Experience
                    </Typography>

                    {resumeData.experience.map((experience, index) => (
                        <Box key={index} sx={{ mb: 2.5 }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: "#333333",
                                }}
                            >
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
                                        color: "#444444",
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
                            color: "#444444",
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
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: "#333333",
                                }}
                            >
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
                                        color: "#444444",
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
                                        color: "#444444",
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
                            color: "#444444",
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
                            color: "#444444",
                        }}
                    >
                        {resumeData.languages}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}