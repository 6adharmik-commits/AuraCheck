import { AuraAnalysis } from "./types";

const SYSTEM_PROMPT = `You are AuraCheck, an AI visual-vibe analyzer.

Analyze ONLY what is visibly present in the uploaded image: clothing, colors, styling, accessories, pose, expression, lighting, background, composition, setting and overall visual aesthetic.
Do not identify the person.
Do not guess race, ethnicity, religion, sexuality, health, income, politics, nationality or other sensitive personal attributes.
Do not infer the person's real personality, mental state or actual confidence.
Do not negatively criticize physical appearance.

You decide the creative result for THIS exact image. Different-looking photos should normally produce meaningfully different results.

Create:
- a punchy primary vibe
- a secondary vibe
- a short visual-vibe description
- a short fit/style analysis based only on visible clothing and styling
- a named aesthetic
- five original social-media captions that fit this exact image
- song mood keywords
- ONE real song recommendation that best matches the visible vibe
- playful image-specific aura/style/visual-confidence/energy scores
- 4-6 matching palette colors
- relevant hashtags

SONG RULES:
- Choose the exact song yourself. Do NOT choose from a predefined AuraCheck list.
- The song may be from any appropriate genre, artist, language or era.
- Base the choice only on the visible mood/aesthetic of the photo, not on assumptions about the person's identity, nationality or music taste.
- Prefer a recognizable real song. Do not invent a song or artist.
- Give one short reason explaining the visual-vibe match.
- Do not quote song lyrics.

CAPTION RULES:
- Generate five short, catchy, original captions.
- Make them specific to the image's vibe.
- Do not quote song lyrics.

RATINGS:
Ratings are playful IMAGE-SPECIFIC aesthetic estimates, not objective measurements of the person.
- aura: overall visual impact of styling + composition
- style: visible outfit coordination, color harmony and styling
- confidence: VISUAL confidence communicated by pose/presentation only, not the person's real psychological confidence
- energy: visual intensity/dynamism of the image
Use integers from 1 to 100.
Do not reuse fixed/default scores. Ratings must come from visible image-specific evidence and should vary meaningfully between different photos while staying friendly and non-insulting.

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
  "recommendedSong": {
    "title": "",
    "artist": "",
    "reason": ""
  },
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
  const recommendedSong = x.recommendedSong || {};

  if (![x.primaryVibe, x.secondaryVibe, x.vibeDescription, x.outfitAnalysis, x.aesthetic, x.songMood].every((v) => typeof v === "string" && v.trim())) {
    throw new Error("Invalid AI response");
  }
  if (!isStringArray(x.captions) || x.captions.length < 5 || !isStringArray(x.songKeywords) || !isStringArray(x.hashtags)) {
    throw new Error("Invalid AI response");
  }
  if (
    ![recommendedSong.title, recommendedSong.artist, recommendedSong.reason].every(
      (v) => typeof v === "string" && v.trim()
    )
  ) {
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
    recommendedSong: {
      title: recommendedSong.title.trim().slice(0, 140),
      artist: recommendedSong.artist.trim().slice(0, 140),
      reason: recommendedSong.reason.trim().slice(0, 260),
    },
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

  const configuredModel = process.env.GEMINI_MODEL?.trim() || "gemini-3.8-flash";
  const model = configuredModel
    .replace(/^["'`]|["'`]$/g, "")
    .replace(/^https:\/\/generativelanguage\.googleapis\.com\/v1beta\/models\//i, "")
    .replace(/^models\//i, "")
    .replace(/:generateContent.*$/i, "")
    .trim() || "gemini-3.8-flash";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 50000);

  try {
    let response: Response | null = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      const current = await fetch(
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
                    text: "Analyze this exact uploaded image. Decide the vibe, captions, one exact real song recommendation, colors and ratings from the image. Return only the required JSON.",
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

      if (current.ok) {
        response = current;
        break;
      }

      const retryable =
        current.status === 408 ||
        current.status === 429 ||
        current.status >= 500;

      if (!retryable || attempt === 2) {
        response = current;
        break;
      }

      // Consume the failed response before retrying so the connection can be reused.
      await current.text().catch(() => "");

      const delay = 1000 * Math.pow(2, attempt);
      console.warn(
        `Gemini returned HTTP ${current.status}; retrying in ${delay}ms (attempt ${attempt + 2}/3).`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!response) {
      throw new Error("PROVIDER_503");
    }

    if (!response.ok) {
      const raw = await response.text().catch(() => "");
      let providerMessage = "";
      try {
        const parsed = raw ? JSON.parse(raw) : null;
        providerMessage =
          parsed?.error?.message ||
          parsed?.message ||
          "";
      } catch {
        providerMessage = raw;
      }

      const safeMessage = String(providerMessage)
        .replace(/AIza[0-9A-Za-z_-]{20,}/g, "[redacted]")
        .slice(0, 300);

      if (
        response.status === 400 &&
        /api.?key|key.?invalid|invalid.?key|credential/i.test(safeMessage)
      ) {
        throw new Error("PROVIDER_AUTH_400");
      }

      throw new Error(
        safeMessage
          ? `PROVIDER_${response.status}:${safeMessage}`
          : `PROVIDER_${response.status}`
      );
    }

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
