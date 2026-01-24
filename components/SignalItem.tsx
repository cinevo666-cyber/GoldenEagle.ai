
import React from 'react';
import { AISignal } from '../types';

interface SignalItemProps {
    index: number;
    signal: AISignal;
}

const ConfidenceIcon = () => (
    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

export const SignalItem: React.FC<SignalItemProps> = ({ index, signal }) => {
  return (
    <div 
        className="flex-shrink-0 w-40 h-40 bg-gray-900/70 p-3 border border-cyan-500/30 backdrop-blur-sm flex flex-col justify-between"
        style={{ 
            clipPath: 'polygon(0 10%, 10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
            animation: `fadeInUp 0.5s ${index * 100}ms ease-out backwards`
        }}
    >
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-1.5 text-xs font-bold font-roboto-mono text-green-400">
                <ConfidenceIcon />
                <span>{signal.confidence}%</span>
            </div>
            <span className="text-xs font-roboto-mono text-cyan-400/70">{signal.predictedTime}</span>
        </div>
        
        <div className="text-center">
            <p className="text-xs text-cyan-200 uppercase tracking-wider">ALVO</p>
            <p 
                className="font-bold text-4xl text-white tracking-wider"
                style={{ textShadow: '0 0 10px rgba(0, 209, 255, 0.7)'}}
            >
                {signal.targetMultiplier}
            </p>
        </div>

        <div className="h-1 bg-cyan-500/20 w-full">
            <div className="h-1 bg-cyan-400" style={{width: `${signal.confidence}%`}}></div>
        </div>
    </div>
  );
};