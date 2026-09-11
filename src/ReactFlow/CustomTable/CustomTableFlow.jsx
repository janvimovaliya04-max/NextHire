import { useCallback } from "react";
import HRLayout from "../../Layouts/HRLayout";

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
        <div className={`custom-flow-node ${isInput ? "start-node" : ""}`}>
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

const CustomTableFlow = () => {
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
                        type: "smoothstep",
                        animated: true,
                    },
                    currentEdges
                )
            );
        },
        [setEdges]
    );

    return (
        <>
            <HRLayout>
                <div className="custom-table-flow-wrapper">

                  <style>{`
    /* =========================
       MAIN FLOW CONTAINER
    ========================= */

    .custom-table-flow-wrapper {
        width: 100%;
        height: calc(100vh - 80px);
        min-height: 600px;
        position: relative;
        overflow: hidden;
        background: #f8fafc;
    }

    /* =========================
       REACT FLOW
    ========================= */

    .custom-table-flow-wrapper .react-flow {
        width: 100%;
        height: 100%;
    }

    /* =========================
       CUSTOM NODE
    ========================= */

    .custom-flow-node {
        width: 250px;
        min-width: 250px;
        min-height: 58px;
        box-sizing: border-box;

        padding: 14px 18px;

        background: #ffffff;

        border: 2px solid #2563eb;
        border-radius: 14px;

        box-shadow:
            0 6px 18px rgba(37, 99, 235, 0.12);

        color: #1e293b;

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

    .custom-flow-node:hover {
        transform: translateY(-3px);

        border-color: #1d4ed8;

        box-shadow:
            0 10px 25px rgba(37, 99, 235, 0.20);
    }

    /* =========================
       START NODE
    ========================= */

    .start-node {
        width: 180px;
        min-width: 180px;
        min-height: 58px;

        background: #2563eb;
        border-color: #2563eb;

        color: #ffffff;

        border-radius: 16px;

        box-shadow:
            0 8px 20px rgba(37, 99, 235, 0.25);
    }

    .start-node .node-dot {
        background: #ffffff;
    }

    /* =========================
       NODE CONTENT
    ========================= */

    .node-content {
        display: flex;

        align-items: center;
        justify-content: center;

        gap: 9px;

        width: 100%;

        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    .node-dot {
        width: 8px;
        height: 8px;

        border-radius: 50%;

        background: #2563eb;

        flex-shrink: 0;
    }

    /* =========================
       HANDLES
    ========================= */

    .custom-handle {
        width: 9px;
        height: 9px;

        background: #2563eb;

        border: 2px solid #ffffff;

        box-shadow:
            0 0 0 1px #2563eb;
    }

    .start-node .custom-handle {
        background: #ffffff;

        box-shadow:
            0 0 0 1px #ffffff;
    }

    /* =========================
       EDGES
    ========================= */

    .custom-table-flow-wrapper
    .react-flow__edge-path {
        stroke: #64748b;

        stroke-width: 2;

        transition:
            stroke 0.2s ease,
            stroke-width 0.2s ease;
    }

    .custom-table-flow-wrapper
    .react-flow__edge:hover
    .react-flow__edge-path {
        stroke: #2563eb;

        stroke-width: 3;
    }

    /* =========================
       EDGE LABEL
    ========================= */

    .custom-table-flow-wrapper
    .react-flow__edge-text {
        fill: #475569;

        font-size: 11px;

        font-weight: 600;
    }

    .custom-table-flow-wrapper
    .react-flow__edge-textbg {
        fill: #ffffff;

        fill-opacity: 0.95;
    }

    /* =========================
       CONTROLS
    ========================= */

    .custom-table-flow-wrapper
    .react-flow__controls {
        border: 1px solid #e2e8f0;

        border-radius: 10px;

        overflow: hidden;

        box-shadow:
            0 5px 15px rgba(15, 23, 42, 0.08);

        position: absolute;
        left: 20px;
        bottom: 20px;
        z-index: 10;
    }

    .custom-table-flow-wrapper
    .react-flow__controls-button {
        width: 34px;
        height: 34px;

        background: #ffffff;

        border-bottom: 1px solid #e2e8f0;

        color: #334155;
    }

    .custom-table-flow-wrapper
    .react-flow__controls-button:hover {
        background: #eff6ff;

        color: #2563eb;
    }

    /* =========================
       MINIMAP
    ========================= */

    .custom-table-flow-wrapper
    .react-flow__minimap {
        border: 1px solid #e2e8f0;

        border-radius: 10px;

        overflow: hidden;

        box-shadow:
            0 5px 15px rgba(15, 23, 42, 0.08);

        position: absolute;
        right: 20px;
        bottom: 20px;
        z-index: 10;
    }

    /* =========================
       BACKGROUND
    ========================= */

    .custom-table-flow-wrapper
    .react-flow__background {
        background: #f8fafc;
    }

    /* =========================
       SELECTED NODE
    ========================= */

    .custom-table-flow-wrapper
    .react-flow__node.selected
    .custom-flow-node {
        border-color: #1d4ed8;

        box-shadow:
            0 0 0 3px rgba(37, 99, 235, 0.15),
            0 10px 25px rgba(37, 99, 235, 0.18);
    }

    /* =========================
       RESPONSIVE
    ========================= */

    @media (max-width: 768px) {
        .custom-table-flow-wrapper {
            height: calc(100vh - 70px);
            min-height: 500px;
        }

        .custom-flow-node {
            min-width: 150px;
            padding: 11px 14px;
            font-size: 12px;
        }

        .start-node {
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
                        fitViewOptions={{ padding: 0.25 }}
                        nodesDraggable
                        nodesConnectable
                        edgesReconnectable
                        deleteKeyCode={["Backspace", "Delete"]}
                    >
                        <Background gap={18} size={1} />

                        <Controls />

                        <MiniMap
                            nodeColor="#2563eb"
                            maskColor="rgba(248,250,252,0.75)"
                        />
                    </ReactFlow>
                </div>
            </HRLayout>
        </>
    );
};

export default CustomTableFlow;