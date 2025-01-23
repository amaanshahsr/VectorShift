import React, { useState } from "react";
import InputSwitcher from "../components/inputs/inputSwticher";
import NodeContainer from "../components/node/nodeContainer";
import { NodeProps } from "reactflow";

const ScrapeNode: React.FC<NodeProps> = ({ id, data }) => {
  const [url, setUrl] = useState("");

  const handleUrl = (e: { target: { value: string } }) => {
    setUrl(e?.target?.value);

    if (url) {
      // connect it to a python web scraper, etc...
    }
  };

  return (
    <NodeContainer title="Scrape Web Page" icon="link" id={id} handles={[]}>
      <InputSwitcher
        type="text"
        label="Paste your link below"
        value={null}
        setValue={handleUrl}
      />
    </NodeContainer>
  );
};

export default ScrapeNode;
