"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Check, RefreshCcw, SwitchCamera, X } from "lucide-react";

type FacingMode = "user" | "environment";

export default function CameraCapture({
  onCapture,
  onClose,
}: {
  onCapture: (file: File) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fallbackInputRef = useRef<HTMLInputElement>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("environment");
  const [capturedUrl, setCapturedUrl] = useState("");
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(true);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const startCamera = useCallback(async (mode: FacingMode) => {
    stopCamera();
    setError("");
    setStarting(true);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Live camera is not supported in this browser. Use the device camera option below.");
      setStarting(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setError("Camera permission was blocked. Allow camera access in your browser, then try again.");
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setError("No camera was found on this device.");
      } else {
        setError("We couldn't open the camera. Try the device camera option below.");
      }
    } finally {
      setStarting(false);
    }
  }, [stopCamera]);

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      stopCamera();
      if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    };
  // Start once when modal opens; switching cameras is handled explicitly below.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const switchCamera = async () => {
    const next: FacingMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    setCapturedFile(null);
    if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    setCapturedUrl("");
    await startCamera(next);
  };

  const capture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      setError("Camera is still starting. Try again in a moment.");
      return;
    }

    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(video.videoWidth, video.videoHeight));
    const width = Math.round(video.videoWidth * scale);
    const height = Math.round(video.videoHeight * scale);
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      setError("We couldn't capture that photo. Try again.");
      return;
    }

    context.drawImage(video, 0, 0, width, height);
    canvas.toBlob((blob) => {
      if (!blob) {
        setError("We couldn't capture that photo. Try again.");
        return;
      }

      const file = new File([blob], `auracheck-${Date.now()}.jpg`, { type: "image/jpeg" });
      if (capturedUrl) URL.revokeObjectURL(capturedUrl);
      const url = URL.createObjectURL(blob);
      setCapturedFile(file);
      setCapturedUrl(url);
      stopCamera();
    }, "image/jpeg", 0.9);
  };

  const retake = async () => {
    if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    setCapturedUrl("");
    setCapturedFile(null);
    await startCamera(facingMode);
  };

  const useCaptured = () => {
    if (!capturedFile) return;
    onCapture(capturedFile);
    onClose();
  };

  const fallbackSelected = (candidate?: File) => {
    if (!candidate) return;
    onCapture(candidate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-label="Take a photo">
      <div className="max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0d0d0f] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-black tracking-[.22em] text-pink-300">LIVE CAMERA</p>
            <h2 className="mt-1 text-lg font-black">Take your AuraCheck photo</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10" aria-label="Close camera">
            <X size={19}/>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-black">
            {capturedUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={capturedUrl} alt="Captured preview" className="h-full w-full object-contain"/>
            ) : (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`h-full w-full object-cover ${facingMode === "user" ? "-scale-x-100" : ""}`}
                />
                {starting && (
                  <div className="absolute inset-0 grid place-items-center bg-black/60 text-center text-sm font-bold text-white/70">
                    Opening camera…
                  </div>
                )}
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
              <div className="flex gap-3"><CameraOff className="mt-0.5 shrink-0" size={18}/><span>{error}</span></div>
            </div>
          )}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {capturedFile ? (
              <>
                <button type="button" onClick={retake} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-black transition hover:bg-white/10">
                  <RefreshCcw size={17}/> RETAKE
                </button>
                <button type="button" onClick={useCaptured} className="gradient-btn inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-black">
                  <Check size={18}/> USE THIS PHOTO
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={switchCamera} disabled={starting} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-black transition hover:bg-white/10 disabled:opacity-40">
                  <SwitchCamera size={18}/> SWITCH CAMERA
                </button>
                <button type="button" onClick={capture} disabled={starting || Boolean(error)} className="gradient-btn inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-black disabled:opacity-40">
                  <Camera size={18}/> CAPTURE PHOTO
                </button>
              </>
            )}
          </div>

          {!capturedFile && (
            <button type="button" onClick={()=>fallbackInputRef.current?.click()} className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[.03] px-5 py-3 text-xs font-bold text-white/55 transition hover:bg-white/[.07] hover:text-white/80">
              CAMERA NOT OPENING? USE DEVICE CAMERA / PHOTO PICKER
            </button>
          )}

          <p className="mt-4 text-center text-xs leading-5 text-white/35">
            Your browser will ask for camera permission. Live camera works on localhost and secure HTTPS websites.
          </p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden"/>
      <input
        ref={fallbackInputRef}
        hidden
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(event)=>fallbackSelected(event.target.files?.[0])}
      />
    </div>
  );
}
