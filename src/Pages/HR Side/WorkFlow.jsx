import HRLayout from "../../Layouts/HRLayout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function WorkFlow() {

    return (
        <HRLayout>
            <Button
                component={Link}
                to="/react-flow/api"
                size="small"
                sx={{
                    px: { xs: 1.5, md: 2.2 },
                    fontSize: { xs: ".75rem", md: ".82rem" },
                    py: 0.8,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                }}
            >
                API Workflow
            </Button>

            <Button
                component={Link}
                to="/react-flow/anti-cheating"
                size="small"
                sx={{
                    px: { xs: 1.5, md: 2.2 },
                    fontSize: { xs: ".75rem", md: ".82rem" },
                    py: 0.8,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                }}
            >
                Anti-Cheating Workflow
            </Button>

            <Button
                component={Link}
                to="/react-flow/custom-table"
                size="small"
                sx={{
                    px: { xs: 1.5, md: 2.2 },
                    fontSize: { xs: ".75rem", md: ".82rem" },
                    py: 0.8,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                }}
            >
                custom-table Workflow
            </Button>

            <Button
                component={Link}
                to="/react-flow/calendar"
                size="small"
                sx={{
                    px: { xs: 1.5, md: 2.2 },
                    fontSize: { xs: ".75rem", md: ".82rem" },
                    py: 0.8,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                }}
            >
                Calendar Workflow
            </Button>

            <Button
                component={Link}
                to="/react-flow/analytics-charts"
                size="small"
                sx={{
                    px: { xs: 1.5, md: 2.2 },
                    fontSize: { xs: ".75rem", md: ".82rem" },
                    py: 0.8,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                }}
            >
                Analytics-Chart Workflow
            </Button>

            <Button
                component={Link}
                to="/react-flow/notes"
                size="small"
                sx={{
                    px: { xs: 1.5, md: 2.2 },
                    fontSize: { xs: ".75rem", md: ".82rem" },
                    py: 0.8,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                }}
            >
                Notes Workflow
            </Button>

        </HRLayout>
    )
}