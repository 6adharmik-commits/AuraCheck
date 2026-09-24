"use client";
import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Share2, RotateCcw, Copy, Check, Sparkles } from "lucide-react";
import { AuraResultRecord } from "@/lib/types";
import { matchSongs } from "@/lib/songs";
import ScoreCircle from "./ScoreCircle";
import RatingBars from "./RatingBars";
import CaptionCard from "./CaptionCard";
import SongCard from "./SongCard";
import ColorPalette from "./ColorPalette";
import ShareCard from "./ShareCard";

export default function AuraResult({ record, onReset }:{ record:AuraResultRecord; onReset:()=>void }) {
  const cardRef=useRef<HTMLDivElement>(null);
  const [busy,setBusy]=useState(false);
  const [copied,setCopied]=useState("");
  const [visibleSongs,setVisibleSongs]=useState(8);
  const {analysis,songs,localColors}=record;
  const soundtrack=useMemo(()=>songs.length >= 12 ? songs : matchSongs(analysis,32),[songs,analysis]);

  async function makeImage(){
    if(!cardRef.current) throw new Error("Share card unavailable");
    return toPng(cardRef.current,{pixelRatio:2,cacheBust:true,backgroundColor:"#0A0A0A"});
  }
  async function download(){
    setBusy(true);
    try {
      const data=await makeImage();
      const a=document.createElement("a");
      a.download=`auracheck-${analysis.primaryVibe.toLowerCase().replace(/\s+/g,"-")}.png`;
      a.href=data; a.click();
    } finally {setBusy(false);}
  }
  async function share(){
    setBusy(true);
    try {
      const data=await makeImage();
      const blob=await (await fetch(data)).blob();
      const file=new File([blob],"auracheck.png",{type:"image/png"});
      const text=`My AuraCheck: ${analysis.primaryVibe} — ${analysis.ratings.aura}/100\n${analysis.captions[0]}`;
      if(navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))) {
        await navigator.share({title:"My AuraCheck",text,files:[file]});
      } else if(navigator.share) {
        await navigator.share({title:"My AuraCheck",text});
      } else {
        try { await navigator.clipboard.writeText(text); alert("Share isn’t supported here, so your AuraCheck text was copied."); }
        catch { await download(); alert("Share isn’t supported here, so the Aura Card was downloaded instead."); }
      }
    } catch (e:any) {
      if(e?.name !== "AbortError") alert("Sharing didn’t work on this browser. You can use Download Aura Card instead.");
    } finally {setBusy(false);}
  }
  async function copyText(key:string,text:string){
    try{await navigator.clipboard.writeText(text);setCopied(key);setTimeout(()=>setCopied(""),1400);}
    catch{window.prompt("Copy this text:",text);}
  }

  return (
    <div className="animate-in space-y-5">
      {record.demoMode && <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black text-pink-200"><Sparkles size={14}/> AI Demo Mode</div>}
      <div className="glass overflow-hidden rounded-[2rem] p-4 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[1.5rem] bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={record.imageDataUrl || "/demo-look.svg"} alt="AuraCheck look" className="max-h-[620px] w-full object-cover"/>
          </div>
          <div className="flex flex-col justify-center p-2 sm:p-5">
            <p className="text-xs font-black tracking-[.28em] text-white/35">YOUR AURA</p>
            <h1 className="mt-3 break-words text-4xl font-black tracking-[-.055em] sm:text-6xl">{analysis.primaryVibe.toUpperCase()}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/60">{analysis.vibeDescription}</p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-white/7 px-3 py-2">Primary · {analysis.primaryVibe}</span>
              <span className="rounded-full bg-white/7 px-3 py-2">Secondary · {analysis.secondaryVibe}</span>
              <span className="rounded-full bg-white/7 px-3 py-2">Aesthetic · {analysis.aesthetic}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass rounded-[2rem] p-5 sm:p-6">
          <h2 className="text-sm font-black tracking-[.18em] text-white/45">AI AURA SCORE</h2>
          <div className="mt-5 grid items-center gap-7 sm:grid-cols-[160px_1fr]">
            <div className="mx-auto"><ScoreCircle score={analysis.ratings.aura}/></div>
            <div>
              <RatingBars ratings={analysis.ratings}/>
              <p className="mt-4 text-[11px] leading-5 text-white/30">Playful image-specific aesthetic ratings based on visible styling, pose and composition — not an objective rating of you.</p>
            </div>
          </div>
        </section>
        <section className="glass rounded-[2rem] p-5 sm:p-6">
          <h2 className="text-sm font-black tracking-[.18em] text-white/45">FIT CHECK</h2>
          <p className="mt-5 text-sm leading-7 text-white/65">{analysis.outfitAnalysis}</p>
        </section>
      </div>

      <section className="glass rounded-[2rem] p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-sm font-black tracking-[.18em] text-white/45">CAPTION DROPS</h2><span className="text-xs text-white/30">5 picks</span></div>
        <div className="grid gap-3 lg:grid-cols-2">{analysis.captions.map((c,i)=><CaptionCard key={i} caption={c}/>)}</div>
      </section>

      <section className="glass rounded-[2rem] p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-black tracking-[.18em] text-white/45">YOUR SOUNDTRACK</h2>
            <p className="mt-2 text-xs text-white/35">Ranked from your vibe, aesthetic and energy · {soundtrack.length} matches</p>
          </div>
          <span className="rounded-full bg-white/5 px-3 py-2 text-[10px] font-black tracking-wider text-pink-200">VIBE MATCHED</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {soundtrack.slice(0,visibleSongs).map((s,i)=><SongCard key={`${s.title}-${s.artist}-${i}`} song={s}/>)}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {visibleSongs < soundtrack.length && <button onClick={()=>setVisibleSongs(v=>Math.min(v+8,soundtrack.length))} className="rounded-xl bg-white/8 px-5 py-3 text-xs font-black">SHOW 8 MORE</button>}
          {visibleSongs > 8 && <button onClick={()=>setVisibleSongs(8)} className="rounded-xl border border-white/10 px-5 py-3 text-xs font-black text-white/60">SHOW LESS</button>}
        </div>
      </section>

      <section className="glass rounded-[2rem] p-5 sm:p-6">
        <h2 className="mb-5 text-sm font-black tracking-[.18em] text-white/45">YOUR COLORS</h2>
        <ColorPalette colors={localColors.length ? localColors : analysis.colors}/>
        <p className="mt-5 text-xs leading-5 text-white/35">Colors are extracted locally in your browser from the photo you selected.</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass rounded-[2rem] p-5 sm:p-6">
          <h2 className="text-sm font-black tracking-[.18em] text-white/45">POST COMBO</h2>
          <p className="mt-5 text-xs font-bold text-white/35">BEST CAPTION</p>
          <p className="mt-2 text-2xl font-black">&ldquo;{analysis.captions[0]}&rdquo;</p>
          <p className="mt-6 text-xs font-bold text-white/35">BEST SONG</p>
          <p className="mt-2 font-bold">{soundtrack[0]?.title} <span className="text-white/40">— {soundtrack[0]?.artist}</span></p>
          <button onClick={()=>copyText("caption",analysis.captions[0])} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/8 px-4 py-3 text-xs font-black">{copied==="caption"?<Check size={15}/>:<Copy size={15}/>} {copied==="caption"?"COPIED ✓":"COPY CAPTION"}</button>
        </section>
        <section className="glass rounded-[2rem] p-5 sm:p-6">
          <h2 className="text-sm font-black tracking-[.18em] text-white/45">HASHTAGS</h2>
          <p className="mt-5 text-lg font-bold leading-9">{analysis.hashtags.join(" ")}</p>
          <button onClick={()=>copyText("hashtags",analysis.hashtags.join(" "))} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/8 px-4 py-3 text-xs font-black">{copied==="hashtags"?<Check size={15}/>:<Copy size={15}/>} {copied==="hashtags"?"COPIED ✓":"COPY ALL"}</button>
        </section>
      </div>

      <section className="glass rounded-[2rem] p-5 sm:p-6">
        <h2 className="text-sm font-black tracking-[.18em] text-white/45">SHARE YOUR AURA</h2>
        <p className="mt-2 text-sm text-white/45">Generate a polished PNG card right on your device.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button onClick={download} disabled={busy} className="gradient-btn inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black disabled:opacity-50"><Download size={17}/> DOWNLOAD AURA CARD</button>
          <button onClick={share} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black disabled:opacity-50"><Share2 size={17}/> SHARE</button>
        </div>
        <div className="pointer-events-none fixed left-[-10000px] top-0"><ShareCard ref={cardRef} record={record}/></div>
      </section>

      <button onClick={onReset} className="mx-auto flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-black"><RotateCcw size={17}/> ANALYZE ANOTHER PHOTO</button>
    </div>
  );
}
