"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      {/* Eye Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 relative"
      >
        {/* Eye Outline */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0 border-4 border-primary/30 rounded-full"
        />

        {/* Eyeball */}
        <motion.div
          animate={{
            x: [-10, 10, -10], // Horizontal movement
            y: [-5, 5, -5], // Vertical movement
            rotate: [0, 360], // Rotation
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-4 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center"
        >
          {/* Pupil */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            {/* Inner Pupil */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-4 h-4 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}