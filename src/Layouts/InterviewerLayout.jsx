import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
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

  const subText = darkMode ? "text-slate-400" : "text-slate-500";

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

  // Upgraded active classes (uses teal )
  const activeClass = (path) => {
    const isActive = location.pathname === path;

    if (isActive) {
      return darkMode
        ? "bg-teal-500/15 text-teal-300 font-semibold shadow-inner border-l-4 border-teal-400 pl-2.5"
        : "bg-teal-50 text-teal-700 font-semibold border-l-4 border-teal-600 pl-2.5";
    }

    return darkMode
      ? "text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-4 border-transparent";
  };

  return (
    <div
      className={`h-screen flex overflow-hidden font-sans ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
        }`}
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

    ${darkMode
            ? "bg-slate-900/90 border-slate-800/80 text-white"
            : "bg-white border-slate-200 text-slate-800"
          }
  `}
      >
        {/* Logo */}
        <div className="mb-6 px-2 py-3 border-b border-dashed border-slate-700/20">
          <div className="flex items-center gap-3">

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.40rem",
                lineHeight: 1.1,
                color: "#14b8a6",
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

          {/* Mobile Theme + Profile */}
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 space-y-1">
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenu(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-teal-500/10"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              <span>Theme</span>
            </button>

            <Link
              to="/interviewer-profile"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-500/10"
            >
              <FaUser />
              <span>Profile</span>
            </Link>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="shrink-0 border-t border-slate-200 pt-2 px-2 pb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              INT
            </div>

            <div className="overflow-hidden flex-1">
              <h5 className="font-semibold text-sm truncate">
                Technical Reviewer
              </h5>

              <p className={`text-xs truncate ${subText}`}>
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
              to="/candidate-notifications"
              className={`relative p-2 rounded-lg border ${darkMode
                ? "border-slate-700 bg-slate-800 text-white"
                : "border-slate-300 bg-white text-slate-700"
                }`}
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
              className={`p-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${darkMode
                ? "bg-slate-800 text-yellow-400 border-slate-700 hover:bg-slate-700"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
            >
              {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>

            {/* Notifications Button */}
            <Link
              to="/interviewer-notifications"
              className={`p-2.5 rounded-xl border relative transition-all duration-200 hover:-translate-y-0.5 ${darkMode
                ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
            >
              <FaBell size={15} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-600 rounded-full"></span>
            </Link>

            <Divider orientation="vertical" variant="middle" flexItem sx={{
              borderColor: darkMode
                ? "rgba(148,163,184,.2)"
                : "rgba(15,23,42,.12)"
            }} />

            {/* Profile Action Link */}
            <Link
              to="/interviewer-profile"
              className="bg-linear-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 text-sm font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition shadow-md shadow-teal-600/10 hover:shadow-teal-600/20"
            >
              <span className="hidden sm:block">
                Profile
              </span>

              <FaUser className="sm:hidden" />
            </Link>

            {/* Logout Action Button */}
            <button
              onClick={handleLogout}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm text-red-500 border-red-500/25 bg-red-500/5 hover:bg-red-500/15 transition`}
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