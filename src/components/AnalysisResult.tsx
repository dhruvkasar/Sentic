import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AnalysisResult as ResultType } from '../services/ai';
import { BiasMeter } from './BiasMeter';

interface AnalysisResultProps {
  result: ResultType;
  headline: string;
}

export function AnalysisResult({ result, headline }: AnalysisResultProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    setIsTyping(true);
    
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + result.summary.charAt(i));
      i++;
      if (i >= result.summary.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30); // Typewriter speed

    return () => clearInterval(interval);
  }, [result.summary]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t-4 border-ink pt-8 mt-8"
      id="analysis-result"
    >
      {/* Column 1: Summary & Tone */}
      <div className="md:col-span-2 pr-8 md:border-r border-ink">
        <h2 className="font-display text-4xl md:text-5xl font-black mb-6 leading-none tracking-tighter uppercase">
          Editorial Breakdown
        </h2>
        <div className="mb-6 font-serif text-xl leading-relaxed text-justify">
          <span className="drop-cap">{displayedText.charAt(0)}</span>
          {displayedText.slice(1)}
          {isTyping && <span className="animate-pulse">_</span>}
        </div>
        
        <div className="fleuron"></div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="border border-ink p-4 newspaper-shadow bg-bg">
            <h4 className="font-mono text-xs uppercase tracking-widest mb-2 font-bold border-b border-ink pb-1">Tone</h4>
            <p className="font-display text-2xl font-bold uppercase">{result.tone}</p>
          </div>
          <div className="border border-ink p-4 newspaper-shadow bg-bg">
            <h4 className="font-mono text-xs uppercase tracking-widest mb-2 font-bold border-b border-ink pb-1">Energy Score</h4>
            <p className="font-display text-4xl font-black">{result.energy_score}<span className="text-lg">/100</span></p>
          </div>
        </div>

        <div className="mt-8 border-t border-ink pt-4">
          <h4 className="font-mono text-xs uppercase tracking-widest mb-4 font-bold">Editorial Note</h4>
          <p className="font-serif text-lg italic leading-relaxed text-justify">
            "{result.editorial_note}"
          </p>
        </div>
      </div>

      {/* Column 2: Bias & Keywords */}
      <div className="flex flex-col">
        <div className="bg-ink text-bg p-5 mb-8 relative">
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3 border-b border-bg/30 pb-2">Analyzed Excerpt</h3>
          <div className="font-serif text-sm italic leading-relaxed relative">
            <span className="text-editorial text-3xl absolute -top-2 -left-2 opacity-80 font-display">"</span>
            <p className="line-clamp-6 pl-3 pr-1">
              {headline}
            </p>
            <span className="text-editorial text-3xl absolute -bottom-4 right-0 opacity-80 font-display">"</span>
          </div>
        </div>

        <BiasMeter rating={result.bias_rating} />

        <div className="mt-8">
          <h4 className="font-mono text-xs uppercase tracking-widest mb-4 font-bold border-b border-ink pb-2">Keywords</h4>
          <ul className="list-none p-0 m-0">
            {result.keywords.map((kw, i) => (
              <li key={i} className="font-mono text-sm mb-2 flex items-center">
                <span className="w-2 h-2 bg-editorial mr-2 inline-block"></span>
                {kw}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Timestamp Footer for Export */}
        <div className="mt-auto pt-8">
          <div className="border-t-2 border-ink border-dashed pt-4 flex flex-col gap-1 font-mono text-[10px] text-ink/60 uppercase tracking-widest">
            <span>Published: {new Date().toLocaleString()}</span>
            <span>Sentic Automated Analysis</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
