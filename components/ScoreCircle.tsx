"use client";
import { useEffect, useState } from "react";

export default function ScoreCircle({ score }:{ score:number }) {
  const [display,setDisplay] = useState(0);
  useEffect(()=>{
    let frame=0;
    const start=performance.now();
    const duration=700;
    const tick=(now:number)=>{
      const p=Math.min(1,(now-start)/duration);
      setDisplay(Math.round(score*(1-Math.pow(1-p,3))));
      if(p<1) frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  },[score]);
  const radius=52, circumference=2*Math.PI*radius;
  const dash=circumference*(score/100);
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8"/>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${dash} ${circumference-dash}`} style={{transition:"stroke-dasharray .8s ease"}}/>
        <defs><linearGradient id="scoreGrad"><stop offset="0%" stopColor="#7c3aed"/><stop offset="52%" stopColor="#ec4899"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><div className="text-3xl font-black">{display}</div><div className="text-[10px] font-bold tracking-[.2em] text-white/35">/ 100</div></div>
      </div>
    </div>
  );
}
