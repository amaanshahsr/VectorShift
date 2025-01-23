// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  NodeChange,
  EdgeChange,
  Connection,
  Edge as EdgeType,
  ConnectionLineType,
  Node as NodeType,
} from "reactflow";

export interface StoreState {
  [x: string]: any;
  nodes: NodeType[];
  edges: EdgeType[];
  deleteNode: (id: string) => void;
  addNode: (node: NodeType) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: EdgeType | Connection) => void;
  updateNodeField: (
    nodeId: string,
    fieldName: string,
    fieldValue: string
  ) => void;
  getNodeID: (type: string) => string;
}

export const useStore = create<StoreState>((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type: string) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  deleteNode: (id: string) => {
    set({
      nodes: [...get()?.nodes?.filter((node) => node?.id !== id)],
      edges: [
        ...get()?.edges?.filter((edge) => {
          return edge.source !== id && edge.target !== id;
        }),
      ],
    });
  },
  addNode: (node: NodeType) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    console.log("chsngesss", changes, get()?.nodes);
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: EdgeType | Connection) => {
    console.log("chsngesss", connection, get().edges);

    set({
      edges: addEdge(
        {
          ...connection,
          type: ConnectionLineType?.SmoothStep,
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId: string, fieldName: string, fieldValue: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
}));
