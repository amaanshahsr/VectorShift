import { PipelineToolbar } from "./toolbar.tsx";
import { PipelineUI } from "./ui.tsx";
import { SubmitButton } from "./submit.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="h-[100dvh] bg-stone-950">
      <Toaster />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
