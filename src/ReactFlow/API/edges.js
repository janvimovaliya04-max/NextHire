const initialEdges = [
    {
        id: "e1",
        source: "api-start",
        target: "recruiters-page",
        type: "smoothstep",
    },

    {
        id: "e2",
        source: "recruiters-page",
        target: "add-recruiter",
        label: "Add",
        type: "smoothstep",
    },

    {
        id: "e3",
        source: "add-recruiter",
        target: "recruiter-form",
        label: "Fill Form",
        type: "smoothstep",
    },

    {
        id: "e4",
        source: "recruiter-form",
        target: "post-recruiter",
        label: "Submit",
        type: "smoothstep",
    },

    {
        id: "e5",
        source: "post-recruiter",
        target: "recruiter-created",
        type: "smoothstep",
    },

    {
        id: "e6",
        source: "recruiter-created",
        target: "get-recruiters",
        label: "Fetch",
        type: "smoothstep",
    },

    {
        id: "e7",
        source: "get-recruiters",
        target: "recruiter-displayed",
        type: "smoothstep",
    },

    {
        id: "e8",
        source: "recruiter-displayed",
        target: "edit-recruiter",
        label: "Edit",
        type: "smoothstep",
    },

    {
        id: "e9",
        source: "recruiter-displayed",
        target: "update-status",
        label: "Status",
        type: "smoothstep",
    },

    {
        id: "e10",
        source: "recruiter-displayed",
        target: "delete-recruiter",
        label: "Delete",
        type: "smoothstep",
    },
];

export default initialEdges;