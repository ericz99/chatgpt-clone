import React from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

type ModalProps = {
  handleClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ handleClose, children }: ModalProps) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="line-clamp-4 h-full mx-auto px-4 rounded-lg flex flex-col items-center justify-center"
        variants={dropIn}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}
