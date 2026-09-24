"use client";
import { useState } from "react";
import { AuraColor } from "@/lib/types";

export default function ColorPalette({ colors }:{ colors:AuraColor[] }) {
  const [copied,setCopied]=useState("");
  async function copy(hex:string){
    try { await navigator.clipboard.writeText(hex); setCopied(hex); setTimeout(()=>setCopied(""),1200); }
    catch { window.prompt("Copy this HEX value:",hex); }
  }
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
      {colors.slice(0,6).map((c,i)=>(
        <button key={`${c.hex}-${i}`} onClick={()=>copy(c.hex)} className="group min-w-0 text-left">
          <div className="aspect-square rounded-2xl border border-white/10 shadow-lg transition group-hover:scale-[1.03]" style={{backgroundColor:c.hex}}/>
          <p className="mt-2 truncate text-[11px] text-white/45">{c.name}</p>
          <p className="truncate text-xs font-black">{copied===c.hex ? "COPIED ✓" : c.hex}</p>
        </button>
      ))}
    </div>
  );
}
