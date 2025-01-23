// outputNode.js

import { useState } from "react";
import { NodeProps, Position } from "reactflow";
import NodeContainer, {
  HandlePropsWithOptionalStyles,
} from "../components/node/nodeContainer.tsx";

import ThemedInput from "../components/inputs/inputSwticher.tsx";

export const OutputNode: React.FC<NodeProps> = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );

  const handles: HandlePropsWithOptionalStyles[] = [
    { type: "target", position: Position?.Left, id: `${id}-value` },
  ];
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  const handleNameChange = (e: { target: { value: string } }) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: any) => {
    setOutputType(e.target.value);
  };

  const inputs = [
    {
      type: "text",
      label: "Name:",
      value: currName,
      setValue: handleNameChange,
    },
    {
      type: "select",
      label: "Type:",
      value: outputType,
      setValue: handleTypeChange,
    },
  ];

  return (
    <NodeContainer id={id} icon="output" title="Output" handles={handles}>
      {inputs.map((input, index) => (
        <ThemedInput
          key={index}
          type={input.type as "text" | "select"}
          label={input.label}
          value={input.value}
          setValue={input.setValue}
        />
      ))}
    </NodeContainer>
  );
};
