import React from "react";
import { InputProps } from "../../types";

const NativeSelect: React.FC<InputProps<"select">> = ({ value, setValue }) => {
  return (
    <select
      className="bg-stone-950 pl-1 pr-3 py-1 rounded-md w-max border-stone-700 border text-base"
      value={value}
      onChange={setValue}
    >
      <option value="Text">Text</option>
      <option value="File">Image</option>
    </select>
  );
};

export default NativeSelect;
