// toolbar.js

import { DraggableNode } from "./draggableNode";
import {
  CodeIcon,
  FileIcon,
  InputIcon,
  LinkIcon,
  LLMIcon,
  NotesIcon,
  OutputIcon,
  QuestionIcon,
  TextIcon,
} from "./Icons/icons";

export const PipelineToolbar = () => {
  const draggableNodes = [
    { type: "customInput", label: "Input", icon: <InputIcon /> },
    { type: "llm", label: "LLM", icon: <LLMIcon /> },
    { type: "customOutput", label: "Output", icon: <OutputIcon /> },
    { type: "text", label: "Text", icon: <TextIcon /> },
    { type: "csv", label: "CSV", icon: <FileIcon /> },
    { type: "code", label: "Code", icon: <CodeIcon /> },
    { type: "note", label: "Note", icon: <NotesIcon /> },
    { type: "webscraper", label: "Crawler", icon: <LinkIcon /> },
    { type: "surprise", label: "Mystery", icon: <QuestionIcon /> },
  ];

  return (
    <div className="p-3 ">
      <div className=" grid  grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-3 relative">
        {draggableNodes?.map((node, index) => {
          return (
            <DraggableNode
              key={index + node?.label}
              type={node?.type}
              index={index}
              icon={node?.icon}
              label={node?.label}
            />
          );
        })}
      </div>
    </div>
  );
};
