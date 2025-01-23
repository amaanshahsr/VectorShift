// submit.js
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { Edge as EdgeType, Node as NodeType } from "reactflow";
import { env } from "./environment";

export const SubmitButton = () => {
  async function fetchData() {
    const payload = { nodes: nodes, edges: edges };

    try {
      const response = await fetch(`${env}/pipelines/parse`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          pipeline: JSON.stringify(payload), // Data to be sent
        }),
      });
      const data = await response.json();
      toast.custom((t: any) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-max w-full text-white`}
        >
          <div
            className={`flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg bg-stone-700
           `}
            role="alert"
          >
            <span className="inline-block mr-4">
              {data?.is_dag ? `🎉` : `🚫 `}
            </span>

            <span>
              <strong>No of Edges:</strong> {data?.num_edges},{" "}
              <strong>No of Nodes:</strong> {data?.num_nodes},{" "}
              <strong>
                {data?.is_dag ? "Graph is DAG" : "The Graph is not a DAG"}
              </strong>
            </span>
          </div>
        </div>
      ));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleNotification = () => {
    if (nodes?.length === 0 && edges?.length === 0) {
      toast(`No Nodes or Edges Found!`, {
        icon: "🚦",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      fetchData();
    }
  };

  const selector = (state: { nodes: NodeType[]; edges: EdgeType[] }) => ({
    nodes: state.nodes,
    edges: state.edges,
  });

  const { nodes, edges } = useStore(selector, shallow);

  return (
    <motion.div className="flex items-center justify-center  p-5">
      <motion.button
        initial={{ scale: 0, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: [0.98, 1.1, 0.9, 1] }}
        onClick={handleNotification}
        className="text-black rounded-lg bg-white px-4 py-2"
        type="submit"
      >
        Submit
      </motion.button>
    </motion.div>
  );
};
