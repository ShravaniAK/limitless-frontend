import React from 'react';
import { motion } from 'framer-motion';

const LoadingSVG = () => {
  return (
    <motion.svg
      height="64px"
      width="120px"
      viewBox="0 0 60 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <motion.g
        initial={{ pathLength: 0, fill: "transparent", stroke: "#dbb7ff", strokeWidth: 1 }}
        animate={{ fill: ["#fff", "#dbb7ff"], pathLength: 1, transition: { delay: 2, duration: 0.5 } }}
      >
        <motion.polygon
          points="0,0.663 9.401,0.663 15.882,7.146 15.882,14.127 5.307,3.608 5.274,22.969 0,22.969"
          initial={{ pathLength: 0, stroke: "#dbb7ff", strokeWidth: 1 }}
          animate={{
            pathLength: 1,
            transition: { duration: 2, ease: "easeInOut" },
          }}
        />
        <motion.polygon
          points="23.631,22.969 14.232,22.969 7.752,16.485 7.752,9.501 18.327,20.018 18.359,0.662 23.631,0.662"
          initial={{ pathLength: 0, stroke: "#dbb7ff", strokeWidth: 1 }}
          animate={{
            pathLength: 2,
            transition: { duration: 2, ease: "easeInOut", delay: 0.5 },
          }}
        />
      </motion.g>

      {/* Animated text to slide from left to right */}
      <motion.text
        x="0"
        y="8"
        fontSize="8px"
        fontFamily="Arial"
        fontWeight="bold"
        initial={{ x: -30, fill: "transparent" }} // Start position off-screen to the left
        animate={{ x: 28, fill: "#dbb7ff" }} // End position at the desired location with the final color
        transition={{
          x: { duration: 2, ease: "easeInOut" }, // Position transition
          fill: { duration: 2, ease: "easeInOut" }, // Fill color transition
        }}
      >
        OTC
      </motion.text>
      <motion.text
        x="0"
        y="22"
        fontSize="14px"
        fontFamily="Arial"
        fontWeight="bold"
        initial={{ x: +50, fill: "transparent" }} // Start position off-screen to the left
        animate={{ x: 28, fill: "#dbb7ff" }} // End position at the desired location with the final color
        transition={{
          x: { duration: 2, ease: "easeInOut", delay: 0.5 }, // Position transition with delay
          fill: { duration: 2, ease: "easeInOut", delay: 0.5 }, // Fill color transition with delay
        }}
      >
        exus
      </motion.text>
    </motion.svg>
  );
};

export default LoadingSVG;
