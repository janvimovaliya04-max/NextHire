import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useRef, useEffect, useState } from "react";
import { Typography, Divider, Box } from "@mui/material";
import useThemeColors from "../hooks/useThemeColors";

import {
  FaBars,
  FaTachometerAlt,
  FaPlusCircle,
  FaBriefcase,
  FaUsers,
  FaUser,
  FaFileAlt,
  FaStar,
  FaClipboardCheck,
  FaMicrophone,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaCog,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";

export default function HRLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const colors = useThemeColors();
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Sidebar scroll restoration
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("hrSidebarScroll");
    if (savedScroll && sidebarRef.current) {
      sidebarRef.current.scrollTop = Number(savedScroll);
    }
  }, []);

  const handleSidebarScroll = () => {
    sessionStorage.setItem("hrSidebarScroll", sidebarRef.current.scrollTop);
  };

  const handleLogout = () => {
    setMobileMenu(false);
    localStorage.clear();
    navigate("/login");
  };

  // Dynamic Navigation Groups configuration (Removed Candidate Profile entry)
  const navGroups = [
    {
      title: "Overview",
      items: [
        { path: "/hr", label: "Dashboard", icon: <FaTachometerAlt /> },
        { path: "/analytics", label: "Analytics", icon: <FaChartLine /> },
      ],
    },
    {
      title: "Job Openings",
      items: [
        { path: "/create-job", label: "Create Job", icon: <FaPlusCircle /> },
        { path: "/job-management", label: "Job Management", icon: <FaBriefcase /> },
      ],
    },
    {
      title: "Candidates",
      items: [
        { path: "/candidates", label: "Candidates", icon: <FaUsers /> },
        { path: "/candidate-feedback", label: "Feedback", icon: <FaClipboardCheck /> },
        // <-- REMOVED candidate profile route from here!
      ],
    },
    {
      title: "Assessments & Interviews",
      items: [
        { path: "/create-assessment", label: "Create Assessment", icon: <FaClipboardCheck /> },
        { path: "/interview-management", label: "Interview Management", icon: <FaMicrophone /> },
        { path: "/interview-schedule", label: "Interview Scheduling", icon: <FaCalendarAlt /> },
        { path: "/recruiters", label: "Recruiters", icon: <FaUsers /> },
      ],
    },
    {
      title: "Account",
      items: [
        { path: "/settings", label: "Settings", icon: <FaCog /> },
      ],
    },
  ];

  // Dynamic header titles based on pathname
  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case "/hr": return "Dashboard Overview";
      case "/create-job": return "Create New Job";
      case "/job-management": return "Job Postings ";
      case "/candidates": return "Candidates Directory";
      case "/create-assessment": return " Custom Assessment";
      case "/interview-management": return "Interview Rounds";
      case "/interview-schedule": return "Interview Scheduling";
      case "/analytics": return "Hiring Analytics";
      case "/notifications": return "Notification Hub";
      case "/settings": return "System Configuration";
      case "/candidate-feedback": return "Feedback";
      case "/recruiters": return "Assigned Recruiters";
      default: return "HR Control Center";
    }
  };

  // Upgraded active and hover styles — colors resolved dynamically via inline style,
  // Tailwind classes kept for layout/spacing only
  const getNavLinkStyle = (path) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return {
        backgroundColor: `${primary}1a`,
        color: primary,
        fontWeight: 600,
        borderLeft: `4px solid ${primary}`,
        paddingLeft: "0.625rem",
      };
    }
    return {
      color: subText,
      borderLeft: "4px solid transparent",
      paddingLeft: "0.625rem",
    };
  };

  const handleNavHover = (e, isEntering, path) => {
    const isActive = location.pathname === path;
    if (isActive) return;
    e.currentTarget.style.backgroundColor = isEntering ? `${primary}0f` : "transparent";
    e.currentTarget.style.color = isEntering ? primary : subText;
  };

  return (
    <div
      className="h-screen flex overflow-hidden font-sans flex-col md:flex-row"
      style={{
        backgroundColor: colors.background,
        color: textColor,
      }}
    >
      {/* Sidebar with thin custom scrollbar */}
      <aside
        className={`
    fixed md:static
    top-0 left-0
    z-50
    w-72
    h-screen
    overflow-hidden
    p-3 md:p-5
    border-r
    transition-all duration-300
    flex flex-col

    ${mobileMenu
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"}
  `}
        style={{
          backgroundColor: colors.card,
          borderColor: borderStyle,
          color: textColor,
        }}
      >

        {/* Logo */}
        <div
          className="mb-6 px-2 py-3 border-b border-dashed"
          style={{ borderColor: borderStyle }}
        >
          <div className="flex items-center gap-3">

            <Typography
              sx={{
                fontSize: { xs: "1.35rem", sm: "1.7rem", md: "1.56rem", lg: "1.56rem" },
                mb: { xs: 0, md: 0.5 },
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              HR Admin Space
            </Typography>
          </div>
        </div>

        {/* Grouped Sidebar Navigation */}
        <div
          ref={sidebarRef}
          onScroll={handleSidebarScroll}
          className="flex-1 overflow-y-auto sidebar-scroll pr-2"
        >
          <nav className="space-y-5">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                <h4
                  className="text-[10px] uppercase font-bold tracking-widest px-3 mb-2"
                  style={{ color: subText }}
                >
                  {group.title}
                </h4>

                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    onMouseEnter={(e) => handleNavHover(e, true, item.path)}
                    onMouseLeave={(e) => handleNavHover(e, false, item.path)}
                    className="flex items-center gap-3 p-2.5 rounded-lg text-[0.92rem] transition-all duration-200"
                    style={getNavLinkStyle(item.path)}
                  >
                    <span className="text-[1.05rem] opacity-80">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div
            className="md:hidden mt-3 pt-3 border-t space-y-1"
            style={{ borderColor: borderStyle }}
          >

            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenu(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg"
              style={{ color: textColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primary}14`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              <span>Theme</span>
            </button>

            <Link
              to="/hr-profile"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ color: textColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primary}14`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <FaUser />
              <span>Profile</span>
            </Link>

          </div>

        </div>

        {/* Footer */}
        <div
          className="border-t pt-3 pb-2 px-2 shrink-0"
          style={{ borderColor: borderStyle }}
        >

          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: `linear-gradient(90deg,${primary},${secondary || primary})` }}
            >
              HR
            </div>

            <div className="min-w-0">
              <h5 className="font-semibold text-sm leading-4" style={{ color: textColor }}>
                Admin Manager
              </h5>

              <p className="text-xs leading-4" style={{ color: subText }}>
                hr@nexthire.com
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 text-red-500 py-2 px-1 rounded-lg hover:bg-red-50"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {
        mobileMenu && (

          <div

            onClick={() => setMobileMenu(false)}

            className="
              fixed inset-0
              bg-black/40
              z-40
              md:hidden
              "
          />
        )
      }

      {/* Main Panel */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">

        {/* Topbar Header */}
        <header
          className="min-h-20 px-4 md:px-8 py-3 flex flex-wrap gap-3 justify-between items-center border-b transition-all duration-300 backdrop-blur-md"
          style={{
            backgroundColor: colors.card,
            borderColor: borderStyle,
            color: textColor,
          }}
        >

          <div className="flex items-center gap-2 md:hidden">

            <button
              onClick={() => setMobileMenu(true)}
              className="p-2 rounded-lg border"
              style={{
                borderColor: borderStyle,
                backgroundColor: colors.input,
                color: textColor,
              }}
            >
              <FaBars />
            </button>

            <Link
              to="/notifications"
              className="relative p-2 rounded-lg border"
              style={{
                borderColor: borderStyle,
                backgroundColor: colors.input,
                color: textColor,
              }}
            >
              <FaBell />

              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>

            </Link>

          </div>

          <div>
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
                fontSize: {
                  xs: "1.25rem",
                  md: "2.125rem"
                },
                color: textColor,
              }}
            >
              {getCurrentPageTitle()}
            </Typography>
          </div>

          {/* Topbar Control Elements */}
          <div className="hidden md:flex items-center gap-3.5">

            {/* Theme Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border transition-all duration-200"
              style={{
                backgroundColor: colors.input,
                color: primary,
                borderColor: borderStyle,
              }}
            >
              {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>

            {/* Notifications Button */}
            <Link
              to="/notifications"
              className="p-2.5 rounded-xl border relative transition-all duration-200"
              style={{
                backgroundColor: colors.input,
                color: textColor,
                borderColor: borderStyle,
              }}
            >
              <FaBell size={15} />

            </Link>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: borderStyle }} />

            {/* Profile Action */}
            <Link
              to="/hr-profile"
              className="text-white px-4 py-2 text-sm font-semibold rounded-xl"
              style={{ background: `linear-gradient(90deg,${primary},${secondary || primary})` }}
            >
              <span className="hidden sm:block">
                Profile
              </span>
              <FaUser className="sm:hidden" />
            </Link>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm text-red-500 border-red-500/25 bg-red-500/5 hover:bg-red-500/10 transition"
            >
              <FaSignOutAlt size={14} />
              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          </div>
        </header>

        {/* Scrollable Layout Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: colors.background }}
        >

          <Box
            sx={{
              px: { xs: 2, md: 4 },
              py: { xs: 2, md: 4 },
            }}
          >
            {children}
          </Box>

        </div>
      </main>
    </div>
  );
}