import React from 'react';

interface MainDisplayProps {
  hasSignals: boolean;
}

export const MainDisplay: React.FC<MainDisplayProps> = ({ hasSignals }) => {
    const animationKey = hasSignals ? 'signals-active' : 'no-signals';

    return (
        <div className="relative h-[calc(100vh-280px)] min-h-[300px] flex flex-col items-center justify-center text-center -mt-8 overflow-hidden">

            <div key={animationKey} className="relative z-10 p-4 flex flex-col items-center justify-center animate-fadeInUp">
                {/* Aetherium Core */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    {/* Particle Background */}
                    <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,209,255,0.3)_0%,rgba(0,209,255,0)_60%)] transition-transform duration-500 ${hasSignals ? 'scale-125' : 'scale-100'}`}></div>
                    
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 animate-[spin-slow_40s_linear_infinite]">
                        <div className="absolute h-full w-full border-2 border-cyan-500/20 rounded-full"></div>
                        <div className="absolute h-2/3 w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-2 border-b-2 border-cyan-400/30 rounded-full"></div>
                    </div>
                     <div className="absolute inset-4 animate-[spin-reverse_30s_linear_infinite]">
                        <div className="absolute h-full w-full border border-cyan-500/20 rounded-full"></div>
                        <div className="absolute h-1/2 w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-l-2 border-r-2 border-cyan-400/30 rounded-full"></div>
                    </div>

                    {/* Central Core */}
                    <div className={`w-20 h-20 md:w-24 md:h-24 bg-slate-900 rounded-full flex items-center justify-center text-cyan-300 backdrop-blur-md animate-[pulse-glow_2s_ease-in-out_infinite] border-2 border-cyan-500/50 transition-all duration-500 ${hasSignals ? 'shadow-[0_0_30px_10px_rgba(0,209,255,0.5)]' : ''}`}>
                         <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                            <path d="M12 2.5l-9.5 5.5v11l9.5 5.5 9.5-5.5v-11L12 2.5zM12 4.6l7.5 4.3v8.2l-7.5 4.3-7.5-4.3v-8.2L12 4.6z"/>
                            <path d="M12 12l-7.5-4.3" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
                            <path d="M12 12l7.5-4.3" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
                             <path d="M12 12v8" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
                        </svg>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest" style={{textShadow: '0 0 10px rgba(0, 209, 255, 0.5)'}}>
                        {hasSignals ? "SYSTEM ONLINE" : "AETHERIUM CORE"}
                    </h2>
                     <h3 className={`font-roboto-mono text-sm tracking-[0.3em] mt-1 ${hasSignals ? 'text-green-400' : 'text-yellow-400'}`}>
                        {hasSignals ? "SIGNALS ACQUIRED" : "AWAITING INPUT"}
                    </h3>
                </div>
            </div>
        </div>
    );
};