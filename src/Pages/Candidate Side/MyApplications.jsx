import myapplications from "../../data/myApplications.json";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import { Typography, Paper, Box, Avatar, Chip, Button } from "@mui/material";
import { FaBriefcase, FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function MyApplications() {
  const { darkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle = darkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";
  const [searchParams, setSearchParams] = useSearchParams();
  const page =
    Number(searchParams.get("page")) || 1;
  const myapplicationsPerPage = 20;
  const filteredApplications = myapplications.filter((application) => {
    const matchesFilter =
      activeFilter === "All"
        ? true
        : application.status === activeFilter;

    const keyword = search.toLowerCase();

    const matchSearch =
      application.company.toLowerCase().includes(keyword) ||
      application.position.toLowerCase().includes(keyword) ||
      application.status.toLowerCase().includes(keyword);

    return matchesFilter && matchSearch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / myapplicationsPerPage)
  );
  const currentPage = Math.min(
    Math.max(page, 1),
    totalPages
  );
  const indexOfLastApplication =
    currentPage * myapplicationsPerPage;

  const indexOfFirstApplication =
    indexOfLastApplication -
    myapplicationsPerPage;

  const currentApplications =
    filteredApplications.slice(
      indexOfFirstApplication,
      indexOfLastApplication
    );
  const start =
    filteredApplications.length === 0
      ? 0
      : indexOfFirstApplication + 1;
  const end = Math.min(
    indexOfLastApplication,
    filteredApplications.length
  );

  // Dynamic status chip renderer
  const getStatusChip = (status) => {
    switch (status) {
      case "Shortlisted":
        return (
          <Chip
            label="Shortlisted"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
              border: "1px solid rgba(16, 185, 129, 0.2)"
            }}
          />
        );
      case "Interviewing":
        return (
          <Chip
            label="Interviewing"
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
      case "Rejected":
        return (
          <Chip
            label="Rejected"
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
      case "Applied":
        return (
          <Chip
            label="Applied"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(59,130,246,.12)",
              color: "#3b82f6",
              border: "1px solid rgba(59,130,246,.2)"
            }}
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <CandidateLayout>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: darkMode ? "#0f172a" : "#f8fafc",
          pb: 2,
        }}
      >
        <Box
          sx={{
            px: {
              xs: 0.5,
              sm: 0,
            },
            animation: "fadeIn .35s ease",
            "@keyframes fadeIn": {
              from: {
                opacity: 0,
                transform: "translateY(12px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {/* Title Header */}
          <Box sx={{
            mb: {
              xs: 3,
              md: 2,
            }
          }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: {
                  xs: "stretch",
                  md: "center",
                },
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: 2,
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 850,
                  letterSpacing: "-0.03em",
                  color: darkMode ? "#fff" : "#0f172a",
                  fontSize: {
                    xs: "1.45rem",
                    sm: "1.75rem",
                    md: "2rem",
                  },
                }}
              >
                My Applications
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: {
                    xs: "100%",
                    md: 380,
                  },
                  bgcolor: darkMode ? "#1e293b" : "#fff",
                  border: `1px solid ${borderStyle}`,
                  borderRadius: "12px",
                  px: 2,
                  py: 0.2,
                  mb: {
                    xs: -2,
                    md: -2,
                  },
                  "&:focus-within": {
                    borderColor: "#10b981",
                    boxShadow: "0 0 0 3px rgba(16,185,129,.12)",
                  },
                }}
              >
                <FaSearch
                  color={darkMode ? "#94a3b8" : "#64748b"}
                />

                <input
                  type="text"
                  placeholder="Search applications..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSearchParams({ page: 1 });
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: darkMode ? "#fff" : "#111827",
                    fontSize: ".9rem",
                  }}
                />
              </Box>
            </Box>

          </Box>

          {/* Filter panel */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                flexWrap: {
                  xs: "nowrap",
                  md: "wrap",
                },
                pb: 1,
                mb: {
                  xs: -2,
                  md: -2,
                },
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {[
                "All",
                "Applied",
                "Shortlisted",
                "Interviewing",
                "Rejected",
              ].map((filter) => (
                <Button
                  key={filter}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setActiveFilter(filter);
                    setSearchParams({ page: 1 });
                  }}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: 700,
                    mb: {
                      xs: 1,
                      sm: 2,
                      md: -1,
                    },
                    px: {
                      xs: 1.8,
                      sm: 2.5,
                    },
                    py: {
                      xs: .65,
                      sm: .8,
                    },
                    fontSize: {
                      xs: ".78rem",
                      sm: ".85rem",
                    },
                    minWidth: {
                      xs: "calc(50% - 4px)",
                      sm: "auto",
                    },
                    color:
                      activeFilter === filter
                        ? "#fff"
                        : darkMode
                          ? "#cbd5e1"
                          : "#475569",
                    bgcolor:
                      activeFilter === filter
                        ? "#10b981"
                        : "transparent",
                    borderColor:
                      activeFilter === filter
                        ? "#10b981"
                        : borderStyle,
                    transition: "all .25s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      bgcolor:
                        activeFilter === filter
                          ? "#059669"
                          : "rgba(16,185,129,.05)",
                    },
                  }}
                >
                  {filter}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Stacked Application Cards */}
        <Box
          sx={{
            height: {
              xs: "calc(100vh - 235px)",
              md: "calc(100vh - 255px)",
            },
            overflowY: "auto",
            pr: 1,

            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#94a3b8",
              borderRadius: "20px",
            },
          }}
        >

          <Paper
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 3.5,
              },
              mb: 2,
              borderRadius: {
                xs: 3,
                md: 4,
              },
              bgcolor: darkMode ? "rgba(30,41,59,.45)" : "#fff",
              border: `1px solid ${borderStyle}`,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: subText,
                mb: 0,
              }}
            >
              Total Applications
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: "#10b981",
                fontWeight: 800,
              }}
            >
              {myapplications.length}
            </Typography>
          </Paper>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {filteredApplications.length > 0 ? (
              currentApplications.map((job, index) => (

                <Paper
                  key={job.applicationId}
                  elevation={0}
                  sx={{
                    p: {
                      xs: 2,
                      sm: 3,
                      md: 3.5,
                    },
                    borderRadius: {
                      xs: 3,
                      md: 5,
                    },
                    bgcolor: darkMode ? "rgba(30, 41, 59, 0.45)" : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${borderStyle}`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: {
                        xs: "none",
                        md: "translateY(-4px)",
                      },
                      borderColor: job.status === "Rejected" ? "rgba(239,68,68,0.3)" : "#10b981",
                      boxShadow: darkMode ? "0 12px 24px rgba(0, 0, 0, 0.3)" : "0 12px 24px rgba(0, 0, 0, 0.02)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        md: "row"
                      },
                      alignItems: {
                        xs: "flex-start",
                        lg: "center",
                      },

                      justifyContent: {
                        xs: "flex-start",
                        lg: "space-between",
                      },
                      gap: {
                        xs: 2.5,
                        md: 4,
                      },
                    }}
                  >
                    {/* Left Column: Logo & Role Details */}
                    <Box sx={{
                      display: "flex", gap: {
                        xs: 1.5,
                        sm: 2.5,
                      }, alignItems: "center"
                    }}>
                      <Avatar
                        sx={{
                          width: {
                            xs: 42,
                            sm: 52,
                          },
                          height: {
                            xs: 42,
                            sm: 52,
                          },
                          fontSize: {
                            xs: "1rem",
                            sm: "1.2rem",
                          },
                          bgcolor: job.logoBg,
                          color: job.logoColor,
                          borderRadius: 2.5,
                          fontWeight: 800,
                        }}
                      >
                        {job.company.charAt(0)}
                      </Avatar>

                      <Box>
                        <Typography
                          sx={{
                            color: darkMode ? "#fff" : "#0f172a",
                            fontWeight: 800,
                            letterSpacing: "-.01em",
                            mb: .3,
                            fontSize: {
                              xs: ".95rem",
                              sm: "1.15rem"
                            }
                          }}
                        >
                          {job.company}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: subText,
                            mt: 0.3

                          }}
                        >
                          Application #{indexOfFirstApplication + index + 1}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: subText }}>
                          <FaBriefcase size={12} style={{ opacity: 0.8 }} />
                          <Typography sx={{
                            fontSize: {
                              xs: ".82rem",
                              sm: ".88rem",
                            }, fontWeight: 550
                          }}>
                            {job.position}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, color: subText }}>
                          <FaCalendarAlt size={11} style={{ opacity: 0.8 }} />
                          <Typography sx={{
                            fontSize: {
                              xs: ".75rem",
                              sm: ".8rem",
                            }, fontWeight: 500
                          }}>
                            Applied on: {job.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Right Column: Status & Action triggers */}
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", lg: "column" }, alignItems: { xs: "stretch", md: "flex-end" }, justifyContent: "space-between", gap: 2.5, borderTop: { xs: `1px solid ${borderStyle}`, md: "none" }, pt: { xs: 2, md: 0 } }}>
                      <Box sx={{
                        mb: {
                          xs: -2,
                          md: -2,
                        },
                      }}>
                        {getStatusChip(job.status)}
                      </Box>

                      <Typography
                        sx={{
                          color: subText,
                          mt: .5,
                          fontSize: {
                            xs: ".72rem",
                            md: ".75rem",
                          },
                          mb: {
                            xs: -1,
                            md: -2,
                          },
                          textAlign: {
                            xs: "center",
                            md: "right",
                          },
                        }}
                      >
                        Latest Update: {job.status}
                      </Typography>

                      <Button
                        component={Link}
                        to={`/my-application-job/${job.applicationId}`}
                        variant="contained"
                        endIcon={<FaChevronRight size={10} />}
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "auto",
                          },
                          py: {
                            xs: 1.1,
                            md: 1.3,
                          },
                          fontSize: {
                            xs: ".8rem",
                            md: ".85rem",
                          },
                          px: { xs: 1, md: 3 },
                          borderRadius: "10px",
                          fontWeight: 750,
                          textTransform: "none",
                          background: "linear-gradient(90deg, #10b981, #059669)",
                          boxShadow: "0 4px 10px rgba(16,185,129,0.15)",
                          "&:hover": {
                            background: "linear-gradient(90deg, #059669, #047857)",
                            boxShadow: "0 6px 14px rgba(16,185,129,0.25)",
                            transform: "translateY(-1px)",
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              ))
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: {
                    xs: 3,
                    sm: 5,
                    md: 6,
                  },
                  borderRadius: {
                    xs: 3,
                    md: 5,
                  },
                  bgcolor: darkMode
                    ? "rgba(30,41,59,.45)"
                    : "#ffffff",
                  border: `1px solid ${borderStyle}`,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  No Applications Yet
                </Typography>

                <Typography
                  sx={{
                    color: subText,
                    mb: 3,
                  }}
                >
                  You haven't applied for any jobs yet.
                </Typography>

                <Button
                  component={Link}
                  to="/browse-jobs"
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(90deg,#10b981,#059669)",
                  }}
                >
                  Browse Jobs
                </Button>
              </Paper>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            mt: {
              xs: 4,
              md: 5,
            },
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              md: "center",
            },
            gap: 2,
          }}
        >
          <Typography
            sx={{
              textAlign: {
                xs: "center",
                md: "left",
              },
              fontSize: {
                xs: ".85rem",
                md: ".95rem",
              },
            }}
          >
            Showing {start}–{end} of {filteredApplications.length} applications
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: {
                xs: "center",
                md: "flex-end",
              },
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                minWidth: {
                  xs: 80,
                  sm: 95,
                },
                fontSize: {
                  xs: ".8rem",
                  md: ".9rem",
                },
                py: {
                  xs: .8,
                  md: 1,
                },
              }}
              disabled={currentPage === 1}
              onClick={() => {
                setSearchParams({
                  page: currentPage - 1,
                });
              }}
            >
              Previous
            </Button>

            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                px: {
                  xs: 1,
                  md: 2,
                },
                fontSize: {
                  xs: ".85rem",
                  md: ".95rem",
                },
              }}
            >
              {currentPage} / {totalPages}
            </Typography>

            <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                minWidth: {
                  xs: 80,
                  sm: 95,
                },
                fontSize: {
                  xs: ".8rem",
                  md: ".9rem",
                },
                py: {
                  xs: .8,
                  md: 1,
                },
              }}
              disabled={currentPage === totalPages}
              onClick={() => {
                setSearchParams({
                  page: currentPage + 1,
                });
              }}
            >
              Next
            </Button>
          </Box>
        </Box >
      </Box>
    </CandidateLayout >
  );
}