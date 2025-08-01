import React, { useCallback, useEffect, useState, useMemo } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  MarkerType,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

// ✅ Sidebar component for draggable nodes
const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      style={{
        width: 200,
        padding: 10,
        background: "#f4f4f4",
        borderRight: "1px solid #ccc",
        height: "100vh",
      }}
    >
      <h4>Node Types</h4>
      <div
        onDragStart={(e) => onDragStart(e, "customNode")}
        draggable
        style={{
          border: "1px solid #999",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          background: "#fff",
          cursor: "grab",
        }}
      >
        Custom Node
      </div>
    </aside>
  );
};

// ✅ CustomNode with editable input
const CustomNode = ({ data, id }) => {
  const handleChange = (e) => {
    data.onChange(id, e.target.value); // id must be passed here
  };

  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #888",
        borderRadius: 5,
        background: "#fff",
        minWidth: 150,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <input
        type="text"
        value={data.label}
        onChange={handleChange}
        style={{
          width: "100%",
          borderRadius: 4,
          border: "1px solid #ccc",
          padding: "6px",
          fontSize: 14,
          outline: "none",
        }}
        placeholder="Enter text..."
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

// ✅ Tooltip with editable table
const EdgeTooltip = ({ visible, x, y, data, onDataChange }) => {
  if (!visible) return null;

  const updateCell = (rowIdx, colIdx, value) => {
    const newTable = data.table.map((row, i) =>
      row.map((cell, j) => (i === rowIdx && j === colIdx ? value : cell))
    );
    onDataChange({ table: newTable });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: y - 50,
        left: x,
        background: "#fff",
        border: "1px solid #ccc",
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <table>
        <tbody>
          {data.table.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <td key={colIdx}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                    style={{ width: "50px" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const nodeTypes = { customNode: CustomNode };

// ✅ Main Flow component
const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    edgeId: null,
  });

  const onConnect = useCallback(
    (params) => {
      const edgeId = `${params.source}-${params.target}-${Date.now()}`;
      const edge = {
        ...params,
        id: edgeId,
        markerEnd: { type: MarkerType.ArrowClosed },
        data: {
          table: [
            ["", ""],
            ["", ""],
          ],
        },
        style: {
          stroke: "#222", // Default edge color
          strokeWidth: 2,
          cursor: "pointer",
        },
        selectedStyle: {
          stroke: "#f00", // When selected: red
          strokeWidth: 3,
        },
      };
      setEdges((eds) => [...eds, edge]);
    },
    [setEdges]
  );

  const onEdgeMouseEnter = useCallback((event, edge) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: bounds.left + bounds.width / 2,
      y: bounds.top,
      edgeId: edge.id,
    });
  }, []);

  const onEdgeMouseLeave = useCallback(() => {
    setTooltip({ visible: false, x: 0, y: 0, edgeId: null });
  }, []);

  const onEdgeDataChange = (updatedData) => {
    setEdges((eds) =>
      eds.map((e) =>
        e.id === tooltip.edgeId ? { ...e, data: updatedData } : e
      )
    );
  };

  const onSelectionChange = useCallback(({ edges }) => {
    setSelectedEdges(edges || []);
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedEdges.length > 0
      ) {
        const selectedEdgeIds = selectedEdges.map((e) => e.id);
        setEdges((eds) => eds.filter((e) => !selectedEdgeIds.includes(e.id)));
      }
    },
    [selectedEdges]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = event.target.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      const id = `${+new Date()}`;
      const newNode = {
        id,
        type,
        position,
        data: {
          label: "Editable Node",
          // onChange will be injected later
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const nodeTypes = useMemo(
    () => ({
      customNode: CustomNode,
    }),
    []
  );
  const nodesWithCallbacks = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onChange: (id, label) => {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === id ? { ...n, data: { ...n.data, label } } : n
          )
        );
      },
    },
  }));

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }} onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodesWithCallbacks}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeMouseEnter={onEdgeMouseEnter}
          onEdgeMouseLeave={onEdgeMouseLeave}
          onSelectionChange={onSelectionChange}
          onKeyDown={onKeyDown}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>

        <EdgeTooltip
          visible={tooltip.visible}
          x={tooltip.x}
          y={tooltip.y}
          data={
            edges.find((e) => e.id === tooltip.edgeId)?.data || {
              table: [
                ["", ""],
                ["", ""],
              ],
            }
          }
          onDataChange={onEdgeDataChange}
        />
      </div>
    </div>
  );
};

export default Flow;
