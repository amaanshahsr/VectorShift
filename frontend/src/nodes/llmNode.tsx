// llmNode.js

import { NodeProps, Position } from "reactflow";
import NodeContainer, {
  HandlePropsWithOptionalStyles,
} from "../components/node/nodeContainer.tsx";

export const LLMNode: React.FC<NodeProps> = ({ id, data }) => {
  const handles: HandlePropsWithOptionalStyles[] = [
    {
      type: "target",
      position: Position?.Left,
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target",
      position: Position?.Left,
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    {
      type: "source",
      position: Position?.Right,
      id: `${id}-response`,
    },
  ];

  return (
    <NodeContainer id={id} icon="llm" title="LLM" handles={handles}>
      <span>This is a LLM.</span>
    </NodeContainer>
  );
};
