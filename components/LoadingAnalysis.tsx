"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const messages = ["Reading your aura…","Checking the fit…","Finding your soundtrack…","Matching your colors…","Almost there…"];

export default function LoadingAnalysis({ preview }:{ preview:string }) {
  const [index,setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(()=>setIndex(i=>(i+1)%messages.length), 1500);
    return ()=>window.clearInterval(id);
  },[]);
  return (
    <div className="glass animate-in rounded-[2rem] p-4 sm:p-6">
      <div className="relative mx-auto max-w-xl overflow-hidden rounded-[1.7rem] bg-black/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Analyzing selected look" className="max-h-[55vh] w-full object-contain opacity-65"/>
        <div className="absolute inset-0 grid place-items-center bg-black/20">
          <div className="pulse-glow grid h-20 w-20 place-items-center rounded-full border border-white/20 bg-black/55 backdrop-blur-xl"><Sparkles size={30}/></div>
        </div>
      </div>
      <p className="mt-5 text-center text-lg font-black">{messages[index]}</p>
      <p className="mt-2 text-center text-xs text-white/40">This finishes as soon as the analysis comes back — no fake delay.</p>
    </div>
  );
}
