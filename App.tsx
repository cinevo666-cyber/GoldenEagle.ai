
import React, { useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { SignalList } from './components/SignalList';
import { AnalysisCTA } from './components/AnalysisCTA';
import { AnalysisModal } from './components/AnalysisModal';
import { AnalysisResult, AISignal } from './types';
import { analyzeHistoryImage } from './services/geminiService';
import { MainDisplay } from './components/MainDisplay';
import { Footer } from './components/Footer';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [signals, setSignals] = useState<AISignal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyzeClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsModalOpen(true);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setSignals([]); // Clear old signals on new analysis

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
            const base64Image = (reader.result as string).split(',')[1];
            const result = await analyzeHistoryImage(base64Image);
            if (result.error) {
                setError(result.error);
            } else {
                setAnalysisResult(result);
                // The AI now dictates the signals directly.
                setSignals(result.signals || []); 
            }
        } catch (e) {
            setError('Ocorreu um erro ao analisar a imagem. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Falha ao ler o arquivo de imagem.');
        setIsLoading(false);
      };
    } catch (e)
    {
      setError('Ocorreu um erro inesperado.');
      setIsLoading(false);
    }
     // Reset file input to allow re-uploading the same file
    if(event.target) {
        event.target.value = '';
    }
  };
  
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Add a delay to allow the modal to animate out before clearing content
    setTimeout(() => {
        setAnalysisResult(null);
        setError(null);
        setIsLoading(false);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen text-white p-4 pb-48">
      <Header />
      <main className="container mx-auto mt-4 md:mt-8">
        <MainDisplay hasSignals={signals.length > 0} />
        <Footer />
      </main>
      
      {signals.length > 0 ? (
        <SignalList signals={signals} onNewAnalysis={handleAnalyzeClick} />
      ) : (
        <AnalysisCTA onAnalyzeClick={handleAnalyzeClick} />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <AnalysisModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isLoading={isLoading}
        result={analysisResult}
        error={error}
      />
    </div>
  );
}