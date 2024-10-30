import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children, header }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
        >
          <motion.div
            initial={{ y: "-100%", opacity: 0 }} // Start from out of screen (top)
            animate={{ y: 0, opacity: 1 }} // Slide in to the center
            exit={{ y: "-100%", opacity: 0 }} // Slide out to top when closing
            transition={{
              duration: 0.3,
              ease: "easeOut", // Apply ease-out effect
            }}
            onClick={(e: any) => e.stopPropagation()} // Prevent click on modal from closing
            className="bg-light rounded-2xl w-11/12 max-w-lg mx-auto relative max-h-[80%] overflow-x-hidden overflow-y-auto custom-scrollbar"
          >
            {header && header}
            <div className="m-auto p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
