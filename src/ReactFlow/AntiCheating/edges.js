const initialEdges = [
    {
        id: "e1",
        source: "candidate",
        target: "join-interview",
    },
    {
        id: "e2",
        source: "join-interview",
        target: "interview-session",
        type: "smoothstep",
    },
    {
        id: "e3",
        source: "interview-session",
        target: "tab-switch",
        label: "Tab Switch",
        type: "smoothstep",
    },
    {
        id: "e4",
        source: "tab-switch",
        target: "switch-count",
        label: "Detect",
        type: "smoothstep",
    },
    {
        id: "e5",
        source: "switch-count",
        target: "warning",
        label: "1st / 2nd",
    },
    {
        id: "e6",
        source: "switch-count",
        target: "terminate",
        label: "3rd",
    },
    {
        id: "e7",
        source: "terminate",
        target: "redirect",
        label: "Redirect",
        type: "smoothstep",
    },
];

export default initialEdges;