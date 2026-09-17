import { useState, useEffect, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

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

import Youtube from "@tiptap/extension-youtube";

import HRLayout from "../../Layouts/HRLayout";
import recruitersData from "../../data/recruiters.json";

import { Video } from "lucide-react";

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
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
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
    Crop,
    FlipHorizontal,
} from "lucide-react";

import SEO from "../../components/common/SEO";

import ReactDiffViewer from "react-diff-viewer-continued";

// Fabric.js based floating image editor.
import FabricImageEditor from "../../components/ImageEditor/FabricImageEditor";

export default function NotesEditorPage() {
    // Theme context.
    const { darkMode } = useTheme();

    // Theme colors.
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

    const isWideScreen =
        useMediaQuery("(min-width: 1200px)");

    /*
     * Save state.
     */
    const [savedStatus, setSavedStatus] =
        useState(false);

    /*
     * Clear dialog state.
     */
    const [clearDialogOpen, setClearDialogOpen] =
        useState(false);

    /*
     * Revision history.
     */
    const [previousNote, setPreviousNote] =
        useState("");

    const [currentNote, setCurrentNote] =
        useState("");

    /*
     * Force editor UI update.
     */
    const [, setForceUpdate] =
        useState({});

    /*
     * Auto-save state.
     */
    const [syncStatus, setSyncStatus] =
        useState("All changes saved");

    const [lastSavedTime, setLastSavedTime] =
        useState(null);

    /*
     * Employee tagging.
     */
    const [mentionAnchorEl, setMentionAnchorEl] =
        useState(null);

    /*
     * Export menu.
     */
    const [exportAnchorEl, setExportAnchorEl] =
        useState(null);

    /*
     * Templates menu.
     */
    const [templateAnchorEl, setTemplateAnchorEl] =
        useState(null);

    /*
     * Image insertion menu.
     */
    const [imageAnchorEl, setImageAnchorEl] =
        useState(null);

    /*
     * Hidden file input.
     */
    const fileInputRef = useRef(null);

    /*
     * Selected image for Canvas editing.
     *
     * selectedImageSrc:
     *   Current image source.
     *
     * selectedImageElement:
     *   Actual DOM <img> element inside Tiptap.
     */
    const [selectedImageSrc, setSelectedImageSrc] =
        useState(null);

    const [selectedImageElement, setSelectedImageElement] =
        useState(null);

    /*
    
    Selected image position inside the Tiptap document.
    
    
    
    This helps us update the correct resizableImage node
    
    after Fabric.js finishes editing.
    */
    const [selectedImagePosition, setSelectedImagePosition] =
        useState(null);

    /*
    
     * Mock employee list for mentions.
     */
    const employeesList = recruitersData;

    /*
     * Tiptap editor.
     */
    const editor = useEditor({
        extensions: [
            Youtube.configure({
                controls: true,
                nocookie: true,
            }),

            StarterKit,

            Underline,

            Highlight.configure({
                multicolor: true,
            }),

            Subscript,

            Superscript,

            TaskList,

            TaskItem.configure({
                nested: true,
            }),

            ResizableImage.configure({
                HTMLAttributes: {
                    style:
                        "border-radius: 8px; cursor: pointer;",
                },
            }),

            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),
        ],

        editorProps: {
            attributes: {
                role: "textbox",
                "aria-label": "HR notes editor",
                "aria-multiline": "true",
            },
        },

        content:
            "<p>Start writing HR notes, interview feedback, or meeting summaries here...</p>",
    });

    /*
     * Restore saved notes.
     *
     * This hook is intentionally BEFORE the
     * `if (!editor)` return to follow React Hooks rules.
     */
    useEffect(() => {
        if (!editor) return;

        const savedNoteData =
            localStorage.getItem("hr_notes_data");

        if (!savedNoteData) return;

        try {
            const parsedData =
                JSON.parse(savedNoteData);

            if (parsedData.htmlContent) {
                editor.commands.setContent(
                    parsedData.htmlContent
                );
            }

            if (parsedData.currentNote) {
                setCurrentNote(
                    parsedData.currentNote
                );
            }

            if (parsedData.previousNote) {
                setPreviousNote(
                    parsedData.previousNote
                );
            }

            if (parsedData.lastSavedTime) {
                setLastSavedTime(
                    parsedData.lastSavedTime
                );
            }
        } catch (error) {
            console.error(
                "Failed to restore saved notes:",
                error
            );
        }
    }, [editor]);

    /*
     * Auto-save listener.
     */
    useEffect(() => {
        if (!editor) return;

        let timer;

        const handler = () => {
            setForceUpdate({});

            setSyncStatus(
                "Unsaved changes..."
            );

            clearTimeout(timer);

            timer = setTimeout(() => {
                const htmlContent =
                    editor.getHTML();

                const tempDiv =
                    document.createElement("div");

                tempDiv.innerHTML =
                    htmlContent;

                const plainText =
                    tempDiv.innerText;

                const savedData =
                    localStorage.getItem(
                        "hr_notes_data"
                    );

                let previousSavedData = {};

                if (savedData) {
                    try {
                        previousSavedData =
                            JSON.parse(savedData);
                    } catch (error) {
                        console.error(
                            "Failed to read saved notes:",
                            error
                        );
                    }
                }

                const savedTime =
                    new Date().toLocaleTimeString(
                        [],
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    );

                localStorage.setItem(
                    "hr_notes_data",
                    JSON.stringify({
                        htmlContent,

                        previousNote:
                            previousSavedData.currentNote ||
                            "",

                        currentNote:
                            plainText,

                        lastSavedTime:
                            savedTime,
                    })
                );

                setCurrentNote(
                    plainText
                );

                setLastSavedTime(
                    savedTime
                );

                setSyncStatus(
                    "All changes saved"
                );
            }, 2000);
        };

        editor.on(
            "transaction",
            handler
        );

        return () => {
            editor.off(
                "transaction",
                handler
            );

            clearTimeout(timer);
        };
    }, [editor]);

    /*
     * Close Canvas editor if editor is unavailable.
     */
    if (!editor) {
        return null;
    }

    /*
     * Save notes manually.
     */
    const handleSave = () => {
        const htmlContent =
            editor.getHTML();

        const tempDiv =
            document.createElement("div");

        tempDiv.innerHTML =
            htmlContent;

        const plainText =
            tempDiv.innerText;

        setPreviousNote(
            currentNote
        );

        setCurrentNote(
            plainText
        );

        console.log(
            "Saved Notes HTML:",
            htmlContent
        );

        const savedTime =
            new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                }
            );

        localStorage.setItem(
            "hr_notes_data",
            JSON.stringify({
                htmlContent,
                previousNote:
                    currentNote,
                currentNote:
                    plainText,
                lastSavedTime:
                    savedTime,
            })
        );

        setSavedStatus(true);

        setSyncStatus(
            "All changes saved"
        );

        setLastSavedTime(
            savedTime
        );

        setTimeout(
            () => setSavedStatus(false),
            2500
        );
    };

    /*
     * Clear notes.
     */
    const handleClearConfirm = () => {
        localStorage.removeItem(
            "hr_notes_data"
        );

        setPreviousNote("");
        setCurrentNote("");
        setLastSavedTime(null);
        setSavedStatus(false);

        setSyncStatus(
            "All changes saved"
        );

        editor.commands.setContent(
            "<p>Start writing HR notes, interview feedback, or meeting summaries here...</p>"
        );

        setClearDialogOpen(false);
    };

    /*
     * Export menu.
     */
    const handleExportClick = (event) => {
        setExportAnchorEl(
            event.currentTarget
        );
    };

    const handleExportClose = () => {
        setExportAnchorEl(null);
    };

    /*
     * Export as Word document.
     */
    const handleExportWord = () => {
        handleExportClose();

        const content =
            editor.getHTML();

        const blob = new Blob(
            [
                "<!DOCTYPE html><html><body>",
                content,
                "</body></html>",
            ],
            {
                type:
                    "application/msword",
            }
        );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            "HR-Notes-Document.doc";

        a.click();

        URL.revokeObjectURL(url);
    };

    /*
     * Print page as PDF.
     */
    const handleExportPDF = () => {
        handleExportClose();

        window.print();
    };

    /*
     * Templates.
     */
    const handleTemplateClick =
        (event) => {
            setTemplateAnchorEl(
                event.currentTarget
            );
        };

    const handleTemplateClose =
        () => {
            setTemplateAnchorEl(null);
        };

    const applyTemplate = (type) => {
        handleTemplateClose();

        let templateHtml = "";

        if (type === "tech") {
            templateHtml =
                `<h3>Technical Interview Feedback</h3>
            <p><strong>Candidate Name:</strong> </p>
            <p><strong>Position:</strong> Software Engineer</p>
            <ul>
                <li><p>Coding & Problem Solving: </p></li>
                <li><p>System Design Knowledge: </p></li>
                <li><p>Communication & Cultural Fit: </p></li>
            </ul>
            <p><strong>Final Verdict:</strong> [Hire / Reject / Hold]</p>`;
        }

        if (type === "hr") {
            templateHtml =
                `<h3>HR Round Feedback</h3>
            <p><strong>Candidate Name:</strong> </p>
            <p><strong>Expected CTC:</strong> </p>
            <p><strong>Notice Period:</strong> </p>
            <ul>
                <li><p>Motivation & Background: </p></li>
                <li><p>Strengths: </p></li>
                <li><p>Areas of Concern: </p></li>
            </ul>`;
        }

        if (type === "performance") {
            templateHtml =
                `<h3>Team Performance Review</h3>
            <p><strong>Employee Name:</strong> </p>
            <p><strong>Review Period:</strong> Q1 / Q2 / Q3 / Q4</p>
            <ul>
                <li><p>Key Achievements: </p></li>
                <li><p>Areas of Improvement: </p></li>
                <li><p>Goals for Next Cycle: </p></li>
            </ul>`;
        }

        editor
            .chain()
            .focus()
            .setContent(templateHtml)
            .run();
    };

    /*
     * Employee mention.
     */
    const handleInsertMention =
        (emp) => {
            const nameToInsert =
                emp.fullName ||
                emp.name;

            editor
                .chain()
                .focus()
                .insertContent(
                    `<span style="background-color: ${primary}20; color: ${primary}; padding: 2px 6px; border-radius: 4px; font-weight: 600;">@${nameToInsert}</span>&nbsp;`
                )
                .run();
        };

    /*
     * Image insertion menu.
     */
    const handleImageClick =
        (event) => {
            setImageAnchorEl(
                event.currentTarget
            );
        };

    const handleImageClose =
        () => {
            setImageAnchorEl(null);
        };

    /*
     * Insert image using URL.
     */
    const handleAddImageByURL =
        () => {
            handleImageClose();

            const url =
                window.prompt(
                    "Enter image URL:"
                );

            if (url) {
                editor
                    .chain()
                    .focus()
                    .setResizableImage({
                        src: url,
                    })
                    .run();
            }
        };

    /*
     * Open computer file explorer.
     */
    const handleTriggerFileExplorer =
        () => {
            handleImageClose();

            if (
                fileInputRef.current
            ) {
                fileInputRef.current.click();
            }
        };

    /*
     * Convert selected local image to Base64.
     */
    const handleFileChange =
        (event) => {
            const file =
                event.target.files?.[0];

            if (file) {
                const reader =
                    new FileReader();

                reader.onload =
                    (e) => {
                        const base64Src =
                            e.target?.result;

                        if (base64Src) {
                            editor
                                .chain()
                                .focus()
                                .setResizableImage(
                                    {
                                        src:
                                            base64Src,
                                    }
                                )
                                .run();
                        }
                    };

                reader.readAsDataURL(
                    file
                );
            }

            event.target.value = "";
        };

    /*
     * Image alignment.
     */
    const setImageAlignment =
        (alignment) => {
            try {
                editor
                    .chain()
                    .focus()
                    .updateAttributes(
                        "image",
                        {
                            align: alignment,
                        }
                    )
                    .run();
            } catch (error) {
                console.log(
                    "Please select an image first",
                    error
                );
            }
        };

    /*
     * Detect image click inside Tiptap.
     *
     * This is the main connection between:
     *
     * Tiptap
     *    ↓
     * Canvas Image Editor
     */
    const handleEditorClick =
        (event) => {
            /*
             * Make sure the clicked target is an HTML element
             * before using closest().
             */
            const target =
                event.target;

            if (
                !target ||
                typeof target.closest !==
                "function"
            ) {
                return;
            }

            /*
             * Find the clicked image.
             */
            const clickedImage =
                target.closest("img");

            /*
    
    If user clicked something other than
    
    an image, clear the selected image.
    */
            if (!clickedImage) {
                setSelectedImageElement(
                    null
                );

                setSelectedImageSrc(
                    null
                );

                setSelectedImagePosition(
                    null
                );

                return;
            }

            /*
             * Store selected image.
             */
            setSelectedImageSrc(
                clickedImage.src
            );

            setSelectedImageElement(
                clickedImage
            );

            // Save the Tiptap document position of the
            // selected image so Fabric can update it later.

            try {
                const domPos =
                    editor.view.posAtDOM(
                        clickedImage,
                        0
                    );

                let exactImagePos = null;

                // Find the actual resizableImage node
                for (
                    let offset = -3;
                    offset <= 3;
                    offset++
                ) {
                    const candidatePos =
                        domPos + offset;

                    if (candidatePos < 0) {
                        continue;
                    }

                    const candidateNode =
                        editor.state.doc.nodeAt(
                            candidatePos
                        );

                    if (
                        candidateNode &&
                        candidateNode.type.name === "image"
                    ) {
                        exactImagePos =
                            candidatePos;

                        break;
                    }
                }

                setSelectedImagePosition(
                    exactImagePos
                );
            } catch (error) {
                console.error(
                    "Failed to find selected image position:",
                    error
                );

                setSelectedImagePosition(
                    null
                );
            }

            /*
             * Get image viewport position.
             */
            const imageBounds =
                clickedImage.getBoundingClientRect();

            /*
             * Position toolbar directly above image.
             */
            setImageToolbarPosition({
                top:
                    Math.max(
                        8,
                        imageBounds.top -
                        52
                    ),

                left:
                    imageBounds.left +
                    imageBounds.width /
                    2,
            });
        };

    /*
    Apply Fabric.js edited image back to Tiptap.
    */
    const handleApplyImageEdit = (newDataUrl) => {
        if (!newDataUrl) {
            return;
        }

        // Update the currently selected Tiptap image
        editor
            .chain()
            .focus()
            .updateAttributes("image", {
                src: newDataUrl,
            })
            .setTextSelection(editor.state.doc.content.size)
            .blur()
            .run();

        setSelectedImageSrc(null);
        setSelectedImageElement(null);
        setSelectedImagePosition(null);
    };

    /*
    Close Fabric.js image editor without applying
    the current changes.
    */
    const handleCloseImageEditor =
        () => {
            setSelectedImageSrc(
                null
            );

            setSelectedImageElement(
                null
            );

            setSelectedImagePosition(
                null
            );

        };

    /*
    
    Toolbar button style.
    */
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

        backgroundColor:
            isActive
                ? activeColor
                : inputColor,

        color:
            isActive
                ? "#ffffff"
                : subText,

        opacity:
            isDisabled ? 0.3 : 1,

        transition:
            "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

        boxShadow:
            isActive
                ? `0 4px 12px ${activeColor}45`
                : "none",

        "&:hover": {
            backgroundColor:
                isActive
                    ? activeColor
                    : `${primary}14`,

            color:
                isActive
                    ? "#ffffff"
                    : primary,
        },

    });

    /*
    
    Menu styling.
    */
    const menuPaperSx = {
        bgcolor: cardColor,
        color: textColor,
        borderRadius: "12px",
        border: `1px solid ${borderStyle}`,
        mt: 1,
        boxShadow: shadowColor,
    };

    /*
    
    Header outlined buttons.
    */
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

        "&": {
            borderColor: primary,
            bgcolor: `${primary}08`,
        },
    };

    return (
        <HRLayout>
            {/* Dynamic SEO metadata */}
            <SEO
                title="HR Notes"
                description="Manage job postings, candidates, and interview schedules on NextHire HR Portal."
                canonicalUrl="/hr-portal/dashboard"
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
                {/* Hidden image file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{
                        display: "none",
                    }}
                    accept="image/*"
                    onChange={
                        handleFileChange
                    }
                />

                {/* Page header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center",
                        mb: {
                            xs: 2,
                            sm: 3,
                        },
                        flexWrap:
                            "wrap",
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
                                letterSpacing:
                                    "-0.03em",

                                color:
                                    textColor,
                            }}
                        >
                            HR Notes &
                            Documentation
                        </Typography>

                        <Box
                            sx={{
                                display:
                                    "flex",
                                alignItems:
                                    "center",
                                gap: 2,
                                flexWrap:
                                    "wrap",
                            }}
                        >
                            {/* Auto-save status */}
                            <Chip
                                icon={
                                    syncStatus.includes(
                                        "saved"
                                    ) ? (
                                        <Cloud
                                            size={
                                                14
                                            }
                                        />
                                    ) : (
                                        <CloudCheck
                                            size={
                                                14
                                            }
                                        />
                                    )
                                }
                                label={`${syncStatus} ${lastSavedTime
                                    ? `(${lastSavedTime})`
                                    : ""
                                    }`}
                                size="small"
                                sx={{
                                    bgcolor:
                                        inputColor,

                                    color:
                                        subText,

                                    border:
                                        `1px solid ${borderStyle}`,

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

                    <Box
                        sx={{
                            display:
                                "flex",
                            gap: {
                                xs: 1,
                                sm: 1.5,
                            },
                            alignItems:
                                "center",
                            flexWrap:
                                "wrap",
                        }}
                    >
                        {/* Templates */}
                        <Button
                            variant="outlined"
                            onClick={
                                handleTemplateClick
                            }
                            startIcon={
                                <FileText
                                    size={
                                        16
                                    }
                                />
                            }
                            sx={
                                outlinedBtnSx
                            }
                        >
                            Templates
                        </Button>

                        <Menu
                            anchorEl={
                                templateAnchorEl
                            }
                            open={Boolean(
                                templateAnchorEl
                            )}
                            onClose={
                                handleTemplateClose
                            }
                            PaperProps={{
                                sx:
                                    menuPaperSx,
                            }}
                        >
                            <MenuItem
                                onClick={() =>
                                    applyTemplate(
                                        "tech"
                                    )
                                }
                            >
                                Technical Interview
                                Template
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    applyTemplate(
                                        "hr"
                                    )
                                }
                            >
                                HR Round Feedback
                            </MenuItem>

                            <MenuItem
                                onClick={() =>
                                    applyTemplate(
                                        "performance"
                                    )
                                }
                            >
                                Performance Review
                            </MenuItem>
                        </Menu>

                        {/* Export */}
                        <Button
                            variant="outlined"
                            onClick={
                                handleExportClick
                            }
                            startIcon={
                                <Download
                                    size={
                                        16
                                    }
                                />
                            }
                            sx={
                                outlinedBtnSx
                            }
                        >
                            Export
                        </Button>

                        <Menu
                            anchorEl={
                                exportAnchorEl
                            }
                            open={Boolean(
                                exportAnchorEl
                            )}
                            onClose={
                                handleExportClose
                            }
                            PaperProps={{
                                sx:
                                    menuPaperSx,
                            }}
                        >
                            <MenuItem
                                onClick={
                                    handleExportPDF
                                }
                            >
                                Export as PDF
                                (Print)
                            </MenuItem>

                            <MenuItem
                                onClick={
                                    handleExportWord
                                }
                            >
                                Export as Word
                                (.doc)
                            </MenuItem>
                        </Menu>

                        {/* Clear saved notes */}
                        <Button
                            variant="outlined"
                            onClick={() =>
                                setClearDialogOpen(
                                    true
                                )
                            }
                            sx={
                                outlinedBtnSx
                            }
                        >
                            Clear Saved Notes
                        </Button>

                        {/* Save */}
                        <Button
                            variant="contained"
                            onClick={
                                handleSave
                            }
                            startIcon={
                                <Save
                                    size={
                                        18
                                    }
                                />
                            }
                            sx={{
                                borderRadius:
                                    "10px",

                                fontWeight:
                                    700,

                                textTransform:
                                    "none",

                                px: {
                                    xs: 2,
                                    sm: 3,
                                },

                                fontSize: {
                                    xs: "0.78rem",
                                    sm: "0.875rem",
                                },

                                background:
                                    `linear-gradient(135deg, ${primary}, ${secondaryColor})`,

                                boxShadow:
                                    `0 4px 12px ${primary}33`,

                                transition:
                                    ".25s",

                                "&:hover":
                                {
                                    background:
                                        `linear-gradient(135deg, ${primary}, ${primary})`,

                                    transform:
                                        "translateY(-2px)",

                                    boxShadow:
                                        `0 10px 22px ${primary}59`,
                                },
                            }}
                        >
                            {savedStatus
                                ? "Saved!"
                                : "Save Notes"}
                        </Button>
                    </Box>
                </Box>

                {/* Main editor */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: {
                            xs: "16px",
                            sm: "22px",
                        },

                        border:
                            `1px solid ${borderStyle}`,

                        bgcolor:
                            cardColor,

                        backdropFilter:
                            "blur(12px)",

                        overflow:
                            "hidden",

                        boxShadow:
                            shadowColor,

                        transition:
                            "all 0.3s ease",

                        "&:hover":
                        {
                            transform:
                                "translateY(-3px)",

                            boxShadow:
                                darkMode
                                    ? "0 18px 36px rgba(0,0,0,0.40), 0 8px 12px rgba(0,0,0,0.25)"
                                    : "0 20px 40px rgba(15,23,42,0.12), 0 6px 12px rgba(15,23,42,0.08)",
                        },
                    }}
                >
                    {/* Tiptap toolbar */}
                    <Box
                        sx={{
                            display:
                                "flex",
                            flexWrap:
                                "wrap",
                            gap: {
                                xs: 0.5,
                                sm: 1,
                            },

                            p: {
                                xs: 1,
                                sm: 1.5,
                            },

                            borderBottom:
                                `1px solid ${borderStyle}`,

                            bgcolor:
                                inputColor,

                            alignItems:
                                "center",
                        }}
                    >
                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleBold()
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    "bold"
                                )
                            )}
                            aria-label="Bold"
                        >
                            <Bold
                                size={18}
                            />
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
                            aria-label="Italic"
                        >
                            <Italic
                                size={18}
                            />
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
                            aria-label="Underline"
                        >
                            <UnderlineIcon
                                size={18}
                            />
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
                                editor.isActive(
                                    "strike"
                                )
                            )}
                            aria-label="Strikethrough"
                        >
                            <Strikethrough
                                size={18}
                            />
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
                            aria-label="Bullet List"
                        >
                            <List
                                size={18}
                            />
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
                            aria-label="Numbered List"
                        >
                            <ListOrdered
                                size={18}
                            />
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
                            aria-label="Action Items Checklist"
                        >
                            <CheckSquare
                                size={18}
                            />
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
                            aria-label="Quote"
                        >
                            <Quote
                                size={18}
                            />
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

                        {/* Alignment */}
                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign(
                                        "left"
                                    )
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    {
                                        textAlign:
                                            "left",
                                    }
                                )
                            )}
                            aria-label="Align Text Left"
                        >
                            <AlignLeft
                                size={18}
                            />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign(
                                        "center"
                                    )
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    {
                                        textAlign:
                                            "center",
                                    }
                                )
                            )}
                            aria-label="Align Text Center"
                        >
                            <AlignCenter
                                size={18}
                            />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign(
                                        "right"
                                    )
                                    .run()
                            }
                            sx={getToolbarBtnSx(
                                editor.isActive(
                                    {
                                        textAlign:
                                            "right",
                                    }
                                )
                            )}
                            aria-label="Align Text Right"
                        >
                            <AlignRight
                                size={18}
                            />
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

                        {/* Image alignment */}
                        <IconButton
                            onClick={() =>
                                setImageAlignment(
                                    "left"
                                )
                            }
                            sx={getToolbarBtnSx(
                                false
                            )}
                            aria-label="Move Image Left"
                        >
                            <AlignLeft
                                size={18}
                            />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                setImageAlignment(
                                    "center"
                                )
                            }
                            sx={getToolbarBtnSx(
                                false
                            )}
                            aria-label="Move Image Center"
                        >
                            <AlignCenter
                                size={18}
                            />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                setImageAlignment(
                                    "right"
                                )
                            }
                            sx={getToolbarBtnSx(
                                false
                            )}
                            aria-label="Move Image Right"
                        >
                            <AlignRight
                                size={18}
                            />
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

                        {/* Highlight */}
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
                            aria-label="Highlight"
                        >
                            <Highlighter
                                size={18}
                            />
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
                            aria-label="Subscript"
                        >
                            <SubscriptIcon
                                size={18}
                            />
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
                            aria-label="Superscript"
                        >
                            <SuperscriptIcon
                                size={18}
                            />
                        </IconButton>

                        {/* Employee tagging */}
                        <IconButton
                            onClick={(event) =>
                                setMentionAnchorEl(
                                    event.currentTarget
                                )
                            }
                            sx={getToolbarBtnSx(
                                Boolean(
                                    mentionAnchorEl
                                )
                            )}
                            aria-label="Tag Employee"
                        >
                            <AtSign
                                size={18}
                            />
                        </IconButton>

                        <Menu
                            anchorEl={
                                mentionAnchorEl
                            }
                            open={Boolean(
                                mentionAnchorEl
                            )}
                            onClose={() =>
                                setMentionAnchorEl(
                                    null
                                )
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
                        >
                            <Typography
                                sx={{
                                    px: 2,
                                    py: 1,
                                    fontSize:
                                        "0.75rem",
                                    color:
                                        subText,
                                    fontWeight:
                                        700,
                                    bgcolor:
                                        cardColor,
                                }}
                            >
                                SELECT EMPLOYEE TO
                                TAG
                            </Typography>

                            {Array.isArray(
                                employeesList
                            ) &&
                                employeesList.length >
                                0 ? (
                                employeesList.map(
                                    (
                                        emp,
                                        idx
                                    ) => (
                                        <MenuItem
                                            key={
                                                emp.recruiterId ||
                                                idx
                                            }
                                            onClick={() => {
                                                handleInsertMention(
                                                    emp
                                                );

                                                setMentionAnchorEl(
                                                    null
                                                );
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight:
                                                            600,
                                                        color:
                                                            textColor,
                                                    }}
                                                >
                                                    {
                                                        emp.fullName
                                                    }
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            "0.75rem",
                                                        color:
                                                            subText,
                                                    }}
                                                >
                                                    {
                                                        emp.designation
                                                    }
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    )
                                )
                            ) : (
                                <MenuItem
                                    disabled
                                >
                                    No recruiters found
                                </MenuItem>
                            )}
                        </Menu>

                        {/* YouTube video */}
                        <Tooltip title="Insert YouTube video">
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
                                            .setYoutubeVideo(
                                                {
                                                    src:
                                                        url,
                                                }
                                            )
                                            .run();
                                    }
                                }}
                                sx={getToolbarBtnSx(
                                    false
                                )}
                                aria-label="Insert Video"
                            >
                                <Video
                                    size={
                                        18
                                    }
                                />
                            </IconButton>
                        </Tooltip>

                        {/* Image insertion */}
                        <Tooltip title="Insert image">
                            <IconButton
                                onClick={
                                    handleImageClick
                                }
                                sx={getToolbarBtnSx(
                                    Boolean(
                                        imageAnchorEl
                                    )
                                )}
                                aria-label="Insert Image"
                            >
                                <ImageIcon
                                    size={
                                        18
                                    }
                                />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            anchorEl={
                                imageAnchorEl
                            }
                            open={Boolean(
                                imageAnchorEl
                            )}
                            onClose={
                                handleImageClose
                            }
                            PaperProps={{
                                sx:
                                    menuPaperSx,
                            }}
                        >
                            <MenuItem
                                onClick={
                                    handleAddImageByURL
                                }
                            >
                                <ListItemIcon>
                                    <LinkIcon
                                        size={
                                            16
                                        }
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
                            >
                                <ListItemIcon>
                                    <FolderOpen
                                        size={
                                            16
                                        }
                                    />
                                </ListItemIcon>

                                <ListItemText>
                                    Upload from Computer
                                </ListItemText>
                            </MenuItem>
                        </Menu>

                        {/* Code block */}
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
                            aria-label="Code Block"
                        >
                            <Code
                                size={18}
                            />
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
                                !editor
                                    .can()
                                    .undo()
                            }
                            sx={getToolbarBtnSx(
                                false,
                                !editor
                                    .can()
                                    .undo()
                            )}
                            aria-label="Undo"
                        >
                            <Undo
                                size={18}
                            />
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
                                !editor
                                    .can()
                                    .redo()
                            }
                            sx={getToolbarBtnSx(
                                false,
                                !editor
                                    .can()
                                    .redo()
                            )}
                            aria-label="Redo"
                        >
                            <Redo
                                size={18}
                            />
                        </IconButton>
                    </Box>

                    {/* Editor content */}
                    <Box
                        onClick={
                            handleEditorClick
                        }
                        sx={{

                            // Remove image selection border
                            "& .ProseMirror-selectednode": {
                                outline: "none !important",
                                border: "none !important",
                            },

                            "& .resizable-image-container": {
                                border: "none !important",
                                outline: "none !important",
                            },

                            "& .resizable-image-container img": {
                                outline: "none !important",
                                border: "none !important",
                            },

                            "& .node-image": {
                                border: "none !important",
                            },
                            p: {
                                xs: 1.75,
                                sm: 2.25,
                                md: 3,
                            },

                            minHeight: {
                                xs: "240px",
                                sm: "300px",
                            },

                            color:
                                textColor,

                            "& .ProseMirror":
                            {
                                outline:
                                    "none",

                                // Set cursor color
                                caretColor:
                                    primary,


                                minHeight:
                                {
                                    xs: "200px",
                                    sm: "260px",
                                },

                                fontSize:
                                {
                                    xs: "0.92rem",
                                    sm: "1rem",
                                },

                                lineHeight:
                                    1.6,

                                color:
                                    textColor,
                            },

                            /* Checklist styling */
                            "& .ProseMirror ul[data-type='taskList']":
                            {
                                listStyle:
                                    "none",

                                padding:
                                    0,

                                "& li":
                                {
                                    display:
                                        "flex",

                                    alignItems:
                                        "flex-start",

                                    gap:
                                        "8px",

                                    marginBottom:
                                        "6px",

                                    "& > label":
                                    {
                                        flex:
                                            "0 0 auto",

                                        userSelect:
                                            "none",

                                        marginTop:
                                            "3px",
                                    },

                                    "& > div":
                                    {
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

                            /* Resizable image alignment */
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

                                /*
                                 * Selected image visual feedback.
                                 */
                                "& img":
                                {
                                    transition:
                                        "outline 0.15s ease",
                                },
                            },
                        }}
                    >
                        <EditorContent
                            editor={editor}
                        />
                    </Box>
                </Paper>

                {/* Fabric.js floating image editor. */}
                {selectedImageSrc &&
                    selectedImageElement && (
                        <FabricImageEditor
                            imageSrc={
                                selectedImageSrc
                            }
                            anchorElement={
                                selectedImageElement
                            }
                            onApply={
                                handleApplyImageEdit
                            }
                            onClose={
                                handleCloseImageEditor
                            }
                        />
                    )}

                {/* Diff viewer */}
                {previousNote &&
                    currentNote && (
                        <Box
                            sx={{
                                p: 3,
                                mt: 4,
                                borderRadius: {
                                    xs: "16px",
                                    sm: "22px",
                                },
                                border:
                                    `1px solid ${borderStyle}`,
                                bgcolor:
                                    cardColor,
                                overflow:
                                    "hidden",
                                boxShadow:
                                    shadowColor,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize:
                                        "18px",
                                    fontWeight:
                                        800,
                                    mb: 1.5,
                                    color:
                                        textColor,
                                }}
                            >
                                Note Changes
                            </Typography>

                            <ReactDiffViewer
                                oldValue={
                                    previousNote
                                }
                                newValue={
                                    currentNote
                                }
                                splitView={
                                    isWideScreen
                                }
                                showDiffOnly={
                                    false
                                }
                                useDarkTheme={
                                    darkMode
                                }
                            />
                        </Box>
                    )}

                {/* Clear notes dialog */}
                <Dialog
                    open={
                        clearDialogOpen
                    }
                    onClose={() =>
                        setClearDialogOpen(
                            false
                        )
                    }
                    PaperProps={{
                        sx: {
                            bgcolor:
                                cardColor,

                            borderRadius:
                                "9px",

                            border:
                                `1px solid ${borderStyle}`,

                            boxShadow:
                                shadowColor,

                            width:
                                "100%",

                            maxWidth:
                                "420px",
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            color:
                                textColor,

                            fontWeight:
                                700,
                        }}
                    >
                        Clear Saved Notes?
                    </DialogTitle>

                    <DialogContent>
                        <Typography
                            sx={{
                                color:
                                    subText,

                                fontSize:
                                    "0.9rem",

                                lineHeight:
                                    1.6,
                            }}
                        >
                            This will remove
                            the saved note
                            and its revision
                            history. This
                            action cannot be
                            undone.
                        </Typography>
                    </DialogContent>

                    <DialogActions
                        sx={{
                            p: 2,
                        }}
                    >
                        <Button
                            onClick={() =>
                                setClearDialogOpen(
                                    false
                                )
                            }
                            sx={{
                                color:
                                    subText,

                                textTransform:
                                    "none",

                                fontWeight:
                                    600,
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={
                                handleClearConfirm
                            }
                            variant="contained"
                            sx={{
                                bgcolor:
                                    primary,

                                borderRadius:
                                    "9px",

                                textTransform:
                                    "none",

                                fontWeight:
                                    700,

                                "&:hover":
                                {
                                    bgcolor:
                                        primary,
                                },
                            }}
                        >
                            Clear Notes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </HRLayout>

    );
}