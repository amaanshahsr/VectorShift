import React from "react";
import NodeContainer from "../components/node/nodeContainer";
import img from "../assets/asset.gif";
import { NodeProps } from "reactflow";

const Surprise: React.FC<NodeProps> = ({ id, data }) => {
  return (
    <NodeContainer title="Surprise" icon="question" handles={[]} id={id}>
      <img src={img} alt="its a surprise" />
    </NodeContainer>
  );
};

export default Surprise;
