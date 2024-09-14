"use client";
import classnames from "classnames";
import { motion, type Variants } from "framer-motion";

const bars = [
  "bg-green",
  "bg-yellow",
  "bg-orange",
  "bg-red",
  "bg-purple",
].reverse();

const holder: Variants = {
  show: {
    transition: {
      staggerChildren: 0.1,
      // staggerDirection: -1,
      ease: "backIn",
    },
  },
};

const items: Variants = {
  initial: { width: "100vw" },
  show: {
    width: "0.2rem",
    transition: {
      duration: 1.5,
      ease: "easeIn",
    },
  },
};

export const ColorOverlay = ({
  animateOnMount = true,
}: {
  animateOnMount?: boolean;
}) => {
  return (
    <motion.div
      initial={animateOnMount ? "initial" : "show"}
      animate="show"
      variants={holder}
      className={classnames("fixed left-0 top-0 flex h-screen")}
    >
      {bars.map((bar, i) => (
        <motion.div
          key={bar}
          variants={items}
          className={classnames(bar, "")}
        />
      ))}
    </motion.div>
  );
};
