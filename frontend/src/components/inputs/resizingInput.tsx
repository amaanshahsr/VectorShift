import React, { useEffect, useRef } from "react";
import { InputProps } from "../../types";

const ResizingInput: React.FC<InputProps<"text">> = ({ value, setValue }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // We get the scrollable height of the  input and assign it as the actual height of the input
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.style.height = "auto";
    inputRef.current.style.overflow = "hidden";
    const next = `${inputRef.current.scrollHeight}px`;
    inputRef.current.style.height = next;
    inputRef.current.style.overflow = "auto";
  }, [value, inputRef]);

  console.log("valuess", value);
  return (
    <textarea
      ref={inputRef}
      className="bg-stone-950 resize-none   min-h-16 text-white  rounded-md  p-2"
      value={value as string}
      onChange={setValue}
    />
  );
};

export default ResizingInput;
