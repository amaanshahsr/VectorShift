import CodeNode from "./codeNode";
import CsvNode from "./csvNode";
import { InputNode } from "./inputNode";
import { LLMNode } from "./llmNode";
import NoteNode from "./noteNode";
import { OutputNode } from "./outputNode";
import ScrapeNode from "./scrapeNode";
import SurpriseNode from "./surpriseNode";
import { TextNode } from "./textNode";

// update this object with new nodes as you go

export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  csv: CsvNode,
  note: NoteNode,
  surprise: SurpriseNode,
  webscraper: ScrapeNode,
  code: CodeNode,
};
