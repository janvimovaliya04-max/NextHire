import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CodeIcon from "@mui/icons-material/Code";
import VideocamIcon from "@mui/icons-material/Videocam";
import BarChartIcon from "@mui/icons-material/BarChart";

export const getRoles = (darkMode) => [
  {
    title: "HR Manager",
    icon: <BadgeIcon sx={{ fontSize: 32, color: "#2563eb" }} />,
    avatarBg: darkMode
      ? "rgba(37,99,235,0.15)"
      : "#eff6ff",
    accentColor: "#2563eb",
    desc:
      "Manage job postings, review applications, shortlist candidates, and streamline the entire hiring process.",
    link: "/login?role=hr",
  },

  {
    title: "Candidate",
    icon: <PersonIcon sx={{ fontSize: 32, color: "#10b981" }} />,
    avatarBg: darkMode
      ? "rgba(16,185,129,0.15)"
      : "#ecfdf5",
    accentColor: "#10b981",
    desc:
      "Explore opportunities, apply for jobs, track applications, and manage interviews in one place.",
    link: "/login?role=candidate",
  },

  {
    title: "Interviewer",
    icon: <GroupsIcon sx={{ fontSize: 32, color: "#8b5cf6" }} />,
    avatarBg: darkMode
      ? "rgba(139,92,246,0.15)"
      : "#f5f3ff",
    accentColor: "#8b5cf6",
    desc:
      "Conduct interviews, evaluate candidates, submit feedback, and support hiring decisions.",
    link: "/login?role=interviewer",
  },
];

export const features = [
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 26 }} />,
    title: "Interview Scheduling",
    desc:
      "Easily manage interviews and candidate availability.",
    color: "#2563eb",
  },

  {
    icon: <CodeIcon sx={{ fontSize: 26 }} />,
    title: "Coding Assessments",
    desc:
      "Conduct coding tests and evaluate technical skills.",
    color: "#10b981",
  },

  {
    icon: <VideocamIcon sx={{ fontSize: 26 }} />,
    title: "Video Interviews",
    desc:
      "Seamless virtual interviews with candidates.",
    color: "#8b5cf6",
  },

  {
    icon: <BarChartIcon sx={{ fontSize: 26 }} />,
    title: "Recruitment Analytics",
    desc:
      "Monitor hiring performance through insights.",
    color: "#f59e0b",
  },
];

export const stats = [
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