import React from "react";
import ResizingInput from "./resizingInput";
import NativeSelect from "./nativeSelect";
import FileInput from "./fileInput";
import { InputSwitcherProps } from "../../types";

const InputSwitcher: React.FC<
  InputSwitcherProps<"select" | "text" | "file">
> = ({ value, setValue, label, type, acceptFileType }) => {
  return (
    <label className="flex flex-col mb-3 rounded-md p-2 shadow-sm shadow-stone-400 bg-stone-800">
      <span className="inline-block mb-2 text-zinc-50 text-base ">{label}</span>
      {type === "text" ? (
        <ResizingInput
          value={value as string}
          setValue={setValue as InputSwitcherProps<"text">["setValue"]}
        />
      ) : type === "file" ? (
        <FileInput
          acceptFileType={acceptFileType}
          setValue={setValue as InputSwitcherProps<"file">["setValue"]}
          value={value as InputSwitcherProps<"file">["value"]}
        />
      ) : (
        <NativeSelect
          value={value as string}
          setValue={setValue as InputSwitcherProps<"text">["setValue"]}
        />
      )}
    </label>
  );
};

export default InputSwitcher;
