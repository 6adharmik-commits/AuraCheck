import { AuraResultRecord } from "./types";

const HISTORY_KEY = "auracheck-history";
const CURRENT_KEY = "auracheck-current";
const MAX_HISTORY = 10;

export function getHistory(): AuraResultRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveToHistory(record: AuraResultRecord) {
  if (typeof window === "undefined") return;
  const previous = getHistory().filter(item => item.id !== record.id);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([record, ...previous].slice(0, MAX_HISTORY)));
  } catch {
    const lighter = { ...record, imageDataUrl: "" };
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify([lighter, ...previous].slice(0, MAX_HISTORY)));
    } catch {
      // Storage may be disabled. The active result still remains usable.
    }
  }
}

export function deleteFromHistory(id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(getHistory().filter(item => item.id !== id)));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

export function setCurrentResult(record: AuraResultRecord) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CURRENT_KEY, JSON.stringify(record));
  } catch {}
}

export function getCurrentResult(): AuraResultRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearCurrentResult() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CURRENT_KEY);
}
