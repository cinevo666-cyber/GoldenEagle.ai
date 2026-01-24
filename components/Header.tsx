
import React, { useMemo } from 'react';
import { useClock } from '../hooks/useClock';

const AetheriumLogo = () => (
    <div className="w-10 h-10 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" stroke="currentColor" strokeWidth="4" fill="none" className="text-cyan-500/50"/>
            <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" stroke="currentColor" strokeWidth="2" fill="none" className="text-cyan-400"/>
        </svg>
         <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-300">
            <path d="M12 2L1 9l11 7 11-7L12 2zm0 10.5L3 8l9-5.5 9 5.5-9 4z"/>
        </svg>
    </div>
)

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const Header: React.FC = () => {
    const clockFormatter = useMemo(() => (date: Date) => date.toLocaleTimeString('pt-BR', {hour12: false}), []);
    const timeString = useClock(clockFormatter);

  return (
    <header className="container mx-auto flex justify-between items-center py-4 border-b-2 border-cyan-500/10">
        <div className="flex items-center gap-4">
            <AetheriumLogo/>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase">AETHERIUM</h1>
        </div>
        <div className="hidden sm:flex items-center gap-3 bg-black/20 text-cyan-300 px-4 py-2 rounded-lg border border-cyan-500/20 font-roboto-mono">
            <ClockIcon />
            <span>{timeString}</span>
        </div>
    </header>
  );
};