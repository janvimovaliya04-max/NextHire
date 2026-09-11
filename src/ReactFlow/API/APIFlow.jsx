import { useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemeColors from "../../hooks/useThemeColors";

import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    Handle,
    Position,
    useNodesState,
    useEdgesState,
    addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes } from "./nodes";
import initialEdges from "./edges";

const CustomNode = ({ data, type }) => {
    const isInput = type === "input";

    return (
        <div
            className={`custom-flow-node ${
                isInput ? "start-node" : ""
            }`}
        >
            {!isInput && (
                <Handle
                    type="target"
                    position={Position.Top}
                    className="custom-handle"
                />
            )}

            <div className="node-content">
                <div className="node-dot" />
                <span>{data.label}</span>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                className="custom-handle"
            />
        </div>
    );
};

const nodeTypes = {
    default: CustomNode,
    input: CustomNode,
};

const APIFlow = () => {
    const { darkMode } = useTheme();
    const colors = useThemeColors();

    const primary = colors.primary;
    const textColor = colors.text;
    const borderStyle = colors.border;
    const background = colors.background;
    const card = colors.card;
    const subText = colors.subText;

    const [nodes, setNodes, onNodesChange] =
        useNodesState(initialNodes);

    const [edges, setEdges, onEdgesChange] =
        useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection) => {
            setEdges((currentEdges) =>
                addEdge(
                    {
                        ...connection,
                        animated: true,
                    },
                    currentEdges
                )
            );
        },
        [setEdges]
    );

    return (
        <div
            className="api-flow-wrapper"
            style={{
                "--flow-primary": primary,
                "--flow-text": textColor,
                "--flow-border": borderStyle,
                "--flow-background": background,
                "--flow-card": card,
                "--flow-sub-text": subText,
            }}
        >
            <style>{`
                /* MAIN FLOW CONTAINER */
                .api-flow-wrapper {
                    width: 100%;
                    height: calc(100vh - 80px);
                    min-height: 600px;
                    position: relative;
                    overflow: hidden;
                    background: var(--flow-background);
                }

                /* REACT FLOW */
                .api-flow-wrapper .react-flow {
                    width: 100%;
                    height: 100%;
                }

                /* CUSTOM NODE */
                .api-flow-wrapper .custom-flow-node {
                    width: 250px;
                    min-width: 250px;
                    min-height: 58px;
                    box-sizing: border-box;
                    padding: 14px 18px;
                    background: var(--flow-card);
                    border: 2px solid var(--flow-primary);
                    border-radius: 14px;
                    box-shadow:
                        0 6px 18px color-mix(
                            in srgb,
                            var(--flow-primary) 12%,
                            transparent
                        );
                    color: var(--flow-text);
                    font-size: 14px;
                    font-weight: 600;
                    text-align: center;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        border-color 0.2s ease;
                }

                .api-flow-wrapper .custom-flow-node:hover {
                    transform: translateY(-3px);
                    border-color: var(--flow-primary);
                    box-shadow:
                        0 10px 25px color-mix(
                            in srgb,
                            var(--flow-primary) 20%,
                            transparent
                        );
                }

                /* START NODE */
                .api-flow-wrapper .start-node {
                    width: 180px;
                    min-width: 180px;
                    min-height: 58px;
                    background: var(--flow-primary);
                    border-color: var(--flow-primary);
                    color: #ffffff;
                    border-radius: 16px;
                    box-shadow:
                        0 8px 20px color-mix(
                            in srgb,
                            var(--flow-primary) 25%,
                            transparent
                        );
                }

                .api-flow-wrapper .start-node .node-dot {
                    background: #ffffff;
                }

                /* NODE CONTENT */
                .api-flow-wrapper .node-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    width: 100%;
                    white-space: normal;
                    overflow-wrap: anywhere;
                    word-break: break-word;
                }

                .api-flow-wrapper .node-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--flow-primary);
                    flex-shrink: 0;
                }

                /* HANDLES */
                .api-flow-wrapper .custom-handle {
                    width: 9px;
                    height: 9px;
                    background: var(--flow-primary);
                    border: 2px solid var(--flow-card);
                    box-shadow:
                        0 0 0 1px var(--flow-primary);
                }

                .api-flow-wrapper .start-node .custom-handle {
                    background: #ffffff;
                    box-shadow:
                        0 0 0 1px #ffffff;
                }

                /* EDGES */
                .api-flow-wrapper .react-flow__edge-path {
                    stroke: var(--flow-sub-text);
                    stroke-width: 2;
                    transition:
                        stroke 0.2s ease,
                        stroke-width 0.2s ease;
                }

                .api-flow-wrapper
                .react-flow__edge:hover
                .react-flow__edge-path {
                    stroke: var(--flow-primary);
                    stroke-width: 3;
                }

                /* EDGE LABEL */
                .api-flow-wrapper .react-flow__edge-text {
                    fill: var(--flow-sub-text);
                    font-size: 11px;
                    font-weight: 600;
                }

                .api-flow-wrapper .react-flow__edge-textbg {
                    fill: var(--flow-card);
                    fill-opacity: 0.95;
                }

                /* CONTROLS */
                .api-flow-wrapper .react-flow__controls {
                    border: 1px solid var(--flow-border);
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow:
                        0 5px 15px color-mix(
                            in srgb,
                            var(--flow-text) 8%,
                            transparent
                        );
                    position: absolute;
                    left: 20px;
                    bottom: 20px;
                    z-index: 10;
                }

                .api-flow-wrapper .react-flow__controls-button {
                    width: 34px;
                    height: 34px;
                    background: var(--flow-card);
                    border-bottom: 1px solid var(--flow-border);
                    color: var(--flow-text);
                }

                .api-flow-wrapper
                .react-flow__controls-button:hover {
                    background: color-mix(
                        in srgb,
                        var(--flow-primary) 8%,
                        var(--flow-card)
                    );
                    color: var(--flow-primary);
                }

                /* MINIMAP */
                .api-flow-wrapper .react-flow__minimap {
                    border: 1px solid var(--flow-border);
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow:
                        0 5px 15px color-mix(
                            in srgb,
                            var(--flow-text) 8%,
                            transparent
                        );
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    z-index: 10;
                }

                /* BACKGROUND */
                .api-flow-wrapper .react-flow__background {
                    background: var(--flow-background);
                }

                /* SELECTED NODE */
                .api-flow-wrapper
                .react-flow__node.selected
                .custom-flow-node {
                    border-color: var(--flow-primary);
                    box-shadow:
                        0 0 0 3px color-mix(
                            in srgb,
                            var(--flow-primary) 15%,
                            transparent
                        ),
                        0 10px 25px color-mix(
                            in srgb,
                            var(--flow-primary) 18%,
                            transparent
                        );
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .api-flow-wrapper {
                        height: calc(100vh - 70px);
                        min-height: 500px;
                    }

                    .api-flow-wrapper .custom-flow-node {
                        min-width: 150px;
                        padding: 11px 14px;
                        font-size: 12px;
                    }

                    .api-flow-wrapper .start-node {
                        min-width: 125px;
                    }
                }
            `}</style>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                nodesDraggable
                nodesConnectable
                edgesReconnectable
                deleteKeyCode={["Backspace", "Delete"]}
            >
                <Background gap={18} size={1} />

                <Controls />

                <MiniMap
                    nodeColor={primary}
                    maskColor={
                        darkMode
                            ? "rgba(15,23,42,0.75)"
                            : "rgba(248,250,252,0.75)"
                    }
                />
            </ReactFlow>
        </div>
    );
};

export default APIFlow;