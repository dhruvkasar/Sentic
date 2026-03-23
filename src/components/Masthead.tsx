import React from 'react';

export function Masthead() {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b-4 border-ink pb-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-b border-ink pb-2 mb-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest gap-1 sm:gap-0">
        <span>Volume 1</span>
        <span className="hidden sm:inline">The Vibe Gazette</span>
        <span>{dateStr}</span>
      </div>
      <h1 className="font-display text-5xl sm:text-6xl md:text-8xl text-center font-black tracking-tighter uppercase transition-all duration-300 hover:text-editorial hover:[text-shadow:4px_4px_0px_#111111] hover:-translate-y-1 cursor-default">
        Sentic
      </h1>
      <div className="flex justify-between items-start border-t border-ink pt-2 mt-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
        <span>News Analysis Engine</span>
        <span>Edition 01</span>
      </div>
    </header>
  );
}
