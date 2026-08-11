import recruitersData from "../../data/recruiters.json";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import HRLayout from "../../Layouts/HRLayout";
import { Box, Paper, Typography, Button, Avatar, Chip, TextField } from "@mui/material";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
    FaUserTie,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaBriefcase,
    FaBuilding,
} from "react-icons/fa";

const RECRUITERS_PER_PAGE = 8;

export default function Recruiters() {
    const { darkMode } = useTheme();
    const colors = useThemeColors();

    // Recruiters Data //
    const recruiters = recruitersData;

    // State //
    const [activeFilter, setActiveFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    // Theme //
    const primary = colors.primary;
    const secondary = colors.secondary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;

    // Filter Logic //
    const filteredRecruiters = recruiters.filter((item) => {
        const matchesFilter =
            activeFilter === "All"
                ? true
                : item.status === activeFilter;
        const matchesSearch =
            item.fullName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            item.email
                .toLowerCase()
                .includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Pagination //
    const totalPages = Math.max(1, Math.ceil(filteredRecruiters.length / RECRUITERS_PER_PAGE));
    const indexOfLastRecruiter = currentPage * RECRUITERS_PER_PAGE;
    const indexOfFirstRecruiter = indexOfLastRecruiter - RECRUITERS_PER_PAGE;
    const currentRecruiters = filteredRecruiters.slice(
        indexOfFirstRecruiter,
        indexOfLastRecruiter
    );
    const getVisiblePages = () => {
        const pages = [];
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
        pages.push(1);
        if (currentPage > 3) {
            pages.push("...");
        }
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) {
            pages.push("...");
        }
        pages.push(totalPages);
        return pages;
    };
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setSearchParams({ page: "1" });
    };
    const handleSearchChange = (value) => {
        setSearch(value);
        setSearchParams({ page: "1" });
    };
    return (
        <HRLayout>
            {/* Title & Banner Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: { xs: 1.5, md: 2 },
                    mb: { xs: 3, md: 4 }
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
                        mb: { xs: 0, md: -4 },
                        fontWeight: 850,
                        letterSpacing: "-0.03em",
                        color: textColor,
                    }}
                >
                    Recruiter Management
                </Typography>
                <Button
                    component={Link}
                    to="/add-recruiter"
                    variant="contained"
                    startIcon={<FaPlus size={11} />}
                    sx={{
                        width: { xs: "100%", sm: "auto" },
                        py: { xs: 1, md: 1 },
                        px: { xs: 2, md: 2 },
                        fontSize: { xs: ".78rem", md: ".9rem" },
                        fontWeight: 700,
                        textTransform: "none",
                        borderRadius: "10px",
                        background: `linear-gradient(90deg,${primary},${secondary || primary})`,
                        boxShadow: `0 4px 12px ${primary}33`,
                        transition: "all .2s",
                        "&:hover": {
                            background: `linear-gradient(90deg,${primary},${primary})`,
                            transform: "scale(1.02)",
                        },
                    }}
                >
                    Add Recruiter
                </Button>
            </Box>
            <TextField
                fullWidth
                placeholder="Search recruiter..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                sx={{
                    mb: { xs: 2, md: 2, },
                    "& .MuiOutlinedInput-root": {
                        fontSize: { xs: ".85rem", md: ".95rem" },
                        "& input": {
                            py: { xs: 1.3, md: 1.7 }
                        },
                        borderRadius: "14px",
                        bgcolor: colors.input,
                        color: textColor,
                        "& fieldset": {
                            borderColor: borderStyle,
                        },
                        "&:hover fieldset": {
                            borderColor: primary,
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: primary,
                        },
                    },
                    "& input::placeholder": {
                        color: subText,
                        opacity: 1,
                    },
                }}
            />

            {/* Filter panel options */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: {
                        xs: 1.5,
                        md: 2,
                    },
                    mb: {
                        xs: 1,
                        md: 2,
                    }
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 1.2,
                        flexWrap: "wrap"
                    }}
                >
                    {["All", "Active", "On Leave"].map(f =>
                        <Button
                            key={f}
                            variant="outlined"
                            size="small"
                            onClick={() => handleFilterChange(f)}
                            sx={{
                                borderRadius: "20px",
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: {
                                    xs: ".74rem",
                                    md: ".82rem"
                                },

                                px: {
                                    xs: 1.5,
                                    md: 2.2
                                },

                                py: {
                                    xs: .55,
                                    md: .7
                                },
                                minWidth: {
                                    xs: 80,
                                    md: 95
                                },
                                color:
                                    activeFilter === f ? "#fff" : subText,
                                borderColor:
                                    activeFilter === f ? primary : borderStyle,
                                bgcolor:
                                    activeFilter === f ? primary : "transparent",
                                boxShadow:
                                    activeFilter === f ? `0 4px 10px ${primary}33` : "none",
                                "&:hover": {
                                    borderColor: primary,
                                    bgcolor: activeFilter === f ? primary : `${primary}08`,
                                }
                            }}
                        >
                            {f}
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Cards Panel */}
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: {
                        xs: "calc(100vh - 170px)",
                        md: "75vh",
                    },
                    overflow: "hidden",

                    p: {
                        xs: 2.5,
                        md: 4,
                    },

                    borderRadius: "22px",

                    bgcolor: colors.card,

                    backdropFilter: "blur(16px)",

                    border: `1px solid ${borderStyle}`,

                    boxShadow: colors.shadow,

                    transition: ".3s",

                    "&:hover": {
                        transform: "translateY(-4px)",

                        boxShadow: darkMode
                            ? `0 24px 55px rgba(0,0,0,.42)`
                            : `0 26px 55px rgba(15,23,42,.12)`,
                    },
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        overflowX: "auto",
                        pr: 1,
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": {
                            height: 8,
                            width: 8,
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#94a3b8",
                            borderRadius: 10,
                        },
                    }}
                >
                    {currentRecruiters.length > 0 ? (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "1fr 1fr",
                                },
                                gap: {
                                    xs: 2,
                                    md: 3,
                                },
                            }}
                        >
                            {currentRecruiters.map(r =>
                                <Paper
                                    key={r.recruiterId}
                                    elevation={0}
                                    sx={{
                                        position: "relative",
                                        cursor: "pointer",
                                        p: {
                                            xs: 1.5,
                                            sm: 2.5,
                                            md: 3
                                        },
                                        borderRadius: {
                                            xs: 3,
                                            md: 5
                                        },
                                        bgcolor: colors.card,
                                        backdropFilter: "blur(12px)",
                                        border: `1px solid ${borderStyle}`,
                                        // Premium Multi-layer Shadow
                                        boxShadow: darkMode
                                            ? `0 10px 20px rgba(0,0,0,0.30),
                                           0 4px 8px rgba(0,0,0,0.20)
                                          `
                                            : `0 12px 24px rgba(15,23,42,0.08),
                                           0 2px 6px rgba(15,23,42,0.05)
                                          `,
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-3px)",
                                            borderColor: primary,
                                            boxShadow: darkMode
                                                ? "0 18px 38px rgba(0,0,0,.45)"
                                                : `0 18px 40px ${primary}1f`,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: {
                                                xs: "flex-start",
                                                sm: "center",
                                            },
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                            },
                                            gap: {
                                                xs: 1.5,
                                                sm: 2,
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                flexDirection: {
                                                    xs: "column",
                                                    sm: "row",
                                                },
                                                gap: {
                                                    xs: 1.5,
                                                    sm: 2,
                                                },
                                                width: "100%",
                                            }}
                                        >
                                            <Avatar
                                                src={r.profileImage}
                                                sx={{
                                                    width: {
                                                        xs: 38,
                                                        sm: 44,
                                                    },

                                                    height: {
                                                        xs: 38,
                                                        sm: 44,
                                                    },
                                                    bgcolor: primary,
                                                    fontSize: {
                                                        xs: ".95rem",
                                                        sm: "1.1rem",
                                                    },
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {r.fullName.split(" ").map(x => x[0]).join("")}
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: {
                                                            xs: ".88rem",
                                                            sm: ".98rem",
                                                        },
                                                        fontWeight: 800,
                                                        color: textColor,
                                                        mb: .3,
                                                    }}
                                                >
                                                    {r.fullName}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.7 }}>
                                                    <FaUserTie size={13} color={primary} />
                                                    <Typography
                                                        sx={{
                                                            color: primary,
                                                            fontWeight: 700,
                                                            fontSize: {
                                                                xs: ".8rem",
                                                                sm: ".88rem",
                                                            },
                                                        }}
                                                    >
                                                        {r.designation}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                                    <FaBuilding size={12} color={subText} />
                                                    <Typography
                                                        sx={{
                                                            color: subText,
                                                            fontSize: {
                                                                xs: ".78rem",
                                                                sm: ".84rem",
                                                            },
                                                        }}
                                                    >
                                                        {r.department}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                                    <FaEnvelope size={12} color={subText} />
                                                    <Typography
                                                        sx={{
                                                            color: subText,
                                                            fontSize: {
                                                                xs: ".78rem",
                                                                sm: ".84rem",
                                                            },
                                                            wordBreak: "break-word",
                                                        }}
                                                    >
                                                        {r.email}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 0.5 }}>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <FaPhoneAlt size={11} color={subText} />
                                                        <Typography
                                                            sx={{
                                                                color: subText,
                                                                fontSize: {
                                                                    xs: ".78rem",
                                                                    sm: ".84rem",
                                                                },
                                                            }}
                                                        >
                                                            {r.phone}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <FaMapMarkerAlt size={11} color={subText} />
                                                        <Typography
                                                            sx={{
                                                                color: subText,
                                                                fontSize: {
                                                                    xs: ".78rem",
                                                                    sm: ".84rem",
                                                                },
                                                            }}
                                                        >
                                                            {r.city}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                                    <FaBriefcase size={12} color={subText} />
                                                    <Typography
                                                        sx={{
                                                            color: subText,
                                                            fontSize: {
                                                                xs: ".78rem",
                                                                sm: ".84rem",
                                                            },
                                                        }}
                                                    >
                                                        {r.experience}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        color: subText,
                                                        fontSize: {
                                                            xs: ".78rem",
                                                            sm: ".84rem",
                                                        },
                                                        mb: {
                                                            xs: .25,
                                                            md: .35,
                                                        },
                                                    }}
                                                >
                                                    Assigned Jobs: {r.assignedJobs.length}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Chip
                                            label={r.status}
                                            sx={{
                                                alignSelf: {
                                                    xs: "flex-start",
                                                    sm: "center",
                                                },
                                                bgcolor:
                                                    r.status === "Active"
                                                        ? "rgba(34,197,94,.15)"
                                                        : "rgba(234,179,8,.15)",

                                                color:
                                                    r.status === "Active"
                                                        ? "#22c55e"
                                                        : "#f59e0b",

                                                fontWeight: 700,

                                                fontSize: {
                                                    xs: ".68rem",
                                                    md: ".78rem"
                                                },

                                                height: {
                                                    xs: 22,
                                                    md: 28
                                                },
                                                border:
                                                    r.status === "Active"
                                                        ? "1px solid rgba(34,197,94,.3)"
                                                        : "1px solid rgba(245,158,11,.3)",
                                            }}
                                        />
                                    </Box>
                                </Paper>
                            )}
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                            <Typography sx={{ color: subText }}>
                                No recruiters found matching this filter or search.
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Footer info & Pagination */}
                <Box
                    sx={{
                        flexShrink: 0,
                        pt: {
                            xs: 1.5,
                            md: 2.5
                        },
                        mt: 1,
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                        gap: {
                            xs: 1.5,
                            md: 2
                        },
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            md: "center",
                        },
                        borderTop: `1px solid ${borderStyle}`,
                    }}
                >
                    <Typography sx={{ color: subText, fontSize: { xs: ".72rem", md: ".82rem" } }}>
                        {filteredRecruiters.length > 0 ? (
                            <>
                                Page {currentPage} of {totalPages} • Showing{" "}
                                <strong>{indexOfFirstRecruiter + 1}</strong>-
                                <strong>{Math.min(indexOfLastRecruiter, filteredRecruiters.length)}</strong>{" "}
                                of <strong>{filteredRecruiters.length}</strong> recruiters
                            </>
                        ) : (
                            "No recruiters found"
                        )}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: {
                                xs: "center",
                                md: "flex-end",
                            },
                            width: {
                                xs: "100%",
                                md: "auto",
                            },
                        }}
                    >
                        <Button
                            size="small"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setSearchParams({
                                    page: String(Math.max(currentPage - 1, 1)),
                                })
                            }
                            sx={{ color: textColor }}
                        >
                            <FaChevronLeft />
                        </Button>

                        {getVisiblePages().map((page, index) =>
                            page === "..." ? (
                                <Typography
                                    key={index}
                                    sx={{
                                        px: 1,
                                        color: textColor,
                                        fontWeight: 700,
                                    }}
                                >
                                    ...
                                </Typography>
                            ) : (
                                <Button
                                    key={`${page}-${index}`}
                                    size="small"
                                    onClick={() => {
                                        if (page !== "...") {
                                            setSearchParams({
                                                page: String(page),
                                            });
                                        }
                                    }}
                                    variant={Number(currentPage) === Number(page) ? "contained" : "text"}
                                    sx={{
                                        minWidth: {
                                            xs: "30px",
                                            md: "35px"
                                        },

                                        height: {
                                            xs: 30,
                                            md: 35
                                        },

                                        fontSize: {
                                            xs: ".75rem",
                                            md: ".9rem"
                                        },
                                        bgcolor: Number(currentPage) === Number(page) ? primary : "transparent",
                                        color:
                                            Number(currentPage) === Number(page)
                                                ? "#fff"
                                                : textColor,
                                        "&:hover": {
                                            bgcolor:
                                                Number(currentPage) === Number(page)
                                                    ? primary
                                                    : `${primary}14`,
                                        },
                                    }}
                                >
                                    {page}
                                </Button>
                            )
                        )}

                        <Button
                            size="small"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setSearchParams({
                                    page: String(Math.min(currentPage + 1, totalPages)),
                                })
                            }
                            sx={{ color: textColor }}
                        >
                            <FaChevronRight />
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </HRLayout>
    );
}