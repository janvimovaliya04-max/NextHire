import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
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
import { useAuth } from "../context/AuthContext";
import useThemeColors from "../hooks/useThemeColors";
import {
  Menu,
  LayoutDashboard,
  CirclePlus,
  Briefcase,
  Users,
  User,
  ClipboardCheck,
  Mic,
  Calendar,
  ChartLine,
  Bell,
  Settings,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

export default function HRLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const { user, logout } = useAuth() || {};
  const colors = useThemeColors();

  // Dynamic HR Admin details from Auth Context with safe fallback
  const hrUser = {
    fullName: user?.name || "HR Admin Manager",
    email: user?.email || "hr@nexthire.com",
  };

  const primary = colors.primary || "#10b981";
  const secondary = colors.secondary || "#34d399";
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  // Scroll main content to top on navigation change
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
    const savedScroll = sessionStorage.getItem("hrSidebarScroll");
    if (savedScroll && sidebarRef.current) {
      sidebarRef.current.scrollTop = Number(savedScroll);
    }
  }, []);

  // Auto-close mobile menu on desktop screen resize
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
      sessionStorage.setItem("hrSidebarScroll", sidebarRef.current.scrollTop);
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
    localStorage.removeItem("hr");
    navigate("/login?role=hr");
  };

  // Grouped Navigation configuration
  const navGroups = [
    {
      title: "Overview",
      items: [
        { path: "/hr", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { path: "/hr/analytics", label: "Analytics", icon: <ChartLine size={18} /> },
      ],
    },
    {
      title: "Job Openings",
      items: [
        { path: "/hr/create-job", label: "Create Job", icon: <CirclePlus size={18} /> },
        { path: "/hr/job-management", label: "Job Management", icon: <Briefcase size={18} /> },
      ],
    },
    {
      title: "Candidates",
      items: [
        { path: "/hr/candidates", label: "Candidates", icon: <Users size={18} /> },
        { path: "/hr/candidate-feedback", label: "Feedback", icon: <ClipboardCheck size={18} /> },
      ],
    },
    {
      title: "Assessments & Interviews",
      items: [
        { path: "/hr/create-assessment", label: "Create Assessment", icon: <ClipboardCheck size={18} /> },
        { path: "/hr/interview-management", label: "Interview Management", icon: <Mic size={18} /> },
        { path: "/hr/interview-schedule", label: "Interview Scheduling", icon: <Calendar size={18} /> },
        { path: "/hr/recruiters", label: "Recruiters", icon: <Users size={18} /> },
      ],
    },
    {
      title: "Account",
      items: [
        { path: "/hr/notes", label: "Keep Notes", icon: <Menu size={18} /> },
        { path: "/hr/settings", label: "Settings", icon: <Settings size={18} /> },
      ],
    },
  ];

  // Pathname header title resolver
  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case "/hr": return "Dashboard Overview";
      case "/hr/create-job": return "Create New Job";
      case "/hr/job-management": return "Job Postings";
      case "/hr/candidates": return "Candidates Directory";
      case "/hr/create-assessment": return "Custom Assessment";
      case "/hr/interview-management": return "Interview Rounds";
      case "/hr/interview-schedule": return "Interview Scheduling";
      case "/hr/analytics": return "Hiring Analytics";
      case "/hr/notifications": return "Notification Hub";
      case "/hr/settings": return "System Configuration";
      case "/hr/candidate-feedback": return "Candidate Feedback";
      case "/hr/recruiters": return "Assigned Recruiters";
      case "/hr/hr-profile": return "HR Admin Profile";
      case "/hr/notes": return "Keep Notes";
      default: return "HR Control Center";
    }
  };

  // Nav link styling helper
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
      className="h-screen flex flex-col md:flex-row overflow-hidden font-sans"
      style={{
        backgroundColor: colors.background,
        color: textColor,
      }}
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
          backgroundColor: colors.card,
          borderColor: borderStyle,
          color: textColor,
        }}
      >
        {/* Brand Header */}
        <div
          className="mb-6 px-2 py-3 border-b border-dashed"
          style={{ borderColor: borderStyle }}
        >
          <div className="flex items-center gap-3">
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.5rem",
                lineHeight: 1.1,
                color: textColor,
              }}
            >
              HR Admin Space
            </Typography>
          </div>
        </div>

        {/* Grouped Sidebar Items */}
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
                    <span className="text-[1.05rem] opacity-80">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          {/* Mobile Sidebar Quick Actions */}
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
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>Theme</span>
            </button>
            <Link
              to="/hr/hr-profile"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ color: textColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primary}14`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </div>
        </div>

        {/* Footer Admin User Card */}
        <div
          className="shrink-0 border-t pt-3 pb-2 px-2"
          style={{ borderColor: borderStyle }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: `linear-gradient(135deg,${primary},${secondary || primary})` }}
            >
              {hrUser.fullName?.charAt(0)?.toUpperCase() || "H"}
            </div>
            <div className="overflow-hidden">
              <h5 className="font-semibold text-sm truncate" style={{ color: textColor }}>
                {hrUser.fullName}
              </h5>
              <p className="text-xs truncate" style={{ color: subText }}>
                {hrUser.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleOpenLogoutModal}
            className="md:hidden w-full flex items-center justify-center gap-2 text-red-500 py-2 px-1 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
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

      {/* Main Content Area */}
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
              <Menu size={20} />
            </button>
            <Link
              to="/hr/notifications"
              className="relative p-2 rounded-lg border"
              style={{
                borderColor: borderStyle,
                backgroundColor: colors.input,
                color: textColor,
              }}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
            </Link>
          </div>
          <div>
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
                fontSize: { xs: "1.25rem", md: "1.75rem" },
                color: textColor,
              }}
            >
              {getCurrentPageTitle()}
            </Typography>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border transition-all duration-200"
              style={{
                backgroundColor: colors.input,
                color: primary,
                borderColor: borderStyle,
              }}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications Alert */}
            <Link
              to="/hr/notifications"
              className="p-2.5 rounded-xl border relative transition-all duration-200"
              style={{
                backgroundColor: colors.input,
                color: primary,
                borderColor: borderStyle,
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
              sx={{ borderColor: borderStyle }}
            />

            {/* Profile Link */}
            <Tooltip title="HR Profile">
              <Link
                to="/hr/hr-profile"
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 border-white shadow-md hover:scale-105 text-white"
                style={{ background: `linear-gradient(135deg,${primary},${secondary || primary})` }}
              >
                {hrUser.fullName?.charAt(0)?.toUpperCase() || "H"}
              </Link>
            </Tooltip>

            {/* Logout Trigger */}
            <button
              onClick={handleOpenLogoutModal}
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

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutModal}
        onClose={handleCloseLogoutModal}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "8px",
            backgroundColor: colors.card,
            color: textColor,
            maxWidth: "400px",
            width: "100%",
            border: `1px solid ${borderStyle}`,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.2rem", color: textColor }}>
          Confirm Logout
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ color: subText, fontSize: "0.95rem" }}>
            Are you sure you want to log out of NextHire HR Admin Space?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: "12px 20px" }}>
          <Button
            onClick={handleCloseLogoutModal}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: subText,
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