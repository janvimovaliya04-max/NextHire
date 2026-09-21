
import { Box, Typography, Divider, Chip } from "@mui/material";
import ResumeSections from "./ResumeSections";

export default function TwoColumnTemplate({
    resumeData,
    selectedTemplate,
}) {
    const accentColor = selectedTemplate?.accentColor || "#0f766e";

    const contactDetails = [
        resumeData.email,
        resumeData.phone,
        resumeData.location,
        resumeData.linkedin,
        resumeData.github,
    ].filter((item) => item && String(item).trim());

    const skills = resumeData.skills?.filter(
        (skill) => skill && String(skill).trim()
    ) || [];

    const hasLanguages =
        resumeData.languages &&
        String(resumeData.languages).trim();

    const sidebarHeadingSx = {
        fontSize: "0.78rem",
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        marginBottom: 1.5,
    };

    const dividerSx = {
        borderColor: "rgba(255,255,255,0.35)",
        marginY: 3,
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "minmax(220px, 260px) minmax(0, 1fr)",
                },
                minHeight: "1120px",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                overflow: "hidden",
            }}
        >
            {/* Left Sidebar */}
            <Box
                sx={{
                    backgroundColor: accentColor,
                    color: "#ffffff",
                    padding: {
                        xs: "28px 24px",
                        sm: "35px 30px",
                    },
                    minWidth: 0,
                }}
            >


                {/* Profile Image */}
                {resumeData.profileImage && (
                    <Box
                        component="img"
                        src={resumeData.profileImage}
                        alt="Profile"
                        sx={{
                            alignItems: "center",
                            width: 105,
                            height: 105,
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "3px solid rgba(255,255,255,0.8)",
                            display: "block",
                            marginBottom: 2.5,
                            ml: 5,
                        }}
                    />
                )}

                {/* Profile */}

                <Typography
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: "1.65rem",
                            sm: "1.85rem",
                        },
                        fontWeight: 800,
                        lineHeight: 1.2,
                        letterSpacing: "-0.4px",
                        overflowWrap: "anywhere",
                    }}
                >
                    {resumeData.fullName || "Your Name"}
                </Typography>

                {resumeData.jobTitle?.trim() && (
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            lineHeight: 1.5,
                            marginTop: 1,
                            opacity: 0.88,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {resumeData.jobTitle}
                    </Typography>
                )}

                <Divider sx={dividerSx} />

                {/* Contact */}
                {contactDetails.length > 0 && (
                    <>
                        <Typography sx={sidebarHeadingSx}>
                            Contact
                        </Typography>

                        <Box>
                            {contactDetails.map((item, index) => (
                                <Typography
                                    key={`${item}-${index}`}
                                    sx={{
                                        fontSize: "0.74rem",
                                        lineHeight: 1.6,
                                        marginBottom: 1.1,
                                        overflowWrap: "anywhere",
                                        opacity: 0.94,
                                    }}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Box>
                    </>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <>
                        <Divider sx={dividerSx} />

                        <Typography sx={sidebarHeadingSx}>
                            Skills
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.8,
                            }}
                        >
                            {skills.map((skill, index) => (
                                <Chip
                                    key={`${skill}-${index}`}
                                    label={skill}
                                    size="small"
                                    sx={{
                                        height: "auto",
                                        minHeight: 26,
                                        maxWidth: "100%",
                                        color: "#ffffff",
                                        border: "1px solid rgba(255,255,255,0.55)",
                                        backgroundColor:
                                            "rgba(255,255,255,0.12)",
                                        borderRadius: "5px",
                                        "& .MuiChip-label": {
                                            padding: "5px 8px",
                                            fontSize: "0.68rem",
                                            whiteSpace: "normal",
                                            overflowWrap: "anywhere",
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </>
                )}

                {/* Languages */}
                {hasLanguages && (
                    <>
                        <Divider sx={dividerSx} />

                        <Typography sx={sidebarHeadingSx}>
                            Languages
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "0.78rem",
                                lineHeight: 1.8,
                                whiteSpace: "pre-line",
                                overflowWrap: "anywhere",
                                opacity: 0.95,
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
                    padding: {
                        xs: "30px 24px",
                        sm: "40px 38px",
                    },
                    minWidth: 0,
                    backgroundColor: "#ffffff",
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