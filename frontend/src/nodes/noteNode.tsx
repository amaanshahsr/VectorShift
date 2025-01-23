import React, { useState } from "react";
import NodeContainer, {
  HandlePropsWithOptionalStyles,
} from "../components/node/nodeContainer";
import { Data } from "../types";
import InputSwitcher from "../components/inputs/inputSwticher";
import { Position } from "reactflow";

export interface NoteNodeProps {
  id: string;
  data: Data;
}

const NoteNode: React.FC<NoteNodeProps> = ({ id, data }) => {
  const [note, setNote] = useState("Purely For Documentation Purposes");

  const handleInputChange = (e: { target: { value: string } }) => {
    setNote(e?.target?.value);
  };
  const handles: HandlePropsWithOptionalStyles[] = [
    { type: "target", position: Position?.Left, id: `${id}-value` },
  ];
  return (
    <NodeContainer id={id} icon="note" title="Note" handles={handles}>
      <InputSwitcher
        type="text"
        label="LLM Details"
        setValue={handleInputChange}
        value={note}
      />
    </NodeContainer>
  );
};

export default NoteNode;
