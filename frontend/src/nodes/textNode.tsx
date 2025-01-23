// textNode.js

import { useState } from "react";
import { HandleProps, NodeProps, Position } from "reactflow";
import NodeContainer, {
  HandlePropsWithOptionalStyles,
} from "../components/node/nodeContainer.tsx";
import { curlyRegex } from "../constants/constants.tsx";
import ThemedInput from "../components/inputs/inputSwticher.tsx";

export const TextNode: React.FC<NodeProps> = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{country}}");

  const initialHandle: HandleProps[] = [
    {
      type: "source",
      position: Position?.Right,
      id: `${id}-output`,
    },
  ];

  const [handles, setHandles] =
    useState<HandlePropsWithOptionalStyles[]>(initialHandle);

  const handleTextChange = (e: { target: { value: string } }) => {
    setCurrText(e.target.value);
    if (curlyRegex?.test(e?.target?.value)) {
      generateHandle(e?.target?.value);
    } else {
      setHandles(initialHandle);
    }
  };

  const generateHandle = (input: string) => {
    const variablesInInput = input.match(/{{.*?}}/g)?.map((element) => {
      return element?.replace(/{{|}}/g, "");
    });

    const uniqueValues = variablesInInput?.filter((variable, index, self) => {
      return self?.indexOf(variable) === index;
    });
    const newHandles: HandlePropsWithOptionalStyles[] | undefined =
      uniqueValues?.map((word, index) => {
        return {
          type: "target",
          handleName: word,
          position: Position?.Left,
          id: `${id}-input-${word}`,
          style: { top: `${(100 / (uniqueValues?.length - 1)) * index}%` },
        };
      });
    if (newHandles) {
      setHandles([...initialHandle, ...newHandles]);
    }
  };
  console.log("handles", handles);

  return (
    <NodeContainer id={id} icon="text" title="Text" handles={handles}>
      <ThemedInput
        type="text"
        label="Text:"
        value={currText}
        setValue={handleTextChange}
      />
    </NodeContainer>
  );
};
