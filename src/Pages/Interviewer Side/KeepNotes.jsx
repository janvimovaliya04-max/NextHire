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
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import evaluationsData from "../../data/evaluations.json";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import Youtube from "@tiptap/extension-youtube";
import { Video } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import ReactDiffViewer from "react-diff-viewer-continued";

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
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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
    AtSign,
} from "lucide-react";

import SEO from "../../components/common/SEO";

export default function NotesEditorPage() {
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

    // Auto-save & Revision History
    const [syncStatus, setSyncStatus] = useState("All changes saved");
    const [lastSavedTime, setLastSavedTime] = useState(null);
    const [previousNote, setPreviousNote] = useState("");
    const [currentNote, setCurrentNote] = useState("");

    // Clear Saved Notes Dialog
    const [clearDialogOpen, setClearDialogOpen] = useState(false);

    // Employee Tagging
    const [mentionAnchorEl, setMentionAnchorEl] = useState(null);
    const [mentionSearch, setMentionSearch] = useState("");

    // Export Menu
    const [exportAnchorEl, setExportAnchorEl] = useState(null);

    // Templates Menu
    const [templateAnchorEl, setTemplateAnchorEl] = useState(null);

    // Image Menu
    const [imageAnchorEl, setImageAnchorEl] = useState(null);
    const fileInputRef = useRef(null);

    // Mock employee list for @ mentions
    const employeesList = evaluationsData;

    const editor = useEditor({
        editorProps: {
            attributes: {
                role: "textbox",
                "aria-label": "Interviewer notes editor",
                "aria-multiline": "true",
            },
        },

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
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],

        content:
            "<p>Start writing interviewer notes, interview feedback, or meeting summaries here...</p>",
    });

    /*
     * Auto-Save
     *
     * Auto-save stores the latest HTML content and save time,
     * but does NOT change previousNote/currentNote.
     *
     * Revision history is updated only when Save Notes is clicked.
     */
    useEffect(() => {
        if (!editor) return;

        let timer;

        const handler = () => {
            setForceUpdate({});
            setSyncStatus("Unsaved changes...");

            clearTimeout(timer);

            timer = setTimeout(() => {
                const htmlContent = editor.getHTML();

                const savedData = localStorage.getItem(
                    "interviewer_notes_data"
                );

                let previousSavedData = {};

                if (savedData) {
                    try {
                        previousSavedData = JSON.parse(savedData);
                    } catch (error) {
                        console.error(
                            "Failed to read saved interviewer notes:",
                            error
                        );
                    }
                }

                const savedTime = new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                localStorage.setItem(
                    "interviewer_notes_data",
                    JSON.stringify({
                        ...previousSavedData,
                        htmlContent,
                        lastSavedTime: savedTime,
                    })
                );

                setLastSavedTime(savedTime);
                setSyncStatus("All changes saved");
            }, 2000);
        };

        editor.on("transaction", handler);

        return () => {
            editor.off("transaction", handler);
            clearTimeout(timer);
        };
    }, [editor]);

    /*
     * Restore saved notes
     */
    useEffect(() => {
        if (!editor) return;

        const savedData = localStorage.getItem("interviewer_notes_data");

        if (!savedData) return;

        try {
            const data = JSON.parse(savedData);

            if (data.htmlContent) {
                editor.commands.setContent(data.htmlContent);
            }

            setPreviousNote(data.previousNote || "");
            setCurrentNote(data.currentNote || "");
            setLastSavedTime(data.lastSavedTime || null);
            setSyncStatus("All changes saved");
        } catch (error) {
            console.error(
                "Failed to restore interviewer notes:",
                error
            );
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    /*
     * Manual Save
     */
    const handleSave = () => {
        const htmlContent = editor.getHTML();

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;

        const plainText = tempDiv.innerText;

        const savedTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        setPreviousNote(currentNote);
        setCurrentNote(plainText);

        localStorage.setItem(
            "interviewer_notes_data",
            JSON.stringify({
                htmlContent,
                previousNote: currentNote,
                currentNote: plainText,
                lastSavedTime: savedTime,
            })
        );

        setSavedStatus(true);
        setSyncStatus("All changes saved");
        setLastSavedTime(savedTime);

        setTimeout(() => setSavedStatus(false), 2500);
    };

    /*
     * Clear Saved Notes
     */
    const handleClearConfirm = () => {
        localStorage.removeItem("interviewer_notes_data");

        setPreviousNote("");
        setCurrentNote("");
        setLastSavedTime(null);
        setSavedStatus(false);
        setSyncStatus("All changes saved");

        editor.commands.setContent(
            "<p>Start writing interviewer notes, interview feedback, or meeting summaries here...</p>"
        );

        setClearDialogOpen(false);
    };

    /*
     * Export Handlers
     */
    const handleExportClick = (event) => {
        setExportAnchorEl(event.currentTarget);
    };

    const handleExportClose = () => {
        setExportAnchorEl(null);
    };

    const handleExportWord = () => {
        handleExportClose();

        const content = editor.getHTML();

        const blob = new Blob(
            [
                "<!DOCTYPE html><html><body>" +
                content +
                "</body></html>",
            ],
            {
                type: "application/msword",
            }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Interviewer-Notes-Document.doc";
        a.click();

        URL.revokeObjectURL(url);
    };

    const handleExportPDF = () => {
        handleExportClose();
        window.print();
    };

    /*
     * Templates Handlers
     */
    const handleTemplateClick = (event) => {
        setTemplateAnchorEl(event.currentTarget);
    };

    const handleTemplateClose = () => {
        setTemplateAnchorEl(null);
    };

    const applyTemplate = (type) => {
        handleTemplateClose();

        let templateHtml = "";

        if (type === "tech") {
            templateHtml = `<h3>Technical Evaluation Notes</h3>
<p><strong>Candidate Name:</strong> </p>
<p><strong>Target Role:</strong> </p>
<p><strong>Interview Round:</strong> [e.g., L1 Tech / L2 Architecture]</p>
<ul>
<li><p><strong>DSA & Algorithmic Thinking:</strong> </p></li>
<li><p><strong>System Design & Scalability:</strong> </p></li>
<li><p><strong>Code Quality & Clean Code Practices:</strong> </p></li>
<li><p><strong>Framework / Tech Stack Proficiency:</strong> </p></li>
</ul>
<p><strong>Key Strengths:</strong> </p>
<p><strong>Red Flags / Concerns:</strong> </p>
<p><strong>Recommendation Score:</strong> [1-5 Rating]</p>
<p><strong>Final Verdict:</strong> [Strong Hire / Hire / Weak Hire / Reject]</p>`;
        } else if (type === "behavioral") {
            templateHtml = `<h3>Behavioral & Culture Fit Assessment</h3>
<p><strong>Candidate Name:</strong> </p>
<p><strong>Interviewer:</strong> </p>
<ul>
<li><p><strong>Communication & Articulation:</strong> </p></li>
<li><p><strong>Problem Solving & Conflict Resolution:</strong> </p></li>
<li><p><strong>Ownership & Accountability:</strong> </p></li>
<li><p><strong>Teamwork & Alignment with Core Values:</strong> </p></li>
</ul>
<p><strong>Culture Fit Impression:</strong> </p>
<p><strong>Final Recommendation:</strong> [Recommended / Not Recommended]</p>`;
        } else if (type === "coding_debrief") {
            templateHtml = `<h3>Live Coding / Pair Programming Review</h3>
<p><strong>Candidate Name:</strong> </p>
<p><strong>Problem Statement Assigned:</strong> </p>
<ul>
<li><p><strong>Approach & Edge Cases Handled:</strong> </p></li>
<li><p><strong>Time & Space Complexity Awareness:</strong> </p></li>
<li><p><strong>Debugging & Troubleshooting Ability:</strong> </p></li>
</ul>
<p><strong>Code Completion Status:</strong> [Completed / Partially Completed / Failed]</p>
<p><strong>Overall Feedback:</strong> </p>`;
        } else if (type === "panel_debrief") {
            templateHtml = `<h3>Panel Interview Summary & Final Debrief</h3>
<p><strong>Candidate Name:</strong> </p>
<p><strong>Panel Members:</strong> </p>
<p><strong>Consensus Status:</strong> [Aligned / Mixed Opinions / Rejected]</p>
<ul>
<li><p><strong>Technical Competency Summary:</strong> </p></li>
<li><p><strong>Leadership / Seniority Alignment:</strong> </p></li>
</ul>
<p><strong>Next Action Items:</strong> [Proceed to HR / Offer Release / Hold]</p>`;
        }

        editor.chain().focus().setContent(templateHtml).run();
    };

    /*
     * Mention Handlers
     */
    const handleInsertMention = (emp) => {
        const nameToInsert = emp.fullName || emp.name;

        editor
            .chain()
            .focus()
            .insertContent(
                `<span style="background-color: ${primary}20; color: ${primary}; padding: 2px 6px; border-radius: 4px; font-weight: 600;">@${nameToInsert}</span>&nbsp;`
            )
            .run();
    };

    /*
     * Image Menu
     */
    const handleImageClick = (event) => {
        setImageAnchorEl(event.currentTarget);
    };

    const handleImageClose = () => {
        setImageAnchorEl(null);
    };

    /*
     * Add Image via URL
     */
    const handleAddImageByURL = () => {
        handleImageClose();

        const url = window.prompt("Enter image URL:");

        if (url) {
            editor
                .chain()
                .focus()
                .setResizableImage({ src: url })
                .run();
        }
    };

    /*
     * Trigger Local File Explorer
     */
    const handleTriggerFileExplorer = () => {
        handleImageClose();

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    /*
     * Handle File Selection
     */
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64Src = e.target?.result;

                if (base64Src) {
                    editor
                        .chain()
                        .focus()
                        .setResizableImage({
                            src: base64Src,
                        })
                        .run();
                }
            };

            reader.readAsDataURL(file);
        }

        event.target.value = "";
    };

    /*
     * Image Alignment
     */
    const setImageAlignment = (alignment) => {
        try {
            editor
                .chain()
                .focus()
                .updateAttributes("resizableImage", {
                    align: alignment,
                })
                .run();
        } catch (e) {
            console.log("Please select an image first", e);
        }
    };

    const activeColor = primary;

    const getToolbarBtnSx = (
        isActive,
        isDisabled = false
    ) => ({
        padding: {
            xs: "6px",
            sm: "8px",
        },
        borderRadius: "10px",
        backgroundColor: isActive
            ? activeColor
            : inputColor,
        color: isActive
            ? "#ffffff"
            : subText,
        opacity: isDisabled ? 0.3 : 1,
        transition:
            "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isActive
            ? `0 4px 12px ${activeColor}45`
            : "none",
        "&:hover": {
            backgroundColor: isActive
                ? activeColor
                : `${primary}14`,
            color: isActive
                ? "#ffffff"
                : primary,
        },
    });

    const menuPaperSx = {
        bgcolor: cardColor,
        color: textColor,
        borderRadius: "12px",
        border: `1px solid ${borderStyle}`,
        mt: 1,
        boxShadow: shadowColor,
    };

    const outlinedBtnSx = {
        borderColor: borderStyle,
        color: subText,
        fontWeight: 700,
        borderRadius: "10px",
        textTransform: "none",
        px: {
            xs: 1.4,
            sm: 2,
        },
        fontSize: {
            xs: "0.78rem",
            sm: "0.875rem",
        },
        "&:hover": {
            borderColor: primary,
            bgcolor: `${primary}08`,
        },
    };

    return (
        <InterviewerLayout>
            <SEO
                title="Interviewer Notes"
                description="Manage interview notes, candidate evaluations, and interview documentation on NextHire."
                canonicalUrl="/interviewer/notes"
            />

            <Container
                maxWidth="lg"
                sx={{
                    mt: {
                        xs: 2.5,
                        sm: 4,
                    },
                    mb: {
                        xs: 4,
                        sm: 6,
                    },
                    px: {
                        xs: 1.5,
                        sm: 3,
                    },
                }}
            >
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{
                        display: "none",
                    }}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: {
                            xs: 2,
                            sm: 3,
                        },
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.35rem",
                                    sm: "1.7rem",
                                    md: "2rem",
                                    lg: "2.2rem",
                                },
                                mb: {
                                    xs: 0,
                                    md: 0.5,
                                },
                                fontWeight: 850,
                                letterSpacing: "-0.03em",
                                color: textColor,
                            }}
                        >
                            Interviewer Notes & Documentation
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            <Chip
                                icon={
                                    syncStatus ===
                                        "All changes saved" ? (
                                        <CloudCheck size={14} />
                                    ) : (
                                        <Cloud size={14} />
                                    )
                                }
                                label={`${syncStatus} ${lastSavedTime
                                        ? `(${lastSavedTime})`
                                        : ""
                                    }`}
                                size="small"
                                sx={{
                                    bgcolor: inputColor,
                                    color: subText,
                                    border: `1px solid ${borderStyle}`,
                                    fontSize: {
                                        xs: "0.68rem",
                                        sm: "0.75rem",
                                    },
                                    height: {
                                        xs: 22,
                                        sm: 24,
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Header Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: {
                                xs: 1,
                                sm: 1.5,
                            },
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Templates */}
                        <Button
                            variant="outlined"
                            onClick={handleTemplateClick}
                            startIcon={
                                <FileText size={16} />
                            }
                            sx={outlinedBtnSx}
                        >
                            Templates
                        </Button>

                        <Menu
                            anchorEl={templateAnchorEl}
                            open={Boolean(
                                templateAnchorEl
                            )}
                            onClose={handleTemplateClose}
                            PaperProps={{
                                sx: menuPaperSx,
                            }}
                        >
                            <MenuItem
                                onClick={() =>
                                    applyTemplate("tech")
                                }
                                sx={{
                                    fontSize: {
                                        xs: "0.82rem",
                                        sm: "0.9rem",
                                    },
                                }}
                            >
                                Technical Evaluation
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    applyTemplate(
                                        "behavioral"
                                    )
                                }
                                sx={{
                                    fontSize: {
                                        xs: "0.82rem",
                                        sm: "0.9rem",
                                    },
                                }}
                            >
                                Behavioral & Culture Fit
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    applyTemplate(
                                        "coding_debrief"
                                    )
                                }
                                sx={{
                                    fontSize: {
                                        xs: "0.82rem",
                                        sm: "0.9rem",
                                    },
                                }}
                            >
                                Live Coding Review
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    applyTemplate(
                                        "panel_debrief"
                                    )
                                }
                                sx={{
                                    fontSize: {
                                        xs: "0.82rem",
                                        sm: "0.9rem",
                                    },
                                }}
                            >
                                Panel Debrief Summary
                            </MenuItem>
                        </Menu>

                        {/* Export */}
                        <Button
                            variant="outlined"
                            onClick={handleExportClick}
                            startIcon={
                                <Download size={16} />
                            }
                            sx={outlinedBtnSx}
                        >
                            Export
                        </Button>

                        <Menu
                            anchorEl={exportAnchorEl}
                            open={Boolean(
                                exportAnchorEl
                            )}
                            onClose={handleExportClose}
                            PaperProps={{
                                sx: menuPaperSx,
                            }}
                        >
                            <MenuItem
                                onClick={handleExportPDF}
                                sx={{
                                    fontSize: {
                                        xs: "0.82rem",
                                        sm: "0.9rem",
                                    },
                                }}
                            >
                                Export as PDF (Print)
                            </MenuItem>

                            <MenuItem
                                onClick={handleExportWord}
                                sx={{
                                    fontSize: {
                                        xs: "0.82rem",
                                        sm: "0.9rem",
                                    },
                                }}
                            >
                                Export as Word (.doc)
                            </MenuItem>
                        </Menu>

                        {/* Clear Saved Notes */}
                        <Button
                            variant="outlined"
                            onClick={() =>
                                setClearDialogOpen(true)
                            }
                            sx={outlinedBtnSx}
                        >
                            Clear Saved Notes
                        </Button>

                        {/* Save */}
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            startIcon={
                                <Save size={18} />
                            }
                            sx={{
                                borderRadius: "10px",
                                fontWeight: 700,
                                textTransform: "none",
                                px: {
                                    xs: 2,
                                    sm: 3,
                                },
                                fontSize: {
                                    xs: "0.78rem",
                                    sm: "0.875rem",
                                },
                                background: `linear-gradient(135deg, ${primary}, ${secondaryColor})`,
                                boxShadow: `0 4px 12px ${primary}33`,
                                transition: ".25s",
                                "&:hover": {
                                    background: `linear-gradient(135deg, ${primary}, ${primary})`,
                                    transform:
                                        "translateY(-2px)",
                                    boxShadow: `0 10px 22px ${primary}59`,
                                },
                            }}
                        >
                            {savedStatus
                                ? "Saved!"
                                : "Save Notes"}
                        </Button>
                    </Box>
                </Box>

                {/* Editor */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: {
                            xs: "16px",
                            sm: "22px",
                        },
                        border: `1px solid ${borderStyle}`,
                        bgcolor: cardColor,
                        backdropFilter: "blur(12px)",
                        overflow: "hidden",
                        boxShadow: shadowColor,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform:
                                "translateY(-3px)",
                            boxShadow: darkMode
                                ? `0 18px 36px rgba(0,0,0,0.40), 0 8px 12px rgba(0,0,0,0.25)`
                                : `0 20px 40px rgba(15,23,42,0.12), 0 6px 12px rgba(15,23,42,0.08)`,
                        },
                    }}
                >
                    {/* Toolbar */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: {
                                xs: 0.5,
                                sm: 1,
                            },
                            p: {
                                xs: 1,
                                sm: 1.5,
                            },
                            borderBottom: `1px solid ${borderStyle}`,
                            bgcolor: inputColor,
                            alignItems: "center",
                        }}
                    >
                        {/* Formatting */}
                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleBold()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive("bold")
                            )}
                            title="Bold"
                        >
                            <Bold size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleItalic()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "italic"
                                )
                            )}
                            title="Italic"
                        >
                            <Italic size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleUnderline()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "underline"
                                )
                            )}
                            title="Underline"
                        >
                            <UnderlineIcon size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleStrike()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive("strike")
                            )}
                            title="Strikethrough"
                        >
                            <Strikethrough size={18} />
                        </IconButton>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 0.5,
                                borderColor:
                                    borderStyle,
                            }}
                        />

                        {/* Lists */}
                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleBulletList()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "bulletList"
                                )
                            )}
                            title="Bullet List"
                        >
                            <List size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleOrderedList()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "orderedList"
                                )
                            )}
                            title="Ordered List"
                        >
                            <ListOrdered size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleTaskList()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "taskList"
                                )
                            )}
                            title="Action Items Checklist"
                        >
                            <CheckSquare size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleBlockquote()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "blockquote"
                                )
                            )}
                            title="Quote"
                        >
                            <Quote size={18} />
                        </IconButton>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 0.5,
                                borderColor:
                                    borderStyle,
                            }}
                        />

                        {/* Text Alignment */}
                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("left")
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive({
                                    textAlign:
                                        "left",
                                })
                            )}
                            title="Align Text Left"
                        >
                            <AlignLeft size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("center")
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive({
                                    textAlign:
                                        "center",
                                })
                            )}
                            title="Align Text Center"
                        >
                            <AlignCenter size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("right")
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive({
                                    textAlign:
                                        "right",
                                })
                            )}
                            title="Align Text Right"
                        >
                            <AlignRight size={18} />
                        </IconButton>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 0.5,
                                borderColor:
                                    borderStyle,
                            }}
                        />

                        {/* Image Alignment */}
                        <IconButton
                            onClick={() =>
                                setImageAlignment(
                                    "left"
                                )
                            }
                            sx={getToolbarBtnSx(false)}
                            title="Move Image Left"
                        >
                            <AlignLeft size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                setImageAlignment(
                                    "center"
                                )
                            }
                            sx={getToolbarBtnSx(false)}
                            title="Move Image Center"
                        >
                            <AlignCenter size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                setImageAlignment(
                                    "right"
                                )
                            }
                            sx={getToolbarBtnSx(false)}
                            title="Move Image Right"
                        >
                            <AlignRight size={18} />
                        </IconButton>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 0.5,
                                borderColor:
                                    borderStyle,
                            }}
                        />

                        {/* Special Tools */}
                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHighlight()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "highlight"
                                )
                            )}
                            title="Highlight"
                        >
                            <Highlighter size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleSubscript()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "subscript"
                                )
                            )}
                            title="Subscript"
                        >
                            <SubscriptIcon size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleSuperscript()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "superscript"
                                )
                            )}
                            title="Superscript"
                        >
                            <SuperscriptIcon size={18} />
                        </IconButton>

                        {/* Employee Tagging */}
                        <IconButton
                            onClick={(e) =>
                                setMentionAnchorEl(
                                    e.currentTarget
                                )
                            }
                            sx={getToolbarBtnSx(
                                Boolean(
                                    mentionAnchorEl
                                )
                            )}
                            title="Tag Employee (@)"
                        >
                            <AtSign size={18} />
                        </IconButton>

                        <Menu
                            anchorEl={mentionAnchorEl}
                            open={Boolean(
                                mentionAnchorEl
                            )}
                            onClose={() =>
                                setMentionAnchorEl(null)
                            }
                            PaperProps={{
                                sx: {
                                    ...menuPaperSx,
                                    width: {
                                        xs: "180px",
                                        sm: "220px",
                                    },
                                },
                            }}
                            MenuListProps={{
                                sx: {
                                    maxHeight:
                                        "190px",
                                    overflowY:
                                        "auto",
                                    py: 0,
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    px: 2,
                                    py: 1,
                                    fontSize:
                                        "0.75rem",
                                    color: subText,
                                    fontWeight: 700,
                                    position:
                                        "sticky",
                                    top: 0,
                                    bgcolor:
                                        cardColor,
                                    zIndex: 1,
                                }}
                            >
                                SELECT EMPLOYEE TO TAG
                            </Typography>

                            {Array.isArray(
                                employeesList
                            ) &&
                                employeesList.length >
                                0 ? (
                                employeesList.map(
                                    (emp, idx) => (
                                        <MenuItem
                                            key={idx}
                                            onClick={() => {
                                                handleInsertMention(
                                                    emp
                                                );
                                                setMentionAnchorEl(
                                                    null
                                                );
                                            }}
                                            sx={{
                                                fontSize:
                                                {
                                                    xs: "0.82rem",
                                                    sm: "0.9rem",
                                                },
                                                display:
                                                    "flex",
                                                flexDirection:
                                                    "column",
                                                alignItems:
                                                    "flex-start",
                                                py: 0.5,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize:
                                                    {
                                                        xs: "0.82rem",
                                                        sm: "0.9rem",
                                                    },
                                                    color: textColor,
                                                }}
                                            >
                                                {
                                                    emp.candidate
                                                }
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontSize:
                                                        "0.75rem",
                                                    color: subText,
                                                }}
                                            >
                                                {
                                                    emp.position
                                                }
                                            </Typography>
                                        </MenuItem>
                                    )
                                )
                            ) : (
                                <MenuItem disabled>
                                    <Typography
                                        sx={{
                                            fontSize:
                                                "0.85rem",
                                            color: subText,
                                        }}
                                    >
                                        No recruiters found
                                    </Typography>
                                </MenuItem>
                            )}
                        </Menu>

                        {/* Video */}
                        <IconButton
                            onClick={() => {
                                const url =
                                    window.prompt(
                                        "Enter YouTube URL:"
                                    );

                                if (url) {
                                    editor
                                        .chain()
                                        .focus()
                                        .setYoutubeVideo({
                                            src: url,
                                        })
                                        .run();
                                }
                            }}
                            sx={getToolbarBtnSx(false)}
                            title="Insert Video"
                        >
                            <Video size={18} />
                        </IconButton>

                        {/* Image */}
                        <IconButton
                            onClick={handleImageClick}
                            sx={getToolbarBtnSx(
                                Boolean(imageAnchorEl)
                            )}
                            title="Insert Image"
                        >
                            <ImageIcon size={18} />
                        </IconButton>

                        <Menu
                            anchorEl={imageAnchorEl}
                            open={Boolean(
                                imageAnchorEl
                            )}
                            onClose={handleImageClose}
                            PaperProps={{
                                sx: menuPaperSx,
                            }}
                        >
                            <MenuItem
                                onClick={
                                    handleAddImageByURL
                                }
                                sx={{
                                    fontSize: {
                                        xs: "0.82rem",
                                        sm: "0.9rem",
                                    },
                                    gap: 1.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: textColor,
                                        minWidth:
                                            "auto",
                                    }}
                                >
                                    <LinkIcon
                                        size={16}
                                    />
                                </ListItemIcon>

                                <ListItemText>
                                    Insert via URL
                                </ListItemText>
                            </MenuItem>

                            <MenuItem
                                onClick={
                                    handleTriggerFileExplorer
                                }
                                sx={{
                                    fontSize: {
                                        xs: "0.82rem",
                                        sm: "0.9rem",
                                    },
                                    gap: 1.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: textColor,
                                        minWidth:
                                            "auto",
                                    }}
                                >
                                    <FolderOpen
                                        size={16}
                                    />
                                </ListItemIcon>

                                <ListItemText>
                                    Upload from Computer
                                </ListItemText>
                            </MenuItem>
                        </Menu>

                        {/* Code Block */}
                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleCodeBlock()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "codeBlock"
                                )
                            )}
                            title="Code Block"
                        >
                            <Code size={18} />
                        </IconButton>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 0.5,
                                borderColor:
                                    borderStyle,
                            }}
                        />

                        {/* Undo / Redo */}
                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .undo()
                                    .run()
                            }
                            disabled={
                                !editor.can().undo()
                            }
                            sx={getToolbarBtnSx(
                                false,
                                !editor.can().undo()
                            )}
                            title="Undo"
                        >
                            <Undo size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .redo()
                                    .run()
                            }
                            disabled={
                                !editor.can().redo()
                            }
                            sx={getToolbarBtnSx(
                                false,
                                !editor.can().redo()
                            )}
                            title="Redo"
                        >
                            <Redo size={18} />
                        </IconButton>
                    </Box>

                    {/* Editor Content */}
                    <Box
                        sx={{
                            p: {
                                xs: 1.75,
                                sm: 2.25,
                                md: 3,
                            },
                            minHeight: {
                                xs: "240px",
                                sm: "300px",
                            },
                            color: textColor,

                            "& .ProseMirror": {
                                outline: "none",
                                minHeight: {
                                    xs: "200px",
                                    sm: "260px",
                                },
                                fontSize: {
                                    xs: "0.92rem",
                                    sm: "1rem",
                                },
                                lineHeight: 1.6,
                                color: textColor,
                            },

                            "& .ProseMirror ul[data-type='taskList']":
                            {
                                listStyle: "none",
                                padding: 0,

                                "& li": {
                                    display:
                                        "flex",
                                    alignItems:
                                        "flex-start",
                                    gap: "8px",
                                    marginBottom:
                                        "6px",

                                    "& > label": {
                                        flex:
                                            "0 0 auto",
                                        userSelect:
                                            "none",
                                        marginTop:
                                            "3px",
                                    },

                                    "& > div": {
                                        flex:
                                            "1 1 auto",
                                    },
                                },

                                "& input[type='checkbox']":
                                {
                                    cursor:
                                        "pointer",
                                    accentColor:
                                        activeColor,
                                    width:
                                        "16px",
                                    height:
                                        "16px",
                                },
                            },

                            "& .ProseMirror .resizable-image-container":
                            {
                                display:
                                    "flex",

                                "&[data-align='left']":
                                {
                                    justifyContent:
                                        "flex-start",
                                },

                                "&[data-align='center']":
                                {
                                    justifyContent:
                                        "center",
                                },

                                "&[data-align='right']":
                                {
                                    justifyContent:
                                        "flex-end",
                                },
                            },
                        }}
                    >
                        <EditorContent editor={editor} />
                    </Box>
                </Paper>

                {/* Note Changes / Diff Viewer */}
                {previousNote && currentNote && (
                    <Box
                        sx={{
                            p: 3,
                            mt: 4,
                            borderRadius: {
                                xs: "16px",
                                sm: "22px",
                            },
                            border: `1px solid ${borderStyle}`,
                            bgcolor: cardColor,
                            backdropFilter:
                                "blur(12px)",
                            overflow: "hidden",
                            boxShadow: shadowColor,
                            transition:
                                "all 0.3s ease",

                            "&:hover": {
                                transform:
                                    "translateY(-3px)",
                                boxShadow: darkMode
                                    ? `0 18px 36px rgba(0,0,0,0.40), 0 8px 12px rgba(0,0,0,0.25)`
                                    : `0 20px 40px rgba(15,23,42,0.12), 0 6px 12px rgba(15,23,42,0.08)`,
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: 800,
                                mb: 1.5,
                                color: colors.text,
                            }}
                        >
                            Note Changes
                        </Typography>

                        <ReactDiffViewer
                            oldValue={previousNote}
                            newValue={currentNote}
                            splitView={true}
                            showDiffOnly={false}
                            useDarkTheme={darkMode}
                        />
                    </Box>
                )}

                {/* Clear Saved Notes Dialog */}
                <Dialog
                    open={clearDialogOpen}
                    onClose={() =>
                        setClearDialogOpen(false)
                    }
                    PaperProps={{
                        sx: {
                            bgcolor: cardColor,
                            color: textColor,
                            borderRadius: "9px",
                            border: `1px solid ${borderStyle}`,
                            boxShadow: shadowColor,
                            width: "100%",
                            maxWidth: "420px",
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            color: textColor,
                            fontWeight: 700,
                        }}
                    >
                        Clear Saved Notes?
                    </DialogTitle>

                    <DialogContent>
                        <Typography
                            sx={{
                                color: subText,
                                fontSize: "0.9rem",
                                lineHeight: 1.6,
                            }}
                        >
                            This will remove the saved note
                            and its revision history.
                            This action cannot be undone.
                        </Typography>
                    </DialogContent>

                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            onClick={() =>
                                setClearDialogOpen(false)
                            }
                            sx={{
                                color: subText,
                                textTransform:
                                    "none",
                                fontWeight: 600,
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleClearConfirm}
                            variant="contained"
                            sx={{
                                bgcolor: primary,
                                borderRadius: "9px",
                                textTransform:
                                    "none",
                                fontWeight: 700,

                                "&:hover": {
                                    bgcolor: primary,
                                },
                            }}
                        >
                            Clear Notes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </InterviewerLayout>
    );
}