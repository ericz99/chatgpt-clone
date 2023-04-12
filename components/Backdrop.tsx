import React from "react";
import { motion } from "framer-motion";

type BackdropProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Backdrop({ children, onClick }: BackdropProps) {
  return (
    <motion.div
      onClick={onClick}
      className="absolute top-0 left-0 h-full w-full bg-[#000000e1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
