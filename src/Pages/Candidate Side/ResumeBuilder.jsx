
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import useThemeColors from "../../hooks/useThemeColors";
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/common/SEO";

const RESUME_STORAGE_KEY = "nexthire-resume-data";

export default function ResumeBuilder() {
    const colors = useThemeColors();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem(RESUME_STORAGE_KEY);

        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (error) {
                console.error("Failed to load saved resume data:", error);
            }
        }

        return {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            jobTitle: "",
            summary: "",
            profileImage: "",

            education: [
                {
                    degree: "",
                    institution: "",
                    startYear: "",
                    endYear: "",
                    grade: "",
                },
            ],

            experience: [
                {
                    companyName: "",
                    jobPosition: "",
                    experienceStartYear: "",
                    experienceEndYear: "",
                    jobDescription: "",
                },
            ],

            skills: [""],

            projects: [
                {
                    projectName: "",
                    projectTechStack: "",
                    projectDescription: "",
                    projectLink: "",
                },
            ],

            certifications: "",
            languages: "",
            linkedin: "",
            github: "",
        };
    });

    useEffect(() => {
        localStorage.setItem(
            RESUME_STORAGE_KEY,
            JSON.stringify(formData)
        );
    }, [formData]);

    const [errors, setErrors] = useState({});

    const primary = colors.primary;
    const secondary = colors.secondary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;

    const textFieldStyle = {
        mb: { xs: 1.2, sm: 1.5, md: 1.7 },

        "& .MuiInputLabel-root": {
            color: subText,
            fontSize: {
                xs: ".82rem",
                sm: ".87rem",
                md: ".92rem",
            },
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: primary,
        },

        "& .MuiOutlinedInput-root": {
            fontSize: {
                xs: ".82rem",
                sm: ".87rem",
                md: ".92rem",
            },
            color: textColor,
            backgroundColor: colors.input,

            "& fieldset": {
                borderColor: borderStyle,
                borderRadius: "8px",
            },

            "&:hover fieldset": {
                borderColor: primary,
            },

            "&.Mui-focused fieldset": {
                borderColor: primary,
                borderWidth: "1.5px",
            },
        },

        "& .MuiFormHelperText-root": {
            fontSize: "0.7rem",
            marginLeft: "2px",
            marginTop: "3px",
        },
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    };

    const handleProfileImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a JPG, PNG, or WEBP image.");
            return;
        }

        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
            alert("Image size must be less than 2MB.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData((previous) => ({
                ...previous,
                profileImage: reader.result,
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleEducationChange = (index, event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            education: previous.education.map((item, itemIndex) =>
                itemIndex === index
                    ? { ...item, [name]: value }
                    : item
            ),
        }));
    };

    const addEducation = () => {
        setFormData((previous) => ({
            ...previous,
            education: [
                ...previous.education,
                {
                    degree: "",
                    institution: "",
                    startYear: "",
                    endYear: "",
                    grade: "",
                },
            ],
        }));
    };

    const removeEducation = (index) => {
        setFormData((previous) => ({
            ...previous,
            education: previous.education.filter(
                (_, itemIndex) => itemIndex !== index
            ),
        }));
    };

    const handleExperienceChange = (index, event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            experience: previous.experience.map((item, itemIndex) =>
                itemIndex === index
                    ? { ...item, [name]: value }
                    : item
            ),
        }));
    };

    const addExperience = () => {
        setFormData((previous) => ({
            ...previous,
            experience: [
                ...previous.experience,
                {
                    companyName: "",
                    jobPosition: "",
                    experienceStartYear: "",
                    experienceEndYear: "",
                    jobDescription: "",
                },
            ],
        }));
    };

    const removeExperience = (index) => {
        setFormData((previous) => ({
            ...previous,
            experience: previous.experience.filter(
                (_, itemIndex) => itemIndex !== index
            ),
        }));
    };

    const handleSkillChange = (index, event) => {
        const { value } = event.target;

        setFormData((previous) => ({
            ...previous,
            skills: previous.skills.map((skill, skillIndex) =>
                skillIndex === index ? value : skill
            ),
        }));
    };

    const addSkill = () => {
        setFormData((previous) => ({
            ...previous,
            skills: [...previous.skills, ""],
        }));
    };

    const removeSkill = (index) => {
        setFormData((previous) => ({
            ...previous,
            skills: previous.skills.filter(
                (_, skillIndex) => skillIndex !== index
            ),
        }));
    };

    const handleProjectChange = (index, event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            projects: previous.projects.map((project, projectIndex) =>
                projectIndex === index
                    ? { ...project, [name]: value }
                    : project
            ),
        }));
    };

    const addProject = () => {
        setFormData((previous) => ({
            ...previous,
            projects: [
                ...previous.projects,
                {
                    projectName: "",
                    projectTechStack: "",
                    projectDescription: "",
                    projectLink: "",
                },
            ],
        }));
    };

    const removeProject = (index) => {
        setFormData((previous) => ({
            ...previous,
            projects: previous.projects.filter(
                (_, projectIndex) => projectIndex !== index
            ),
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        if (!formData.jobTitle.trim()) {
            newErrors.jobTitle = "Job title is required";
        }

        if (!formData.summary.trim()) {
            newErrors.summary = "Professional summary is required";
        }

        formData.education.forEach((education, index) => {
            if (!education.degree.trim()) {
                newErrors[`education.${index}.degree`] = "Degree is required";
            }

            if (!education.institution.trim()) {
                newErrors[`education.${index}.institution`] =
                    "Institution is required";
            }

            if (!education.startYear.trim()) {
                newErrors[`education.${index}.startYear`] =
                    "Start year is required";
            }

            if (!education.endYear.trim()) {
                newErrors[`education.${index}.endYear`] =
                    "End year is required";
            }

            if (!education.grade.trim()) {
                newErrors[`education.${index}.grade`] =
                    "Grade / CGPA is required";
            }
        });

        formData.experience.forEach((experience, index) => {
            if (!experience.companyName.trim()) {
                newErrors[`experience.${index}.companyName`] =
                    "Company name is required";
            }

            if (!experience.jobPosition.trim()) {
                newErrors[`experience.${index}.jobPosition`] =
                    "Job position is required";
            }

            if (!experience.experienceStartYear.trim()) {
                newErrors[`experience.${index}.experienceStartYear`] =
                    "Start year is required";
            }

            if (!experience.experienceEndYear.trim()) {
                newErrors[`experience.${index}.experienceEndYear`] =
                    "End year is required";
            }

            if (!experience.jobDescription.trim()) {
                newErrors[`experience.${index}.jobDescription`] =
                    "Job description is required";
            }
        });

        formData.skills.forEach((skill, index) => {
            if (!skill.trim()) {
                newErrors[`skills.${index}`] = "Skill is required";
            }
        });

        formData.projects.forEach((project, index) => {
            if (!project.projectName.trim()) {
                newErrors[`projects.${index}.projectName`] =
                    "Project name is required";
            }

            if (!project.projectTechStack.trim()) {
                newErrors[`projects.${index}.projectTechStack`] =
                    "Tech stack is required";
            }

            if (!project.projectDescription.trim()) {
                newErrors[`projects.${index}.projectDescription`] =
                    "Project description is required";
            }
        });

        if (!formData.languages.trim()) {
            newErrors.languages = "Languages are required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isValid = validateForm();

        console.log("Form Valid:", isValid);
        console.log("Validation Errors:", errors);

        if (isValid) {
            localStorage.setItem(
                RESUME_STORAGE_KEY,
                JSON.stringify(formData)
            );

            navigate("/candidate/resume-templates", {
                state: { resumeData: formData },
            });
        } else {
            console.log("Please fill all required fields.");
        }
    };

    return (
        <CandidateLayout>
            <SEO
                title="Resume Builder"
                description="Create a professional resume with NextHire Resume Builder."
                canonicalUrl="/candidate/resume-builder"
            />

            {/* Page Heading */}
            <Box sx={{ maxWidth: "1000px", mx: "auto", mb: 2 }}>
                <Typography
                    sx={{
                        color: textColor,
                        fontWeight: 850,
                        letterSpacing: "-0.03em",
                        fontSize: {
                            xs: "1.5rem",
                            sm: "1.8rem",
                            md: "2.15rem",
                        },
                    }}
                >
                    Create Your Resume
                </Typography>

                <Typography
                    sx={{
                        color: subText,
                        mt: 0.4,
                        fontSize: { xs: ".85rem", sm: ".95rem" },
                    }}
                >
                    Build your professional resume step by step.
                </Typography>
            </Box>

            {/* Main Form */}
            <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={0}
                sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                    maxWidth: "1000px",
                    mx: "auto",
                    borderRadius: { xs: 3, sm: 4, md: 5 },
                    bgcolor: colors.card,
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${borderStyle}`,
                    boxShadow: colors.shadow,
                }}
            >
                {/* Section Heading */}
                <Box sx={{
                    mt: { xs: 2, sm: 2.5 },
                    mb: 1.2,
                    pb: 1,
                    borderBottom: `1px solid ${borderStyle}`,
                }}>
                    <Typography
                        sx={{
                            color: textColor,
                            fontWeight: 800,
                            fontSize: { xs: "1.1rem", sm: "1.3rem" },
                        }}
                    >
                        Personal Information
                    </Typography>

                    <Typography
                        sx={{
                            color: subText,
                            mt: 0.5,
                            fontSize: { xs: ".78rem", sm: ".85rem" },
                        }}
                    >
                        Enter the details you want to display on your resume.
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 0.75, sm: 1, md: 1.25 }}>
                    {/* Full Name */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            placeholder="e.g. Alex Candidate"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Email */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="e.g. alex@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Phone */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            placeholder="e.g. 9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Location */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            placeholder="e.g. Surat, Gujarat"
                            value={formData.location}
                            onChange={handleChange}
                            error={Boolean(errors.location)}
                            helperText={errors.location}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Job Title */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Professional Job Title"
                            name="jobTitle"
                            placeholder="e.g. Frontend Developer"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            error={Boolean(errors.jobTitle)}
                            helperText={errors.jobTitle}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Summary */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            maxRows={8}
                            label="Professional Summary"
                            name="summary"
                            placeholder="Write a short professional introduction..."
                            value={formData.summary}
                            onChange={handleChange}
                            error={Boolean(errors.summary)}
                            helperText={errors.summary}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Profile Image */}
                    <Grid size={{ xs: 12 }}>
                        <Box
                            sx={{
                                border: `1px dashed ${borderStyle}`,
                                borderRadius: "10px",
                                padding: { xs: 2, sm: 2.5 },
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: textColor,
                                    fontWeight: 700,
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                    mb: 0.5,
                                }}
                            >
                                Profile Image (Optional)
                            </Typography>

                            <Typography
                                sx={{
                                    color: subText,
                                    fontSize: "0.78rem",
                                    mb: 1.5,
                                }}
                            >
                                Upload a JPG, PNG, or WEBP image (maximum 2MB).
                            </Typography>

                            <Button
                                component="label"
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    borderColor: primary,
                                    color: primary,
                                    borderRadius: "8px",
                                    fontWeight: 600,
                                }}
                            >
                                Choose Image

                                <input
                                    type="file"
                                    hidden
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleProfileImageChange}
                                />
                            </Button>

                            {formData.profileImage && (
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={formData.profileImage}
                                        alt="Profile preview"
                                        sx={{
                                            width: 90,
                                            height: 90,
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                            border: `2px solid ${primary}`,
                                        }}
                                    />

                                    <Button
                                        type="button"
                                        color="inherit"
                                        onClick={() =>
                                            setFormData((previous) => ({
                                                ...previous,
                                                profileImage: "",
                                            }))
                                        }
                                        sx={{
                                            textTransform: "none",
                                            color: subText,
                                        }}
                                    >
                                        Remove Image
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Grid>

                </Grid>

                {/* Education Section */}
                <Box
                    sx={{
                        mt: { xs: 2, sm: 2.5 },
                        mb: 1.2,
                        pb: 1,
                        borderBottom: `1px solid ${borderStyle}`,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: textColor,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
                    >
                        Education
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: subText,
                            mt: 0.5,
                            fontSize: { xs: "0.8rem", sm: "0.85rem" },
                        }}
                    >
                        Add your educational qualifications.
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={{ xs: 0.5, sm: 0.75, md: 1 }}
                    sx={{ width: "100%" }}
                >

                    {formData.education.map((education, index) => (
                        <Box
                            key={index}
                            sx={{
                                mb: 1.5,
                                p: { xs: 1.5, sm: 2 },
                                border: `1px solid ${borderStyle}`,
                                borderRadius: "10px",
                                width: "100%",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: textColor,
                                    fontWeight: 700,
                                    mb: 1.2,
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                }}
                            >
                                Education {index + 1}
                            </Typography>

                            <Grid
                                container
                                spacing={{ xs: 1, sm: 1.5 }}
                            >
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Degree"
                                        name="degree"
                                        value={education.degree}
                                        onChange={(event) => handleEducationChange(index, event)}
                                        error={Boolean(errors[`education.${index}.degree`])}
                                        helperText={errors[`education.${index}.degree`]}
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Institution"
                                        name="institution"
                                        value={education.institution}
                                        onChange={(event) => handleEducationChange(index, event)}
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Start Year"
                                        name="startYear"
                                        value={education.startYear}
                                        onChange={(event) => handleEducationChange(index, event)}
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="End Year"
                                        name="endYear"
                                        value={education.endYear}
                                        onChange={(event) => handleEducationChange(index, event)}
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Grade / CGPA"
                                        name="grade"
                                        value={education.grade}
                                        onChange={(event) => handleEducationChange(index, event)}
                                        sx={textFieldStyle}
                                    />
                                </Grid>
                            </Grid>

                            {formData.education.length > 1 && (
                                <Button
                                    type="button"
                                    color="inherit"
                                    onClick={() => removeEducation(index)}
                                    sx={{
                                        mt: 1,
                                        textTransform: "none",
                                        color: subText,
                                    }}
                                >
                                    Remove Education
                                </Button>
                            )}
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            mb: 1.5,
                            px: { xs: 1.2, sm: 1.5 },
                            py: 0.5,
                        }}
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={addEducation}
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                                px: { xs: 1.5, sm: 2 },
                                py: 0.7,
                                borderRadius: "8px",
                                color: primary,
                                borderColor: primary,
                            }}
                        >
                            + Add
                        </Button>
                    </Box>

                </Grid>

                {/* Work Experience Section */}
                <Box
                    sx={{
                        mt: { xs: 2, sm: 2.5 },
                        mb: 1.2,
                        pb: 1,
                        borderBottom: `1px solid ${borderStyle}`,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: textColor,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
                    >
                        Work Experience
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: subText,
                            mt: 0.5,
                            fontSize: { xs: "0.8rem", sm: "0.85rem" },
                        }}
                    >
                        Add your professional work experience.
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={{ xs: 0.5, sm: 0.75, md: 1 }}
                    sx={{ width: "100%" }}
                >

                    {formData.experience.map((experience, index) => (
                        <Box
                            key={index}
                            sx={{
                                mb: 1.5,
                                p: { xs: 1.5, sm: 2 },
                                border: `1px solid ${borderStyle}`,
                                borderRadius: "10px",
                                width: "100%",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: textColor,
                                    fontWeight: 700,
                                    mb: 1.2,
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                }}
                            >
                                Work Experience {index + 1}
                            </Typography>

                            <Grid
                                container
                                spacing={{ xs: 1, sm: 1.5 }}
                            >
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Company Name"
                                        name="companyName"
                                        value={experience.companyName}
                                        onChange={(event) =>
                                            handleExperienceChange(index, event)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Job Position"
                                        name="jobPosition"
                                        value={experience.jobPosition}
                                        onChange={(event) =>
                                            handleExperienceChange(index, event)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Start Year"
                                        name="experienceStartYear"
                                        value={experience.experienceStartYear}
                                        onChange={(event) =>
                                            handleExperienceChange(index, event)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="End Year"
                                        name="experienceEndYear"
                                        value={experience.experienceEndYear}
                                        onChange={(event) =>
                                            handleExperienceChange(index, event)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        multiline
                                        minRows={3}
                                        label="Job Description"
                                        name="jobDescription"
                                        value={experience.jobDescription}
                                        onChange={(event) =>
                                            handleExperienceChange(index, event)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </Grid>
                            </Grid>

                            {formData.experience.length > 1 && (
                                <Button
                                    type="button"
                                    color="inherit"
                                    onClick={() => removeExperience(index)}
                                    sx={{
                                        mt: 1,
                                        textTransform: "none",
                                        color: subText,
                                    }}
                                >
                                    Remove Experience
                                </Button>
                            )}
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            mb: 1.5,
                            px: { xs: 1.2, sm: 1.5 },
                            py: 0.5,
                        }}
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={addExperience}
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                                px: { xs: 1.5, sm: 2 },
                                py: 0.7,
                                borderRadius: "8px",
                                color: primary,
                                borderColor: primary,
                            }}
                        >
                            + Add
                        </Button>
                    </Box>

                </Grid>

                {/* Skills Section */}
                <Box
                    sx={{
                        mt: { xs: 2, sm: 2.5 },
                        mb: 1.2,
                        pb: 1,
                        borderBottom: `1px solid ${borderStyle}`,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: textColor,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
                    >
                        Skills
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: subText,
                            mt: 0.5,
                            fontSize: { xs: "0.8rem", sm: "0.85rem" },
                        }}
                    >
                        Add your technical and professional skills.
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={{ xs: 0.5, sm: 0.75, md: 1 }}
                    sx={{ width: "100%" }}
                >

                    {formData.skills.map((skill, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <TextField
                                fullWidth
                                required
                                label={`Skill ${index + 1}`}
                                value={skill}
                                onChange={(event) => handleSkillChange(index, event)}
                                sx={textFieldStyle}
                            />

                            {formData.skills.length > 1 && (
                                <Button
                                    type="button"
                                    color="inherit"
                                    onClick={() => removeSkill(index)}
                                    sx={{
                                        textTransform: "none",
                                        color: subText,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Remove
                                </Button>
                            )}
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            mb: 1.5,
                            px: { xs: 1.2, sm: 1.5 },
                            py: 0.5,
                        }}
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={addSkill}
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                                px: { xs: 1.5, sm: 2 },
                                py: 0.7,
                                borderRadius: "8px",
                                color: primary,
                                borderColor: primary,
                            }}
                        >
                            + Add
                        </Button>
                    </Box>

                </Grid>

                {/* Projects Section */}
                <Box
                    sx={{
                        mt: { xs: 2, sm: 2.5 },
                        mb: 1.2,
                        pb: 1,
                        borderBottom: `1px solid ${borderStyle}`,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: textColor,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
                    >
                        Projects
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: subText,
                            mt: 0.5,
                            fontSize: { xs: "0.8rem", sm: "0.85rem" },
                        }}
                    >
                        Add your important academic or professional projects.
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={{ xs: 0.5, sm: 0.75, md: 1 }}
                    sx={{ width: "100%" }}
                >

                    {formData.projects.map((project, index) => (
                        <Box
                            key={index}
                            sx={{
                                mb: 1.5,
                                p: { xs: 1.5, sm: 2 },
                                border: `1px solid ${borderStyle}`,
                                borderRadius: "10px",
                                width: "100%",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: textColor,
                                    fontWeight: 700,
                                    mb: 1.2,
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                }}
                            >
                                Project {index + 1}
                            </Typography>

                            <Grid
                                container
                                spacing={{ xs: 1, sm: 1.5 }}
                            >
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Project Name"
                                        name="projectName"
                                        value={project.projectName}
                                        onChange={(event) => handleProjectChange(index, event)}
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Tech Stack"
                                        name="projectTechStack"
                                        value={project.projectTechStack}
                                        onChange={(event) => handleProjectChange(index, event)}
                                        sx={textFieldStyle}
                                    />
                                </Grid>


                                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Project Link (Optional)"
                                        name="projectLink"
                                        value={project.projectLink}
                                        onChange={(event) => handleProjectChange(index, event)}
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        multiline
                                        minRows={3}
                                        label="Project Description"
                                        name="projectDescription"
                                        value={project.projectDescription}
                                        onChange={(event) =>
                                            handleProjectChange(index, event)
                                        }
                                        sx={textFieldStyle}
                                    />
                                </Grid>

                            </Grid>

                            {formData.projects.length > 1 && (
                                <Button
                                    type="button"
                                    color="inherit"
                                    onClick={() => removeProject(index)}
                                    sx={{
                                        mt: 1,
                                        textTransform: "none",
                                        color: subText,
                                    }}
                                >
                                    Remove Project
                                </Button>
                            )}
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            mb: 1.5,
                            px: { xs: 1.2, sm: 1.5 },
                            py: 0.5,
                        }}
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={addProject}
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                                px: { xs: 1.5, sm: 2 },
                                py: 0.7,
                                borderRadius: "8px",
                                color: primary,
                                borderColor: primary,
                            }}
                        >
                            + Add
                        </Button>
                    </Box>

                </Grid>

                {/* Certifications & Languages Section */}
                <Box
                    sx={{
                        mt: { xs: 2, sm: 2.5 },
                        mb: 1.2,
                        pb: 1,
                        borderBottom: `1px solid ${borderStyle}`,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: textColor,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
                    >
                        Certifications & Additional Details
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={{ xs: 0.5, sm: 0.75, md: 1 }}
                    sx={{ width: "100%" }}
                >
                    {/* Certifications */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label="Certifications (Optional)"
                            name="certifications"
                            value={formData.certifications}
                            onChange={handleChange}
                            placeholder="e.g. React Certification, JavaScript Certification"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Languages */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Languages"
                            name="languages"
                            value={formData.languages}
                            onChange={handleChange}
                            error={Boolean(errors.languages)}
                            helperText={
                                errors.languages || "e.g. Gujarati, Hindi, English"
                            }
                            placeholder="Enter languages you know"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* LinkedIn */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="LinkedIn Profile (Optional)"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/your-profile"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* GitHub */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="GitHub Profile (Optional)"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            placeholder="https://github.com/your-username"
                            sx={textFieldStyle}
                        />
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<ArrowRight size={16} />}
                        sx={{
                            width: { xs: "100%", sm: "auto" },
                            py: { xs: 1.1, sm: 1.3 },
                            px: { xs: 2, sm: 3 },
                            borderRadius: "10px",
                            fontWeight: 700,
                            textTransform: "none",
                            background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                            boxShadow: `0 8px 18px ${primary}47`,
                            "&:hover": {
                                background: `linear-gradient(135deg, ${primary}, ${primary})`,
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        Save & Continue
                    </Button>
                </Box>
            </Paper>
        </CandidateLayout>
    );
}