import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Total duration of the splash screen before it triggers onComplete
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Framer Motion variants for the staggered letter reveal
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterAnim = {
    hidden: { y: "120%" },
    show: {
      y: "0%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, // Custom cinematic cubic-bezier
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      exit={{ 
        opacity: 0,
        y: -40,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="flex flex-col items-center">
        {/* Masked Word Reveal */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="flex overflow-hidden pb-4 px-4"
        >
          {"sentic".split("").map((char, i) => (
            <motion.span 
              key={i} 
              variants={letterAnim} 
              className="inline-block text-6xl md:text-8xl lg:text-9xl font-black text-ink uppercase font-serif leading-none"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Elegant Expanding Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.76, 0, 0.24, 1] }}
          className="h-[2px] bg-ink w-full origin-center mt-2"
        />

        {/* Subtitle Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          className="mt-6 font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-ink/60"
        >
          News Analysis Engine
        </motion.div>
      </div>
    </motion.div>
  );
}
