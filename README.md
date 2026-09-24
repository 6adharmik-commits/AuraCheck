# AuraCheck

**Upload your look. Discover your vibe.**

AuraCheck is a mobile-first Next.js app that analyzes visible fashion and aesthetic signals in an uploaded image. It returns a primary/secondary vibe, outfit analysis, captions, ratings, a curated soundtrack, dominant colors, hashtags, and a downloadable/shareable result card.

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Lucide React
- Gemini multimodal REST API
- html-to-image
- Browser Canvas API for local color extraction
- localStorage for the latest 10 checks
- PWA manifest + service worker

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.


## Use AuraCheck on your phone

AuraCheck now has a phone-ready development mode and native phone-camera capture.

1. Connect your PC and phone to the **same Wi-Fi**.
2. On the PC, run:

```bash
npm run dev:phone
```

3. In Windows CMD, run `ipconfig` and find the PC's **IPv4 Address** (for example `192.168.1.25`).
4. On the phone, open:

```text
http://YOUR-PC-IP:3000
```

Example: `http://192.168.1.25:3000`

If Windows asks whether Node.js can communicate through the firewall, allow it on **Private networks**.

On phones, **TAKE PHOTO NOW** uses the phone's native camera picker, so taking a fresh photo works when testing over the local Wi-Fi address. For the full installable PWA experience and browser live-camera APIs, deploy AuraCheck over **HTTPS** (for example on Vercel).

### Install on phone after HTTPS deployment

- **Android / Chrome:** open AuraCheck → browser menu → **Install app** / **Add to Home screen**.
- **iPhone / Safari:** open AuraCheck → Share → **Add to Home Screen**.

## Gemini setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Add your server-side key:

```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.8-flash
```

`GEMINI_MODEL` is optional. If it is blank, AuraCheck uses `gemini-3.8-flash`.

The API key is only read by `app/api/analyze/route.ts` through server-side environment variables. It is never sent to client JavaScript.

## Demo mode

If `GEMINI_API_KEY` is missing, `/api/analyze` automatically returns realistic demo data rather than crashing. The **Try Demo** button on the home page also opens a complete sample result.

## Image/privacy behavior

- Supported: JPG/JPEG, PNG, WEBP
- Maximum upload: 10 MB
- Client validates before upload
- Server validates type and size again
- Image is posted only after **Analyze My Aura** is pressed
- The server processes the image in memory and does not write it to disk
- A compressed image preview can be stored locally in the browser's `localStorage` as part of History
- History keeps the latest 10 checks on the current device

## Production

```bash
npm run build
npm start
```

For Vercel, add `GEMINI_API_KEY` and optionally `GEMINI_MODEL` in Project Settings → Environment Variables.

## Feature checklist

- Upload / camera / drag and drop
- Preview / change / remove
- Gemini server endpoint with structured JSON validation
- Automatic no-key Demo Mode
- Loading state tied to API completion
- Vibe / fit / ratings
- Caption copy buttons
- Local song matching from 150+ songs
- YouTube search links
- Browser-side color extraction + HEX copy
- Post combo + hashtag copy
- PNG Aura Card generation
- Web Share API with graceful fallback
- Analyze Another reset
- Local History open/delete/clear
- Responsive desktop/mobile UI
- PWA manifest and service worker

## Real-photo scoring vs Demo Mode

`TRY DEMO` intentionally uses sample data so the interface can be previewed without an API key.
Real photo uploads do **not** fall back to sample scores. If `GEMINI_API_KEY` is missing, invalid, rate-limited, or the provider fails, AuraCheck shows a clean error and asks the user to try again after the AI connection is fixed.

For Vercel, add `GEMINI_API_KEY` as a server-side Environment Variable. `GEMINI_MODEL` is optional and defaults to `gemini-3.8-flash`.
