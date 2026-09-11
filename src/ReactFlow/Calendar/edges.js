const initialEdges = [
    {
        id: "e1",
        source: "calendar-start",
        target: "hr-portal",
        type: "smoothstep",
    },
    {
        id: "e2",
        source: "calendar-start",
        target: "candidate-portal",
        type: "smoothstep",
    },
    {
        id: "e3",
        source: "calendar-start",
        target: "interviewer-portal",
        type: "smoothstep",
    },
    {
        id: "e4",
        source: "hr-portal",
        target: "interview-data",
        type: "smoothstep",
        label: "Open / Load",
    },
    {
        id: "e5",
        source: "candidate-portal",
        target: "interview-data",
        type: "smoothstep",
        label: "Open / Load",
    },
    {
        id: "e6",
        source: "interviewer-portal",
        target: "interview-data",
        type: "smoothstep",
        label: "Open / Load",
    },
    {
        id: "e7",
        source: "interview-data",
        target: "calendar-views",
        type: "smoothstep",
        label: "Create Events",
    },
    {
        id: "e8",
        source: "interview-data",
        target: "filters",
        type: "smoothstep",
        label: "Filter",
    },
    {
        id: "e9",
        source: "filters",
        target: "calendar-views",
        type: "smoothstep",
    },
    {
        id: "e10",
        source: "calendar-views",
        target: "event-details",
        type: "smoothstep",
        label: "Select Event",
    },
];

export default initialEdges;