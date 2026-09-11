const initialEdges = [
    {
        id: "e1",
        source: "hr-portal",
        target: "analytics-dashboard",
        type: "smoothstep",
    },
    {
        id: "e2",
        source: "analytics-dashboard",
        target: "time-period",
        type: "smoothstep",
        label: "Select Period",
    },
    {
        id: "e3",
        source: "time-period",
        target: "selected-data",
        type: "smoothstep",
        label: "Load Data",
    },
    {
        id: "e4",
        source: "selected-data",
        target: "statistics",
        type: "smoothstep",
        label: "Update Stats",
    },
    {
        id: "e5",
        source: "selected-data",
        target: "charts",
        type: "smoothstep",
        label: "Prepare Charts",
    },
    {
        id: "e6",
        source: "charts",
        target: "area-chart",
        type: "smoothstep",
        label: "Applications & Hires",
    },
    {
        id: "e7",
        source: "charts",
        target: "bar-chart",
        type: "smoothstep",
        label: "Recruitment Funnel",
    },
    {
        id: "e8",
        source: "charts",
        target: "pie-chart",
        type: "smoothstep",
        label: "Acquisition Channels",
    },
    {
        id: "e9",
        source: "statistics",
        target: "analytics-output",
        type: "smoothstep",
    },
    {
        id: "e10",
        source: "area-chart",
        target: "analytics-output",
        type: "smoothstep",
    },
    {
        id: "e11",
        source: "bar-chart",
        target: "analytics-output",
        type: "smoothstep",
    },
    {
        id: "e12",
        source: "pie-chart",
        target: "analytics-output",
        type: "smoothstep",
    },
];

export default initialEdges;