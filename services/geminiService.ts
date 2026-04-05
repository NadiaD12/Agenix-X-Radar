import { GoogleGenAI, Type } from "@google/genai";
import { SimulationResponse } from '../types';

// Helper to ensure we always get the latest key from the environment/dialog
const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateMarketingVideo = async (): Promise<string> => {
  const ai = getAiClient();
  
  // Prompt tailored for "Merchant Sales Growth with Agentix Protocol"
  // Visual style: clean, corporate, futuristic data flow.
  const prompt = `
    Cinematic 3D animation of a futuristic global financial grid. 
    Glowing neon blue data lines flow rapidly through 3D floating glass panels representing e-commerce storefronts. 
    A central core labeled "AGENTIX" radiates golden energy, processing thousands of transaction requests per second. 
    Close up on a digital receipt appearing instantly. 
    Professional lighting, 8k resolution, photorealistic, elegant motion, white, dark blue, and gold color palette. 
    Minimalist aesthetic.
  `;

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });

  // Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5s interval
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!uri) {
    throw new Error("Video generation completed but no URI was returned.");
  }

  // Fetch the actual video bytes using the key
  const response = await fetch(`${uri}&key=${process.env.API_KEY}`);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }
  
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const generateAgentSimulation = async (scenario: string): Promise<SimulationResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // Fallback if no API key is present for the demo to still function visually
    return getFallbackSimulation(scenario);
  }

  const ai = getAiClient();

  try {
    // Upgraded to gemini-3-pro-preview with thinking for better simulation logic
    const model = 'gemini-3-pro-preview';
    const prompt = `
      Simulate an autonomous AI Shopping Agent (Consumer Side) interacting with the Agentix Commerce Protocol (Merchant Side) for the following scenario: "${scenario}".
      
      The logs should show the AI Agent querying the Agentix API to find a product, verifying availability, negotiating/selecting the best option, and executing a transaction autonomously.
      
      The output must be a JSON object with:
      - scenarioName: A creative title for the operation (e.g., "Autonomous Procurement: Office Supplies").
      - logs: An array of 4-6 steps. Each step has:
        - timestamp: relative time string (e.g., "+0.02s")
        - type: one of "INFO", "SUCCESS", "WARNING", "ACTION"
        - message: Short description of the event.
        - details: Technical detail (e.g., "Semantic Match Score: 0.98", "Authorized via Agent Wallet").
      - summary: A one sentence summary of the value added.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scenarioName: { type: Type.STRING },
            summary: { type: Type.STRING },
            logs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timestamp: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["INFO", "SUCCESS", "WARNING", "ACTION"] },
                  message: { type: Type.STRING },
                  details: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      const parsed = JSON.parse(response.text) as Partial<SimulationResponse>;
      
      // Validation to ensure logs array exists to prevent UI crashes
      if (!parsed.logs || !Array.isArray(parsed.logs)) {
        console.warn("Gemini response missing logs array:", parsed);
        return getFallbackSimulation(scenario);
      }

      return parsed as SimulationResponse;
    }
    throw new Error("No response text");

  } catch (error) {
    console.error("Gemini simulation failed", error);
    return getFallbackSimulation(scenario);
  }
};

const getFallbackSimulation = (scenario: string): SimulationResponse => {
  // Static fallback data so the UI doesn't break if API key is missing
  return {
    scenarioName: "Agentic Purchase: High-Performance Laptop",
    summary: "Agent autonomously sourced, verified, and purchased item via API.",
    logs: [
      { timestamp: "+0.005s", type: "INFO", message: "Incoming Agent Query", details: "Intent: 'Buy MacBook Pro M3 Max 16in'" },
      { timestamp: "+0.045s", type: "ACTION", message: "Semantic Inventory Search", details: "Scanning merchant catalogs via Vector DB. Match Score: 0.99" },
      { timestamp: "+0.120s", type: "SUCCESS", message: "Stock Locked", details: "Merchant ID: #TechStore_01 | SKU: APPL-MBP-M3" },
      { timestamp: "+0.250s", type: "ACTION", message: "Executing Payment", details: "Protocol: Agentix_Wallet_v2 | Amount: $3,499.00" },
      { timestamp: "+0.600s", type: "SUCCESS", message: "Transaction Finalized", details: "Receipt generated. Shipping logic triggered." }
    ]
  };
};