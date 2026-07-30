import CandidateLayout from "../../Layouts/CandidateLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Box, Paper, Chip, Typography, Avatar, Button, IconButton, Select, MenuItem, TextField } from "@mui/material";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaComments, FaPhoneSlash, FaPlay, FaPaperPlane, FaBriefcase } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

// Language options for the editor's language selector
const LANGUAGE_OPTIONS = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
    { label: "TypeScript", value: "typescript" },
];

// Starter code snippets per language
const CODE_TEMPLATES = {
    javascript: `// Live Coding Exercise: Longest Substring Without Repeating Characters
// Complete the implementation below and run test scenarios.

function findLongestSubstring(s) {
  let maxLength = 0;
  let start = 0;
  const charMap = new Map();

  for (let i = 0; i < s.length; i++) {
    if (charMap.has(s[i])) {
      start = Math.max(charMap.get(s[i]) + 1, start);
    }
    charMap.set(s[i], i);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
}

// Test cases
console.log(findLongestSubstring("abcabcbb")); // Expected output: 3 ("abc")
console.log(findLongestSubstring("bbbbb"));    // Expected output: 1 ("b")`,
    python: `# Live Coding Exercise: Longest Substring Without Repeating Characters
# Complete the implementation below and run test scenarios.

def find_longest_substring(s):
    max_length = 0
    start = 0
    char_map = {}

    for i, ch in enumerate(s):
        if ch in char_map and char_map[ch] >= start:
            start = char_map[ch] + 1
        char_map[ch] = i
        max_length = max(max_length, i - start + 1)

    return max_length

# Test cases
print(find_longest_substring("abcabcbb"))  # Expected output: 3 ("abc")
print(find_longest_substring("bbbbb"))     # Expected output: 1 ("b")`,
    java: `// Live Coding Exercise: Longest Substring Without Repeating Characters
import java.util.HashMap;

public class Solution {
    public static int findLongestSubstring(String s) {
        int maxLength = 0, start = 0;
        HashMap<Character, Integer> charMap = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (charMap.containsKey(c)) {
                start = Math.max(charMap.get(c) + 1, start);
            }
            charMap.put(c, i);
            maxLength = Math.max(maxLength, i - start + 1);
        }
        return maxLength;
    }

    public static void main(String[] args) {
        System.out.println(findLongestSubstring("abcabcbb")); // 3
        System.out.println(findLongestSubstring("bbbbb"));    // 1
    }
}`,
    cpp: `// Live Coding Exercise: Longest Substring Without Repeating Characters
#include <bits/stdc++.h>
using namespace std;

int findLongestSubstring(string s) {
    int maxLength = 0, start = 0;
    unordered_map<char, int> charMap;

    for (int i = 0; i < s.size(); i++) {
        if (charMap.count(s[i])) {
            start = max(charMap[s[i]] + 1, start);
        }
        charMap[s[i]] = i;
        maxLength = max(maxLength, i - start + 1);
    }
    return maxLength;
}

int main() {
    cout << findLongestSubstring("abcabcbb") << endl; // 3
    cout << findLongestSubstring("bbbbb") << endl;    // 1
}`,
    typescript: `// Live Coding Exercise: Longest Substring Without Repeating Characters
function findLongestSubstring(s: string): number {
  let maxLength = 0;
  let start = 0;
  const charMap = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    if (charMap.has(s[i])) {
      start = Math.max(charMap.get(s[i])! + 1, start);
    }
    charMap.set(s[i], i);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
}

console.log(findLongestSubstring("abcabcbb")); // 3
console.log(findLongestSubstring("bbbbb"));    // 1`,
};

export default function JoinInterviewC() {
    const { darkMode } = useTheme();
    const { state } = useLocation();
    const navigate = useNavigate();
    const interview = state?.interview;
    const [mic, setMic] = useState(true);
    const [cam, setCam] = useState(true);
    const [time, setTime] = useState(0);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, []);

    // Language + code state
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(CODE_TEMPLATES.javascript);

    // Console output state
    const [consoleOutput, setConsoleOutput] = useState([
        { type: "info", text: "Console ready. Click 'Run Code' to execute." },
    ]);
    const [isRunning, setIsRunning] = useState(false);

    // Personal notes state (candidate's own scratchpad)
    const [notes, setNotes] = useState("");

    // Chat box state
    const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: "Interviewer", text: "Welcome! Take a moment to read the question.", self: false },
    ]);
    const [chatInput, setChatInput] = useState("");
    const chatEndRef = useRef(null);
    useEffect(() => {
        const layout = document.getElementById("layout-scroll");

        if (layout) {
            layout.scrollTo({
                top: 0,
                behavior: "instant",
            });
        }

        const i = setInterval(() => setTime((t) => t + 1), 1000);

        return () => clearInterval(i);
    }, []);

    // Called whenever the Monaco Editor content changes
    const handleEditorChange = (value) => {
        setCode(value ?? "");
    };

    // Switch language and reset editor to that language's starter template
    const handleLanguageChange = (event) => {
        const nextLang = event.target.value;
        setLanguage(nextLang);
        setCode(CODE_TEMPLATES[nextLang] ?? "");
    };

    // Executes JavaScript code in-browser and captures console.log output.
    // Other languages show a simulated-execution message since there's no
    // backend compiler wired up here.
    const handleRunCode = () => {
        setIsRunning(true);
        setConsoleOutput([{ type: "info", text: "Running..." }]);
        setTimeout(() => {
            if (language !== "javascript") {
                setConsoleOutput([
                    { type: "info", text: `Execution for ${language} requires a backend runner.` },
                    { type: "info", text: "Connect a code-execution service to run this language live." },
                ]);
                setIsRunning(false);
                return;
            }
            const capturedLogs = [];
            const originalLog = console.log;
            const originalError = console.error;
            console.log = (...args) => {
                capturedLogs.push({ type: "log", text: args.map(String).join(" ") });
            };
            console.error = (...args) => {
                capturedLogs.push({ type: "error", text: args.map(String).join(" ") });
            };
            try {
                // eslint-disable-next-line no-new-func
                const runner = new Function(code);
                runner();
                setConsoleOutput(
                    capturedLogs.length > 0
                        ? capturedLogs
                        : [{ type: "info", text: "Code ran with no console output." }]
                );
            } catch (err) {
                setConsoleOutput([
                    ...capturedLogs,
                    { type: "error", text: `${err.name}: ${err.message}` },
                ]);
            } finally {
                console.log = originalLog;
                console.error = originalError;
                setIsRunning(false);
            }
        }, 400);
    };

    // Chat send handler
    const handleSendChat = () => {
        if (!chatInput.trim()) return;
        setChatMessages((prev) => [
            ...prev,
            { id: prev.length + 1, sender: "You", text: chatInput.trim(), self: true },
        ]);
        setChatInput("");
    };
    if (!interview) {
        return (
            <CandidateLayout>
                <Paper
                    sx={{
                        position: { xs: "static", md: "sticky", },
                        top: 24,
                        p: { xs: 3, md: 5 },
                        mx: { xs: 2, sm: "auto" },
                        borderRadius: { xs: 3, md: 5 },
                        maxWidth: 500, mx: "auto",
                        textAlign: "center",
                        bgcolor: darkMode
                            ? "rgba(30,41,59,.45)"
                            : "#fff",
                        backdropFilter: "blur(12px)",
                        border: `1px solid ${darkMode
                            ? "rgba(255,255,255,.06)"
                            : "rgba(0,0,0,.05)"
                            }`,
                        borderRadius: 5,
                        boxShadow: darkMode
                            ? "0 10px 30px rgba(0,0,0,.25)"
                            : "0 10px 30px rgba(0,0,0,.03)",
                        transition: ".3s",
                        "&:hover": {
                            transform: "translateY(-3px)",
                        }
                    }}
                >
                    <Typography
                        variant="h5"
                    >
                        Interview not found.
                    </Typography>
                    <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        onClick={() => navigate("/my-interviews")}
                    >
                        Back to My Interviews
                    </Button>
                </Paper>
            </CandidateLayout>
        );
    }
    const fmt = (s) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    return (
        <CandidateLayout>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "2fr 1fr",
                    },
                    gap: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },
                }}
            >
                <Paper
                    sx={{
                        position: {
                            xs: "static",
                            md: "sticky",
                        },
                        top: 24,
                        p: {
                            xs: 1.75,
                            sm: 3,
                            md: 4,
                        },
                        bgcolor: darkMode
                            ? "rgba(30,41,59,.45)"
                            : "#fff",
                        backdropFilter: "blur(12px)",
                        border: `1px solid ${darkMode
                            ? "rgba(255,255,255,.06)"
                            : "rgba(0,0,0,.05)"
                            }`,
                        borderRadius: {
                            xs: 3,
                            md: 5,
                        },
                        boxShadow: darkMode
                            ? "0 10px 30px rgba(0,0,0,.25)"
                            : "0 10px 30px rgba(0,0,0,.03)",
                        transition: ".3s",
                        "&:hover": {
                            transform: "translateY(-3px)",
                        }
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1.5 }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 900,
                                    lineHeight: 1.3,
                                    fontSize: {
                                        xs: "1.25rem",
                                        sm: "1.6rem",
                                        md: "2rem",
                                    },
                                }}
                            >
                                {interview.position}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#10b981",
                                    fontSize: {
                                        xs: ".9rem",
                                        md: "1rem",
                                    }
                                }}
                            >
                                {interview.company}
                            </Typography>
                        </Box>

                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<FaBriefcase size={12} />}
                            onClick={() => navigate("/browse-jobs")}
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: ".78rem",
                                borderRadius: 3,
                                color: "#10b981",
                                borderColor: "rgba(16,185,129,.4)",
                                "&:hover": {
                                    borderColor: "#10b981",
                                    bgcolor: darkMode ? "rgba(16,185,129,.1)" : "rgba(16,185,129,.06)",
                                },
                            }}
                        >
                            View Job Details
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                            gap: 2,
                            mt: 2
                        }}
                    >
                        <Box
                            sx={{
                                height: {
                                    xs: 170,
                                    sm: 220,
                                    md: 260,
                                },
                                bgcolor: "#111827",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff"
                            }}
                        >
                            <Box sx={{ textAlign: "center" }}>
                                <Avatar
                                    sx={{
                                        mx: "auto",
                                        mb: 2,
                                        width: {
                                            xs: 56,
                                            sm: 64,
                                        },
                                        height: {
                                            xs: 56,
                                            sm: 64,
                                        },
                                        bgcolor: "#10b981",
                                    }}
                                >
                                    I
                                </Avatar>
                                <Typography fontWeight={700}>
                                    Interviewer
                                </Typography>
                                <Typography variant="body2">
                                    Camera Feed
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                height: {
                                    xs: 180,
                                    sm: 240,
                                    md: 260,
                                },
                                bgcolor: "#1f2937",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff"
                            }}
                        >
                            <Box sx={{ textAlign: "center" }}>
                                <Avatar
                                    sx={{
                                        mx: "auto",
                                        mb: 2,
                                        width: 64,
                                        height: 64,
                                        bgcolor: "#2563eb",
                                    }}
                                >
                                    Y
                                </Avatar>
                                <Typography fontWeight={700}>
                                    You
                                </Typography>
                                <Typography variant="body2">
                                    Camera Preview
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: {
                                xs: 1,
                                sm: 2,
                            },
                            mt: {
                                xs: 2,
                                md: 3,
                            },
                            mt: 3
                        }}
                    >
                        <IconButton
                            color={mic ? "success" : "error"}
                            onClick={() => setMic(!mic)}
                            sx={{
                                width: {
                                    xs: 44,
                                    sm: 52,
                                },
                                height: {
                                    xs: 44,
                                    sm: 52,
                                },
                                borderRadius: "50%",
                                transition: ".25s",
                                "&:hover": {
                                    transform: "scale(1.08)",
                                },
                            }}
                        >
                            {mic
                                ? <FaMicrophone />
                                : <FaMicrophoneSlash />
                            }
                        </IconButton>
                        <IconButton
                            color={cam ? "success" : "error"}
                            onClick={() => setCam(!cam)}
                            sx={{
                                width: {
                                    xs: 44,
                                    sm: 52,
                                },
                                height: {
                                    xs: 44,
                                    sm: 52,
                                },
                                borderRadius: "50%",
                                transition: ".25s",
                                "&:hover": {
                                    transform: "scale(1.08)",
                                },
                            }}
                        >
                            {cam
                                ? <FaVideo />
                                : <FaVideoSlash />
                            }
                        </IconButton>
                        <IconButton
                            color="primary"
                            sx={{
                                width: {
                                    xs: 44,
                                    sm: 52,
                                },
                                height: {
                                    xs: 44,
                                    sm: 52,
                                },
                                borderRadius: "50%",
                                transition: ".25s",
                                "&:hover": {
                                    transform: "scale(1.08)",
                                },
                            }}
                        >
                            <FaDesktop />
                        </IconButton>
                        <IconButton
                            color="primary"
                            sx={{
                                width: {
                                    xs: 44,
                                    sm: 52,
                                },
                                height: {
                                    xs: 44,
                                    sm: 52,
                                },
                                borderRadius: "50%",
                                transition: ".25s",
                                "&:hover": {
                                    transform: "scale(1.08)",
                                },
                            }}
                        >
                            <FaComments />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                if (window.confirm("Leave the interview?")) {
                                    navigate("/my-interviews");
                                }
                            }}
                            sx={{
                                width: {
                                    xs: 44,
                                    sm: 52,
                                },
                                height: {
                                    xs: 44,
                                    sm: 52,
                                },
                                borderRadius: "50%",
                                transition: ".25s",
                                "&:hover": {
                                    transform: "scale(1.08)",
                                },
                            }}
                        >
                            <FaPhoneSlash />
                        </IconButton>
                    </Box>

                    {/* Coding Question Panel */}
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 3,
                            p: { xs: 2, sm: 2.5 },
                            borderRadius: 4,
                            bgcolor: darkMode ? "rgba(15,23,42,.4)" : "#f8fafc",
                            border: `1px solid ${darkMode ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)"}`,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                            <Typography sx={{ fontWeight: 800, fontSize: "1rem" }}>
                                Coding Question
                            </Typography>
                            <Chip
                                label="Medium"
                                size="small"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: ".7rem",
                                    bgcolor: "rgba(245,158,11,.12)",
                                    color: "#f59e0b",
                                    border: "1px solid rgba(245,158,11,.3)",
                                }}
                            />
                        </Box>
                        <Typography sx={{ fontWeight: 700, fontSize: ".92rem", mb: 0.5 }}>
                            Longest Substring Without Repeating Characters
                        </Typography>
                        <Typography sx={{ fontSize: ".85rem", color: darkMode ? "#94a3b8" : "#64748b", lineHeight: 1.6 }}>
                            Given a string <code>s</code>, find the length of the longest substring without
                            repeating characters. Implement an efficient solution and test it against the
                            provided cases below before running.
                        </Typography>
                    </Paper>

                    {/* Live Coding Workspace */}
                    <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", mt: 3, mb: 1.5 }}>
                        Live Coding Workspace
                    </Typography>

                    <Paper
                        elevation={6}
                        sx={{
                            borderRadius: 4,
                            overflow: "hidden",
                            bgcolor: "#1e1e1e",
                            color: "#ffffff",
                            display: "flex",
                            flexDirection: "column",
                            height: {
                                xs: 380,
                                md: 440,
                            },
                            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                        }}
                    >
                        {/* Editor Top Bar */}
                        <Box
                            sx={{
                                bgcolor: "#181818",
                                px: { xs: 2, md: 3 },
                                py: 1.5,
                                borderBottom: "1px solid #2d2d2d",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 1,
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ff5f56" }} />
                                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ffbd2e" }} />
                                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#27c93f" }} />
                                <Typography variant="caption" sx={{ ml: 2, color: "#858585", fontFamily: "monospace", fontWeight: "bold" }}>
                                    longest_substring - Shared Workspace
                                </Typography>
                            </Box>

                            {/* Language Selector */}
                            <Select
                                size="small"
                                value={language}
                                onChange={handleLanguageChange}
                                sx={{
                                    fontSize: ".8rem",
                                    color: "#e2e8f0",
                                    height: 32,
                                    minWidth: 130,
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#3a3a3a" },
                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#10b981" },
                                    "& .MuiSvgIcon-root": { color: "#e2e8f0" },
                                }}
                            >
                                {LANGUAGE_OPTIONS.map((opt) => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        {/* Monaco Code Editor Workspace */}
                        <Box sx={{ flexGrow: 1, position: "relative", overflow: "hidden" }}>
                            <Editor
                                height="100%"
                                width="100%"
                                language={language}
                                theme="vs-dark"
                                value={code}
                                onChange={handleEditorChange}
                                options={{
                                    fontSize: 14,
                                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    wordWrap: "on",
                                    padding: { top: 16, bottom: 16 },
                                    smoothScrolling: true,
                                    cursorBlinking: "smooth",
                                    renderLineHighlight: "all",
                                    tabSize: 2,
                                    scrollbar: {
                                        vertical: "auto",
                                        horizontal: "auto",
                                        verticalScrollbarSize: 10,
                                        horizontalScrollbarSize: 10,
                                    },
                                }}
                            />
                        </Box>
                    </Paper>

                    {/* Run Code Button */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                            onClick={handleRunCode}
                            disabled={isRunning}
                            variant="contained"
                            startIcon={<FaPlay size={12} />}
                            sx={{
                                background: "linear-gradient(90deg,#10b981,#059669)",
                                "&:hover": { background: "linear-gradient(90deg,#059669,#047857)" },
                                "&.Mui-disabled": {
                                    background: darkMode ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)",
                                    color: darkMode ? "#64748b" : "#94a3b8",
                                },
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 700,
                                px: 3,
                                py: 1,
                            }}
                        >
                            {isRunning ? "Running..." : "Run Code"}
                        </Button>
                    </Box>

                    {/* Console Output */}
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 2,
                            borderRadius: 4,
                            overflow: "hidden",
                            bgcolor: "#111827",
                            border: "1px solid #2d2d2d",
                        }}
                    >
                        <Box sx={{ bgcolor: "#181818", px: 2.5, py: 1, borderBottom: "1px solid #2d2d2d" }}>
                            <Typography variant="caption" sx={{ color: "#858585", fontFamily: "monospace", fontWeight: "bold" }}>
                                Console Output
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                p: 2,
                                maxHeight: 160,
                                overflowY: "auto",
                                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                fontSize: ".82rem",
                            }}
                        >
                            {consoleOutput.map((line, idx) => (
                                <Typography
                                    key={idx}
                                    sx={{
                                        color: line.type === "error" ? "#f87171" : line.type === "info" ? "#94a3b8" : "#9cdcfe",
                                        fontFamily: "inherit",
                                        fontSize: "inherit",
                                        mb: 0.5,
                                        whiteSpace: "pre-wrap",
                                    }}
                                >
                                    {line.type === "error" ? "✗ " : "> "}
                                    {line.text}
                                </Typography>
                            ))}
                        </Box>
                    </Paper>
                </Paper>
                <Paper
                    sx={{
                        position: {
                            xs: "static",
                            md: "sticky",
                        },
                        top: 24,
                        p: {
                            xs: 1.75,
                            sm: 3,
                            md: 4,
                        },
                        mt: {
                            xs: 2,
                            md: 3,
                        },
                        borderRadius: 3
                    }}
                >
                    <Avatar
                        sx={{
                            width: {
                                xs: 50,
                                sm: 64,
                            },
                            height: {
                                xs: 50,
                                sm: 64,
                            },
                            bgcolor: "#10b981",
                            mb: 2
                        }}
                    >
                        {interview.company?.charAt(0)}
                    </Avatar>
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{ mb: 2 }}
                    >
                        Interview Details
                    </Typography>
                    <Typography
                        component="div"
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: .5,
                                md: 0,
                            },
                            fontSize: ".95rem",
                        }}
                    >
                        <Box component="span" fontWeight={700}>
                            Company
                        </Box>
                        <Box component="span">
                            {interview.company}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                mt: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            <Chip
                                label="Live"
                                color="success"
                                size="small"
                            />
                            <Chip
                                label={interview.mode}
                                size="small"
                                color="primary"
                            />
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: .5,
                                md: 0,
                            },
                            fontSize: ".95rem",
                        }}
                    >
                        <Box component="span" fontWeight={700}>
                            Position
                        </Box>
                        <Box component="span">
                            {interview.position}
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: .5,
                                md: 0,
                            },
                            fontSize: ".95rem",
                        }}
                    >
                        <Box component="span" fontWeight={700}>
                            Type
                        </Box>
                        <Box component="span">
                            {interview.type}
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: .5,
                                md: 0,
                            },
                            fontSize: ".95rem",
                        }}
                    >
                        <Box component="span" fontWeight={700}>
                            Mode
                        </Box>
                        <Box component="span">
                            {interview.mode}
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: .5,
                                md: 0,
                            },
                            fontSize: ".95rem",
                        }}
                    >
                        <Box component="span" fontWeight={700}>
                            Interviewer
                        </Box>
                        <Box component="span">
                            {interview.interviewer}
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: .5,
                                md: 0,
                            },
                            fontSize: ".95rem",
                        }}
                    >
                        <Box component="span" fontWeight={700}>
                            Date
                        </Box>
                        <Box component="span">
                            {interview.date}
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: .5,
                                md: 0,
                            },
                            fontSize: ".95rem",
                        }}
                    >
                        <Box component="span" fontWeight={700}>
                            Time
                        </Box>
                        <Box component="span">
                            {interview.time}
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mb: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: {
                                xs: .5,
                                md: 0,
                            },
                            fontSize: ".95rem",
                        }}
                    >
                        <Box component="span" fontWeight={700}>
                            Duration
                        </Box>
                        <Box component="span">
                            {interview.duration}
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            mt: 3,
                            fontWeight: 800,
                            fontSize: {
                                xs: ".9rem",
                                md: "1rem",
                            },
                            color: "#10b981",
                        }}
                    >
                        <b>Live Timer:</b>
                        {fmt(time)}
                    </Typography>

                    {/* My Notes (candidate's personal scratchpad) */}
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 3,
                            p: { xs: 1.75, sm: 2.5 },
                            borderRadius: 3,
                            bgcolor: darkMode ? "rgba(15,23,42,.4)" : "#f8fafc",
                            border: `1px solid ${darkMode ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)"}`,
                        }}
                    >
                        <Typography fontWeight={800} mb={1.5} fontSize=".95rem">
                            My Notes
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            maxRows={8}
                            placeholder="Jot down your thoughts, approach, or things to mention..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    fontSize: ".85rem",
                                    bgcolor: darkMode ? "rgba(15,23,42,.4)" : "#fff",
                                    "& fieldset": { borderColor: darkMode ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.08)" },
                                    "&:hover fieldset": { borderColor: "#10b981" },
                                    "&.Mui-focused fieldset": { borderColor: "#10b981" },
                                },
                            }}
                        />
                    </Paper>

                    {/* Chat Box */}
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 3,
                            borderRadius: 3,
                            bgcolor: darkMode ? "rgba(15,23,42,.4)" : "#f8fafc",
                            border: `1px solid ${darkMode ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)"}`,
                            display: "flex",
                            flexDirection: "column",
                            height: 260,
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ px: 2, py: 1.3, borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)"}` }}>
                            <Typography sx={{ fontWeight: 800, fontSize: ".9rem" }}>
                                Chat
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2, py: 1.3, display: "flex", flexDirection: "column", gap: 1 }}>
                            {chatMessages.map((msg) => (
                                <Box
                                    key={msg.id}
                                    sx={{
                                        alignSelf: msg.self ? "flex-end" : "flex-start",
                                        maxWidth: "82%",
                                    }}
                                >
                                    {!msg.self && (
                                        <Typography variant="caption" sx={{ color: darkMode ? "#94a3b8" : "#64748b", fontWeight: 700, display: "block", mb: 0.3 }}>
                                            {msg.sender}
                                        </Typography>
                                    )}
                                    <Box
                                        sx={{
                                            px: 1.5,
                                            py: 0.8,
                                            borderRadius: 3,
                                            fontSize: ".82rem",
                                            background: msg.self ? "linear-gradient(90deg,#10b981,#059669)" : undefined,
                                            bgcolor: msg.self ? undefined : darkMode ? "rgba(255,255,255,.06)" : "#fff",
                                            color: msg.self ? "#fff" : darkMode ? "#e2e8f0" : "#0f172a",
                                        }}
                                    >
                                        {msg.text}
                                    </Box>
                                </Box>
                            ))}
                            <div ref={chatEndRef} />
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, p: 1.3, borderTop: `1px solid ${darkMode ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)"}` }}>
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Type a message..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSendChat();
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        fontSize: ".82rem",
                                        "& fieldset": { borderColor: darkMode ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.08)" },
                                        "&:hover fieldset": { borderColor: "#10b981" },
                                        "&.Mui-focused fieldset": { borderColor: "#10b981" },
                                    },
                                }}
                            />
                            <IconButton
                                onClick={handleSendChat}
                                sx={{
                                    bgcolor: "rgba(16,185,129,.15)",
                                    color: "#10b981",
                                    "&:hover": { bgcolor: "rgba(16,185,129,.25)" },
                                }}
                            >
                                <FaPaperPlane size={14} />
                            </IconButton>
                        </Box>
                    </Paper>

                    <Paper
                        sx={{
                            position: {
                                xs: "static",
                                md: "sticky",
                            },
                            top: 24,
                            mt: 3,
                            p: {
                                xs: 1.75,
                                sm: 3,
                                md: 4,
                            },
                            mt: {
                                xs: 2,
                                md: 3,
                            },
                            bgcolor: darkMode
                                ? "rgba(16,185,129,.08)"
                                : "rgba(16,185,129,.04)",
                            border: "1px solid rgba(16,185,129,.18)",
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            fontWeight={800}
                            mb={1}
                        >
                            Interview Instructions
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: ".82rem",
                                    md: ".9rem",
                                },
                                lineHeight: 1.8,
                            }}
                        >
                            • Allow camera and microphone access.
                            • Keep your internet connection stable.
                            • Join from a quiet environment.
                            • Do not refresh or close the page during the interview.
                            • Wait until the interviewer ends the session.
                        </Typography>
                    </Paper>
                </Paper>
            </Box>
        </CandidateLayout>
    );
}