import React from "react";

export default function WarningModal({ open, onClose, warningCount }) {
    if (!open) return null; 

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "8px",
                maxWidth: "400px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}>
                <h2 style={{ color: "#d32f2f", marginTop: 0 }}>Warning! Tab Switch Detected</h2>
                <p style={{ color: "#333" }}>
                    You have switched tabs <strong>{warningCount}</strong> time(s).
                </p>
                <p style={{ fontSize: "14px", color: "#666" }}>
                    Please stay on this tab during the interview process.
                </p>
                <button
                    onClick={onClose}
                    style={{
                        marginTop: "16px",
                        padding: "8px 20px",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    I Understand
                </button>
            </div>
        </div>
    );
}