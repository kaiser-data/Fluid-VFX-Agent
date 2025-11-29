export interface Scene {
  id: string;
  name: string;
  emoji: string;
  description: string;
  imagePrompt: string;
  videoPrompt: string;
  color: string;
}

export type AppStep = 
  | 'upload' 
  | 'scene-selection' 
  | 'generating-composite' 
  | 'confirm-composite' 
  | 'generating-video' 
  | 'complete';

export interface GenerationStatus {
  message: string;
  progress: number; // 0 to 100
  detail?: string;
}

// Window augmentation for AI Studio key selection
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}