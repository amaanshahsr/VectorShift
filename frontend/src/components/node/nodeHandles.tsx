import { Handle } from "reactflow";
import { HandlePropsWithOptionalStyles } from "./nodeContainer";
import { useCallback, useEffect } from "react";
import { useUpdateNodeInternals } from "reactflow";
import { defaultHandleStyles } from "../../constants/constants";

export const NodeHandles = ({
  handles,
  id,
}: {
  handles: HandlePropsWithOptionalStyles[] | undefined;
  id: string;
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const updateHandleCount = useCallback(() => {
    updateNodeInternals(id);
  }, [updateNodeInternals]);

  useEffect(() => {
    updateHandleCount();
    console.log("change in handles detected");
  }, [handles, id]);

  return (
    <>
      {handles?.map((handle, index) => (
        <Handle
          key={handle?.id + index?.toString()} // Ensure unique keys for list items
          style={{
            ...handle?.style,
            ...defaultHandleStyles,
          }}
          position={handle?.position}
          type={handle?.type}
          id={handle?.id}
        >
          <div className="absolute text-sm top-full right-[calc(100%+0.25rem)]">
            {handle?.handleName}
          </div>
        </Handle>
      ))}
    </>
  );
};
