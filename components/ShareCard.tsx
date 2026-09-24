"use client";
import { forwardRef } from "react";
import { AuraResultRecord } from "@/lib/types";
import Brand from "./Brand";

const ShareCard = forwardRef<HTMLDivElement, { record:AuraResultRecord }>(({ record }, ref) => {
  const { analysis, songs, localColors, imageDataUrl } = record;
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] p-5 text-white" style={{width:720}}>
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl"/>
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-pink-600/20 blur-3xl"/>
      <div className="relative">
        <div className="mb-5"><Brand/></div>
        <div className="grid grid-cols-[280px_1fr] gap-5">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageDataUrl || "/demo-look.svg"} alt="" className="h-[360px] w-full object-cover"/>
          </div>
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[.04] p-6">
            <div>
              <p className="text-xs font-black tracking-[.22em] text-white/40">YOUR AURA</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-.04em]">{analysis.primaryVibe.toUpperCase()}</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">{analysis.vibeDescription}</p>
            </div>
            <div>
              <div className="text-6xl font-black gradient-text">{analysis.ratings.aura}</div>
              <div className="text-xs font-black tracking-[.2em] text-white/40">AURA SCORE / 100</div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5">
            <p className="text-[11px] font-black tracking-[.18em] text-white/35">TOP CAPTION</p>
            <p className="mt-2 text-xl font-black">&ldquo;{analysis.captions[0]}&rdquo;</p>
            <p className="mt-5 text-[11px] font-black tracking-[.18em] text-white/35">TOP SONG</p>
            <p className="mt-2 font-bold">{songs[0]?.title} <span className="text-white/45">— {songs[0]?.artist}</span></p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5">
            <p className="text-[11px] font-black tracking-[.18em] text-white/35">YOUR COLORS</p>
            <div className="mt-4 flex gap-3">
              {localColors.slice(0,5).map((c,i)=><div key={i} className="h-16 flex-1 rounded-2xl border border-white/10" style={{background:c.hex}}/>)}
            </div>
            <p className="mt-4 text-xs font-semibold text-white/45">Upload your look. Discover your vibe.</p>
          </div>
        </div>
      </div>
    </div>
  );
});
ShareCard.displayName = "ShareCard";
export default ShareCard;
