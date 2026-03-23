import React, { useState } from 'react';

interface InputZoneProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const MAX_CHARS = 2000;

export function InputZone({ onSubmit, isLoading }: InputZoneProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && text.length <= MAX_CHARS) {
      onSubmit(text);
    }
  };

  const isOverLimit = text.length > MAX_CHARS;

  return (
    <div className="mb-12 border-2 border-ink p-6 newspaper-shadow bg-bg relative">
      <div className="absolute top-0 left-0 w-full h-full halftone-bg pointer-events-none"></div>
      <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-tight relative z-10">
        Submit Headline for Analysis
      </h2>
      <form onSubmit={handleSubmit} className="relative z-10">
        <textarea
          aria-label="Headline input"
          className={`w-full h-32 p-4 border ${isOverLimit ? 'border-editorial focus:ring-editorial' : 'border-ink focus:ring-ink'} bg-transparent font-serif text-lg leading-relaxed resize-none focus:outline-none focus:ring-2 mb-4 text-justify`}
          placeholder="Paste any headline or short excerpt here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          maxLength={MAX_CHARS + 100} // Allow slightly over to show error state
        ></textarea>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <span className={`font-mono text-xs ${isOverLimit ? 'text-editorial font-bold' : 'text-ink/70'}`} aria-live="polite">
            {text.length} / {MAX_CHARS} characters {isOverLimit && '(Limit exceeded)'}
          </span>
          <button
            type="submit"
            aria-label="Analyze Vibe"
            disabled={isLoading || !text.trim() || isOverLimit}
            className="w-full sm:w-auto border-2 border-ink bg-transparent text-ink font-mono uppercase font-bold py-2 px-6 transition-colors duration-200 hover:bg-ink hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Vibe'}
          </button>
        </div>
      </form>
    </div>
  );
}
