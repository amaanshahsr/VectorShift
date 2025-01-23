// draggableNode.js

import { motion } from "motion/react";
import { ReactNode } from "react";

interface DraggableNodeProps {
  type: string;
  icon: ReactNode;
  index: number;
  label: string;
}

export const DraggableNode: React.FC<DraggableNodeProps> = ({
  type,
  label,
  icon,
  index,
}) => {
  console.log("variants", index);
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    // Cast event.target to HTMLDivElement to access the style property

    if ("dataTransfer" in event) {
      // Handle drag events
      const appData = { nodeType };
      event.dataTransfer.setData(
        "application/reactflow",
        JSON.stringify(appData)
      );
      event.dataTransfer.effectAllowed = "move";
    }
    const target = event.target as HTMLDivElement;
    target.style.cursor = "grabbing";
  };

  function onDragEnd(event: React.DragEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement;
    target.style.cursor = "grab";
  }

  const draggableVariants = {
    initial: {
      opacity: 0,
      x: -30,
      transition: { duration: 0.1 },
    },
    animate: (custom: number) => ({
      border: "1px solid black",
      opacity: 1,
      x: 0,
      transition: {
        scale: { delay: 0, duration: 0.1, ease: "easeInOut" },

        delay: custom * 0.086,
      },
    }),
    hover: {
      scale: 0.97,
      border: `1px solid #292524`,
      backgroundColor: "#1c1917",
      transition: { delay: 0, duration: 0.1, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={draggableVariants}
      initial="initial"
      draggable="true"
      animate="animate"
      whileHover="hover"
      custom={index}
      className={`${type} min-w-20 h-16 flex gap-2 items-center rounded-md group justify-center bg-stone-800  flex-col`}
      onDragStart={(event) =>
        onDragStart(event as unknown as React.DragEvent<HTMLDivElement>, type)
      }
      onDragEnd={(event) =>
        onDragEnd(event as unknown as React.DragEvent<HTMLDivElement>)
      }
      style={{
        cursor: "grab",
      }}
    >
      {icon}
      <span className=" font-sans text-stone-200 text-sm font-medium text-center">
        {label}
      </span>
    </motion.div>
  );
};
