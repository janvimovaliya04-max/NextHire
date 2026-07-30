import { useTheme } from "../context/ThemeContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { Typography, Box, Divider, Tooltip } from "@mui/material";
import { useCandidate } from "../context/CandidateContext";

import {
  FaUser,
  FaBars,
  FaTachometerAlt,
  FaSearch,
  FaFileAlt,
  FaClipboardCheck,
  FaCalendarAlt,
  FaBell,
  FaCog,
  FaPaperPlane,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";

export default function CandidateLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const { candidate } = useCandidate();
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }
    });
  }, [location.pathname]);

  const [mobileMenu, setMobileMenu] = useState(false);

  const subText = darkMode ? "text-slate-400" : "text-slate-500";

  // Sidebar scroll restoration
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("candidateSidebarScroll");
    if (savedScroll && sidebarRef.current) {
      sidebarRef.current.scrollTop = Number(savedScroll);
    }
  }, []);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarScroll = () => {
    sessionStorage.setItem("candidateSidebarScroll", sidebarRef.current.scrollTop);
  };

  const handleLogout = () => {
    setMobileMenu(false);
    localStorage.removeItem("candidate");
    navigate("/login");
  };

  // Grouped Navigation configuration for Candidates
  const navGroups = [
    {
      title: "Overview",
      items: [
        { path: "/candidate", label: "Dashboard", icon: <FaTachometerAlt /> },
        { path: "/apply-job/:id", label: "Apply For Job", icon: <FaPaperPlane /> },
      ],
    },
    {
      title: "Jobs & Applications",
      items: [
        { path: "/browse-jobs", label: "Browse Jobs", icon: <FaSearch /> },
        { path: "/my-applications", label: "My Applications", icon: <FaFileAlt /> },
      ],
    },
    {
      title: "Assessments & Interviews",
      items: [
        { path: "/candidate-assessment", label: "Assessments", icon: <FaClipboardCheck /> },
        { path: "/my-interviews", label: "My Interviews", icon: <FaCalendarAlt /> },
      ],
    },
    {
      title: "Settings & System",
      items: [
        { path: "/candidate-settings", label: "Settings", icon: <FaCog /> },
      ],
    },
  ];

  // Pathname title resolver for Topbar
  const getCurrentPageTitle = () => {
    if (location.pathname.startsWith("/apply-job/")) {
      return "Submit Application";
    }
    switch (location.pathname) {
      case "/candidate": return "Candidate Dashboard";
      case "/browse-jobs": return " Job Openings";
      case "/my-applications": return "My Job Applications";
      case "/candidate-assessment": return "Skill Assessments";
      case "/my-interviews": return "Interview Schedule";
      case "/candidate-profile-r": return "Control Center";
      case "/candidate-notifications": return "My Alerts";
      case "/candidate-settings": return "System Configuration";
      case "/apply-job/:id": return "Apply For Job";
      default: return "Candidate Workspace";
    }
  };

  // Upgraded active classes (uses Emerald / Green palette)
  const activeClass = (path) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return darkMode
        ? "bg-emerald-600/10 text-emerald-400 font-semibold shadow-inner border-l-4 border-emerald-500 pl-2.5"
        : "bg-emerald-50 text-emerald-600 font-semibold border-l-4 border-emerald-600 pl-2.5";
    }
    return darkMode
      ? "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border-l-4 border-transparent"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent";
  };


  return (
    <div
      className={`h-screen flex flex-col md:flex-row overflow-hidden font-sans
        ${darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
        }
      `}
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

        {/* Logo & Brand Header */}
        <div className="mb-6 px-2 py-3 border-b border-dashed border-slate-700/20">
          <div className="flex items-center gap-3">


            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.5rem",
                lineHeight: 1.1,
                color: "#10b981",
              }}
            >
              Candidate Space
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
                <h4 className={`text-[10px] uppercase font-bold tracking-widest px-3 mb-2 ${subText}`}>
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
                    <span className="text-[1.05rem] opacity-80">{item.icon}</span>
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
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-500/10"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              <span>Theme</span>
            </button>

            <Link
              to="/candidate-profile-r"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-500/10"
            >
              <FaUser />
              <span>Profile</span>
            </Link>

          </div>
        </div>

        {/* Sidebar Footer - Profile Info */}
        <div className="shrink-0 border-t border-slate-200 pt-3 px-2 pb-2">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              {candidate.fullName?.charAt(0) || "C"}
            </div>
            <div className="overflow-hidden">
              <h5 className="font-semibold text-sm truncate">
                {candidate.fullName || "Candidate"}
              </h5>
              <p className={`text-xs truncate ${subText}`}>
                {candidate.email || "candidate@nexthire.com"}
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
              fixed
              inset-0
              bg-black/40
              z-40
              md:hidden
              "
          />
        )
      }

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">

        {/* Topbar Header */}
        <header
          className={`
            min-h-20
            px-4
            md:px-8
            py-3
            flex
            flex-wrap
            gap-3
            justify-between
            items-center
            border-b
            transition-all
            duration-300
              ${darkMode
              ? "bg-slate-900/40 border-slate-800/80 text-white backdrop-blur-md"
              : "bg-white border-slate-200 text-slate-800"
            }
          `}
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

            {/* Theme switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${darkMode
                ? "bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700"
                : "bg-white text-emerald-600 border-slate-200 hover:bg-emerald-50"
                }`}
            >
              {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>

            {/* Notifications Alert */}
            <Link
              to="/candidate-notifications"
              className={`p-2.5 rounded-xl border relative transition-all duration-200 ${darkMode
                ? "bg-slate-800 text-emerald-300 border-slate-700 hover:bg-slate-700"
                : "bg-white text-emerald-600 border-slate-200 hover:bg-emerald-50"
                }`}
            >
              <FaBell size={15} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full">
              </span>
            </Link>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                display: { xs: "none", sm: "block" },
                borderColor: darkMode
                  ? "rgba(148,163,184,.25)"
                  : "rgba(15,23,42,.08)"
              }}
            />

            {/* Profile Action Link - Emerald style */}
            <Tooltip title="My Profile">
              <Link
                to="/candidate-profile-r"
                className={`
    w-10
    h-10
    rounded-full
    flex
    items-center
    justify-center
    font-bold
    text-sm
    transition-all
    duration-300
    border-2 border-white shadow-md
    hover:scale-105
    ${darkMode
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                  }
  `}
              >
                {candidate.fullName?.charAt(0)?.toUpperCase() || "C"}
              </Link>

            </Tooltip>

            {/* Logout Action Button */}
            <button
              onClick={handleLogout}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm text-red-500 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300`}
            >
              <FaSignOutAlt size={14} />
              <span className="hidden sm:inline">Logout</span>
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