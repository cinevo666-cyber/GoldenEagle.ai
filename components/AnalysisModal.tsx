
import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: AnalysisResult | null;
  error: string | null;
}

const LoadingScanner = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-center w-full">
        <div className="relative w-full h-40 bg-black/20 border-2 border-cyan-500/10 rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-400 shadow-[0_0_15px_2px_theme(colors.cyan.400)] animate-[line-scan_2s_infinite_ease-in-out]"></div>
            <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(0, 209, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '1rem 1rem'
            }}></div>
        </div>
        <p className="text-cyan-300 text-lg tracking-widest font-roboto-mono">SCANNING DATA...</p>
    </div>
);


const ResultDisplay: React.FC<{ result: AnalysisResult }> = ({ result }) => (
    <div className="space-y-4 text-left animate-fadeInUp font-roboto-mono text-sm w-full">
        <p><span className="text-cyan-400">&gt; CONFIDENCE:</span> <span className={`font-bold ${result.confidence === 'Alta' ? 'text-green-400' : result.confidence === 'Média' ? 'text-yellow-400' : 'text-red-500'}`}>{result.confidence?.toUpperCase()}</span></p>
        <p><span className="text-cyan-400">&gt; PATTERN_DETECTED:</span> <span className="text-gray-300">{result.pattern}</span></p>
        <div>
            <p className="text-cyan-400">&gt; LAST_MULTIPLIERS:</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {result.lastMultipliers?.map((m, i) => (
                    <span key={i} className="bg-slate-800 text-white font-semibold px-2 py-1 rounded text-xs border border-white/10">{m}</span>
                ))}
            </div>
        </div>
        <div>
            <p className="text-cyan-400">&gt; AI_PREDICTION:</p>
            <div className="mt-1 border-l-2 border-cyan-500/50 pl-3 text-gray-300 space-y-1">
                <p><span className="font-semibold text-gray-400">RANGE:</span> {result.prediction?.range}</p>
                <p><span className="font-semibold text-gray-400">PROBABILITY:</span> {result.prediction?.probability}</p>
                <p><span className="font-semibold text-gray-400">TIMING:</span> {result.prediction?.timing}</p>
            </div>
        </div>
    </div>
);

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, isLoading, result, error }) => {
  if (!isOpen) return null;

  return (
    <div 
        className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}>
      <div 
        className={`bg-slate-900/70 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-full max-w-md mx-auto border border-cyan-500/50 transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
          <h3 className="text-xl font-bold text-white uppercase tracking-widest">SYSTEM ANALYSIS</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>

        <div className="min-h-[300px] flex items-center justify-center">
            {isLoading && <LoadingScanner />}
            {error && <p className="text-yellow-400 text-center bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/50">{error}</p>}
            {result && !error && <ResultDisplay result={result} />}
        </div>
      </div>
    </div>
  );
};