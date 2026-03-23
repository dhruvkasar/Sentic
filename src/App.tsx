import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { AnimatePresence } from 'motion/react';
import { Masthead } from './components/Masthead';
import { Ticker } from './components/Ticker';
import { InputZone } from './components/InputZone';
import { AnalysisResult as AnalysisResultComponent } from './components/AnalysisResult';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { analyzeHeadline, AnalysisResult } from './services/ai';
import { audioService } from './utils/audio';
import { Download, Volume2, VolumeX } from 'lucide-react';

const LOADING_MESSAGES = [
  "Consulting the Editor...",
  "Checking Sources...",
  "Running the Presses...",
  "Analyzing Sentiments...",
  "Fact-Checking Claims...",
  "Formatting Layout..."
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [headline, setHeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [error, setError] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      interval = window.setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setLoadingMsgIdx(0);
    setError('');
    setHeadline(text);
    
    if (!isAudioPlaying) {
      audioService.play();
      setIsAudioPlaying(true);
    }

    try {
      const res = await analyzeHeadline(text);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze headline. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      audioService.stop();
      setIsAudioPlaying(false);
    } else {
      audioService.play();
      setIsAudioPlaying(true);
    }
  };

  const handleExport = async () => {
    if (!printRef.current) return;
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: '#F9F9F7',
        logging: false,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `sentic-analysis-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-bg text-ink p-4 md:p-8 lg:p-12 selection:bg-editorial selection:text-bg">
        <div className="max-w-5xl mx-auto">
        {/* Controls */}
        <div className="flex justify-end gap-2 md:gap-4 mb-4">
          <button 
            onClick={toggleAudio}
            className="p-2 border border-ink hover:bg-ink hover:text-bg transition-colors"
            title="Toggle Newsroom Ambient Sound"
          >
            {isAudioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          {result && (
            <button 
              onClick={handleExport}
              className="p-2 border border-ink hover:bg-ink hover:text-bg transition-colors flex items-center gap-2 font-mono text-xs uppercase font-bold"
              title="Export as Newspaper Clipping"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
          )}
        </div>

        <div ref={printRef} className="bg-bg p-4 md:p-8 border-4 md:border-8 border-ink">
          <Masthead />
          <Ticker />
          
          <main>
            {!result && !isLoading && (
              <InputZone onSubmit={handleAnalyze} isLoading={isLoading} />
            )}
            
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-24 border-2 border-ink border-dashed">
                <div className="w-16 h-16 border-4 border-ink border-t-editorial rounded-full animate-spin mb-4"></div>
                <p className="font-mono uppercase tracking-widest font-bold animate-pulse">
                  {LOADING_MESSAGES[loadingMsgIdx]}
                </p>
              </div>
            )}

            {error && (
              <div className="border-4 border-editorial p-6 mb-8 relative bg-bg">
                <div className="absolute top-0 left-0 bg-editorial text-bg font-mono text-xs font-bold uppercase px-2 py-1 -translate-y-full border-x-4 border-t-4 border-editorial">
                  Press Halted
                </div>
                <h3 className="font-display text-2xl font-bold text-editorial uppercase mb-2">Analysis Failed</h3>
                <p className="font-mono text-sm text-ink">{error}</p>
              </div>
            )}

            {result && !isLoading && (
              <AnalysisResultComponent result={result} headline={headline} />
            )}
          </main>
          
          <Footer />
        </div>

        {/* Action Buttons Outside Print Area */}
        {result && !isLoading && (
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setResult(null);
                setHeadline('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border-2 border-ink bg-transparent text-ink font-mono uppercase font-bold py-3 px-8 transition-colors duration-200 hover:bg-ink hover:text-bg"
            >
              Analyze Another Headline
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
