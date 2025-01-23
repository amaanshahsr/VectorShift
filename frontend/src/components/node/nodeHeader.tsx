import { CloseIcon, iconLookupObject, IconType } from "../../Icons/icons";
import { useStore } from "../../store";
import { motion } from "motion/react";

export const NodeHeader = ({
  title,
  id,
  icon,
}: {
  title: string;
  id: string;
  icon: IconType;
}) => {
  const { deleteNode } = useStore();

  // fuction that will inturn return an SVG, this fun can be invoked with optional tailwind classes, or called directly for unstyled //

  function removeNode() {
    deleteNode(id);
  }

  const headerIcon = iconLookupObject[icon];
  const closeButtonVariants = {
    hover: {
      rotate: "90deg",
      scale: 1.01,
      transition: {
        type: "spring",
        damping: 3,
        mass: 0.3,
        stiffness: 40,
      },
    },
    transition: {
      type: "spring",
      damping: 10,
      mass: 0.5,
      stiffness: 500,
    },
  };
  return (
    <div className="font-medium flex  justify-between items-center gap-3 mb-4">
      <div className="flex items-center gap-3 ">
        {headerIcon("text-lg")}
        <span className="text-lg">{title}</span>
      </div>
      <motion.button
        variants={closeButtonVariants}
        whileHover="hover"
        onClick={removeNode}
        className="bg-stone-700 p-1 rounded-[50%]"
      >
        <CloseIcon />
      </motion.button>
    </div>
  );
};
