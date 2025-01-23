import React, { useState } from "react";
import { NodeProps, Position } from "reactflow";
import NodeContainer, {
  HandlePropsWithOptionalStyles,
} from "../components/node/nodeContainer";
import InputSwitcher from "../components/inputs/inputSwticher";
import toast from "react-hot-toast";

const CsvNode: React.FC<NodeProps> = ({ id, data }) => {
  const handles: HandlePropsWithOptionalStyles[] = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setFile(e?.target?.files[0]);
      toast(`Uploaded ${e?.target?.files[0]?.name} !`, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <NodeContainer title="CSV" icon="csv" id={id} handles={handles}>
      <InputSwitcher
        type="text"
        acceptFileType="csv"
        label="File"
        value={null}
        setValue={handleFileUpload}
      />
    </NodeContainer>
  );
};

export default CsvNode;
