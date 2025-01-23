import React from "react";
import NodeContainer, {
  HandlePropsWithOptionalStyles,
} from "../components/node/nodeContainer";
import { NodeProps, Position } from "reactflow";

const CodeNode: React.FC<NodeProps> = ({ id, data }) => {
  const handles: HandlePropsWithOptionalStyles[] = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  return (
    <NodeContainer title="Code" id={id} icon="code" handles={handles}>
      <code className="block overflow-x-auto text-sm leading-relaxed">
        <pre>
          <span className="text-purple-400">function</span>{" "}
          <span className="text-green-400">helloWorld</span>() {<br />}
          <span className="text-blue-400">console</span>.
          <span className="text-yellow-400">log</span>(
          <span className="text-red-400">'Hello, World!'</span>);
          <br />
        </pre>
      </code>
    </NodeContainer>
  );
};

export default CodeNode;
