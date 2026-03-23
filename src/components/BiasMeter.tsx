import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface BiasMeterProps {
  rating: string;
}

export function BiasMeter({ rating }: BiasMeterProps) {
  const [rotation, setRotation] = useState(-90);

  useEffect(() => {
    const r = rating.toLowerCase();
    let target = 0;
    
    if (r.includes('far-left') || r.includes('extreme left')) target = -80;
    else if (r.includes('center-left') || r.includes('leans left') || r.includes('leaning left')) target = -30;
    else if (r.includes('left')) target = -60;
    else if (r.includes('far-right') || r.includes('extreme right')) target = 80;
    else if (r.includes('center-right') || r.includes('leans right') || r.includes('leaning right')) target = 30;
    else if (r.includes('right')) target = 60;
    else target = 0; // Neutral, Center, or unknown

    // Animate to target
    setRotation(target);
  }, [rating]);

  return (
    <div className="flex flex-col items-center justify-center my-8 p-6 border-y border-ink">
      <h3 className="font-mono text-sm uppercase tracking-widest mb-6 font-bold">
        Fig 1.1: Bias Meter
      </h3>
      <div className="relative w-64 h-32 overflow-hidden">
        {/* SVG Gauge */}
        <svg viewBox="0 0 200 100" className="absolute top-0 left-0 w-full h-full">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#333333" />
              <stop offset="50%" stopColor="#999999" />
              <stop offset="100%" stopColor="#333333" />
            </linearGradient>
          </defs>
          {/* Background Arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="#111111"
            strokeWidth="20"
          />
          {/* Gradient Arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="16"
          />
        </svg>

        {/* Labels */}
        <div className="absolute bottom-2 left-4 font-mono text-xs font-bold bg-bg px-1">LEFT</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs font-bold bg-bg px-1">CENTER</div>
        <div className="absolute bottom-2 right-4 font-mono text-xs font-bold bg-bg px-1">RIGHT</div>

        {/* Needle */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-1 h-28 bg-editorial origin-bottom -translate-x-1/2 rounded-t-full z-10"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.5 }}
        >
          <div className="absolute -bottom-2 -left-1.5 w-4 h-4 rounded-full bg-editorial"></div>
        </motion.div>
      </div>
      <div className="mt-4 font-display text-xl font-bold uppercase tracking-tight">
        {rating}
      </div>
    </div>
  );
}
