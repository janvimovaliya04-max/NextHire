import jobsData from "../../data/jobs.json"
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { Link } from "react-router-dom";
import HRLayout from "../../Layouts/HRLayout";
import {
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Box,
} from "@mui/material";

import {
  Plus,
  Search,
  Briefcase,
  MapPin,
  Users,
} from "lucide-react";

export default function JobManagement() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const jobs = jobsData
  const JOBS_PER_LOAD = 10;

  const [visibleJobs, setVisibleJobs] = useState(
    jobs.slice(0, JOBS_PER_LOAD)
  );

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  // Filtering Logic
  const filteredJobs = visibleJobs.filter((job) => {
    const matchesStatus =
      activeFilter === "All" || job.status === activeFilter;

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });
  const loadMoreJobs = () => {
    setTimeout(() => {
      setVisibleJobs((prev) => [
        ...prev,
        ...jobs.slice(prev.length, prev.length + JOBS_PER_LOAD),
      ]);
    }, 1000);
  };

  // Dynamic Status Chip styling
  const getStatusChip = (status) => {
    switch (status) {
      case "Open":
        return (
          <Chip
            label="Open"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: ".68rem",
                md: ".72rem"
              },
              bgcolor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
              border: "1px solid rgba(16, 185, 129, 0.2)"
            }}
          />
        );
      case "Closed":
        return (
          <Chip
            label="Closed"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(239, 68, 68, 0.12)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.2)"
            }}
          />
        );
      case "Draft":
        return (
          <Chip
            label="Draft"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(245, 158, 11, 0.12)",
              color: "#f59e0b",
              border: "1px solid rgba(245, 158, 11, 0.2)"
            }}
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <HRLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 2,
          flexShrink: 0,
        }}
      >
        {/* Title & Banner Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Title */}
          <Typography
            sx={{
                fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
                mb: { xs: 0, md: 0.5 },
                fontWeight: 850,
                letterSpacing: "-0.03em",
              }}
          >
            Job Management
          </Typography>

          {/* Search + Button */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: {
                xs: "100%",
                md: 330,
              },
              bgcolor: colors.input,
              border: `1px solid ${borderStyle}`,
              borderRadius: "10px",
              px: 2,
              transition: ".2s",
              "&:hover": {
                borderColor: primary,
              },
              "&:focus-within": {
                borderColor: primary,
              },
            }}
          >
            <Search
              color={subText}
            />

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: textColor,
                fontSize: "0.9rem",
              }}
            />
          </Box>

          <Button
            component={Link}
            to="/create-job"
            variant="contained"
            startIcon={<Plus size={11} />}
            sx={{
              flexShrink: 0,
              whiteSpace: "nowrap",
              py: 1.3,
              px: 3,
              fontSize: ".9rem",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              background: `linear-gradient(135deg,${primary},${secondary || primary})`,
              boxShadow: `0 4px 12px ${primary}33`,
              "&:hover": {
                background: `linear-gradient(135deg,${primary},${primary})`,
              },
            }}
          >
            Create New Job
          </Button>
        </Box>

        {/* Filter panel */}
         <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            pb: 1,
            flexShrink: 0,

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
            {["All", "Open", "Closed", "Draft"].map((filter) => (
              <Button
                key={filter}
                variant="outlined"
                size="small"
                onClick={() => setActiveFilter(filter)}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: {
                    xs: ".75rem",
                    md: ".82rem"
                  },

                  px: {
                    xs: 1.6,
                    md: 2.2
                  },

                  py: {
                    xs: .55,
                    md: .7
                  },
                  color:
                    activeFilter ===
                      filter ? "#fff" : subText,
                  borderColor:
                    activeFilter ===
                      filter ? primary : borderStyle,
                  bgcolor:
                    activeFilter ===
                      filter ? primary : "transparent",
                  boxShadow:
                    activeFilter ===
                      filter ? `0 4px 10px ${primary}33` : "none",
                  "&:hover": {
                    borderColor: primary,
                    bgcolor: activeFilter === filter ? primary : `${primary}08`,
                  }
                }}
              >
                {filter}
              </Button>
            ))}
          </Box>
        </Box>

      {/* Premium Glassmorphic Table Card */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "75vh",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          p: { xs: 2.5, md: 4 },
          borderRadius: "22px",
          bgcolor: colors.card,
          backdropFilter: "blur(16px)",
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
          transition: ".3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: darkMode
              ? `
                0 24px 55px rgba(0,0,0,.42)
              `
              : `
                0 26px 55px rgba(15,23,42,.12)
              `,
          },
        }}
      >
        
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
            flex: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#94a3b8",
              borderRadius: 10,
            },
          }}
        >

          <Table
            stickyHeader
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                py: 0.75,
                px: 1.5,
                fontSize: "0.78rem",
                lineHeight: 1.2,
              },
              minWidth: {
                xs: 850,
                md: 1000,
              },
            }}
          >
            <TableHead sx={{
              "& .MuiTableCell-root": {
                fontSize: {
                  xs: ".9rem",
                  md: "0.88rem",
                },
                fontWeight: 700,
                bgcolor: colors.background,
              },
            }}
            >
              <TableRow
                sx={{
                  height: {
                    xs: 60,
                    md: 82
                  },
                  bgcolor: colors.background,
                  borderBottom: `1px solid ${borderStyle}`,
                }}
              >
                <TableCell align="center" sx={{ color: textColor, fontWeight: 700, fontSize: { xs: ".8rem", md: ".95rem" }, borderBottom: `1px solid ${borderStyle}` }}>
                  Job Role
                </TableCell>
                <TableCell align="center" sx={{ color: textColor, fontWeight: 700, fontSize: { xs: ".8rem", md: ".95rem" }, borderBottom: `1px solid ${borderStyle}` }}>
                  Salary Package
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: { xs: ".8rem", md: ".95rem" }, borderBottom: `1px solid ${borderStyle}` }}>
                  Department
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 700, fontSize: { xs: ".8rem", md: ".95rem" }, borderBottom: `1px solid ${borderStyle}` }}>
                  Listing Status
                </TableCell>
                <TableCell align="center" sx={{ color: textColor, fontWeight: 700, fontSize: { xs: ".8rem", md: ".95rem" }, borderBottom: `1px solid ${borderStyle}`, pr: 4 }}>
                  Action Panel
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <TableRow
                    key={job.jobId}
                    sx={{
                      borderBottom: `1px solid ${borderStyle}`,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: `${primary}08`,
                      },
                    }}
                  >
                    {/* Job Title and Location Info */}
                    <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: `${primary}15`, color: primary, width: { xs: 36, md: 44 }, height: { xs: 36, md: 44 }, }}>
                          <Briefcase size={window.innerWidth < 600 ? 13 : 16} />
                        </Avatar>
                        <Box>
                          <Typography sx={{ color: textColor, fontWeight: 700, fontSize: { xs: ".8rem", md: ".95rem" }, }}>
                            {job.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: subText }}>
                            <MapPin size={10} style={{ opacity: 0.7 }} />
                            <Typography sx={{ fontSize: { xs: ".72rem", md: ".78rem" } }}>
                              {job.location}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Salary Package */}
                    <TableCell sx={{ borderBottom: `1px solid ${borderStyle}`, fontWeight: 500, fontSize: { xs: ".8rem", md: ".88rem" }, color: textColor }}>
                      {job.salaryRange}
                    </TableCell>

                    {/* Applicants count indicator */}
                    <TableCell sx={{ alignItems: "center", borderBottom: `1px solid ${borderStyle}` }}>
                      <Box sx={{
                        display: "flex", alignItems: "center", gap: {
                          xs: .8,
                          md: 1
                        }
                      }}>
                        <Typography sx={{ alignItems: "center", color: textColor, fontSize: { xs: ".8rem", md: ".88rem" }, fontWeight: 700 }}>
                          {job.department}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Status Pill */}
                    <TableCell sx={{ borderBottom: `1px solid ${borderStyle}` }}>
                      {getStatusChip(job.status)}
                    </TableCell>

                    {/* Action buttons */}
                    <TableCell
                      align="right"
                      sx={{
                        borderBottom: `1px solid ${borderStyle}`,
                        pr: 4
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                        }}
                      >
                              
                        <Button
                          component={Link}
                          to="/create-assessment"
                          variant="contained"
                          size="small"
                          sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: {
                              xs: "7px",
                              md: "8px"
                            },
                            px: {
                              xs: 1.2,
                              md: 2
                            },
                            fontSize: {
                              xs: ".7rem",
                              sm: ".75rem",
                              md: ".8rem"
                            },
                            width: { xs: "100%", sm: "auto" },
                            background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                            boxShadow: `0 4px 12px ${primary}33`,
                            "&:hover": {
                              background: `linear-gradient(135deg, ${primary}, ${primary})`,
                              boxShadow: `0 6px 16px ${primary}4d`,
                            }
                          }}
                        >
                          Create Assessment
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{
                    py: { xs: 4, md: 6 }, color: subText, fontSize: {
                      xs: ".85rem",
                      md: "1rem"
                    }
                  }}>
                    No job postings found matching this category filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </HRLayout>
  );
}