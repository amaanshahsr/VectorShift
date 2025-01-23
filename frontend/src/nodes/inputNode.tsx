// inputNode.js

import { useState } from "react";
import { NodeProps, Position } from "reactflow";
import NodeContainer, {
  HandlePropsWithOptionalStyles,
} from "../components/node/nodeContainer.tsx";

import ThemedInput from "../components/inputs/inputSwticher.tsx";

export const InputNode: React.FC<NodeProps> = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputType(e.target.value);
  };

  const handles: HandlePropsWithOptionalStyles[] = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  return (
    <NodeContainer id={id} icon="input" title="Input" handles={handles}>
      <ThemedInput
        type="text"
        label="Name:"
        value={currName}
        setValue={handleNameChange}
      />
      <ThemedInput
        type="select"
        label="Type:"
        value={inputType}
        setValue={handleTypeChange}
      />
    </NodeContainer>
  );
};
