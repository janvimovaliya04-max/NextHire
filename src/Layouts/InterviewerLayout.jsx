import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import useThemeColors from "../hooks/useThemeColors";
import { useRef, useEffect, useState } from "react";
import { Typography, Divider, Box } from "@mui/material";

import {
  FaHome,
  FaVideo,
  FaLaptopCode,
  FaClipboardCheck,
  FaChartBar,
  FaBell,
  FaBars,
  FaCog,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function InterviewerLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Candidate / Interviewer Settings)
  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subTextColor = colors.subText;
  const borderColor = colors.border;
  const cardColor = colors.card;
  const bgColor = colors.background || (darkMode ? "#020617" : "#f8fafc");

  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("interviewerSidebarScroll");

    if (savedScroll && sidebarRef.current) {
      sidebarRef.current.scrollTop = Number(savedScroll);
    }

    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    });
  }, [location.pathname]);

  const [mobileMenu, setMobileMenu] = useState(false);

  // Sidebar scroll restoration
  const handleSidebarScroll = () => {
    sessionStorage.setItem("interviewerSidebarScroll", sidebarRef.current.scrollTop);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Grouped navigation config for the Interviewer
  const navGroups = [
    {
      title: "Overview",
      items: [
        { path: "/interviewer", label: "Dashboard", icon: <FaHome /> },
      ],
    },
    {
      title: "Interviews",
      items: [
        { path: "/assigned-interviews", label: "Assigned Interviews", icon: <FaVideo /> },
        { path: "/join-interview", label: "Join Interview", icon: <FaLaptopCode /> },
      ],
    },
    {
      title: "Assessments",
      items: [
        { path: "/feedback", label: "Feedback", icon: <FaClipboardCheck /> },
        { path: "/evaluations", label: "Evaluations", icon: <FaChartBar /> },
      ],
    },
    {
      title: "Account & System",
      items: [
        { path: "/interviewer-settings", label: "Settings", icon: <FaCog /> },
      ],
    },

  ];

  // Pathname title resolver
  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case "/interviewer": return " Dashboard";
      case "/assigned-interviews": return " Interviews";
      case "/join-interview": return "Join Interview";
      case "/feedback": return "Feedback";
      case "/evaluations": return "Past Evaluations";
      case "/interviewer-profile": return "My Profile Details";
      default: return " Control Room";
    }
  };

  // Upgraded active row styling (theme primary/secondary driven)
  const activeStyle = (path) => {
    const isActive = location.pathname === path;

    if (isActive) {
      return {
        backgroundColor: `${primary}1f`,
        color: primary,
        fontWeight: 600,
        borderLeft: `4px solid ${primary}`,
        paddingLeft: "10px",
      };
    }

    return {
      color: subTextColor,
      borderLeft: "4px solid transparent",
    };
  };

  return (
    <div
      className="h-screen flex overflow-hidden font-sans"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Sidebar with custom thin scrollbar */}
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
            : "-translate-x-full md:translate-x-0"
          }
  `}
        style={{
          backgroundColor: cardColor,
          borderColor: borderColor,
          color: textColor,
        }}
      >
        {/* Logo */}
        <div
          className="mb-6 px-2 py-3 border-b border-dashed"
          style={{ borderColor: borderColor }}
        >
          <div className="flex items-center gap-3">

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.40rem",
                lineHeight: 1.1,
                color: primary,
              }}
            >
              Interviewer Space
            </Typography>
          </div>
        </div>

        {/* Scrollable Area */}
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
                  style={{ color: subTextColor }}
                >
                  {group.title}
                </h4>

                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-3 p-2.5 rounded-lg text-[0.92rem] transition-all duration-200"
                    style={activeStyle(item.path)}
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

          {/* Mobile Theme + Profile */}
          <div
            className="md:hidden mt-3 pt-3 border-t space-y-1"
            style={{ borderColor: borderColor }}
          >
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenu(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg"
              style={{ color: textColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primary}10`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              <span>Theme</span>
            </button>

            <Link
              to="/interviewer-profile"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ color: textColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primary}10`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <FaUser />
              <span>Profile</span>
            </Link>
          </div>
        </div>

        {/* Fixed Footer */}
        <div
          className="shrink-0 border-t pt-2 px-2 pb-0"
          style={{ borderColor: borderColor }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${primary}, ${secondary || primary})` }}
            >
              INT
            </div>

            <div className="overflow-hidden flex-1">
              <h5 className="font-semibold text-sm truncate" style={{ color: textColor }}>
                Technical Reviewer
              </h5>

              <p className="text-xs truncate" style={{ color: subTextColor }}>
                reviewer@nexthire.com
              </p>
            </div>
          </div>

          {/* Mobile Logout */}
          <button
            onClick={handleLogout}
            className="md:hidden w-full flex items-center gap-2 px-2 py-2 mt-1 rounded-lg text-red-500 hover:bg-red-500/10"
          >
            <FaSignOutAlt />
            <span>Logout</span>
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
            backgroundColor: cardColor,
            borderColor: borderColor,
            color: textColor,
          }}
        >

          <div className="flex items-center gap-2 md:hidden">

            <button
              onClick={() => setMobileMenu(true)}
              className="p-2 rounded-lg border"
              style={{ borderColor: borderColor, backgroundColor: bgColor }}
            >
              <FaBars />
            </button>

            <Link
              to="/candidate-notifications"
              className="relative p-2 rounded-lg border"
              style={{ borderColor: borderColor, backgroundColor: bgColor, color: textColor }}
            >
              <FaBell />

              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>

            </Link>

          </div>

          <div>
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: textColor,

                fontSize: {
                  xs: "1.4rem",
                  sm: "1.7rem",
                  md: "2rem"
                }
              }}
            >
              {getCurrentPageTitle()}
            </Typography>
          </div>

          {/* Topbar Controls */}
          <div className="hidden md:flex items-center gap-3.5">

            {/* Theme switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: bgColor,
                color: darkMode ? "#facc15" : subTextColor,
                borderColor: borderColor,
              }}
            >
              {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>

            {/* Notifications Button */}
            <Link
              to="/interviewer-notifications"
              className="p-2.5 rounded-xl border relative transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: borderColor,
              }}
            >
              <FaBell size={15} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: primary }}
              ></span>
            </Link>

            <Divider orientation="vertical" variant="middle" flexItem sx={{
              borderColor: borderColor,
            }} />

            {/* Profile Action Link */}
            <Link
              to="/interviewer-profile"
              className="text-white px-4 py-2 text-sm font-semibold rounded-xl transition shadow-md"
              style={{
                background: `linear-gradient(90deg, ${primary}, ${secondary || primary})`,
              }}
            >
              <span className="hidden sm:block">
                Profile
              </span>

              <FaUser className="sm:hidden" />
            </Link>

            {/* Logout Action Button */}
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm text-red-500 border-red-500/25 bg-red-500/5 hover:bg-red-500/15 transition"
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
          style={{ backgroundColor: bgColor }}
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