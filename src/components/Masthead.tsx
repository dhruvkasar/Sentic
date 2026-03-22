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
      <div className="flex justify-between items-end border-b border-ink pb-2 mb-2 font-mono text-xs uppercase tracking-widest">
        <span>Volume 1</span>
        <span>The Vibe Gazette</span>
        <span>{dateStr}</span>
      </div>
      <h1 className="font-display text-6xl md:text-8xl text-center font-black tracking-tighter uppercase">
        Sentic
      </h1>
      <div className="flex justify-between items-start border-t border-ink pt-2 mt-2 font-mono text-xs uppercase tracking-widest">
        <span>News Analysis Engine</span>
        <span>Edition 01</span>
      </div>
    </header>
  );
}
