"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CaptionCard({ caption }:{ caption:string }) {
  const [copied,setCopied]=useState(false);
  async function copy(){
    try {
      if (!navigator.clipboard) throw new Error();
      await navigator.clipboard.writeText(caption);
      setCopied(true); window.setTimeout(()=>setCopied(false),1600);
    } catch {
      window.prompt("Copy this caption:", caption);
    }
  }
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[.035] p-4">
      <p className="flex-1 text-sm font-semibold leading-6">{caption}</p>
      <button onClick={copy} className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-white/8 px-3 py-2 text-[11px] font-black">
        {copied ? <><Check size={13}/> COPIED ✓</> : <><Copy size={13}/> COPY</>}
      </button>
    </div>
  );
}
