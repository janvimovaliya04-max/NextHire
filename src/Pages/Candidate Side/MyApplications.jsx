import myapplications from "../../data/myApplications.json";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import CandidateLayout from "../../Layouts/CandidateLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Typography, Paper, Box, Avatar, Chip, Button } from "@mui/material";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Search,
} from "lucide-react";
import SEO from "../../components/common/SEO"; // SEO Component Import Added

export default function MyApplications() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();
  const [activeFilter, setActiveFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

  const primary = colors.primary;
  const secondary = colors.secondary;
  const textColor = colors.text;
  const subText = colors.subText;
  const borderStyle = colors.border;

  const filteredByStatus = useMemo(() =>
    myapplications.filter((a) => activeFilter === "All" || a.status === activeFilter),
    [activeFilter]
  );

  // Headless columns — no visual cells needed, cards render manually below
  const columns = useMemo(() => [
    { accessorKey: "company" },
    { accessorKey: "position" },
    { accessorKey: "status" },
  ], []);

  const table = useReactTable({
    data: filteredByStatus,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const v = filterValue.toLowerCase();
      const a = row.original;
      return (
        a.company.toLowerCase().includes(v) ||
        a.position.toLowerCase().includes(v) ||
        a.status.toLowerCase().includes(v)
      );
    },
  });

  const currentApplications = table.getRowModel().rows.map((row) => row.original);
  const filteredApplications = table.getFilteredRowModel().rows.map((row) => row.original);

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount() || 1;
  const indexOfFirstApplication = table.getState().pagination.pageIndex * table.getState().pagination.pageSize;
  const start = filteredApplications.length === 0 ? 0 : indexOfFirstApplication + 1;
  const end = Math.min(indexOfFirstApplication + table.getState().pagination.pageSize, filteredApplications.length);

  const getStatusChip = (status) => {
    switch (status) {
      case "Shortlisted":
        return (
          <Chip
            label="Shortlisted"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(16, 185, 129, 0.12)",
              color: "#10b981",
              border: "1px solid rgba(16, 185, 129, 0.2)"
            }}
          />
        );
      case "Interviewing":
        return (
          <Chip
            label="Interviewing"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(245, 158, 11, 0.12)",
              color: "#f59e0b",
              border: "1px solid rgba(245, 158, 11, 0.2)"
            }}
          />
        );
      case "Rejected":
        return (
          <Chip
            label="Rejected"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(239, 68, 68, 0.12)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.2)"
            }}
          />
        );
      case "Applied":
        return (
          <Chip
            label="Applied"
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: "rgba(59,130,246,.12)",
              color: "#3b82f6",
              border: "1px solid rgba(59,130,246,.2)"
            }}
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <CandidateLayout>
      {/* Dynamic SEO Tags Injection */}
      <SEO
        title="My Applications"
        description="View and manage your job applications on NextHire."
        canonicalUrl="/candidate/applications"
      />

      {/* Title Header */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          top: 0,
          zIndex: 20,
          p: { xs: 2, md: 3 },
          mb: 1,
          borderRadius: "20px",
          bgcolor: colors.card,
          border: `1px solid ${borderStyle}`,
          boxShadow: colors.shadow,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 3
          }}
        >
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-0.03em",
              color: textColor,
              fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem" },
            }}
          >
            My Applications
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", md: 380 },
              bgcolor: colors.input,
              border: `1px solid ${borderStyle}`,
              borderRadius: "12px",
              px: 2,
              py: 0.2,
              mb: { xs: -2, md: -2 },
              "&:focus-within": {
                borderColor: primary,
                boxShadow: `0 0 0 3px ${primary}1f`,
              },
            }}
          >
            <Search color={subText} />

            <input
              type="text"
              placeholder="Search applications..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                outline: "none",
                background: "transparent",
                color: textColor,
                fontSize: ".9rem",
              }}
            />
          </Box>
        </Box>

        {/* Filter panel */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 4 }}>
          <Box
            sx={{
              gap: 1,
              display: "flex",
              overflowX: "auto",
              flexWrap: { xs: "nowrap", md: "wrap" },
              pb: 1,
              mb: { xs: -2, md: -2 },
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {["All", "Applied", "Shortlisted", "Interviewing", "Rejected"].map((filter) => (
              <Button
                key={filter}
                variant="outlined"
                size="small"
                onClick={() => setActiveFilter(filter)}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 700,
                  mb: { xs: 1, sm: 2, md: -1 },
                  px: { xs: 1.8, sm: 2.5 },
                  py: { xs: .65, sm: .8 },
                  fontSize: { xs: ".78rem", sm: ".85rem" },
                  minWidth: { xs: "calc(50% - 4px)", sm: "auto" },
                  color: activeFilter === filter ? "#fff" : subText,
                  bgcolor: activeFilter === filter ? primary : "transparent",
                  borderColor: activeFilter === filter ? primary : borderStyle,
                  transition: "all .25s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    bgcolor: activeFilter === filter ? (secondary || primary) : `${primary}0d`,
                  },
                }}
              >
                {filter}
              </Button>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Stacked Application Cards */}
      <Box
        sx={{
          height: { xs: "calc(100vh - 235px)", md: "calc(100vh - 255px)" },
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: 8 },
          "&::-webkit-scrollbar-thumb": { background: subText, borderRadius: "20px" },
        }}
      >
        <Paper
          sx={{
            p: { xs: 2, sm: 3, md: 3.5 },
            mb: 2,
            borderRadius: { xs: 3, md: 4 },
            bgcolor: colors.card,
            border: `1px solid ${borderStyle}`,
          }}
        >
          <Typography sx={{ fontWeight: 700, color: subText, mb: 0 }}>
            Total Applications
          </Typography>

          <Typography variant="h4" sx={{ color: primary, fontWeight: 800 }}>
            {myapplications.length}
          </Typography>
        </Paper>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {filteredApplications.length > 0 ? (
            currentApplications.map((job, index) => (
              <Paper
                key={job.applicationId}
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3, md: 3.5 },
                  borderRadius: { xs: 3, md: 5 },
                  bgcolor: colors.card,
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${borderStyle}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: { xs: "none", md: "translateY(-4px)" },
                    borderColor: job.status === "Rejected" ? "rgba(239,68,68,0.3)" : primary,
                    boxShadow: colors.shadow,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", lg: "center" },
                    justifyContent: { xs: "flex-start", lg: "space-between" },
                    gap: { xs: 2.5, md: 4 },
                  }}
                >
                  {/* Left Column: Logo & Role Details */}
                  <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2.5 }, alignItems: "center" }}>
                    <Avatar
                      sx={{
                        width: { xs: 42, sm: 52 },
                        height: { xs: 42, sm: 52 },
                        fontSize: { xs: "1rem", sm: "1.2rem" },
                        bgcolor: job.logoBg,
                        color: job.logoColor,
                        borderRadius: 2.5,
                        fontWeight: 800,
                      }}
                    >
                      {job.company.charAt(0)}
                    </Avatar>

                    <Box>
                      <Typography
                        sx={{
                          color: textColor,
                          fontWeight: 800,
                          letterSpacing: "-.01em",
                          mb: .3,
                          fontSize: { xs: ".95rem", sm: "1.15rem" }
                        }}
                      >
                        {job.company}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: subText, mt: 0.3 }}>
                        Application #{indexOfFirstApplication + index + 1}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: subText }}>
                        <Briefcase size={12} style={{ opacity: 0.8 }} />
                        <Typography sx={{ fontSize: { xs: ".82rem", sm: ".88rem" }, fontWeight: 550 }}>
                          {job.position}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, color: subText }}>
                        <Calendar size={11} style={{ opacity: 0.8 }} />
                        <Typography sx={{ fontSize: { xs: ".75rem", sm: ".8rem" }, fontWeight: 500 }}>
                          Applied on: {job.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Right Column: Status & Action triggers */}
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", lg: "column" }, alignItems: { xs: "stretch", md: "flex-end" }, justifyContent: "space-between", gap: 2.5, borderTop: { xs: `1px solid ${borderStyle}`, md: "none" }, pt: { xs: 2, md: 0 } }}>
                    <Box sx={{ mb: { xs: -2, md: -2 } }}>
                      {getStatusChip(job.status)}
                    </Box>

                    <Typography
                      sx={{
                        color: subText,
                        mt: .5,
                        fontSize: { xs: ".72rem", md: ".75rem" },
                        mb: { xs: -1, md: -2 },
                        textAlign: { xs: "center", md: "right" },
                      }}
                    >
                      Latest Update: {job.status}
                    </Typography>

                    <Button
                      component={Link}
                      to={`/candidate/my-application-job/${job.applicationId}`}
                      variant="contained"
                      endIcon={<ChevronRight size={10} />}
                      sx={{
                        width: { xs: "100%", sm: "auto" },
                        py: { xs: 1.1, md: 1.3 },
                        fontSize: { xs: ".8rem", md: ".85rem" },
                        px: { xs: 1, md: 3 },
                        borderRadius: "10px",
                        fontWeight: 750,
                        textTransform: "none",
                        background: `linear-gradient(135deg, ${primary}, ${secondary || primary})`,
                        boxShadow: `0 4px 10px ${primary}26`,
                        "&:hover": {
                          background: `linear-gradient(135deg, ${primary}, ${primary})`,
                          boxShadow: `0 6px 14px ${primary}40`,
                          transform: "translateY(-1px)",
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Paper>
            ))
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 5, md: 6 },
                borderRadius: { xs: 3, md: 5 },
                bgcolor: colors.card,
                border: `1px solid ${borderStyle}`,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: textColor }}>
                No Applications Yet
              </Typography>

              <Typography sx={{ color: subText, mb: 3 }}>
                You haven't applied for any jobs yet.
              </Typography>

              <Button
                component={Link}
                to="/candidate/browse-jobs"
                variant="contained"
                sx={{ background: `linear-gradient(135deg, ${primary}, ${secondary || primary})` }}
              >
                Browse Jobs
              </Button>
            </Paper>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          mt: { xs: 4, md: 5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
        }}
      >
        <Typography
          sx={{
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: ".85rem", md: ".95rem" },
            color: textColor,
          }}
        >
          Showing {start}–{end} of {filteredApplications.length} applications
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: { xs: "center", md: "flex-end" },
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              minWidth: { xs: 80, sm: 95 },
              fontSize: { xs: ".8rem", md: ".9rem" },
              py: { xs: .8, md: 1 },
              color: subText,
              borderColor: borderStyle,
              "&:hover": { borderColor: primary, color: primary },
            }}
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              px: { xs: 1, md: 2 },
              fontSize: { xs: ".85rem", md: ".95rem" },
              color: textColor,
            }}
          >
            {currentPage} / {totalPages}
          </Typography>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              minWidth: { xs: 80, sm: 95 },
              fontSize: { xs: ".8rem", md: ".9rem" },
              py: { xs: .8, md: 1 },
              color: subText,
              borderColor: borderStyle,
              "&:hover": { borderColor: primary, color: primary },
            }}
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </Box>
      </Box>
    </CandidateLayout>
  );
}