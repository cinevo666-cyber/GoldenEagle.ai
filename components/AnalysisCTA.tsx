
import React from 'react';

interface AnalysisCTAProps {
  onAnalyzeClick: () => void;
}

const InitiateIcon = () => (
    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    </svg>
)

export const AnalysisCTA: React.FC<AnalysisCTAProps> = ({ onAnalyzeClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-28 flex items-center justify-center z-30 bg-gradient-to-t from-black/50 to-transparent">
        <button
            onClick={onAnalyzeClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-cyan-300 uppercase tracking-widest transition-all duration-300 ease-in-out bg-slate-900/80 rounded-lg border-2 border-cyan-500/50 hover:border-cyan-400 hover:text-white animate-fadeInUp"
            style={{
                boxShadow: '0 0 10px rgba(0, 209, 255, 0.3)',
            }}
        >
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <InitiateIcon />
            INICIAR ANÁLISE
        </button>
    </div>
  );
};