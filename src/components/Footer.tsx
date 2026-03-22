import React, { useState } from 'react';
import { Github, Instagram } from 'lucide-react';

export function Footer() {
  const [open, setOpen] = useState<'aditya' | 'dhruv' | null>(null);

  return (
    <div className="mt-16 pt-6 border-t-2 border-ink text-center font-mono text-xs uppercase tracking-widest text-ink">
      <div>
        Built by{' '}
        <span className="relative inline-block">
          <button 
            onClick={() => setOpen(open === 'aditya' ? null : 'aditya')}
            aria-expanded={open === 'aditya'}
            aria-label="Aditya's social links"
            className="font-bold hover:text-editorial transition-colors underline decoration-editorial underline-offset-4"
          >
            Aditya
          </button>
          {open === 'aditya' && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-ink text-bg p-2 flex gap-4 newspaper-shadow z-50 border border-bg">
              <a href="https://github.com/adimestry" target="_blank" rel="noopener noreferrer" aria-label="Aditya's GitHub" className="hover:text-editorial transition-colors flex items-center gap-1" title="GitHub">
                <Github size={16}/>
              </a>
              <a href="https://www.instagram.com/aditya_mestry_x007/" target="_blank" rel="noopener noreferrer" aria-label="Aditya's Instagram" className="hover:text-editorial transition-colors flex items-center gap-1" title="Instagram">
                <Instagram size={16}/>
              </a>
              {/* Invisible triangle pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink"></div>
            </div>
          )}
        </span>
        {' '}and{' '}
        <span className="relative inline-block">
          <button 
            onClick={() => setOpen(open === 'dhruv' ? null : 'dhruv')}
            aria-expanded={open === 'dhruv'}
            aria-label="Dhruv's social links"
            className="font-bold hover:text-editorial transition-colors underline decoration-editorial underline-offset-4"
          >
            Dhruv
          </button>
          {open === 'dhruv' && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-ink text-bg p-2 flex gap-4 newspaper-shadow z-50 border border-bg">
              <a href="https://github.com/dhruvkasar" target="_blank" rel="noopener noreferrer" aria-label="Dhruv's GitHub" className="hover:text-editorial transition-colors flex items-center gap-1" title="GitHub">
                <Github size={16}/>
              </a>
              <a href="https://www.instagram.com/dhruvvkasar/" target="_blank" rel="noopener noreferrer" aria-label="Dhruv's Instagram" className="hover:text-editorial transition-colors flex items-center gap-1" title="Instagram">
                <Instagram size={16}/>
              </a>
              {/* Invisible triangle pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink"></div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}
