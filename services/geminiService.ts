import { GoogleGenAI } from "@google/genai";
import { Scene } from "../types";

// Helper to convert File to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Ensures a fresh instance is created, respecting the user's selected API key context.
 */
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment, strictly relying on injected key from AI Studio context if available.");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-flow' });
};

/**
 * Step 1: Generate Composite Image
 * Uses gemini-3-pro-image-preview
 */
export const generateCompositeImage = async (
  originalImageBase64: string,
  scene: Scene
): Promise<string> => {
  const ai = getAIClient();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: scene.imagePrompt
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: originalImageBase64
            }
          }
        ]
      },
      config: {
        // We want a 16:9 image to match the video generation aspect ratio
        imageConfig: {
          aspectRatio: "16:9", 
          imageSize: "1K"
        }
      }
    });

    // Extract image from response
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Composite generation failed:", error);
    throw error;
  }
};

/**
 * Step 2: Generate Video
 * Uses veo-3.1-generate-preview
 */
export const generateVeoVideo = async (
  compositeImageBase64: string,
  scene: Scene,
  onProgress: (status: string) => void
): Promise<string> => {
  const ai = getAIClient();

  try {
    onProgress("Initializing video generation model...");
    
    // Start the long-running operation
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-generate-preview',
      prompt: scene.videoPrompt,
      image: {
        imageBytes: compositeImageBase64,
        mimeType: 'image/jpeg',
      },
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });

    onProgress("Rendering physics and lighting (this may take 1-2 minutes)...");

    // Poll until complete
    while (!operation.done) {
      // Wait 5 seconds between polls
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      onProgress("Simulating fluid dynamics...");
      operation = await ai.operations.getVideosOperation({ operation: operation });
      
      // Randomize progress message slightly to keep it alive
      const messages = [
        "Simulating fluid dynamics...",
        "Raytracing particles...",
        "Compositing audio tracks...",
        "Finalizing render..."
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      onProgress(randomMsg);
    }

    // Extract video URI
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("Video generation completed but no URI returned.");
    }

    // Append API key for download if needed (using process.env as per instructions)
    const finalUrl = `${downloadLink}&key=${process.env.API_KEY}`;
    return finalUrl;

  } catch (error) {
    console.error("Video generation failed:", error);
    throw error;
  }
};

export const checkApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    return await window.aistudio.hasSelectedApiKey();
  }
  // Fallback for dev environments where window.aistudio might not be present
  return !!process.env.API_KEY;
};

export const promptApiKeySelection = async (): Promise<void> => {
    if (window.aistudio && window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
    } else {
        alert("AI Studio environment not detected. Please ensure API_KEY is set in environment.");
    }
};