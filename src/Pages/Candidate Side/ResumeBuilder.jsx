
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "../../components/common/SEO";

export default function ResumeBuilder() {
    const colors = useThemeColors();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        jobTitle: "",
        summary: "",

        // Education
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        grade: "",

        // Work Experience
        companyName: "",
        jobPosition: "",
        experienceStartYear: "",
        experienceEndYear: "",
        jobDescription: "",

        skills: "",

        // Projects
        projectName: "",
        projectTechStack: "",
        projectDescription: "",
        projectLink: "",

        // Certifications & Languages
        certifications: "",
        languages: "",
        linkedin: "",
        github: "",
    });

    const [errors, setErrors] = useState({});

    const primary = colors.primary;
    const secondary = colors.secondary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;

    const textFieldStyle = {
        mb: { xs: 2, sm: 2.3, md: 2.5 },
        "& .MuiInputLabel-root": {
            color: subText,
            fontSize: { xs: ".85rem", sm: ".9rem", md: ".95rem" },
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: primary,
        },
        "& .MuiOutlinedInput-root": {
            fontSize: { xs: ".85rem", sm: ".9rem", md: ".95rem" },
            color: textColor,
            backgroundColor: colors.input,
            "& fieldset": {
                borderColor: borderStyle,
                borderRadius: "10px",
            },
            "&:hover fieldset": {
                borderColor: primary,
            },
            "&.Mui-focused fieldset": {
                borderColor: primary,
                borderWidth: "2px",
            },
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

        if (!formData.degree.trim()) {
            newErrors.degree = "Degree is required";
        }

        if (!formData.institution.trim()) {
            newErrors.institution = "Institution name is required";
        }

        if (!formData.startYear.trim()) {
            newErrors.startYear = "Start year is required";
        }

        if (!formData.endYear.trim()) {
            newErrors.endYear = "End year is required";
        }

        if (!formData.grade.trim()) {
            newErrors.grade = "Grade is required";
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        }

        if (!formData.jobPosition.trim()) {
            newErrors.jobPosition = "Job position is required";
        }

        if (!formData.experienceStartYear.trim()) {
            newErrors.experienceStartYear = "Start year is required";
        }

        if (!formData.experienceEndYear.trim()) {
            newErrors.experienceEndYear = "End year is required";
        }

        if (!formData.jobDescription.trim()) {
            newErrors.jobDescription = "Job description is required";
        }

        if (!formData.skills.trim()) {
            newErrors.skills = "Skills are required";
        }

        if (!formData.projectName.trim()) {
            newErrors.projectName = "Project name is required";
        }

        if (!formData.projectTechStack.trim()) {
            newErrors.projectTechStack = "Technology stack is required";
        }

        if (!formData.projectDescription.trim()) {
            newErrors.projectDescription = "Project description is required";
        }

        if (!formData.languages.trim()) {
            newErrors.languages = "Languages are required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("1. Button clicked");

        console.log("2. Navigating to templates");

        navigate("/candidate/resume-templates", {
            state: {
                resumeData: formData,
            },
        });

        console.log("3. Navigate called");
    };
    return (
        <CandidateLayout>
            <SEO
                title="Resume Builder"
                description="Create a professional resume with NextHire Resume Builder."
                canonicalUrl="/candidate/resume-builder"
            />

            {/* Page Heading */}
            <Box sx={{ maxWidth: "1000px", mx: "auto", mb: 3 }}>
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
                        mt: 0.8,
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
                    p: { xs: 1.5, sm: 2.5, md: 4, lg: 5 },
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
                <Box sx={{ mb: 3 }}>
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

                <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
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
                </Grid>

                {/* Education Section */}
                <Box
                    sx={{
                        mt: { xs: 3, sm: 4 },
                        mb: 2,
                        pb: 1.5,
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

                <Grid container spacing={{ xs: 1, sm: 2 }}>
                    {/* Degree */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Degree"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            error={Boolean(errors.degree)}
                            helperText={errors.degree}
                            placeholder="e.g. Bachelor of Computer Applications"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Institution */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Institution"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            error={Boolean(errors.institution)}
                            helperText={errors.institution}
                            placeholder="e.g. Gujarat University"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Start Year */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Start Year"
                            name="startYear"
                            value={formData.startYear}
                            onChange={handleChange}
                            error={Boolean(errors.startYear)}
                            helperText={errors.startYear}
                            placeholder="e.g. 2021"
                            inputProps={{ maxLength: 4 }}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* End Year */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="End Year"
                            name="endYear"
                            value={formData.endYear}
                            onChange={handleChange}
                            error={Boolean(errors.endYear)}
                            helperText={errors.endYear}
                            placeholder="e.g. 2024 or Present"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Grade */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Grade / CGPA / Percentage"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            error={Boolean(errors.grade)}
                            helperText={errors.grade}
                            placeholder="e.g. 8.5 CGPA or 85%"
                            sx={textFieldStyle}
                        />
                    </Grid>
                </Grid>

                {/* Work Experience Section */}
                <Box
                    sx={{
                        mt: { xs: 3, sm: 4 },
                        mb: 2,
                        pb: 1.5,
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

                <Grid container spacing={{ xs: 1, sm: 2 }}>
                    {/* Company Name */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            error={Boolean(errors.companyName)}
                            helperText={errors.companyName}
                            placeholder="e.g. ABC Technologies"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Job Position */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Job Position"
                            name="jobPosition"
                            value={formData.jobPosition}
                            onChange={handleChange}
                            error={Boolean(errors.jobPosition)}
                            helperText={errors.jobPosition}
                            placeholder="e.g. Frontend Developer"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Start Year */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Start Year"
                            name="experienceStartYear"
                            value={formData.experienceStartYear}
                            onChange={handleChange}
                            error={Boolean(errors.experienceStartYear)}
                            helperText={errors.experienceStartYear}
                            placeholder="e.g. 2023"
                            inputProps={{ maxLength: 4 }}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* End Year */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="End Year"
                            name="experienceEndYear"
                            value={formData.experienceEndYear}
                            onChange={handleChange}
                            error={Boolean(errors.experienceEndYear)}
                            helperText={errors.experienceEndYear}
                            placeholder="e.g. 2025 or Present"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Job Description */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            required
                            multiline
                            minRows={4}
                            label="Job Description"
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            error={Boolean(errors.jobDescription)}
                            helperText={errors.jobDescription}
                            placeholder="Describe your responsibilities and achievements..."
                            sx={textFieldStyle}
                        />
                    </Grid>
                </Grid>

                {/* Skills Section */}
                <Box
                    sx={{
                        mt: { xs: 3, sm: 4 },
                        mb: 2,
                        pb: 1.5,
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

                <Grid container spacing={{ xs: 1, sm: 2 }}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            required
                            multiline
                            minRows={3}
                            label="Skills"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            error={Boolean(errors.skills)}
                            helperText={
                                errors.skills || "Separate multiple skills using commas."
                            }
                            placeholder="e.g. React, JavaScript, HTML, CSS, Git"
                            sx={textFieldStyle}
                        />
                    </Grid>
                </Grid>

                {/* Projects Section */}
                <Box
                    sx={{
                        mt: { xs: 3, sm: 4 },
                        mb: 2,
                        pb: 1.5,
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

                <Grid container spacing={{ xs: 1, sm: 2 }}>
                    {/* Project Name */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Project Name"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            error={Boolean(errors.projectName)}
                            helperText={errors.projectName}
                            placeholder="e.g. NextHire"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Technology Stack */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            required
                            label="Technology Stack"
                            name="projectTechStack"
                            value={formData.projectTechStack}
                            onChange={handleChange}
                            error={Boolean(errors.projectTechStack)}
                            helperText={errors.projectTechStack}
                            placeholder="e.g. React, MUI, JavaScript"
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Project Description */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            required
                            multiline
                            minRows={4}
                            label="Project Description"
                            name="projectDescription"
                            value={formData.projectDescription}
                            onChange={handleChange}
                            error={Boolean(errors.projectDescription)}
                            helperText={errors.projectDescription}
                            placeholder="Explain your project features and responsibilities..."
                            sx={textFieldStyle}
                        />
                    </Grid>

                    {/* Project Link */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Project Link (Optional)"
                            name="projectLink"
                            value={formData.projectLink}
                            onChange={handleChange}
                            placeholder="https://github.com/your-project"
                            sx={textFieldStyle}
                        />
                    </Grid>
                </Grid>

                {/* Certifications & Languages Section */}
                <Box
                    sx={{
                        mt: { xs: 3, sm: 4 },
                        mb: 2,
                        pb: 1.5,
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

                <Grid container spacing={{ xs: 1, sm: 2 }}>
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
                        mt: 2,
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