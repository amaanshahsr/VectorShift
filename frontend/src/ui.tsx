// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  ConnectionLineType,
  ReactFlowInstance,
  Node as NodeType,
} from "reactflow";
import { StoreState, useStore } from "./store";
import { shallow } from "zustand/shallow";
import { nodeTypes } from "./nodes/nodeTypes";
import { motion } from "motion/react";
import "reactflow/dist/style.css";

const gridSize = 30;
const proOptions = { hideAttribution: true };

const selector = (state: StoreState) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID: string, type: string) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };
  const onDrop = useCallback(
    (event: {
      dataTransfer: { getData: (arg0: string) => string };
      preventDefault: () => void;
      clientX: number;
      clientY: number;
    }) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper?.current?.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }
        console.log("typeis", type);

        const position = reactFlowInstance?.project({
          x: event.clientX - (reactFlowBounds?.left ?? 0),
          y: event.clientY - (reactFlowBounds?.top ?? 0),
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode as NodeType);
      }
    },
    [reactFlowInstance]
  );
  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  console.log("Edges->", edges, "Nodes->", nodes);
  return (
    <motion.div ref={reactFlowWrapper} className="w-screen  h-[80vh] ">
      <ReactFlow
        className="dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType={ConnectionLineType?.SmoothStep}
      >
        <Background color="#ffffff" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </motion.div>
  );
};
