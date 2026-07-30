import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useRef, useEffect, useState } from "react";
import { Typography, Divider, Box } from "@mui/material";

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
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const subText = darkMode ? "text-slate-400" : "text-slate-500";

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

  // Dynamic Navigation Groups configuration
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

  // Upgraded active and hover styles
  const activeClass = (path) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return darkMode
        ? "bg-blue-600/10 text-blue-400 font-semibold shadow-inner border-l-4 border-blue-500 pl-2.5"
        : "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600 pl-2.5";
    }
    return darkMode
      ? "text-slate-400 hover:bg-blue-600/10 hover:text-blue-300 border-l-4 border-transparent"
      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent";
  };

  return (
    <div
      className={`h-screen flex overflow-hidden font-sans flex-col md:flex-row ${darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-50 text-slate-900"
        }`}
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

    ${darkMode
            ? "bg-slate-900/90 border-slate-800/80 text-white"
            : "bg-white border-slate-200 text-slate-800"}
  `}
      >

        {/* Logo */}
        <div className="mb-6 px-2 py-3 border-b border-dashed border-slate-700/20">
          <div className="flex items-center gap-3">

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.56rem",
                lineHeight: 1.1,
                color: "#2563eb",
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
                  className={`text-[10px] uppercase font-bold tracking-widest px-3 mb-2 ${subText}`}
                >
                  {group.title}
                </h4>

                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg text-[0.92rem] transition-all duration-200 ${activeClass(
                      item.path
                    )}`}
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

          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 space-y-1">

            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenu(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500/10"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              <span>Theme</span>
            </button>

            <Link
              to="/hr-profile"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500/10"
            >
              <FaUser />
              <span>Profile</span>
            </Link>

          </div>



        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-3 pb-2 px-2 shrink-0">

          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold text-sm">
              HR
            </div>

            <div className="min-w-0">
              <h5 className="font-semibold text-sm leading-4">
                Admin Manager
              </h5>

              <p className={`text-xs leading-4 ${subText}`}>
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
          className={`min-h-20 px-4 md:px-8 py-3 flex flex-wrap gap-3 justify-between items-center border-b transition-all duration-300 ${darkMode
            ? "bg-slate-900/40 border-slate-800/80 text-white backdrop-blur-md"
            : "bg-white border-slate-200 text-slate-800"
            }`}
        >

          <div className="flex items-center gap-2 md:hidden">

            <button
              onClick={() => setMobileMenu(true)}
              className={`p-2 rounded-lg border ${darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-300 bg-white"
                }`}
            >
              <FaBars />
            </button>

            <Link
              to="/notifications"
              className={`relative p-2 rounded-lg border ${darkMode
                ? "border-slate-700 bg-slate-800 text-white"
                : "border-slate-300 bg-white text-slate-700"
                }`}
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
                }
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
              className={`p-2.5 rounded-xl border transition-all duration-200 ${darkMode
                ? "bg-slate-800 text-blue-400 border-slate-700 hover:bg-blue-900/30"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50"
                }`}
            >
              {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>

            {/* Notifications Button */}
            <Link
              to="/notifications"
              className={`p-2.5 rounded-xl border relative transition-all duration-200 ${darkMode
                ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-blue-900/30"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50"
                }`}
            >
              <FaBell size={15} />

            </Link>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.5)" }} />

            {/* Profile Action */}
            <Link
              to="/hr-profile"
              className="bg-[#2563EB] text-white px-4 py-2 text-sm font-semibold rounded-xl"
            >
              <span className="hidden sm:block">
                Profile
              </span>
              <FaUser className="sm:hidden" />
            </Link>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm text-red-500 border-red-500/25 bg-red-500/5 hover:bg-red-500/10 transition`}
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
          className={`flex-1 overflow-y-auto
        ${darkMode ? "bg-slate-950" : "bg-slate-50"}
    `}
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