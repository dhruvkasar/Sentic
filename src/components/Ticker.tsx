import React from 'react';

export function Ticker() {
  const headlines = [
    "BREAKING: AI Model Predicts Election Outcome with 99% Accuracy",
    "LATEST: Tech Giant Unveils Quantum Processor",
    "UPDATE: Global Markets Rally on Inflation Data",
    "EXCLUSIVE: Inside the Secret Lab Building AGI",
    "ALERT: Major Cybersecurity Breach Affects Millions",
  ];

  return (
    <div className="ticker-wrap border-y-2 border-ink py-1 mb-8 font-mono text-sm uppercase tracking-wider font-bold">
      <div className="ticker">
        {headlines.map((h, i) => (
          <span key={i} className="mx-8">
            {h} <span className="mx-4 text-editorial">•</span>
          </span>
        ))}
        {headlines.map((h, i) => (
          <span key={`dup-${i}`} className="mx-8">
            {h} <span className="mx-4 text-editorial">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
