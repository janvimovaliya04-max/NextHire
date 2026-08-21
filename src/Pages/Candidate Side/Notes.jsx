import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { ResizableImage } from "tiptap-extension-resizable-image";
import "tiptap-extension-resizable-image/styles.css";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CandidateLayout from "../../Layouts/CandidateLayout";
import myinterviews from "../../data/myinterviews.json";
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import Youtube from '@tiptap/extension-youtube';
import { Video } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import {
    Box,
    Button,
    IconButton,
    Container,
    Paper,
    Typography,
    Divider,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Chip
} from "@mui/material";
import {
    Bold,
    Italic,
    Strikethrough,
    Underline as UnderlineIcon,
    Highlighter,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
    Code,
    Undo,
    Redo,
    Save,
    Image as ImageIcon,
    Link as LinkIcon,
    FolderOpen,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Quote,
    Download,
    CheckSquare,
    FileText,
    CloudCheck,
    Cloud,
    AtSign
} from "lucide-react";

export default function NotesEditorPage() {
    // NEW: theme now comes directly from hooks, not from props
    const { darkMode } = useTheme();
    const colors = useThemeColors();

    const primary = colors.primary;
    const secondary = colors.secondary;
    const textColor = colors.text;
    const subText = colors.subText;
    const borderStyle = colors.border;
    const cardColor = colors.card;
    const inputColor = colors.input;
    const shadowColor = colors.shadow;
    const secondaryColor = secondary || primary;

    const [savedStatus, setSavedStatus] = useState(false);
    const [, setForceUpdate] = useState({});

    // Feature 3: Auto-Save & Revision History State
    const [syncStatus, setSyncStatus] = useState("All changes saved");
    const [lastSavedTime, setLastSavedTime] = useState(null);

    // Feature 2: Candidate / Employee Tagging State
    const [mentionAnchorEl, setMentionAnchorEl] = useState(null);
    const [mentionSearch, setMentionSearch] = useState("");

    // Feature 1: Export Menu Anchor
    const [exportAnchorEl, setExportAnchorEl] = useState(null);

    // Feature 5: Templates Menu Anchor
    const [templateAnchorEl, setTemplateAnchorEl] = useState(null);

    // State for Image Dropdown Menu
    const [imageAnchorEl, setImageAnchorEl] = useState(null);
    const fileInputRef = useRef(null);

    // Mock employee list for @ mentions
    const interviews = myinterviews?.filter(interview => interview.status === "Upcoming" || interview.status === "Completed");

    const editor = useEditor({
        extensions: [
            Youtube.configure({
                controls: true,
                nocookie: true,
            }),
            StarterKit,
            Underline,
            Highlight.configure({ multicolor: true }),
            Subscript,
            Superscript,
            TaskList,
            TaskItem.configure({ nested: true }),
            ResizableImage.configure({
                HTMLAttributes: {
                    style: "border-radius: 8px; cursor: pointer;",
                },
            }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: "<p>Start writing HR notes, interview feedback, or meeting summaries here...</p>",
    });

    useEffect(() => {
        if (!editor) return;
        const handler = () => {
            setForceUpdate({});
            // Feature 3: Trigger Auto-Save simulation on change
            setSyncStatus("Unsaved changes...");
            const timer = setTimeout(() => {
                setSyncStatus("All changes saved");
                setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }, 2000);
            return () => clearTimeout(timer);
        };
        editor.on("transaction", handler);
        return () => {
            editor.off("transaction", handler);
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    const handleSave = () => {
        const htmlContent = editor.getHTML();
        console.log("Saved Notes HTML:", htmlContent);
        setSavedStatus(true);
        setSyncStatus("All changes saved");
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setTimeout(() => setSavedStatus(false), 2500);
    };

    // Feature 1: Export Handlers (Word / HTML fallback / Print PDF)
    const handleExportClick = (event) => setExportAnchorEl(event.currentTarget);
    const handleExportClose = () => setExportAnchorEl(null);

    const handleExportWord = () => {
        handleExportClose();
        const content = editor.getHTML();
        const blob = new Blob(['<!DOCTYPE html><html><body>' + content + '</body></html>'], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HR-Notes-Document.doc';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleExportPDF = () => {
        handleExportClose();
        window.print();
    };

    // Feature 5: Templates Handlers
    const handleTemplateClick = (event) => setTemplateAnchorEl(event.currentTarget);
    const handleTemplateClose = () => setTemplateAnchorEl(null);

    const applyTemplate = (type) => {
        handleTemplateClose();
        let templateHtml = "";
        if (type === "tech") {
            templateHtml = `<h3>Technical Interview Feedback</h3><p><strong>Candidate Name:</strong> </p><p><strong>Position:</strong> Software Engineer</p><ul><li><p>Coding & Problem Solving: </p></li><li><p>System Design Knowledge: </p></li><li><p>Communication & Cultural Fit: </p></li></ul><p><strong>Final Verdict:</strong> [Hire / Reject / Hold]</p>`;
        } else if (type === "hr") {
            templateHtml = `<h3>HR Round Feedback</h3><p><strong>Candidate Name:</strong> </p><p><strong>Expected CTC:</strong> </p><p><strong>Notice Period:</strong> </p><ul><li><p>Motivation & Background: </p></li><li><p>Strengths: </p></li><li><p>Areas of Concern: </p></li></ul>`;
        } else if (type === "performance") {
            templateHtml = `<h3>Team Performance Review</h3><p><strong>Employee Name:</strong> </p><p><strong>Review Period:</strong> Q1 / Q2 / Q3 / Q4</p><ul><li><p>Key Achievements: </p></li><li><p>Areas of Improvement: </p></li><li><p>Goals for Next Cycle: </p></li></ul>`;
        }
        editor.chain().focus().setContent(templateHtml).run();
    };

    // Feature 2: Mention Handlers
    const handleInsertMention = (emp) => {
        const nameToInsert = emp.company;
        editor.chain().focus().insertContent(`<span style="background-color: ${primary}20; color: ${primary}; padding: 2px 6px; border-radius: 4px; font-weight: 600;">@${nameToInsert}</span>&nbsp;`).run();
    };

    // Open Image Menu Dropdown
    const handleImageClick = (event) => {
        setImageAnchorEl(event.currentTarget);
    };

    const handleImageClose = () => {
        setImageAnchorEl(null);
    };

    // Option 1: Add Image via URL Prompt
    const handleAddImageByURL = () => {
        handleImageClose();
        const url = window.prompt("Enter image URL:");
        if (url) {
            editor.chain().focus().setResizableImage({ src: url }).run();
        }
    };

    // Option 2: Trigger Local File Explorer
    const handleTriggerFileExplorer = () => {
        handleImageClose();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle File Selection and Convert to Base64
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Src = e.target?.result;
                if (base64Src) {
                    editor.chain().focus().setResizableImage({ src: base64Src }).run();
                }
            };
            reader.readAsDataURL(file);
        }
        event.target.value = "";
    };

    // FIXED: Image Alignment helper for ResizableImage
    const setImageAlignment = (alignment) => {
        try {
            editor.chain().focus().updateAttributes("resizableImage", { align: alignment }).run();
        } catch (e) {
            console.log("Please select an image first", e);
        }
    };

    const activeColor = primary;

    const getToolbarBtnSx = (isActive, isDisabled = false) => ({
        padding: "8px",
        borderRadius: "10px",
        backgroundColor: isActive ? activeColor : inputColor,
        color: isActive ? "#ffffff" : subText,
        opacity: isDisabled ? 0.3 : 1,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isActive ? `0 4px 12px ${activeColor}45` : "none",
        "&:hover": {
            backgroundColor: isActive ? activeColor : `${primary}14`,
            color: isActive ? "#ffffff" : primary,
        },
    });

    // Reference-matching menu paper style
    const menuPaperSx = {
        bgcolor: cardColor,
        color: textColor,
        borderRadius: "12px",
        border: `1px solid ${borderStyle}`,
        mt: 1,
        boxShadow: shadowColor,
    };

    // Reference-matching outlined button style (Templates / Export)
    const outlinedBtnSx = {
        borderColor: borderStyle,
        color: subText,
        fontWeight: 700,
        borderRadius: "10px",
        textTransform: "none",
        px: 2,
        "&:hover": {
            borderColor: primary,
            bgcolor: `${primary}08`,
        }
    };

    return (
        <CandidateLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
                {/* Hidden File Input for Local Explorer */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: "1.35rem", sm: "1.7rem", md: "2rem", lg: "2.2rem" },
                                mb: { xs: 0, md: 0.5 },
                                fontWeight: 850,
                                letterSpacing: "-0.03em",
                                color: textColor,
                            }}
                        >
                            Candidate Notes & Documentation
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                            {/* Feature 3: Sync status indicator */}
                            <Chip
                                icon={syncStatus.includes("saved") ? <Cloud size={14} /> : <CloudCheck size={14} />}
                                label={`${syncStatus} ${lastSavedTime ? `(${lastSavedTime})` : ""}`}
                                size="small"
                                sx={{
                                    bgcolor: inputColor,
                                    color: subText,
                                    border: `1px solid ${borderStyle}`,
                                    fontSize: "0.75rem",
                                    height: "24px"
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                        {/* Feature 5: Templates Button */}
                        <Button
                            variant="outlined"
                            onClick={handleTemplateClick}
                            startIcon={<FileText size={16} />}
                            sx={outlinedBtnSx}
                        >
                            Templates
                        </Button>
                        <Menu
                            anchorEl={templateAnchorEl}
                            open={Boolean(templateAnchorEl)}
                            onClose={handleTemplateClose}
                            PaperProps={{ sx: menuPaperSx }}
                        >
                            <MenuItem onClick={() => applyTemplate("tech")} sx={{ fontSize: "0.9rem" }}>Technical Interview Template</MenuItem>
                            <MenuItem onClick={() => applyTemplate("hr")} sx={{ fontSize: "0.9rem" }}>HR Round Feedback</MenuItem>
                            <MenuItem onClick={() => applyTemplate("performance")} sx={{ fontSize: "0.9rem" }}>Performance Review</MenuItem>
                        </Menu>

                        {/* Feature 1: Export Button */}
                        <Button
                            variant="outlined"
                            onClick={handleExportClick}
                            startIcon={<Download size={16} />}
                            sx={outlinedBtnSx}
                        >
                            Export
                        </Button>
                        <Menu
                            anchorEl={exportAnchorEl}
                            open={Boolean(exportAnchorEl)}
                            onClose={handleExportClose}
                            PaperProps={{ sx: menuPaperSx }}
                        >
                            <MenuItem onClick={handleExportPDF} sx={{ fontSize: "0.9rem" }}>Export as PDF (Print)</MenuItem>
                            <MenuItem onClick={handleExportWord} sx={{ fontSize: "0.9rem" }}>Export as Word (.doc)</MenuItem>
                        </Menu>

                        <Button
                            variant="contained"
                            onClick={handleSave}
                            startIcon={<Save size={18} />}
                            sx={{
                                borderRadius: "10px",
                                fontWeight: 700,
                                textTransform: "none",
                                px: 3,
                                background: `linear-gradient(135deg, ${primary}, ${secondaryColor})`,
                                boxShadow: `0 4px 12px ${primary}33`,
                                transition: ".25s",
                                "&:hover": {
                                    background: `linear-gradient(135deg, ${primary}, ${primary})`,
                                    transform: "translateY(-2px)",
                                    boxShadow: `0 10px 22px ${primary}59`,
                                },
                            }}
                        >
                            {savedStatus ? "Saved!" : "Save Notes"}
                        </Button>
                    </Box>
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: "22px",
                        border: `1px solid ${borderStyle}`,
                        bgcolor: cardColor,
                        backdropFilter: "blur(12px)",
                        overflow: "hidden",
                        boxShadow: shadowColor,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: darkMode
                                ? `0 18px 36px rgba(0,0,0,0.40), 0 8px 12px rgba(0,0,0,0.25)`
                                : `0 20px 40px rgba(15,23,42,0.12), 0 6px 12px rgba(15,23,42,0.08)`,
                        },
                    }}
                >
                    {/* Toolbar Container — FIXED: bgcolor/color now use theme tokens instead of hardcoded rgba */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            p: 1.5,
                            borderBottom: `1px solid ${borderStyle}`,
                            bgcolor: inputColor,
                            alignItems: "center",
                        }}
                    >
                        {/* Formatting Controls */}
                        <IconButton onClick={() => editor.chain().focus().toggleBold().run()} sx={getToolbarBtnSx(editor.isActive("bold"))} title="Bold">
                            <Bold size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().toggleItalic().run()} sx={getToolbarBtnSx(editor.isActive("italic"))} title="Italic">
                            <Italic size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()} sx={getToolbarBtnSx(editor.isActive("underline"))} title="Underline">
                            <UnderlineIcon size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().toggleStrike().run()} sx={getToolbarBtnSx(editor.isActive("strike"))} title="Strikethrough">
                            <Strikethrough size={18} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: borderStyle }} />

                        {/* Lists & Quotes & Feature 4: Checklist Task List */}
                        <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()} sx={getToolbarBtnSx(editor.isActive("bulletList"))} title="Bullet List">
                            <List size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()} sx={getToolbarBtnSx(editor.isActive("orderedList"))} title="Ordered List">
                            <ListOrdered size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().toggleTaskList().run()} sx={getToolbarBtnSx(editor.isActive("taskList"))} title="Action Items Checklist">
                            <CheckSquare size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().toggleBlockquote().run()} sx={getToolbarBtnSx(editor.isActive("blockquote"))} title="Quote">
                            <Quote size={18} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: borderStyle }} />

                        {/* Text Alignment */}
                        <IconButton onClick={() => editor.chain().focus().setTextAlign("left").run()} sx={getToolbarBtnSx(editor.isActive({ textAlign: "left" }))} title="Align Text Left">
                            <AlignLeft size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().setTextAlign("center").run()} sx={getToolbarBtnSx(editor.isActive({ textAlign: "center" }))} title="Align Text Center">
                            <AlignCenter size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().setTextAlign("right").run()} sx={getToolbarBtnSx(editor.isActive({ textAlign: "right" }))} title="Align Text Right">
                            <AlignRight size={18} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: borderStyle }} />

                        {/* Image Movement / Position Controls */}
                        <IconButton onClick={() => setImageAlignment("left")} sx={getToolbarBtnSx(false)} title="Move Image Left">
                            <AlignLeft size={18} />
                        </IconButton>
                        <IconButton onClick={() => setImageAlignment("center")} sx={getToolbarBtnSx(false)} title="Move Image Center">
                            <AlignCenter size={18} />
                        </IconButton>
                        <IconButton onClick={() => setImageAlignment("right")} sx={getToolbarBtnSx(false)} title="Move Image Right">
                            <AlignRight size={18} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: borderStyle }} />

                        {/* Special Tools */}
                        <IconButton onClick={() => editor.chain().focus().toggleHighlight().run()} sx={getToolbarBtnSx(editor.isActive("highlight"))} title="Highlight">
                            <Highlighter size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().toggleSubscript().run()} sx={getToolbarBtnSx(editor.isActive("subscript"))} title="Subscript">
                            <SubscriptIcon size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().toggleSuperscript().run()} sx={getToolbarBtnSx(editor.isActive("superscript"))} title="Superscript">
                            <SuperscriptIcon size={18} />
                        </IconButton>

                        {/* Feature 2: Employee Tagging Button */}
                        <IconButton onClick={(e) => setMentionAnchorEl(e.currentTarget)} sx={getToolbarBtnSx(Boolean(mentionAnchorEl))} title="Tag Employee (@)">
                            <AtSign size={18} />
                        </IconButton>
                        <Menu
                            anchorEl={mentionAnchorEl}
                            open={Boolean(mentionAnchorEl)}
                            onClose={() => setMentionAnchorEl(null)}
                            PaperProps={{
                                sx: {
                                    ...menuPaperSx,
                                    width: "220px"
                                }
                            }}
                            MenuListProps={{
                                sx: {
                                    maxHeight: "190px",
                                    overflowY: "auto",
                                    py: 0
                                }
                            }}
                        >
                            <Typography sx={{
                                px: 2,
                                py: 1,
                                fontSize: "0.75rem",
                                color: subText,
                                fontWeight: 700,
                                position: "sticky",
                                top: 0,
                                bgcolor: cardColor,
                                zIndex: 1
                            }}>
                                SELECT EMPLOYEE TO TAG
                            </Typography>

                            {Array.isArray(myinterviews) && myinterviews.length > 0 ? (
                                myinterviews.map((interview, idx) => (
                                    <MenuItem
                                        key={idx}
                                        onClick={() => { handleInsertMention(interview); setMentionAnchorEl(null); }}
                                        sx={{
                                            fontSize: "0.9rem",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            py: 0.5
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", color: textColor }}>
                                            {interview.company}
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.75rem", color: subText }}>
                                            {interview.position}
                                        </Typography>
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    <Typography sx={{ fontSize: "0.85rem", color: subText }}>No recruiters found</Typography>
                                </MenuItem>
                            )}
                        </Menu>

                        {/* video feature */}

                        <IconButton
                            onClick={() => {
                                const url = window.prompt('Enter YouTube URL:');
                                if (url) {
                                    editor.chain().focus().setYoutubeVideo({ src: url }).run();
                                }
                            }}
                            sx={getToolbarBtnSx(false)}
                            title="Insert Video"
                        >
                            <Video size={18} />
                        </IconButton>

                        {/* Image Dropdown Button */}
                        <IconButton onClick={handleImageClick} sx={getToolbarBtnSx(Boolean(imageAnchorEl))} title="Insert Image">
                            <ImageIcon size={18} />
                        </IconButton>
                        <Menu
                            anchorEl={imageAnchorEl}
                            open={Boolean(imageAnchorEl)}
                            onClose={handleImageClose}
                            PaperProps={{ sx: menuPaperSx }}
                        >
                            <MenuItem onClick={handleAddImageByURL} sx={{ fontSize: "0.9rem", gap: 1.5 }}>
                                <ListItemIcon sx={{ color: textColor, minWidth: "auto" }}><LinkIcon size={16} /></ListItemIcon>
                                <ListItemText>Insert via URL</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleTriggerFileExplorer} sx={{ fontSize: "0.9rem", gap: 1.5 }}>
                                <ListItemIcon sx={{ color: textColor, minWidth: "auto" }}><FolderOpen size={16} /></ListItemIcon>
                                <ListItemText>Upload from Computer</ListItemText>
                            </MenuItem>
                        </Menu>

                        <IconButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} sx={getToolbarBtnSx(editor.isActive("codeBlock"))} title="Code Block">
                            <Code size={18} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: borderStyle }} />

                        {/* Undo / Redo */}
                        <IconButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} sx={getToolbarBtnSx(false, !editor.can().undo())} title="Undo">
                            <Undo size={18} />
                        </IconButton>
                        <IconButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} sx={getToolbarBtnSx(false, !editor.can().redo())} title="Redo">
                            <Redo size={18} />
                        </IconButton>
                    </Box>

                    {/* Editor Content Area */}
                    <Box
                        sx={{
                            p: 3,
                            minHeight: "300px",
                            color: textColor,
                            "& .ProseMirror": {
                                outline: "none",
                                minHeight: "260px",
                                fontSize: "1rem",
                                lineHeight: 1.6,
                                color: textColor,
                            },
                            /* Feature 4: Checklist Task List Styling */
                            "& .ProseMirror ul[data-type='taskList']": {
                                listStyle: "none",
                                padding: 0,
                                "& li": {
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                    marginBottom: "6px",
                                    "& > label": {
                                        flex: "0 0 auto",
                                        userSelect: "none",
                                        marginTop: "3px",
                                    },
                                    "& > div": {
                                        flex: "1 1 auto",
                                    },
                                },
                                "& input[type='checkbox']": {
                                    cursor: "pointer",
                                    accentColor: activeColor,
                                    width: "16px",
                                    height: "16px",
                                },
                            },
                            /* Resizable Image Container & CSS Align Selectors Support */
                            "& .ProseMirror .resizable-image-container": {
                                display: "flex",
                                "&[data-align='left']": { justifyContent: "flex-start" },
                                "&[data-align='center']": { justifyContent: "center" },
                                "&[data-align='right']": { justifyContent: "flex-end" },
                            },
                        }}
                    >
                        <EditorContent editor={editor} />
                    </Box>
                </Paper>
            </Container>
        </CandidateLayout>
    );
}