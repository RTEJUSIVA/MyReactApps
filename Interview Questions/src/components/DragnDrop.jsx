import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  ReactFlowProvider,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
} from "reactflow";

const initialNodes = [
  {
    id: "1",
    type: "editableNode",
    position: { x: 100, y: 100 },
    data: { label: "Parent Node", tooltip: "" },
  },
  {
    id: "2",
    type: "editableNode",
    position: { x: 400, y: 200 },
    data: { label: "Child Node", tooltip: "" },
  },
];

const initialEdges = [];

const EditableNode = ({ id, data }) => {
  const [label, setLabel] = useState(data.label);

  return (
    <div className="p-2 border rounded shadow-md bg-white relative">
      <Handle type="target" position={Position.Top} />
      <div title={data.tooltip} className="tooltip">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => data.onLabelChange?.(id, label)}
          className="border rounded px-1 py-0.5 text-sm"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, data }) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <BaseEdge
        path={edgePath}
        id={id}
        style={{ strokeWidth: 2 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-id={id}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          {hovered && (
            <div
              className="bg-white border border-gray-300 shadow-md rounded p-2 text-xs"
              dangerouslySetInnerHTML={{
                __html: `
                <table>
                  <tr><td><strong>Ethernet:</strong></td><td>${
                    data?.ethernet ?? "N/A"
                  }</td></tr>
                  <tr><td><strong>Status:</strong></td><td>${
                    data?.status ?? "Unknown"
                  }</td></tr>
                  <tr><td><strong>Nodes:</strong></td><td>${
                    data?.nodes ?? "-"
                  }</td></tr>
                </table>
              `,
              }}
            />
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

const nodeTypes = { editableNode: EditableNode };
const edgeTypes = { custom: CustomEdge };

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-48 p-4 border-r bg-gray-50">
      <div
        className="mb-2 p-2 bg-white border rounded shadow cursor-move"
        onDragStart={(event) => onDragStart(event, "editableNode")}
        draggable
      >
        Editable Node
      </div>
    </aside>
  );
};

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);

  const deleteEdge = (id) => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
    setSelectedEdgeId(null);
  };

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `${params.source}-${params.target}-${Date.now()}`,
        animated: true,
        type: "custom",
        data: {
          ethernet: Math.floor(Math.random() * 1000),
          status: "Online",
          nodes: 2,
        },
      };

      setEdges((eds) => addEdge(newEdge, eds));

      setNodes((nds) => {
        return nds.map((node) => {
          if (node.id === params.source || node.id === params.target) {
            const connectedTo = edges
              .concat(newEdge)
              .filter((e) => e.source === node.id || e.target === node.id)
              .map((e) => (e.source === node.id ? e.target : e.source))
              .filter((id, i, arr) => arr.indexOf(id) === i);

            const tooltip = `Connected to: ${connectedTo
              .map((id) => {
                const n = nds.find((node) => node.id === id);
                return n ? n.data.label : id;
              })
              .join(", ")}`;

            return {
              ...node,
              data: {
                ...node.data,
                tooltip,
              },
            };
          }
          return node;
        });
      });
    },
    [edges, setEdges, setNodes]
  );

  const onLabelChange = (id, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = project({ x: event.clientX, y: event.clientY });
      const newNode = {
        id: `${+new Date()}`,
        type,
        position,
        data: { label: "New Node", tooltip: "", onLabelChange },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onEdgeClick = (event, edge) => {
    event.stopPropagation();
    setSelectedEdgeId(edge.id);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" && selectedEdgeId) {
        deleteEdge(selectedEdgeId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEdgeId]);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 h-full" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes.map((n) => ({
            ...n,
            data: { ...n.data, onLabelChange },
          }))}
          edges={edges.map((e) => ({ ...e, type: "custom" }))}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default function DragnDrop() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}
