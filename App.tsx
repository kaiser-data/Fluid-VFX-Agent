import React, { useState, useEffect, useRef } from 'react';
import { Camera, Film, Upload, Play, Download, Wand2, ChevronRight, AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';
import { Scene, AppStep } from './types';
import { SCENES } from './constants';
import * as geminiService from './services/geminiService';
import Button from './components/Button';
import SceneSelector from './components/SceneSelector';

const App: React.FC = () => {
  // State
  const [step, setStep] = useState<AppStep>('upload');
  const [apiKeyVerified, setApiKeyVerified] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [compositeBase64, setCompositeBase64] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Check API Key on mount
  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    try {
      const hasKey = await geminiService.checkApiKey();
      setApiKeyVerified(hasKey);
    } catch (e) {
      console.error("Error checking API key", e);
    }
  };

  const handleSelectKey = async () => {
    try {
      await geminiService.promptApiKeySelection();
      // Assume success as per prompt instructions, but we can double check
      setApiKeyVerified(true);
      setError(null);
    } catch (e) {
      setError("Failed to select API Key. Please try again.");
    }
  };

  // Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSceneSelect = (scene: Scene) => {
    setSelectedScene(scene);
    setStep('scene-selection'); // Ensure we are on this step or move next logic
  };

  const generateComposite = async () => {
    if (!selectedFile || !selectedScene) return;

    setStep('generating-composite');
    setIsProcessing(true);
    setError(null);
    setStatusMessage("Analyzing photo and blending into scene...");

    try {
      const base64 = await geminiService.fileToBase64(selectedFile);
      const composite = await geminiService.generateCompositeImage(base64, selectedScene);
      
      setCompositeBase64(composite);
      setStep('confirm-composite');
    } catch (err: any) {
      setError(err.message || "Failed to generate composite image.");
      setStep('scene-selection');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateVideo = async () => {
    if (!compositeBase64 || !selectedScene) return;

    setStep('generating-video');
    setIsProcessing(true);
    setError(null);
    setStatusMessage("Initializing fluid dynamics engine...");

    try {
      // Force a key check before video generation as it's expensive/paid
      if (!apiKeyVerified) {
        await handleSelectKey();
      }

      const url = await geminiService.generateVeoVideo(
        compositeBase64, 
        selectedScene,
        (msg) => setStatusMessage(msg)
      );
      
      setVideoUrl(url);
      setStep('complete');
    } catch (err: any) {
      setError(err.message || "Failed to generate video.");
      // Stay on confirm screen so they can retry
      setStep('confirm-composite');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetFlow = () => {
    setStep('upload');
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedScene(null);
    setCompositeBase64(null);
    setVideoUrl(null);
    setError(null);
  };

  // Render Helpers
  const renderApiKeyBanner = () => {
    if (apiKeyVerified) return null;
    return (
      <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4 mb-6 rounded-r">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            <div>
              <p className="font-bold text-yellow-500">Billing Project Required</p>
              <p className="text-sm text-yellow-200">Veo video generation requires a paid Google Cloud project.</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={handleSelectKey}>
            Select Project
          </Button>
        </div>
        <div className="mt-2 text-xs text-yellow-400/60">
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Read billing docs</a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg">
              <Film className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              FluidVFX Agent
            </span>
          </div>
          <div className="text-sm text-slate-400 hidden sm:block">
            Gemini 3 Pro + Veo 3.1
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="w-full max-w-5xl z-10">
          {renderApiKeyBanner()}

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Error</h4>
                <p className="text-sm">{error}</p>
                {error.includes("Requested entity was not found") && (
                   <Button size="sm" variant="danger" className="mt-2" onClick={handleSelectKey}>
                     Reselect API Key
                   </Button>
                )}
              </div>
            </div>
          )}

          {/* STEP 1: Upload */}
          {step === 'upload' && (
            <div className="text-center animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Star in a <span className="text-blue-400">Cinematic</span> Video
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Upload a selfie, pick a chaotic scene, and let AI generate a realistic 10-second blockbuster clip.
              </p>

              <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl p-10 max-w-lg mx-auto hover:border-blue-500/50 transition-colors">
                {previewUrl ? (
                   <div className="relative group">
                     <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover rounded-lg shadow-2xl" />
                     <button 
                       onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                       className="absolute top-2 right-2 bg-black/70 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <RefreshCcw size={16} />
                     </button>
                   </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <div className="bg-slate-700/50 p-4 rounded-full mb-4">
                      <Camera className="h-8 w-8 text-blue-400" />
                    </div>
                    <span className="text-lg font-medium text-white mb-2">Upload your photo</span>
                    <span className="text-sm text-slate-400 mb-6">JPG or PNG, clearly visible face</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    <Button as="span" variant="secondary" icon={<Upload size={18} />}>
                      Select File
                    </Button>
                  </label>
                )}
              </div>

              {previewUrl && (
                <div className="mt-8">
                  <Button 
                    size="lg" 
                    onClick={() => setStep('scene-selection')}
                    icon={<ChevronRight />}
                    className="w-full max-w-xs"
                  >
                    Next: Choose Scene
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Scene Selection */}
          {(step === 'scene-selection' || step === 'generating-composite') && (
            <div className="flex flex-col items-center w-full animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Choose Your Adventure</h2>
                <p className="text-slate-400">Where do you want to go today?</p>
              </div>
              
              <SceneSelector 
                selectedSceneId={selectedScene?.id || null} 
                onSelect={handleSceneSelect} 
              />

              <div className="mt-10 flex gap-4">
                <Button variant="outline" onClick={() => setStep('upload')}>
                  Back
                </Button>
                <Button 
                  size="lg" 
                  disabled={!selectedScene || isProcessing}
                  isLoading={isProcessing}
                  onClick={generateComposite}
                  icon={<Wand2 size={18} />}
                  className="min-w-[200px]"
                >
                  {isProcessing ? 'Compositing...' : 'Generate Preview'}
                </Button>
              </div>
              
              {isProcessing && (
                 <div className="mt-4 text-blue-400 font-mono text-sm animate-pulse">
                   {statusMessage}
                 </div>
              )}
            </div>
          )}

          {/* STEP 3: Confirm Composite */}
          {(step === 'confirm-composite' || step === 'generating-video') && compositeBase64 && (
            <div className="flex flex-col items-center w-full animate-fade-in-up">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">
                  {step === 'generating-video' ? 'Creating Magic...' : 'Preview Composite'}
                </h2>
                <p className="text-slate-400">
                  {step === 'generating-video' 
                    ? 'Veo is generating your video. Do not close this tab.' 
                    : 'This image will be the first frame of your video.'}
                </p>
              </div>

              <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-700">
                <img 
                  src={`data:image/jpeg;base64,${compositeBase64}`} 
                  alt="Composite" 
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isProcessing ? 'opacity-50 scale-105 blur-sm' : 'opacity-100'}`} 
                />
                
                {isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <div className="font-mono text-lg text-white font-bold tracking-wider">{statusMessage}</div>
                    <div className="mt-2 text-sm text-blue-200">This usually takes about 60-90 seconds</div>
                  </div>
                )}
              </div>

              {!isProcessing && (
                <div className="mt-8 flex gap-4">
                  <Button variant="outline" onClick={() => setStep('scene-selection')}>
                    Try Different Scene
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={generateVideo}
                    icon={<Film size={18} />}
                    className="min-w-[200px] shadow-blue-900/50"
                  >
                    Generate Video (Veo)
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Complete */}
          {step === 'complete' && videoUrl && (
            <div className="flex flex-col items-center w-full animate-fade-in-up">
               <div className="flex items-center gap-3 mb-6">
                 <CheckCircle className="text-green-500 h-8 w-8" />
                 <h2 className="text-3xl font-bold">Your Video is Ready!</h2>
               </div>

               <div className="w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-700 mb-8">
                 <video 
                   src={videoUrl} 
                   controls 
                   autoPlay 
                   loop 
                   className="w-full h-full"
                 />
               </div>

               <div className="flex flex-wrap justify-center gap-4">
                 <a href={videoUrl} download="fluid-vfx-generated.mp4" target="_blank" rel="noreferrer">
                   <Button size="lg" icon={<Download size={18} />}>
                     Download Video
                   </Button>
                 </a>
                 <Button variant="outline" size="lg" onClick={resetFlow} icon={<RefreshCcw size={18} />}>
                   Create Another
                 </Button>
               </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-6 text-center text-slate-500 text-sm">
        <p>Built with Google Gemini 3 Pro & Veo 3.1 • React • Tailwind</p>
      </footer>
    </div>
  );
};

export default App;