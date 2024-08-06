import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface AnimatedPagesProps {
  children: ReactNode;
}
const AnimatedPages: React.FC<AnimatedPagesProps> = ({ children }) => {
  const animations = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPages;
