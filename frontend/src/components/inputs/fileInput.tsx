import React from "react";
import { InputProps } from "../../types.ts";
import { fileAcceptFormats } from "../../constants/constants.tsx";

const FileInput: React.FC<InputProps<"file">> = ({
  setValue,
  acceptFileType,
}) => {
  return (
    <div className="overflow-hidden relative mt-4 mb-4 rounded-md">
      <input
        type="file"
        onChange={setValue}
        accept={fileAcceptFormats[acceptFileType!]}
        className="block w-full text-sm cursor-pointer bg-stone-950 p-1 text-white
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-0 file:text-sm file:font-semibold
          file:bg-stone-800 file:text-neutral-300
          hover:file:bg-white hover:file:text-stone-950 "
      />
    </div>
  );
};

export default FileInput;
