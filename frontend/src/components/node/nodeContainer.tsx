import React, { CSSProperties, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HandleProps } from "reactflow";
import { NodeHeader } from "./nodeHeader";
import { NodeHandles } from "./nodeHandles";
import { IconType } from "../../Icons/icons";

export interface HandlePropsWithOptionalStyles extends HandleProps {
  style?: CSSProperties | undefined;
  handleName?: string;
}

interface WrapperProps {
  children: ReactNode;
  title: string;
  handles?: HandlePropsWithOptionalStyles[];
  id: string;
  icon: IconType;
}

const NodeContainer: React.FC<WrapperProps> = ({
  children,
  title,
  handles,
  id,
  icon,
}) => {
  // note: bad ux for durations above 0.05 - user is kept waiting
  const containerVariants = {
    initial: {
      filter: `blur(5px)`,
      transition: { duration: 0.04, ease: "easeIn" },
    },
    animate: {
      filter: `blur(0px)`,

      transition: { duration: 0.04, ease: "easeIn" },
    },

    exit: {},
  };

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-72  min-h-20  duration-150  border-zinc-500 hover:border-zinc-400 border bg-stone-950 text-white p-4  rounded-lg flex flex-col"
      >
        <NodeHeader icon={icon} id={id} title={title} />
        <NodeHandles id={id} handles={handles} />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default NodeContainer;
