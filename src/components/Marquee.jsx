import React from 'react';

const ITEMS = ['Python', 'n8n', 'FastAPI', 'React', 'LLM', 'RAG', 'ERP', 'OPC UA', 'PostgreSQL', 'Docker', 'MQTT', 'OEE'];

const Marquee = () => {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-os-border bg-os-surface py-5">
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-os-surface to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-os-surface to-transparent rtl:bg-gradient-to-r" />
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap ps-10 hover:[animation-play-state:paused]">
        {track.map((name, i) => (
          <span key={`${name}-${i}`} className="font-mono text-sm uppercase tracking-[0.18em] text-os-muted">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
