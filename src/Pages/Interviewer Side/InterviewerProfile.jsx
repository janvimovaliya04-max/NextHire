import { Link } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Paper,
  Avatar,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
} from "@mui/material";

export default function InterviewerProfile() {
  const { darkMode } = useTheme();

  const textFieldStyle = {
    "& .MuiInputLabel-root": {
      color: darkMode ? "#cbd5e1" : "#64748b",
    },
    "& input": {
      cursor: "default",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      fontSize: {
        xs: ".9rem",
        md: "1rem"
      },
      color: "#14b8a6",
    },
    "& .MuiOutlinedInput-root": {
      mb: {
        xs: 1,
        sm: 1.5,
        md: 2,
      },
      height: {
        xs: 52,
        md: 56
      },
      color: darkMode ? "#ffffff" : "#0f172a",
      "& fieldset": {
        borderColor: darkMode ? "#475569" : "#cbd5e1",
        borderRadius: "12px",
      },
      "&:hover fieldset": {
        borderColor: "#14b8a6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#14b8a6",
      },
      backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    },
  };

  const statCardStyle = {
    borderRadius: 5,
    textAlign: "center",
    bgcolor: darkMode
      ? "rgba(30,41,59,.35)"
      : "rgba(255,255,255,.85)",

    backdropFilter: "blur(10px)",

    border: `1.5px solid ${darkMode
      ? "rgba(148,163,184,.22)"
      : "rgba(0,0,0,.08)"
      }`,
    color: darkMode ? "#ffffff" : "#0f172a",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {

      transform: "translateY(-6px)",

      borderColor: "#14b8a6",

      boxShadow: darkMode
        ? "0 18px 35px rgba(20,184,166,.18)"
        : "0 18px 35px rgba(20,184,166,.12)"
    }
  };

  return (
    <InterviewerLayout>


      <Typography
        sx={{
          fontWeight: 850,
          letterSpacing: "-0.03em",
          fontSize: {
            xs: "1.35rem",
            sm: "1.8rem",
            md: "2.3rem",
          },
          mb: {
            xs: 2,
            sm: 3,
            md: 5,
          },
          color: darkMode ? "#fff" : "#0f172a",
        }}
      >
        Profile
      </Typography>



      {/* Profile Header Card */}
      <Paper
        elevation={6}
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          borderRadius: 5,
          bgcolor: darkMode
            ? "#1e293b"
            : "#ffffff",

          backdropFilter: "blur(10px)",

          border: `1px solid ${darkMode
            ? "#334155"
            : "#e2e8f0"
            }`,
          color: darkMode ? "#ffffff" : "#0f172a",
          transition: "transform 0.3s, box-shadow 0.3s",
          transition: "all .3s ease",
          "&:hover": {
            boxShadow: darkMode
              ? "0 16px 35px rgba(0,0,0,.4)"
              : "0 16px 35px rgba(0,0,0,.08)",
            transform: "translateY(-4px)",
            boxShadow: 10,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              textAlign: { xs: "center", sm: "left" },
              gap: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <Avatar
              sx={{
                width: {
                  xs: 80,
                  sm: 90,
                  md: 100,
                },

                height: {
                  xs: 80,
                  sm: 90,
                  md: 100,
                },
                background: "linear-gradient(135deg,#14b8a6,#0f766e)",
                boxShadow: "0 10px 25px rgba(20,184,166,.3)",
                border: `4px solid ${darkMode ? "rgba(30,41,59,0.9)" : "#ffffff"}`,
                fontSize: "2.25rem",
                fontWeight: 800,
              }}
            >
              RS
            </Avatar>
            <Box>
              <Typography
                fontWeight={800}
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-.03em",

                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.8rem",
                    md: "2rem"
                  }
                }}
              >
                Rahul Sharma
              </Typography>
              <Typography
                sx={{
                  color: "#14b8a6",
                  fontWeight: 600,
                  fontSize: {
                    xs: ".9rem",
                    md: "1rem"
                  }
                }}
              >
                Senior Technical Interviewer
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row"
              },
              gap: 2,
              width: {
                xs: "100%",
                md: "auto"
              },
            }}
          >
            <Button
              component={Link}
              to="/edit-interviewer-profile"
              variant="contained"
              sx={{
                background: "linear-gradient(90deg,#14b8a6,#0f766e)",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                py: 1.2,
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",

                "&:hover": {
                  background: "linear-gradient(90deg,#0d9488,#115e59)",

                  transform: "translateY(-2px)",

                  boxShadow: "0 8px 20px rgba(20,184,166,.35)"
                },

              }}
            >
              Edit Profile
            </Button>

            <Button
              component={Link}
              to="/interviewer-notifications"
              variant="text"
              sx={{
                color: "#14b8a6",

                fontWeight: 700,

                borderRadius: 3,

                bgcolor: darkMode
                  ? "rgba(20,184,166,.12)"
                  : "rgba(20,184,166,.08)",

                "&:hover": {
                  bgcolor: darkMode
                    ? "rgba(20,184,166,.20)"
                    : "rgba(20,184,166,.14)"
                }
              }}
            >
              Notifications
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Professional Information */}
      <Paper
        elevation={6}
        sx={{
          mt: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          p: {
            xs: 2,
            sm: 3,
            md: 4
          },
          borderRadius: 5,
          bgcolor: darkMode
            ? "#1e293b"
            : "#ffffff",

          backdropFilter: "blur(10px)",

          border: `1px solid ${darkMode
            ? "#334155"
            : "#e2e8f0"
            }`,
          color: darkMode ? "#ffffff" : "#0f172a",
          transition: "all .25s ease",

          "&:hover": {
            transform: "translateY(-6px)",

            boxShadow: darkMode
              ? "0 18px 35px rgba(0,0,0,.35)"
              : "0 18px 35px rgba(0,0,0,.08)",

          },
        }}
      >
        <Typography sx={{
          fontWeight: 800,

          fontSize: {
            xs: "1.1rem",
            md: "1.25rem"
          },

          mb: {
            xs: 2,
            sm: 3,
            md: 4,
          }
        }}>
          Professional Information
        </Typography>

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2,1fr)"
            },

            gap: {
              xs: 1,
              sm: 2,
              md: 3,
            },
          }}
        >
          <TextField

            label="Email"
            value="rahul@nexthire.com"
            sx={textFieldStyle}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />

          <TextField
            label="Experience"
            value="8 Years"
            sx={textFieldStyle}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />

          <TextField
            label="Specialization"
            value="Frontend & React"
            sx={textFieldStyle}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />

          <TextField
            label="Interviews Conducted"
            value="150+"
            sx={textFieldStyle}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
        </Box>
      </Paper>

    </InterviewerLayout>
  );
}