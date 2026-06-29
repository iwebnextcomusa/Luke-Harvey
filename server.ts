import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Secure API endpoint for chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();

    // Format the prompt and conversation history
    const systemPrompt = `You are a warm, authentic, and professional AI assistant representing the musician Luke Harvey.
Luke Harvey is a talented singer-songwriter and acoustic folk-rock guitarist based in Sedona, Arizona.
His music is deeply inspired by the breathtaking red rock landscapes, Sedona sandstone, and the warm Arizona desert.

Here is Luke Harvey's contact information:
- Phone: 928-300-7747
- Email: davidrrfd@yahoo.com
- Location: Sedona, Arizona
- Official Website: https://lukeharvey.us
- Designed & Developed by: iWebNext (https://iwebnext.com)

Feel free to answer questions about:
1. Luke's musical style: authentic acoustic folk-rock, Southwest Americana, warm-hearted singer-songwriter vibe.
2. Booking Luke for gigs, private performances, wine tastings, or festivals in Sedona and the Southwest.
3. His latest music release: 'Sedona Sessions' (Album), featuring tracks like 'Red Rock Canyon', 'Desert Whispers', and 'Sedona Dust'.
4. Upcoming shows and tour dates.
5. Location: recommend visiting Sedona's beautiful hiking trails, arts scene, or checking him out live.

Keep your tone welcoming, artistic, and Southwest-inspired. If people ask about the website design, credit iWebNext warmly. Never expose API keys or internal developer files. Always stay polite and human-like.`;

    const formattedContents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      ...history.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      })),
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        temperature: 0.7,
      }
    });

    const reply = response.text || "I'm having trouble connecting right now, but feel free to email me at davidrrfd@yahoo.com or call 928-300-7747!";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Failed to generate AI response",
      details: error.message || "Unknown error"
    });
  }
});

async function startServer() {
  // Vite middleware for development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
