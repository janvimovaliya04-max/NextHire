const initialEdges = [
    {
        id: "e1",
        source: "hr-portal",
        target: "custom-table",
        type: "smoothstep",
    },
    {
        id: "e2",
        source: "custom-table",
        target: "table-data",
        type: "smoothstep",
    },
    {
        id: "e3",
        source: "table-data",
        target: "table-operations",
        type: "smoothstep",
        label: "Manage",
    },
    {
        id: "e4",
        source: "table-operations",
        target: "updated-table",
        type: "smoothstep",
    },
    {
        id: "e5",
        source: "table-operations",
        target: "excel-import",
        type: "smoothstep",
        label: "Import",
    },
    {
        id: "e6",
        source: "excel-import",
        target: "updated-table",
        type: "smoothstep",
    },
    {
        id: "e7",
        source: "updated-table",
        target: "save-export",
        type: "smoothstep",
        label: "Save / Export",
    },
];

export default initialEdges;