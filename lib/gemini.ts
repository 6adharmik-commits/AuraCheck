import { AuraAnalysis } from "./types";

const SYSTEM_PROMPT = `You are AuraCheck, a fashion and aesthetic image analyzer.

Analyze ONLY what is visibly present in the uploaded image: outfit, colors, styling, accessories, pose, lighting, composition, setting and overall visual aesthetic.
Do not identify the person.
Do not guess race, ethnicity, religion, sexuality, health, income, politics or other sensitive personal attributes.
Do not negatively criticize physical appearance.
Do not infer the person's real personality or psychological confidence.

Choose a clear primary vibe and secondary vibe based on THIS image.
Provide a fun, positive, modern Gen-Z style description.
Generate five short social-media captions that fit THIS image.
Determine useful song mood keywords for THIS image.
Provide 4-6 palette colors.

Ratings are playful IMAGE-SPECIFIC aesthetic estimates, not objective measurements of the person.
- aura: overall visual impact of the styling + composition
- style: outfit coordination, color harmony and styling
- confidence: VISUAL confidence communicated by pose/presentation only, not the person's actual mental state
- energy: visual intensity/dynamism of the image
Use integers from 1 to 100.
Do not reuse fixed/default scores. The ratings must be derived from visible image-specific evidence and should be allowed to vary meaningfully from photo to photo while staying friendly and non-insulting.

Return ONLY valid JSON matching this schema:
{
  "primaryVibe": "",
  "secondaryVibe": "",
  "vibeDescription": "",
  "outfitAnalysis": "",
  "aesthetic": "",
  "captions": ["", "", "", "", ""],
  "songMood": "",
  "songKeywords": [],
  "ratings": {"aura": 0, "style": 0, "confidence": 0, "energy": 0},
  "colors": [{"name": "", "hex": ""}],
  "hashtags": []
}
Never wrap the JSON in markdown.`;

const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");
const score = (v: unknown) => typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 100;

export function validateAnalysis(input: unknown): AuraAnalysis {
  if (!input || typeof input !== "object") throw new Error("Invalid AI response");
  const x = input as Record<string, any>;
  const ratings = x.ratings || {};
  const colors = x.colors;

  if (![x.primaryVibe, x.secondaryVibe, x.vibeDescription, x.outfitAnalysis, x.aesthetic, x.songMood].every((v) => typeof v === "string" && v.trim())) {
    throw new Error("Invalid AI response");
  }
  if (!isStringArray(x.captions) || x.captions.length < 5 || !isStringArray(x.songKeywords) || !isStringArray(x.hashtags)) {
    throw new Error("Invalid AI response");
  }
  if (![ratings.aura, ratings.style, ratings.confidence, ratings.energy].every(score)) {
    throw new Error("Invalid AI response");
  }
  if (!Array.isArray(colors) || colors.length < 1 || colors.some((c) => !c || typeof c.name !== "string" || !/^#[0-9a-fA-F]{6}$/.test(c.hex))) {
    throw new Error("Invalid AI response");
  }

  return {
    primaryVibe: x.primaryVibe.trim().slice(0, 80),
    secondaryVibe: x.secondaryVibe.trim().slice(0, 80),
    vibeDescription: x.vibeDescription.trim().slice(0, 700),
    outfitAnalysis: x.outfitAnalysis.trim().slice(0, 1200),
    aesthetic: x.aesthetic.trim().slice(0, 100),
    captions: x.captions.slice(0, 5).map((v: string) => v.trim().slice(0, 180)),
    songMood: x.songMood.trim().slice(0, 160),
    songKeywords: x.songKeywords.slice(0, 10).map((v: string) => v.trim().slice(0, 60)),
    ratings: {
      aura: ratings.aura,
      style: ratings.style,
      confidence: ratings.confidence,
      energy: ratings.energy,
    },
    colors: colors.slice(0, 6).map((c: any) => ({
      name: c.name.trim().slice(0, 50),
      hex: c.hex.toUpperCase(),
    })),
    hashtags: x.hashtags.slice(0, 8).map((v: string) => {
      const clean = v.trim().replace(/\s+/g, "");
      return clean.startsWith("#") ? clean.slice(0, 60) : `#${clean.slice(0, 59)}`;
    }),
  };
}

export async function analyzeWithGemini(bytes: Buffer, mimeType: string): Promise<AuraAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error("MISSING_API_KEY");

  const model = process.env.GEMINI_MODEL?.trim() || "gemini-3.8-flash";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 50000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Analyze this exact uploaded image. Make all vibes, captions, soundtrack keywords and ratings image-specific. Return only the required JSON.",
                },
                { inlineData: { mimeType, data: bytes.toString("base64") } },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) throw new Error(`PROVIDER_${response.status}`);

    const payload = await response.json();
    const text = payload?.candidates?.[0]?.content?.parts
      ?.map((part: any) => (typeof part?.text === "string" ? part.text : ""))
      .join("")
      .trim();

    if (!text) throw new Error("EMPTY_AI_RESPONSE");

    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    return validateAnalysis(JSON.parse(cleaned));
  } finally {
    clearTimeout(timer);
  }
}
