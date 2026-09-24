"use client";

import { DragEvent, useRef, useState } from "react";
import { Camera, ImagePlus, Trash2, RefreshCw } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import CameraCapture from "./CameraCapture";

const MAX = 25 * 1024 * 1024;
const knownImageExt = /\.(jpe?g|png|webp|heic|heif)$/i;

function isLikelyPhoneOrTablet() {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const mobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  return coarse || mobileUA;
}

export default function ImageUploader({ file, preview, onSelect, onRemove, onAnalyze, busy }: {
  file: File | null;
  preview: string;
  onSelect: (file: File) => void;
  onRemove: () => void;
  onAnalyze: () => void;
  busy: boolean;
}) {
  const picker = useRef<HTMLInputElement>(null);
  const phoneCameraPicker = useRef<HTMLInputElement>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [error, setError] = useState("");

  const validateAndUse = (candidate?: File) => {
    setError("");
    if (!candidate) return;
    const looksLikeImage = candidate.type.startsWith("image/") || knownImageExt.test(candidate.name);
    if (!looksLikeImage) {
      setError("Please choose an image from your camera or gallery.");
      return;
    }
    if (candidate.size > MAX) {
      setError("That photo is over 25 MB. Choose a smaller image or use a normal camera mode.");
      return;
    }
    if (!candidate.size) {
      setError("We couldn't read that photo. Try another one.");
      return;
    }
    onSelect(candidate);
  };

  const openImmediateCamera = () => {
    setError("");

    // On phones/tablets the capture input launches the device camera directly.
    // This avoids relying on getUserMedia for the primary mobile flow.
    if (isLikelyPhoneOrTablet()) {
      if (phoneCameraPicker.current) {
        phoneCameraPicker.current.value = "";
        phoneCameraPicker.current.click();
      }
      return;
    }

    // Desktop/laptop: show the live camera modal.
    setCameraOpen(true);
  };

  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    validateAndUse(event.dataTransfer.files?.[0]);
  };

  return (
    <>
      <div className="space-y-4">
        {error && <ErrorMessage message={error} onRetry={() => setError("")} />}

        {!file ? (
          <div onDragOver={(event) => event.preventDefault()} onDrop={drop} className="glass rounded-[2rem] border-dashed p-5 sm:p-8">
            <div className="grid min-h-64 place-items-center rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 p-6 text-center">
              <div>
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-white/5">
                  <ImagePlus size={28} className="text-pink-300" />
                </div>
                <h2 className="text-xl font-black">Drop your look here</h2>
                <p className="mt-2 text-sm text-white/45">JPG, PNG, WEBP or phone camera photo · max 25 MB</p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <button type="button" onClick={() => picker.current?.click()} className="gradient-btn rounded-2xl px-5 py-3 text-sm font-black">
                    UPLOAD PHOTO
                  </button>
                  <button type="button" onClick={openImmediateCamera} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black transition hover:bg-white/10">
                    <Camera size={17} /> TAKE PHOTO NOW
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-white/30">
                  On Android/iPhone, Take Photo Now opens the device camera. On computers, it opens AuraCheck&apos;s live camera.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass rounded-[2rem] p-4 sm:p-5">
            <div className="overflow-hidden rounded-[1.5rem] bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Selected look preview" className="mx-auto max-h-[62vh] w-full object-contain" />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <button type="button" onClick={() => picker.current?.click()} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold disabled:opacity-40">
                <RefreshCw size={16} /> Change Photo
              </button>
              <button type="button" onClick={openImmediateCamera} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold disabled:opacity-40">
                <Camera size={16} /> Take New Photo
              </button>
              <button type="button" onClick={onRemove} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold disabled:opacity-40">
                <Trash2 size={16} /> Remove Photo
              </button>
              <button type="button" onClick={onAnalyze} disabled={busy} className="gradient-btn rounded-2xl px-4 py-3 text-sm font-black disabled:opacity-50">
                {busy ? "ANALYZING…" : "ANALYZE MY AURA"}
              </button>
            </div>
          </div>
        )}

        <input
          ref={picker}
          hidden
          type="file"
          accept="image/*,.jpg,.jpeg,.png,.webp,.heic,.heif"
          onChange={(event) => {
            validateAndUse(event.target.files?.[0]);
            event.currentTarget.value = "";
          }}
        />

        <input
          ref={phoneCameraPicker}
          hidden
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(event) => {
            validateAndUse(event.target.files?.[0]);
            event.currentTarget.value = "";
          }}
        />
      </div>

      {cameraOpen && (
        <CameraCapture
          onCapture={validateAndUse}
          onClose={() => setCameraOpen(false)}
        />
      )}
    </>
  );
}
