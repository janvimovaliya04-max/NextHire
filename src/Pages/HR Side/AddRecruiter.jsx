import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import HRLayout from "../../Layouts/HRLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    CardContent,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    Box,
    MenuItem,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
    FaUserTie,
    FaSave,
    FaTimes,
} from "react-icons/fa";


export default function AddRecruiter() {
    const { darkMode } = useTheme();
    const colors = useThemeColors();
    const primary = colors.primary;
    const textColor = colors.text;

    const navigate = useNavigate();

    const subText = colors.subText;

    const borderStyle = darkMode
        ? "rgba(148,163,184,.22)"
        : "rgba(15,23,42,.08)";
    const [form, setForm] = useState({ fullName: "", email: "", phone: "", designation: "", department: "", experience: "", city: "", joiningDate: "", status: "Active", profileImage: "" });
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.fullName.trim())
            return toast.error("Recruiter name is required");

        if (!form.email.trim())
            return toast.error("Email is required");

        if (!form.phone.trim())
            return toast.error("Phone number is required");

        if (!form.designation.trim())
            return toast.error("Designation is required");

        if (!form.department.trim())
            return toast.error("Department is required");

        toast.success("Recruiter added successfully");

        navigate("/recruiters");
    };

    const textFieldStyle = {
        mb: 2.5,

        "& .MuiInputLabel-root": {
            color: colors.subText,
            fontSize: ".95rem",
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: primary,
        },

        "& .MuiOutlinedInput-root": {
            color: textColor,
            minHeight: { xs: 52, md: 56 },
            borderRadius: "12px",

            background: colors.input,

            borderRadius: "12px",

            "& fieldset": {
                borderColor: colors.border,
            },

            "&:hover fieldset": {
                borderColor: primary,
            },

            "&.Mui-focused": {
                boxShadow: `0 0 0 4px ${primary}22`,
            },

            "&.Mui-focused fieldset": {
                borderColor: primary,
                borderWidth: "2px",
            },
        },
    };

    return (
        <HRLayout>
            <Box
                sx={{
                    mb: {
                        xs: 2.5,
                        md: 4,
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <Typography
                    sx={{
                        lineHeight: 1.2,
                        fontSize: {
                            xs: "1.25rem",
                            sm: "1.8rem",
                            md: "2.3rem",
                        },
                        fontWeight: 850,
                        letterSpacing: "-0.03em",
                        mb: 0.5,
                    }}
                >
                    Add Recruiter
                </Typography>
            </Box>
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 1100,
                    mx: "auto",
                    p: { xs: 1.25, sm: 3, md: 5 },
                    borderRadius: "22px",
                    bgcolor: colors.card,
                    backdropFilter: "blur(16px)",
                    border: `1px solid ${borderStyle}`,
                    boxShadow: colors.shadow,
                }}
            >
                <CardContent sx={{
                    p: { xs: 0, sm: 1 },
                }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 2,
                                mb: {
                                    xs: 2.5,
                                    md: 4,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: 42, md: 48 },
                                    height: { xs: 42, md: 48 },
                                    borderRadius: 3,
                                    bgcolor: `${primary}15`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: primary,
                                }}
                            >
                                <FaUserTie size={22} />
                            </Box>

                            <Typography
                                sx={{
                                    color: textColor,
                                    fontWeight: 800,
                                    fontSize: {
                                        xs: "1rem",
                                        sm: "1.2rem",
                                        md: "1.5rem",
                                    },
                                }}
                            >
                                Recruiter Information
                            </Typography>
                        </Box>

                        <Grid container spacing={{ xs: 1.5, md: 2.5 }}>

                            {/* Full Name */}
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                            {/* Phone */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                            {/* Designation */}
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Designation"
                                    name="designation"
                                    value={form.designation}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                            {/* Department */}
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Department"
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                            {/* Experience */}
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Experience"
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                            {/* City */}
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                            {/* Joining Date */}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Joining Date"
                                    name="joiningDate"
                                    value={form.joiningDate}
                                    onChange={handleChange}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                            {/* Status */}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Status"
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                    <MenuItem value="On Leave">On Leave</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Image */}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Profile Image Path"
                                    name="profileImage"
                                    value={form.profileImage}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                />
                            </Grid>

                        </Grid>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            sx={{
                                mt: 3,
                                justifyContent: "flex-end",
                                alignItems: {
                                    xs: "stretch",
                                    sm: "center",
                                },
                            }}
                        >
                            <Button
                                component={Link}
                                fullWidth={window.innerWidth < 600}
                                to="/recruiters"
                                variant="outlined"
                                startIcon={<FaTimes size={12} />}
                                sx={{
                                    width: { xs: "100%", sm: "auto" },
                                    py: 1.4,
                                    px: 3,
                                    borderRadius: "10px",
                                    fontWeight: 700,
                                    textTransform: "none",
                                    fontSize: ".9rem",
                                    color: colors.subText,
                                    borderColor: colors.border,
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<FaSave size={12} />}
                                sx={{
                                    width: { xs: "100%", sm: "auto" },
                                    py: 1.4,
                                    px: 3,
                                    borderRadius: "10px",
                                    fontWeight: 700,
                                    textTransform: "none",
                                    fontSize: ".9rem",
                                    background: `linear-gradient(90deg, ${primary}, ${primary}cc)`,
                                    boxShadow: "0 4px 12px rgba(37,99,235,.2)",
                                    "&:hover": {
                                        background: `linear-gradient(90deg, ${primary}cc, ${primary}aa)`,
                                        boxShadow: "0 6px 16px rgba(37,99,235,.3)",
                                    },
                                }}
                            >
                                Save Recruiter
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Paper>
        </HRLayout>
    );

}
