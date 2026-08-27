import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import useThemeColors from "../hooks/useThemeColors";
import { useAuth } from "../context/AuthContext";
import { useRef, useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import {
  House,
  Video,
  Laptop,
  ClipboardCheck,
  ChartBar,
  Bell,
  Calendar,
  Menu,
  Settings,
  Sun,
  Moon,
  LogOut,
  User,
} from "lucide-react";

export default function InterviewerLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const { user, logout } = useAuth() || {};
  const colors = useThemeColors();

  // Dynamic Interviewer details from Auth Context with fallback
  const interviewerUser = {
    fullName: user?.name || "Technical Reviewer",
    email: user?.email || "reviewer@nexthire.com",
  };

  const [mobileMenu, setMobileMenu] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  // Theme-driven colors
  const primary = colors.primary || "#10b981";
  const secondary = colors.secondary || "#34d399";
  const textColor = colors.text;
  const subTextColor = colors.subText;
  const borderColor = colors.border;
  const cardColor = colors.card;
  const bgColor = colors.background || (darkMode ? "#020617" : "#f8fafc");

  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  // Scroll main content to top on path change
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

  // Sidebar scroll position restoration
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("interviewerSidebarScroll");
    if (savedScroll && sidebarRef.current) {
      sidebarRef.current.scrollTop = Number(savedScroll);
    }
  }, []);

  // Handle window resize for mobile menu toggle cleanup
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
    if (sidebarRef.current) {
      sessionStorage.setItem("interviewerSidebarScroll", sidebarRef.current.scrollTop);
    }
  };

  const handleOpenLogoutModal = () => {
    setMobileMenu(false);
    setOpenLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    setOpenLogoutModal(false);
    if (logout) logout();
    localStorage.removeItem("interviewer");
    navigate("/login?role=interviewer");
  };

  // Grouped navigation config
  const navGroups = [
    {
      title: "Overview",
      items: [
        { path: "/interviewer", label: "Dashboard", icon: <House size={18} /> },
      ],
    },
    {
      title: "Interviews",
      items: [
        { path: "/interviewer/assigned-interviews", label: "Assigned Interviews", icon: <Video size={18} /> },
        { path: "/interviewer/join-interview", label: "Join Interview", icon: <Laptop size={18} /> },
      ],
    },
    {
      title: "Assessments",
      items: [
        { path: "/interviewer/feedback", label: "Feedback", icon: <ClipboardCheck size={18} /> },
        { path: "/interviewer/evaluations", label: "Evaluations", icon: <ChartBar size={18} /> },
      ],
    },
    {
      title: "Account & System",
      items: [
        { path: "/interviewer/keep-notes", label: "Notes & Documentation", icon: <Menu size={18} /> },
        { path: "/interviewer/interviewer-settings", label: "Settings", icon: <Settings size={18} /> },
      ],
    },
  ];

  // Pathname title resolver
  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case "/interviewer": return "Dashboard";
      case "/interviewer/assigned-interviews": return "Interviews";
      case "/interviewer/join-interview": return "Join Interview";
      case "/interviewer/feedback": return "Feedback";
      case "/interviewer/evaluations": return "Past Evaluations";
      case "/interviewer/interviewer-profile": return "My Profile Details";
      case "/interviewer/interviewer-settings": return "System Settings";
      case "/interviewer/interviewer-notifications": return "Notifications Hub";
      case "/interviewer/keep-notes": return "Notes & Documentation";
      case "/interviewer/interviewer-calendar": return "Interview Schedule Calendar";
      default: return "Control Room";
    }
  };

  // Active navigation row styling
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
      paddingLeft: "10px",
    };
  };

  const handleNavHover = (e, isEntering, path) => {
    const isActive = location.pathname === path;
    if (isActive) return;
    e.currentTarget.style.backgroundColor = isEntering ? `${primary}0f` : "transparent";
    e.currentTarget.style.color = isEntering ? primary : subTextColor;
  };

  return (
    <div
      className="h-screen flex flex-col md:flex-row overflow-hidden font-sans"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Sidebar Navigation */}
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
          ${mobileMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{
          backgroundColor: cardColor,
          borderColor: borderColor,
          color: textColor,
        }}
      >
        {/* Logo Section */}
        <div
          className="mb-6 px-2 py-3 border-b border-dashed"
          style={{ borderColor: borderColor }}
        >
          <div className="flex items-center gap-3">
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.41rem",
                lineHeight: 1.1,
                color: textColor,
              }}
            >
              Interviewer Space
            </Typography>
          </div>
        </div>

        {/* Scrollable Nav Area */}
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
                    onMouseEnter={(e) => handleNavHover(e, true, item.path)}
                    onMouseLeave={(e) => handleNavHover(e, false, item.path)}
                    className="flex items-center gap-3 p-2.5 rounded-lg text-[0.92rem] transition-all duration-200"
                    style={activeStyle(item.path)}
                  >
                    <span className="text-[1.05rem] opacity-80">{item.icon}</span>
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
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>Theme</span>
            </button>
            <Link
              to="/interviewer/interviewer-profile"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ color: textColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primary}10`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </div>
        </div>

        {/* Footer User Info */}
        <div
          className="shrink-0 border-t pt-3 px-2 pb-2"
          style={{ borderColor: borderColor }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${primary}, ${secondary || primary})` }}
            >
              {interviewerUser.fullName?.charAt(0)?.toUpperCase() || "I"}
            </div>
            <div className="overflow-hidden flex-1">
              <h5 className="font-semibold text-sm truncate" style={{ color: textColor }}>
                {interviewerUser.fullName}
              </h5>
              <p className="text-xs truncate" style={{ color: subTextColor }}>
                {interviewerUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenLogoutModal}
            className="md:hidden w-full flex items-center justify-center gap-2 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Main Panel Content */}
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
              aria-label="Open navigation menu"
              className="p-2 rounded-lg border"
              style={{ borderColor: borderColor, backgroundColor: bgColor, color: textColor }}
            >
              <Menu size={20} />
            </button>
            <Link
              to="/interviewer/interviewer-notifications"
              aria-label="View notifications"
              className="relative p-2 rounded-lg border"
              style={{ borderColor: borderColor, backgroundColor: bgColor, color: textColor }}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
            </Link>
          </div>
          <div>
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: textColor,
                fontSize: { xs: "1.25rem", sm: "1.7rem", md: "1.75rem" },
              }}
            >
              {getCurrentPageTitle()}
            </Typography>
          </div>

          {/* Topbar Desktop Controls */}
          <div className="hidden md:flex items-center gap-3.5">

            {/* Interview Schedule Calendar */}
            <Link
              to="/interviewer/interviewer-calendar"
              aria-label="Open interview schedule calendar"
              className="p-2.5 rounded-xl border relative transition-all duration-200"
              style={{
                backgroundColor: colors.input,
                color: primary,
              }}
            >
              <Calendar size={16} />
            </Link>

            {/* Theme switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2.5 rounded-xl border transition-all duration-200"
              style={{
                backgroundColor: bgColor,
                color: primary,
                borderColor: borderColor,
              }}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications Alert */}
            <Link
              to="/interviewer/interviewer-notifications"
              aria-label="View notifications"
              className="p-2.5 rounded-xl border relative transition-all duration-200"
              style={{
                backgroundColor: bgColor,
                color: primary,
                borderColor: borderColor,
              }}
            >
              <Bell size={16} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: primary }}
              ></span>
            </Link>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderColor: borderColor }}
            />

            {/* Profile Link */}
            <Tooltip title="Interviewer Profile">
              <Link
                to="/interviewer/interviewer-profile"
                aria-label="View interviewer profile"
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 border-white shadow-md hover:scale-105 text-white"
                style={{ background: `linear-gradient(135deg, ${primary}, ${secondary || primary})` }}
              >
                {interviewerUser.fullName?.charAt(0)?.toUpperCase() || "I"}
              </Link>
            </Tooltip>

            {/* Logout Action Button */}
            <button
              onClick={handleOpenLogoutModal}
              aria-label="Logout"
              className="p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm text-red-500 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300 cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Route Content */}
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

      {/* Confirmation Modal for Logout */}
      <Dialog
        open={openLogoutModal}
        onClose={handleCloseLogoutModal}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "8px",
            backgroundColor: cardColor,
            color: textColor,
            maxWidth: "400px",
            width: "100%",
            border: `1px solid ${borderColor}`,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.2rem", color: textColor }}>
          Confirm Logout
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ color: subTextColor, fontSize: "0.95rem" }}>
            Are you sure you want to log out of NextHire Interviewer Space?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: "12px 20px" }}>
          <Button
            onClick={handleCloseLogoutModal}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: subTextColor,
              borderRadius: "8px",
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirmLogout}
            variant="contained"
            color="error"
            startIcon={<LogOut size={16} />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              boxShadow: "none",
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}