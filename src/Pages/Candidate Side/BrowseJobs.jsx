import browseJobsData from "../../data/browseJobs.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Search,
  MapPin,
  Banknote,
  Clock,
} from "lucide-react";

export default function BrowseJobs() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const browseJobs = browseJobsData;
  const [restoreDone, setRestoreDone] = useState(false);

  const JOBS_PER_LOAD = 10;
  const [visibleJobs, setVisibleJobs] = useState(JOBS_PER_LOAD);

  // Colors — fully theme-driven (matches Assessment page)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("browseJobsScroll");
    if (savedScroll && !restoreDone) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: Number(savedScroll),
          behavior: "auto",
        });
        setRestoreDone(true);
      }, 500);
    }
  }, [restoreDone]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Filtering Logic
  const filteredJobs = browseJobs.filter((job) => {
    const matchesCategory =
      activeFilter === "All"
        ? true
        : job.category === activeFilter;

    const keyword = search.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword) ||
      job.tags.some(tag =>
        tag.toLowerCase().includes(keyword)
      );

    return matchesCategory && matchesSearch;
  });

  const loadMoreJobs = () => {
    setTimeout(() => {
      setVisibleJobs((prev) => prev + JOBS_PER_LOAD);
    }, 1000);
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
            bgcolor: colors.background,
            pb: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-0.03em",
              color: textColor,

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

              bgcolor: colors.input,

              border: `1px solid ${borderStyle}`,

              borderRadius: "12px",

              px: 2,

              py: .2,

              transition: ".25s",

              flexShrink: 0,

              "&:focus-within": {
                borderColor: primary,
                boxShadow: `0 0 0 3px ${primary}1f`,
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
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleJobs(JOBS_PER_LOAD);
              }}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: textColor,
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
              key={filter}
              variant="outlined"
              size="small"
              onClick={() => {
                setActiveFilter(filter);
                setVisibleJobs(JOBS_PER_LOAD);
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
                color: activeFilter === filter ? "#fff" : subText,
                borderColor: activeFilter === filter ? primary : borderStyle,
                bgcolor: activeFilter === filter ? primary : "transparent",
                boxShadow: activeFilter === filter ? `0 4px 10px ${primary}33` : "none",
                "&:hover": {
                  borderColor: primary,
                  bgcolor:
                    activeFilter === filter
                      ? (secondary || primary)
                      : `${primary}14`,
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
            background: subText,
            borderRadius: "20px",
          },
        }}
      >
        <InfiniteScroll
          dataLength={Math.min(visibleJobs, filteredJobs.length)}
          next={loadMoreJobs}
          hasMore={visibleJobs < filteredJobs.length}
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
                  color: primary,
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
                color: subText,
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
            {filteredJobs
              .slice(0, visibleJobs)
              .map((job) => (
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
                      bgcolor: colors.card,
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${borderStyle}`,
                      boxShadow: colors.shadow,
                      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: {
                          xs: "none",
                          md: "translateY(-6px)",
                        },
                        borderColor: primary,
                        boxShadow: colors.shadow,
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
                                color: textColor,
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
                            <MapPin style={{ color: primary, fontSize: 13 }} />
                            <Typography sx={{
                              fontSize: {
                                xs: ".76rem",
                                sm: ".82rem",
                                md: ".88rem",
                              },
                              fontWeight: 550,
                              color: subText
                            }}
                            >
                              {job.location}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Banknote style={{ color: primary, fontSize: 13 }} />
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: ".76rem",
                                  sm: ".82rem",
                                  md: ".88rem",
                                },
                                fontWeight: 550,
                                color: subText
                              }}
                            >
                              {job.salary}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Clock style={{ color: primary, fontSize: 13 }} />
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: ".76rem",
                                  sm: ".82rem",
                                  md: ".88rem",
                                },
                                fontWeight: 550,
                                color: subText
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
                                bgcolor: `${primary}14`,
                                border: `1px solid ${borderStyle}`,
                                color: primary,
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
                          sessionStorage.setItem(
                            "browseJobsScroll",
                            window.scrollY
                          );
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
                          background: `linear-gradient(90deg, ${primary}, ${secondary || primary})`,
                          boxShadow: `0 4px 12px ${primary}33`,
                          "&:hover": {
                            background: `linear-gradient(90deg, ${primary}, ${primary})`,
                            boxShadow: `0 10px 22px ${primary}59`,
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