import { AcceptedFileTypes } from "./constants/constants";

export type Data = {
  id: string;
  nodeType: string;
  outputName?: string;
  outputType?: string;
  text?: string;
  inputName?: string;
  inputType?: string;
};

export interface InputSwitcherProps<T extends "select" | "text" | "file"> {
  type: T;
  label: string;
  acceptFileType?: T extends "file" ? AcceptedFileTypes : never;
  value: T extends "file" ? File | null : string; // If type is 'file', value is File | null, otherwise it's string
  setValue: T extends "file"
    ? (e: React.ChangeEvent<HTMLInputElement>) => void // If type is 'file', setValue should accept File or null
    : (e: { target: { value: string } }) => void; // If type is 'select' or 'text', setValue should accept string
}
export type InputProps<K extends "select" | "text" | "file"> = Omit<
  InputSwitcherProps<K>,
  "type" | "label"
>;

interface NodeProps {
  id: string;
  data: Data;
}
