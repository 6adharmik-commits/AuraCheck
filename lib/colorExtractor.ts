import { AuraColor } from "./types";

type RGB = { r: number; g: number; b: number };

const colorDistance = (a: RGB, b: RGB) =>
  Math.sqrt((a.r-b.r)**2 + (a.g-b.g)**2 + (a.b-b.b)**2);

const toHex = ({r,g,b}: RGB) =>
  "#" + [r,g,b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2,"0")).join("").toUpperCase();

const colorName = ({r,g,b}: RGB) => {
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  const light = (max + min) / 2;
  if (max - min < 18) return light < 55 ? "Black" : light > 215 ? "White" : light < 130 ? "Charcoal" : "Grey";
  if (r > g * 1.25 && r > b * 1.25) return r > 190 && g > 90 ? "Orange" : "Red";
  if (b > r * 1.2 && b > g * 1.12) return b > 170 && r > 90 ? "Purple" : "Blue";
  if (g > r * 1.18 && g > b * 1.05) return "Green";
  if (r > 160 && g > 140 && b < 130) return "Gold";
  if (r > 150 && b > 130 && g < 150) return "Pink";
  if (r > 120 && g > 80 && b < 95) return "Brown";
  return "Neutral";
};

export async function extractColors(file: File, count = 5): Promise<AuraColor[]> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const size = 140;
  const scale = Math.min(size / bitmap.width, size / bitmap.height, 1);
  canvas.width = Math.max(1, Math.floor(bitmap.width * scale));
  canvas.height = Math.max(1, Math.floor(bitmap.height * scale));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const buckets = new Map<string, { color: RGB; n: number }>();

  for (let i = 0; i < data.length; i += 16) {
    if (data[i+3] < 220) continue;
    const rgb = { r: data[i], g: data[i+1], b: data[i+2] };
    const key = `${Math.round(rgb.r/32)*32},${Math.round(rgb.g/32)*32},${Math.round(rgb.b/32)*32}`;
    const existing = buckets.get(key);
    if (existing) existing.n++;
    else buckets.set(key, { color: rgb, n: 1 });
  }

  const ranked = [...buckets.values()].sort((a,b) => b.n-a.n);
  const chosen: RGB[] = [];
  for (const item of ranked) {
    if (chosen.every(c => colorDistance(c, item.color) > 48)) chosen.push(item.color);
    if (chosen.length >= count) break;
  }

  return chosen.map(c => ({ name: colorName(c), hex: toHex(c) }));
}

export async function makeCompressedDataUrl(file: File, maxSide = 900, quality = .82): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(maxSide / bitmap.width, maxSide / bitmap.height, 1);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", quality);
}
