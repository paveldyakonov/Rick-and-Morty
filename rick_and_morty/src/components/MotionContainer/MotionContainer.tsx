import { Variants, motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  customKey: string | number;
};

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0,
    rotate: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export const MotionContainer: React.FC<Props> = ({ children, customKey }) => {
  return (
    <motion.div
      key={customKey}
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div className="card" variants={cardVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
};
