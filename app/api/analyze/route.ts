import { NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 10 * 1024 * 1024;

function jsonError(error: string, status: number, code?: string) {
  return NextResponse.json({ error, ...(code ? { code } : {}) }, { status });
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("image");

    if (!(file instanceof File)) {
      return jsonError("Choose a photo first.", 400, "NO_IMAGE");
    }
    if (!ALLOWED.has(file.type)) {
      return jsonError("Please use a JPG, JPEG, PNG, or WEBP image.", 415, "UNSUPPORTED_IMAGE");
    }
    if (file.size <= 0) {
      return jsonError("We couldn't read that photo. Try another one.", 400, "EMPTY_IMAGE");
    }
    if (file.size > MAX_BYTES) {
      return jsonError("That photo is over 10 MB. Choose a smaller image.", 413, "IMAGE_TOO_LARGE");
    }

    // Real uploads must NEVER silently fall back to demo/sample scores.
    // Demo mode is available only through the explicit TRY DEMO button.
    if (!process.env.GEMINI_API_KEY?.trim()) {
      return jsonError(
        "AuraCheck AI isn't connected yet. Add GEMINI_API_KEY in Vercel, then try again.",
        503,
        "AI_NOT_CONFIGURED"
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const analysis = await analyzeWithGemini(bytes, file.type);
    return NextResponse.json({ analysis, demoMode: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message === "MISSING_API_KEY") {
      return jsonError(
        "AuraCheck AI isn't connected yet. Add GEMINI_API_KEY in Vercel, then try again.",
        503,
        "AI_NOT_CONFIGURED"
      );
    }
    if (message === "Invalid AI response" || error instanceof SyntaxError) {
      return jsonError("The AI returned an unreadable result. Please try again.", 502, "INVALID_AI_RESPONSE");
    }
    if (message.includes("aborted") || message.includes("AbortError")) {
      return jsonError("AuraCheck took too long to analyze that photo. Please try again.", 504, "AI_TIMEOUT");
    }
    if (
      message === "PROVIDER_AUTH_400" ||
      message.startsWith("PROVIDER_401") ||
      message.startsWith("PROVIDER_403")
    ) {
      return jsonError(
        "Your Gemini API key is not being accepted. Open Vercel → AuraCheck → Settings → Environment Variables, replace GEMINI_API_KEY with a valid Google AI Studio key, then redeploy.",
        502,
        "AI_AUTH_ERROR"
      );
    }
    if (message.startsWith("PROVIDER_429")) {
      return jsonError("Gemini is rate-limited or out of quota right now. Try again shortly.", 429, "AI_RATE_LIMIT");
    }
    if (message.startsWith("PROVIDER_404")) {
      return jsonError(
        "The configured Gemini model is unavailable. Remove GEMINI_MODEL in Vercel (AuraCheck will use gemini-3.8-flash), then redeploy.",
        502,
        "AI_MODEL_ERROR"
      );
    }
    if (message.startsWith("PROVIDER_400:")) {
      const detail = message.slice("PROVIDER_400:".length).trim();
      return jsonError(
        detail ? `Gemini rejected the request: ${detail}` : "Gemini rejected the request. Check the API configuration.",
        502,
        "AI_BAD_REQUEST"
      );
    }
    if (message.startsWith("PROVIDER_5")) {
      return jsonError("Gemini is temporarily unavailable. Please try again shortly.", 502, "AI_PROVIDER_ERROR");
    }
    if (message.startsWith("PROVIDER_")) {
      return jsonError("The AI service is having trouble right now. Please try again.", 502, "AI_PROVIDER_ERROR");
    }
    if (message === "EMPTY_AI_RESPONSE") {
      return jsonError("The AI didn't return an analysis. Please try again.", 502, "EMPTY_AI_RESPONSE");
    }

    return jsonError("We couldn't analyze that photo. Try another one.", 500, "ANALYSIS_FAILED");
  }
}
