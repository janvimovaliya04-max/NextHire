const initialEdges = [
    {
        id: "e1",
        source: "notes-start",
        target: "notes-page",
        type: "smoothstep",
        animated: true,
    },
    {
        id: "e2",
        source: "notes-page",
        target: "editor",
        type: "smoothstep",
        label: "Open",
    },
    {
        id: "e3",
        source: "editor",
        target: "note-content",
        type: "smoothstep",
        label: "Write / Edit",
    },
    {
        id: "e4",
        source: "note-content",
        target: "formatting",
        type: "smoothstep",
        label: "Format",
    },
    {
        id: "e5",
        source: "note-content",
        target: "templates",
        type: "smoothstep",
        label: "Apply Template",
    },

    {
        id: "e6",
        source: "note-content",
        target: "media",
        type: "smoothstep",
        label: "Insert Media",
    },
    {
        id: "e7",
        source: "note-content",
        target: "tagging",
        type: "smoothstep",
        label: "Tag Employee",
    },
    {
        id: "e8",
        source: "formatting",
        target: "save",
        type: "smoothstep",
    },
    {
        id: "e9",
        source: "templates",
        target: "save",
        type: "smoothstep",
    },
    {
        id: "e10",
        source: "tagging",
        target: "save",
        type: "smoothstep",
    },
    {
        id: "e11",
        source: "media",
        target: "save",
        type: "smoothstep",
    },
    {
        id: "e12",
        source: "save",
        target: "export",
        type: "smoothstep",
        label: "Export",
    },
];

export default initialEdges;