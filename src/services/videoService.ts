import { GoogleGenAI } from "@google/genai";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not configured in environment.");
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const videoService = {
  async generateVideo(prompt: string, lessonId: string, title: string) {
    try {
      const ai = getAI();
      console.log(`Generating video for: ${title}`);
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await (ai as any).operations.getVideosOperation({ operation: operation });
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (!videoUri) throw new Error("No video generated");

      // In a real scenario, we'd upload the bytes to a storage bucket or YouTube.
      // Here we simulate the YouTube upload by giving it a mock URL based on the channel
      const mockYoutubeUrl = `https://www.youtube.com/watch?v=mock_${Math.random().toString(36).substr(2, 9)}`;
      
      // Save to Firestore
      const resourceData = {
        lessonId,
        type: 'video',
        title: `${title} (Generated AI Video)`,
        url: mockYoutubeUrl,
        source: 'youtube',
        generated: true,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "resources"), resourceData);
      
      return resourceData;
    } catch (error) {
      console.error("Video Generation Error:", error);
      throw error;
    }
  },

  async getResources(lessonId: string) {
    const q = query(collection(db, "resources"), where("lessonId", "==", lessonId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }
};
