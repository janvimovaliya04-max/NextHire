import { Link, useLocation } from "react-router-dom";
import InterviewerLayout from "../../Layouts/InterviewerLayout";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Chip,
  Tooltip,
} from "@mui/material";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
  MessageSquareText,
  Play,
  User,
  Send,
  Maximize,
  Minimize,
} from "lucide-react";

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

// Formats seconds elapsed into HH:MM:SS
function formatElapsedTime(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map((unit) => String(unit).padStart(2, "0")).join(":");
}

export default function JoinInterview() {
  const { darkMode } = useTheme();
  const colors = useThemeColors();

  // Colors — fully theme-driven (matches Dashboard / Settings / Evaluations)
  const primaryColor = colors.primary;
  const secondaryColor = colors.secondary || colors.primary;
  const cardBg = colors.card;
  const borderColor = colors.border;
  const subText = colors.subText;
  const textColor = colors.text;

  const location = useLocation();

  // MONACO RELAYOUT
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    setTimeout(() => {
      editor.layout();
    }, 100);
  };

  // Read candidate information from location state, fallback to defaults
  const interviewData = location.state?.interview || {
    candidate: "Janvi",
    position: "Frontend Developer",
  };

  // State management for mock video meeting controls
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    const layoutScroll = document.getElementById("layout-scroll");

    if (layoutScroll) {
      layoutScroll.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, []);

  // Language + code state
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_TEMPLATES.javascript);

  // Console output state
  const [consoleOutput, setConsoleOutput] = useState([
    { type: "info", text: "Console ready. Click 'Run Code' to execute." },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  // Fullscreen state for the coding workspace
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);

  // Re-layout Monaco whenever the fullscreen state flips so it fills
  // its new container correctly instead of keeping stale dimensions.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      editorRef.current?.layout();
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [isEditorFullscreen]);

  // Escape key exits fullscreen
  useEffect(() => {
    if (!isEditorFullscreen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsEditorFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditorFullscreen]);

  // Lock page scroll while fullscreen so only the overlay scrolls
  useEffect(() => {
    if (isEditorFullscreen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isEditorFullscreen]);

  // Interview notes state
  const [notes, setNotes] = useState("");

  // Chat box state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Janvi", text: "Hi! Ready whenever you are.", self: false },
    { id: 2, sender: "You", text: "Great, let's get started.", self: true },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-incrementing interview timer
  const [elapsedSeconds, setElapsedSeconds] = useState(1122); // starts at 00:18:42 to match previous mock value

  useEffect(() => {
    const timerId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerId);
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // ---- Shared building blocks so the workspace looks identical whether
  // it's docked inline or blown up to fullscreen ----

  const editorTopBar = (
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
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", minWidth: 0 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ff5f56", flexShrink: 0 }} />
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ffbd2e", flexShrink: 0 }} />
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#27c93f", flexShrink: 0 }} />
        <Typography
          variant="caption"
          noWrap
          sx={{ ml: 2, color: "#858585", fontFamily: "monospace", fontWeight: "bold" }}
        >
          longest_substring - Shared Workspace
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: primaryColor },
            "& .MuiSvgIcon-root": { color: "#e2e8f0" },
          }}
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>

        {/* Fullscreen Toggle */}
        <Tooltip title={isEditorFullscreen ? "Exit full screen (Esc)" : "Full screen"}>
          <IconButton
            size="small"
            onClick={() => setIsEditorFullscreen((prev) => !prev)}
            sx={{
              color: "#e2e8f0",
              border: "1px solid #3a3a3a",
              borderRadius: 2,
              "&:hover": { borderColor: primaryColor, color: primaryColor },
            }}
          >
            {isEditorFullscreen ? (
              <Minimize fontSize="small" />
            ) : (
              <Maximize fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  const runButton = (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, flexShrink: 0 }}>
      <Button
        onClick={handleRunCode}
        disabled={isRunning}
        variant="contained"
        startIcon={<Play />}
        sx={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          "&:hover": { background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor})` },
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
  );

  const consolePanel = (
    <Paper
      elevation={0}
      sx={{
        mt: 2,
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#111827",
        border: "1px solid #2d2d2d",
        flexShrink: 0,
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
          maxHeight: isEditorFullscreen ? 220 : 160,
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
              wordBreak: "break-word",
            }}
          >
            {line.type === "error" ? "✗ " : "> "}
            {line.text}
          </Typography>
        ))}
      </Box>
    </Paper>
  );

  return (
    <InterviewerLayout>
      {/* Header Metadata banner */}
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          bgcolor: cardBg,
          backdropFilter: "blur(10px)",
          border: `1px solid ${borderColor}`,
        }}
      >
        {/* Left Side */}
        <Box>
          <Typography
            sx={{
              fontWeight: 850,
              letterSpacing: "-.03em",
              fontSize: { xs: "1.7rem", sm: "2rem", md: "2.4rem" },
              color: textColor,
            }}
          >
            Interview Room
          </Typography>
          <Typography sx={{ color: subText, mt: 1 }}>
            Candidate: <b>{interviewData.candidate}</b> • Position: <b>{interviewData.position}</b>
          </Typography>
          <Button
            component={Link}
            to="/hr/candidate-profile-v"
            state={{ applicant: interviewData }}
            startIcon={<User sx={{ fontSize: 16 }} />}
            size="small"
            sx={{
              mt: 1.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.78rem",
              borderRadius: 3,
              px: 1.8,
              py: 0.6,
              color: primaryColor,
              border: `1px solid ${primaryColor}55`,
              "&:hover": { bgcolor: `${primaryColor}0f`, borderColor: primaryColor },
            }}
          >
            View Candidate Profile
          </Button>
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            color: "#fff",
            px: 3.5,
            py: 1.3,
            borderRadius: 3,
            fontWeight: 700,
          }}
        >
          🕒
          <Typography fontWeight={700}>{formatElapsedTime(elapsedSeconds)}</Typography>
        </Box>
      </Paper>

      {/* Workspace Split-Screen Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.4fr", xl: "1.7fr .9fr" },
          alignItems: "start",
          gap: { xs: 3, md: 4 },
          mb: 4,
        }}
      >
        {/* Coding Playground (docked / non-fullscreen render) */}
        {!isEditorFullscreen && (
          <Box>
            <Typography
              sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", sm: "1.4rem" }, mb: 2, color: textColor }}
            >
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
                height: 420,
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              {editorTopBar}

              <Box sx={{ flexGrow: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
                <Editor
                  height="100%"
                  width="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onMount={handleEditorDidMount}
                  onChange={handleEditorChange}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    automaticLayout: true,
                    fontSize: 14,
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    scrollBeyondLastLine: false,
                    wordWrap: "off",
                    padding: { top: 16, bottom: 16 },
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    renderLineHighlight: "all",
                    tabSize: 2,
                    scrollbar: {
                      vertical: "visible",
                      horizontal: "visible",
                      verticalScrollbarSize: 12,
                      horizontalScrollbarSize: 12,
                    },
                  }}
                />
              </Box>



            </Paper>

            {runButton}
            {consolePanel}
          </Box>
        )}

        {/* Placeholder that keeps the grid column reserved while fullscreen is open */}
        {isEditorFullscreen && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 420,
              borderRadius: 4,
              border: `1px dashed ${borderColor}`,
              color: subText,
              fontSize: ".85rem",
            }}
          >
            Code workspace is in full screen — press Esc or the exit icon to return.
          </Box>
        )}

        {/* Right Column — Video / Notes / Chat */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", sm: "1.4rem" }, color: textColor }}>
            Video Meeting
          </Typography>

          {/* Candidate Screen Feed */}
          <Paper
            elevation={6}
            sx={{
              height: { xs: 200, md: 210 },
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              bgcolor: cardBg,
              backdropFilter: "blur(10px)",
              border: `1px solid ${borderColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Avatar
              sx={{
                width: { xs: 54, md: 60 },
                height: { xs: 54, md: 60 },
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                fontSize: "1.6rem",
                fontWeight: "bold",
                boxShadow: 3,
              }}
            >
              {interviewData.company?.charAt(0) || "C"}
            </Avatar>

            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                left: 12,
                bgcolor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                color: "#ffffff",
              }}
            >
              <Typography variant="caption" fontWeight="bold">
                {interviewData.candidate} (Candidate)
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                color: "#fff",
                px: 1.5,
                py: 0.4,
                borderRadius: 5,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              LIVE
            </Box>
          </Paper>

          {/* Interviewer Screen Feed */}
          <Paper
            elevation={6}
            sx={{
              height: { xs: 180, md: 190 },
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              bgcolor: cardBg,
              backdropFilter: "blur(10px)",
              border: `1px solid ${borderColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s",
              flexShrink: 0,
            }}
          >
            {cameraActive ? (
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  boxShadow: 3,
                }}
              >
                RS
              </Avatar>
            ) : (
              <Box sx={{ textAlign: "center", color: subText }}>
                <VideoOff sx={{ fontSize: 36, mb: 1, opacity: 0.7 }} />
                <Typography variant="body2" fontWeight="bold">
                  Camera Off
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                left: 12,
                bgcolor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="caption" fontWeight="bold">
                Rahul Sharma (Interviewer)
              </Typography>
              {!micActive && <MicOff sx={{ fontSize: 14, color: "#f43f5e" }} />}
            </Box>
          </Paper>

          {/* Interview Notes */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 4,
              bgcolor: cardBg,
              border: `1px solid ${borderColor}`,
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: ".95rem", mb: 1.5, color: textColor }}>
              Interview Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={6}
              placeholder="Jot down observations, strengths, and follow-up questions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: ".85rem",
                  color: textColor,
                  bgcolor: colors.input || cardBg,
                  "& fieldset": { borderColor: borderColor },
                  "&:hover fieldset": { borderColor: primaryColor },
                  "&.Mui-focused fieldset": { borderColor: primaryColor },
                },
              }}
            />
          </Paper>


        </Box>



      </Box>

      {/* Chat Box */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          bgcolor: cardBg,
          border: `1px solid ${borderColor}`,
          display: "flex",
          flexDirection: "column",
          height: 260,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Box sx={{ px: 2.5, py: 1.5, borderBottom: `1px solid ${borderColor}`, flexShrink: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: ".9rem", color: textColor }}>Chat</Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            px: 2,
            py: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minHeight: 0,
          }}
        >
          {chatMessages.map((msg) => (
            <Box key={msg.id} sx={{ alignSelf: msg.self ? "flex-end" : "flex-start", maxWidth: "80%" }}>
              {!msg.self && (
                <Typography variant="caption" sx={{ color: subText, fontWeight: 700, display: "block", mb: 0.3 }}>
                  {msg.sender}
                </Typography>
              )}
              <Box
                sx={{
                  px: 1.5,
                  py: 0.8,
                  borderRadius: 3,
                  fontSize: ".82rem",
                  wordBreak: "break-word",
                  background: msg.self ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` : undefined,
                  bgcolor: msg.self ? undefined : darkMode ? "rgba(255,255,255,.06)" : "#f1f5f9",
                  color: msg.self ? "#fff" : textColor,
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))}
          <div ref={chatEndRef} />
        </Box>
        <Box sx={{ display: "flex", gap: 1, p: 1.5, borderTop: `1px solid ${borderColor}`, flexShrink: 0 }}>
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
                color: textColor,
                "& fieldset": { borderColor: borderColor },
                "&:hover fieldset": { borderColor: primaryColor },
                "&.Mui-focused fieldset": { borderColor: primaryColor },
              },
            }}
          />
          <IconButton
            onClick={handleSendChat}
            sx={{
              bgcolor: `${primaryColor}26`,
              color: primaryColor,
              "&:hover": { bgcolor: `${primaryColor}40` },
            }}
          >
            <Send fontSize="small" />
          </IconButton>
        </Box>
      </Paper>

      {/* Meeting Controls Control Tray */}
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          mt: 4,
          maxWidth: "100%",
          mx: "auto",
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: 4,
          bgcolor: cardBg,
          backdropFilter: "blur(10px)",
          border: `1px solid ${borderColor}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          bottom: 16,
          zIndex: 5,
        }}
      >
        {/* Audio/Video Toggle Controls */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <IconButton
            onClick={() => setMicActive(!micActive)}
            sx={{
              bgcolor: micActive ? `${primaryColor}26` : "rgba(244, 63, 94, 0.15)",
              color: micActive ? primaryColor : "#f43f5e",
              "&:hover": { bgcolor: micActive ? `${primaryColor}40` : "rgba(244, 63, 94, 0.25)" },
              borderRadius: 3,
              p: 1.5,
            }}
          >
            {micActive ? <Mic /> : <MicOff />}
          </IconButton>
          <IconButton
            onClick={() => setCameraActive(!cameraActive)}
            sx={{
              bgcolor: cameraActive ? `${primaryColor}26` : "rgba(244, 63, 94, 0.15)",
              color: cameraActive ? primaryColor : "#f43f5e",
              "&:hover": { bgcolor: cameraActive ? `${primaryColor}40` : "rgba(244, 63, 94, 0.25)" },
              borderRadius: 3,
              p: 1.5,
            }}
          >
            {cameraActive ? <Video /> : <VideoOff />}
          </IconButton>
          <IconButton
            sx={{
              bgcolor: darkMode ? "rgba(255,255,255,0.04)" : "#f1f5f9",
              color: primaryColor,
              "&:hover": { bgcolor: darkMode ? "rgba(255,255,255,0.08)" : "#e2e8f0" },
              borderRadius: 3,
              p: 1.5,
            }}
          >
            <MonitorUp />
          </IconButton>
        </Box>

        {/* Action Navigation Controls */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", sm: "auto" }, gap: 2 }}>
          <Button
            component={Link}
            to="/interviewer/feedback"
            state={{ candidateName: interviewData.candidate }}
            variant="contained"
            startIcon={<MessageSquareText sx={{ fontSize: 16 }} />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              "&:hover": { background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor})` },
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              py: 1.2,
              fontSize: "0.875rem",
            }}
          >
            Submit Feedback
          </Button>
          <Button
            component={Link}
            to="/interviewer/assigned-interviews"
            variant="contained"
            startIcon={<PhoneOff />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              "&:hover": {
                background: "linear-gradient(135deg,#dc2626,#b91c1c)",
                boxShadow: "0 6px 20px rgba(244, 63, 94, 0.25)",
              },
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              py: 1.2,
              fontSize: "0.875rem",
              boxShadow: "0 4px 12px rgba(244, 63, 94, 0.15)",
            }}
          >
            Leave Meeting
          </Button>
        </Box>
      </Paper>

      {/* Fullscreen Coding Workspace Overlay */}
      {isEditorFullscreen && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1300,
            bgcolor: darkMode ? "#0b0f19" : "#0f172a",
            display: "flex",
            flexDirection: "column",
            p: { xs: 2, sm: 3 },
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, flexShrink: 0 }}>
            <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#f1f5f9" }}>
              Live Coding Workspace
            </Typography>
            <Tooltip title="Exit full screen (Esc)">
              <IconButton
                onClick={() => setIsEditorFullscreen(false)}
                sx={{
                  color: "#f1f5f9",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: 2,
                  "&:hover": { borderColor: primaryColor, color: primaryColor },
                }}
              >
                <Minimize />
              </IconButton>
            </Tooltip>
          </Box>

          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              bgcolor: "#1e1e1e",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              minHeight: 0,
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          >
            {editorTopBar}

            <Box sx={{ flexGrow: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
              <Editor
                height="100%"
                width="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  automaticLayout: true,
                  fontSize: 14,
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                  scrollBeyondLastLine: false,
                  wordWrap: "off",
                  padding: { top: 16, bottom: 16 },
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  renderLineHighlight: "all",
                  tabSize: 2,
                  scrollbar: {
                    vertical: "visible",
                    horizontal: "visible",
                    verticalScrollbarSize: 12,
                    horizontalScrollbarSize: 12,
                  },
                }}
              />
            </Box>
          </Paper>

          {runButton}
          {consolePanel}
        </Box>
      )}
    </InterviewerLayout>
  );
}