import api from "../../api/axios";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import Grid from "@mui/material/Grid";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

export default function BrowseJobs() {
  const { darkMode } = useTheme();
  const [browseJobs, setBrowseJobs] = useState([]);
  const [restoreDone, setRestoreDone] = useState(false);
  const LIMIT = 10;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500); // 500ms debounce time

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("browseJobsScroll");
    if (savedScroll && !restoreDone) {

      // load all cards first
      requestAnimationFrame(() => {
        window.scrollTo({
          top: Number(savedScroll),
          behavior: "auto",
        });
        setRestoreDone(true);
      }, 500);
    }
  }, [restoreDone]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      console.log("fetchJobs called, page =", page);
      try {
        const response = await api.get(
          `/jobs?page=${page}&limit=${LIMIT}&search=${debouncedSearch}`
        );
        console.log("API URL:", `/jobs?page=${page}&limit=${LIMIT}&search=${debouncedSearch}&category=${activeFilter === "All" ? "" : activeFilter}`);
        if (page === 1) {
          setBrowseJobs(response.data);
        } else {
          setBrowseJobs((prev) => [...prev, ...response.data]);
        }
        if (response.data.length === 0) {
          setHasMore(false);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page, debouncedSearch, activeFilter]);

  const subText = darkMode ? "#94a3b8" : "#475569";
  const borderStyle = darkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";

  // Filtering Logic
  const filteredJobs = browseJobs.filter((job) => {
    const matchesCategory =
      activeFilter === "All"
        ? true
        : job.category === activeFilter;

    const keyword = searchText.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword) ||
      job.tags.some(tag =>
        tag.toLowerCase().includes(keyword)
      );

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (debouncedSearch && filteredJobs.length === 0 ) {
      toast.error("No jobs found matching your search criteria.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [debouncedSearch, filteredJobs.length]);

  const loadMoreJobs = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(
        "browseJobsScroll",
        window.scrollY
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading && browseJobs.length === 0) {
    return (
      <CandidateLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress sx={{ color: "#10b981" }} />
        </Box>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>

      {/* Title Header */}
      <Box
        sx={{
          display: "flex",
          p: 2,
          flexDirection: "column",
          gap: {
            xs: 2,
            md: 2.5,
          },
          mb: 3,
        }}
      >
        <Box
          sx={{
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

            gap: {
              xs: 2,
              md: 3,
            },

            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: darkMode ? "#0f172a" : "#f8fafc",
            pb: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-0.03em",
              color: darkMode ? "#fff" : "#0f172a",

              mb: {
                xs: -1,
                md: -2,
              },

              fontSize: {
                xs: "1.45rem",
                sm: "1.75rem",
                md: "2rem",
                lg: "2.2rem",
              },
            }}
          >
            Explore Job Openings
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: {
                xs: -2,
                md: -2,
              },
              width: {
                xs: "100%",
                md: 400,
                lg: 460,
              },

              bgcolor: darkMode ? "#1e293b" : "#fff",

              border: `1px solid ${borderStyle}`,

              borderRadius: "12px",

              px: 2,

              py: .2,

              transition: ".25s",

              flexShrink: 0,

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
              placeholder="Search jobs..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
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

        {/* Filter panel options */}
        <Box
          sx={{
            display: "flex",

            overflowX: "auto",
            mb: {
              xs: -2.5,
              md: -2,
            },
            gap: {
              xs: 1,
              sm: 1.2,
            },

            pb: 1,

            flexWrap: "nowrap",

            "&::-webkit-scrollbar": {
              display: "none",
            },

            scrollbarWidth: "none",
          }}
        >

          {["All", "Engineering", "UI/UX"].map((filter) => (
            <Button
              sx={{
                flexShrink: 0,
                borderRadius: "30px",
                px: {
                  xs: 1.6,
                  md: 2.2,
                },
                py: {
                  xs: .55,
                  md: .7,
                },

                fontSize: {
                  xs: ".72rem",
                  md: ".82rem",
                },

                textTransform: "none",
                fontWeight: 700,

                color:
                  activeFilter === filter
                    ? "#fff"
                    : darkMode
                      ? "#cbd5e1"
                      : "#475569",

                borderColor:
                  activeFilter === filter
                    ? "#10b981"
                    : borderStyle,

                bgcolor:
                  activeFilter === filter
                    ? "#10b981"
                    : "transparent",

                boxShadow:
                  activeFilter === filter
                    ? "0 6px 14px rgba(16,185,129,.22)"
                    : "none",

                "&:hover": {
                  borderColor: "#10b981",
                  bgcolor:
                    activeFilter === filter
                      ? "#059669"
                      : darkMode
                        ? "rgba(255,255,255,.05)"
                        : "rgba(16,185,129,.05)",
                },
              }}
              key={filter}
              variant="outlined"
              size="small"
              onClick={() => {
                setActiveFilter(filter);
                setBrowseJobs([]);
                setPage(1);
                setHasMore(true);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              sx={{
                borderRadius: {
                  xs: "14px",
                  sm: "18px",
                  md: "20px",
                },
                textTransform: "none",
                fontWeight: 700,
                fontSize: {
                  xs: ".78rem",
                  sm: ".82rem",
                },
                px: {
                  xs: 1.5,
                  sm: 2,
                  md: 2.2,
                },

                py: {
                  xs: .55,
                  sm: .65,
                  md: .7,
                },
                color: activeFilter === filter ? "#fff" : darkMode ? "#cbd5e1" : "#475569",
                borderColor: activeFilter === filter ? "#10b981" : borderStyle,
                bgcolor: activeFilter === filter ? "#10b981" : "transparent",
                boxShadow: activeFilter === filter ? "0 4px 10px rgba(16,185,129,0.2)" : "none",
                "&:hover": {
                  borderColor: "#10b981",
                  bgcolor:
                    activeFilter === filter
                      ? "#059669"
                      : darkMode
                        ? "rgba(16,185,129,.08)"
                        : "rgba(16,185,129,.05)",
                }
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Responsive Grid of Cards */}
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
        <InfiniteScroll
          dataLength={browseJobs.length}
          next={loadMoreJobs}
          hasMore={hasMore}
          scrollThreshold={0.8}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: {
                  xs: 3,
                  sm: 4,
                },
              }}
            >
              <CircularProgress
                size={window.innerWidth < 600 ? 30 : 36}
                thickness={4}
                sx={{
                  color: "#10b981",
                }}
              />
            </Box>
          }
          endMessage={
            <Typography
              align="center"
              sx={{
                py: {
                  xs: 2,
                  sm: 3,
                },
                color: darkMode ? "#94a3b8" : "#64748b",
                fontWeight: 600,
              }}
            >
              No more jobs available.
            </Typography>
          }
        >
          <Grid
            container
            spacing={{
              xs: 2,
              sm: 2.5,
              md: 3,
            }}
          >
            {filteredJobs.map((job) => (
              <Grid
                key={job.jobId}
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    width: "100%",
                    borderRadius: {
                      xs: 3,
                      sm: 4,
                      md: 5,
                    },
                    bgcolor: darkMode ? "rgba(30,41,59,.48)" : "rgba(255,255,255,.92)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${borderStyle}`,
                    boxShadow: darkMode
                      ? "0 10px 30px rgba(0,0,0,.28)"
                      : "0 12px 28px rgba(15,23,42,.05)",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: {
                        xs: "none",
                        md: "translateY(-6px)",
                      },
                      borderColor: "#10b981",
                      boxShadow: darkMode
                        ? "0 20px 40px rgba(0,0,0,.42),0 0 18px rgba(16,185,129,.14)"
                        : "0 20px 40px rgba(15,23,42,.08),0 0 18px rgba(16,185,129,.12)",
                    }
                  }}
                >
                  <CardContent
                    sx={{
                      p: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                      },
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between"
                    }}
                  >
                    <Box>
                      {/* Top Row: Logo & Title */}
                      <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2, }, mb: { xs: 2, sm: 2.5 }, alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: {
                              xs: 38,
                              sm: 42,
                              md: 44,
                            },

                            height: {
                              xs: 38,
                              sm: 42,
                              md: 44,
                            },
                            bgcolor: job.logoBg,
                            color: job.logoColor,
                            borderRadius: {
                              xs: 2,
                              sm: 2.5,
                            },
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            flexShrink: 0,
                          }}
                        >
                          {job.logoLetter}
                        </Avatar>
                        <Box>
                          <Typography
                            sx={{
                              color: darkMode ? "#ffffff" : "#0f172a",
                              fontWeight: 800,
                              letterSpacing: "-0.01em",
                              lineHeight: 1.2,
                              fontSize: {
                                xs: ".95rem",
                                sm: "1.05rem",
                                md: "1.15rem",
                              }
                            }}>

                            {job.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: subText,
                              fontSize: {
                                xs: ".74rem",
                                sm: ".8rem",
                                md: ".85rem",
                              },
                              fontWeight: 600,
                              mt: 0.3
                            }}
                          >
                            {job.company}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Mid Row: Info Icons */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: {
                            xs: 1,
                            sm: 1.2,
                          },
                          mb: {
                            xs: 2.5,
                            sm: 3,
                          },
                        }}>
                        <Box sx={{
                          display: "flex", alignItems: "center", gap: {
                            xs: 1,
                            sm: 1.5,
                          },
                        }}>
                          <FaMapMarkerAlt style={{ color: "#10b981", fontSize: 13 }} />
                          <Typography sx={{
                            fontSize: {
                              xs: ".76rem",
                              sm: ".82rem",
                              md: ".88rem",
                            },
                            fontWeight: 550,
                            color: darkMode ? "#cbd5e1" : "#475569"
                          }}
                          >
                            {job.location}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <FaMoneyBillWave style={{ color: "#10b981", fontSize: 13 }} />
                          <Typography
                            sx={{
                              fontSize: {
                                xs: ".76rem",
                                sm: ".82rem",
                                md: ".88rem",
                              },
                              fontWeight: 550,
                              color: darkMode ? "#cbd5e1" : "#475569"
                            }}
                          >
                            {job.salary}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <FaClock style={{ color: "#10b981", fontSize: 13 }} />
                          <Typography
                            sx={{
                              fontSize: {
                                xs: ".76rem",
                                sm: ".82rem",
                                md: ".88rem",
                              },
                              fontWeight: 550,
                              color: darkMode ? "#cbd5e1" : "#475569"
                            }}
                          >
                            {job.type}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Skills tags */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: {
                            xs: .8,
                            sm: 1,
                          },
                          mb: {
                            xs: 3,
                            sm: 3.5,
                            md: 4
                          },
                        }}
                      >
                        {job.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              px: {
                                xs: .5,
                                sm: .8,
                              },
                              fontSize: {
                                xs: ".66rem",
                                sm: ".72rem",
                                md: ".75rem",
                              },
                              bgcolor:
                                darkMode
                                  ? "rgba(16,185,129,.08)"
                                  : "rgba(16,185,129,.05)",
                              border: `1px solid ${borderStyle}`,
                              color: darkMode ? "#6ee7b7" : "#047857",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Card Action Link */}
                    <Button
                      component={Link}
                      to={`/job-details/${job.jobId}`}
                      onClick={() => {
                        window.scrollTo({
                          top: Number(savedScroll),
                          behavior: "auto",
                        });
                        sessionStorage.removeItem("browseJobsScroll");
                        setRestoreDone(true);
                      }}
                      variant="contained"
                      fullWidth
                      sx={{
                        py: {
                          xs: 1.1,
                          sm: 1.2,
                          md: 1.3,
                        },
                        borderRadius: {
                          xs: "8px",
                          sm: "10px",
                        },
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: {
                          xs: ".8rem",
                          sm: ".85rem",
                          md: ".9rem",
                        },
                        background: "linear-gradient(90deg, #10b981, #059669)",
                        boxShadow: "0 4px 12px rgba(16,185,129,0.2)",
                        "&:hover": {
                          background: "linear-gradient(90deg, #059669, #047857)",
                          boxShadow: "0 10px 22px rgba(16,185,129,.35)",
                          transform: "translateY(-2px)",
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Box>
    </CandidateLayout>
  );
}