import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PortalSection from "../components/PortalSection";
import FeatureSection from "../components/FeatureSection";
import StatisticsSection from "../components/StatisticsSection";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Container } from '@mui/material';

import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CodeIcon from "@mui/icons-material/Code";
import VideocamIcon from "@mui/icons-material/Videocam";
import BarChartIcon from "@mui/icons-material/BarChart";

import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function LandingNew() {
  const { darkMode, setDarkMode } = useTheme();

  // Anchor reference for smooth scrolling
  const rolesSectionRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.restorePortal) {
      setTimeout(() => {
        rolesSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location]);

  const pageBg = darkMode ? "#0b0f19" : "#f8fafc";
  const textColor = darkMode ? "#ffffff" : "#0f172a";
  const subText = darkMode ? "#94a3b8" : "#475569";
  const pageTransition =
    "background-color .45s ease, background .45s ease, color .45s ease, border-color .45s ease, box-shadow .45s ease";

  const roles = [
    {
      title: "HR Manager",
      icon: <BadgeIcon sx={{ fontSize: 32, color: "#2563eb" }} />,
      avatarBg: darkMode ? "rgba(37, 99, 235, 0.15)" : "#eff6ff",
      accentColor: "#2563eb",
      desc: "Manage job postings, review applications, shortlist candidates, and streamline the entire hiring process.",
      link: "/login?role=hr",
    },
    {
      title: "Candidate",
      icon: <PersonIcon sx={{ fontSize: 32, color: "#10b981" }} />,
      avatarBg: darkMode ? "rgba(16, 185, 129, 0.15)" : "#ecfdf5",
      accentColor: "#10b981",
      desc: "Explore opportunities, apply for jobs, track applications, and manage interviews in one place.",
      link: "/login?role=candidate",
    },
    {
      title: "Interviewer",
      icon: <GroupsIcon sx={{ fontSize: 32, color: "#8b5cf6" }} />,
      avatarBg: darkMode ? "rgba(139, 92, 246, 0.15)" : "#f5f3ff",
      accentColor: "#8b5cf6",
      desc: "Conduct interviews, evaluate candidates and submit feedback, and support hiring decisions.",
      link: "/login?role=interviewer",
    },
  ];

  const features = [
    {
      icon: <CalendarMonthIcon sx={{ fontSize: 26 }} />,
      title: "Interview Scheduling",
      desc: "Easily manage interviews and candidate availability.",
      color: "#2563eb",
    },
    {
      icon: <CodeIcon sx={{ fontSize: 26 }} />,
      title: "Coding Assessments",
      desc: "Conduct coding tests and evaluate technical skills.",
      color: "#10b981",
    },
    {
      icon: <VideocamIcon sx={{ fontSize: 26 }} />,
      title: "Video Interviews",
      desc: "Seamless virtual interviews with candidates.",
      color: "#8b5cf6",
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 26 }} />,
      title: "Recruitment Analytics",
      desc: "Monitor hiring performance through insights.",
      color: "#f59e0b",
    },
  ];

  const stats = [
    {
      icon: <WorkIcon sx={{ fontSize: 36 }} />,
      value: "500+",
      label: "Jobs Posted",
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 36 }} />,
      value: "2000+",
      label: "Candidates Logged",
    },
    {
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 36 }} />,
      value: "1500+",
      label: "Interviews Executed",
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
      value: "800+",
      label: "Successful Offers",
    },
  ];

  const handleGetStarted = () => {
    rolesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionHeadingStyle = {
    fontWeight: 900,
    fontSize: { xs: "1.8rem", md: "2.5rem" },
    letterSpacing: "-0.03em",
    mb: 1,
    background: darkMode
      ? "linear-gradient(135deg, #ffffff 0%, #cbd5e1 55%, #94a3b8 100%)"
      : "linear-gradient(135deg, #0f172a 0%, #2563eb 55%, #7c3aed 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const footerLinkStyle = {
    textDecoration: "none",
    color: darkMode ? "#94a3b8" : "#475569",
    fontSize: "0.85rem",
    transition: "color .3s ease",
  };

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("landingScroll");

    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo({
          top: Number(savedScroll),
          behavior: "auto",
        });
      }, 50);
    }
  }, []);

  return (

    <Box sx={{ minHeight: "100vh", bgcolor: pageBg, color: textColor }}>

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        textColor={textColor}
      />

      <HeroSection
        darkMode={darkMode}
        pageBg={pageBg}
        subText={subText}
        handleGetStarted={handleGetStarted}
      />

      <Container maxWidth={false} sx={{ width: "90%", maxWidth: "1400px", mx: "auto" }}>

        <PortalSection
          roles={roles}
          darkMode={darkMode}
          textColor={textColor}
          subText={subText}
          sectionHeadingStyle={sectionHeadingStyle}
          rolesSectionRef={rolesSectionRef}
        />

        <FeatureSection
          features={features}
          darkMode={darkMode}
          subText={subText}
          sectionHeadingStyle={sectionHeadingStyle}
        />

        <StatisticsSection
          stats={stats}
          darkMode={darkMode}
          textColor={textColor}
          subText={subText}
          sectionHeadingStyle={sectionHeadingStyle}
        />

      </Container>

      <Footer
        darkMode={darkMode}
        textColor={textColor}
        subText={subText}
        footerLinkStyle={footerLinkStyle}
      />

    </Box>
  );
}