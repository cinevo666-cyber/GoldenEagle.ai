
import React from 'react';
import { SignalItem } from './SignalItem';
import { AISignal } from '../types';

interface SignalListProps {
    signals: AISignal[];
    onNewAnalysis: () => void;
}

export const SignalList: React.FC<SignalListProps> = ({ signals, onNewAnalysis }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-black/50 backdrop-blur-xl border-t-2 border-cyan-500/30 animate-fadeInUp">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-roboto-mono text-lg tracking-widest text-cyan-300">
                        &gt; AI SIGNALS_<span className="animate-ping ml-1">|</span>
                    </h3>
                    <button 
                        onClick={onNewAnalysis}
                        className="bg-cyan-500/20 text-cyan-300 font-bold text-xs py-2 px-4 rounded-lg border border-cyan-500/50 hover:bg-cyan-500/40 transition-colors"
                    >
                        NOVA ANÁLISE
                    </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
                    {signals.map((signal, index) => (
                        <SignalItem key={index} index={index} signal={signal} />
                    ))}
                </div>
            </div>
        </div>
    );
};