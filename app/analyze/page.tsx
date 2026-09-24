"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Brand from "@/components/Brand";
import ImageUploader from "@/components/ImageUploader";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import AuraResult from "@/components/AuraResult";
import ErrorMessage from "@/components/ErrorMessage";
import { AuraAnalysis, AuraResultRecord } from "@/lib/types";
import { extractColors, makeCompressedDataUrl } from "@/lib/colorExtractor";
import { matchSongs } from "@/lib/songs";
import { demoAnalysis } from "@/lib/demo";
import { clearCurrentResult, getCurrentResult, saveToHistory, setCurrentResult } from "@/lib/storage";

function Analyzer() {
  const params=useSearchParams();
  const [file,setFile]=useState<File|null>(null);
  const [preview,setPreview]=useState("");
  const [result,setResult]=useState<AuraResultRecord|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const demoLoaded=useRef(false);

  function resetImageUrl(){
    if(preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  }

  useEffect(()=>{
    const isDemo=params.get("demo")==="1";
    const openSavedResult=params.get("result")==="1";

    if(isDemo && !demoLoaded.current){
      demoLoaded.current=true;
      const record=buildRecord(demoAnalysis,"/demo-look.svg",true,demoAnalysis.colors);
      setCurrentResult(record);
      saveToHistory(record);
      setResult(record);
      return;
    }

    if(openSavedResult){
      const stored=getCurrentResult();
      if(stored) setResult(stored);
      return;
    }

    // A normal visit to /analyze must always open the uploader.
    // This prevents an old demo/history result from taking over CHECK MY AURA.
    clearCurrentResult();
    setResult(null);
    setFile(null);
    resetImageUrl();
    setPreview("");
    setError("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params]);

  function buildRecord(analysis:AuraAnalysis,imageDataUrl:string,demoMode:boolean,localColors=analysis.colors):AuraResultRecord{
    return {
      id:`aura-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      timestamp:Date.now(),
      imageDataUrl,
      analysis,
      songs:matchSongs(analysis,32),
      localColors,
      demoMode
    };
  }

  function select(next:File){
    resetImageUrl();
    clearCurrentResult();
    setResult(null); setError(""); setFile(next); setPreview(URL.createObjectURL(next));
  }

  function remove(){
    resetImageUrl(); setFile(null); setPreview(""); setError("");
  }

  async function analyze(){
    if(!file) return setError("Choose a photo first.");
    setError(""); setLoading(true);
    try{
      const [colors,imageDataUrl] = await Promise.all([
        extractColors(file).catch(()=>[]),
        makeCompressedDataUrl(file).catch(()=>preview)
      ]);
      const form=new FormData();
      form.append("image",file);
      const response=await fetch("/api/analyze",{method:"POST",body:form});
      const payload=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(payload.error || "AuraCheck couldn't analyze that photo.");
      if (payload.demoMode) throw new Error("Real photo analysis cannot use Demo Mode. Connect Gemini and try again.");
      const analysis=payload.analysis as AuraAnalysis;
      if (!analysis) throw new Error("The AI didn't return an analysis. Please try again.");
      const record=buildRecord(analysis,imageDataUrl,false,colors.length?colors:analysis.colors);
      setCurrentResult(record); saveToHistory(record); setResult(record);
    }catch(e){
      const message=e instanceof Error ? e.message : "AuraCheck couldn't analyze that photo.";
      setError(message.includes("fetch") ? "Network problem. Check your connection and try again." : message);
    }finally{setLoading(false);}
  }

  function reset(){
    resetImageUrl();
    setFile(null);setPreview("");setResult(null);setError("");clearCurrentResult();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  if(result) return <AuraResult record={result} onReset={reset}/>;

  return (
    <div className="animate-in">
      <div className="mb-8 flex items-center justify-between lg:hidden"><Brand/><span className="text-xs font-bold text-white/35">ANALYZER</span></div>
      <div className="mx-auto mb-7 max-w-2xl text-center">
        <p className="text-xs font-black tracking-[.28em] text-pink-300">AURACHECK SCAN</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-.045em] sm:text-5xl">Upload the look. <span className="gradient-text">Find the vibe.</span></h1>
        <p className="mt-4 text-sm leading-6 text-white/45">We analyze fashion, colors, styling, pose, lighting and visual aesthetic — not identity or sensitive personal traits.</p>
      </div>
      {error && <div className="mx-auto mb-4 max-w-3xl"><ErrorMessage message={error} onRetry={()=>setError("")}/></div>}
      <div className="mx-auto max-w-3xl">
        {loading ? <LoadingAnalysis preview={preview}/> : <ImageUploader file={file} preview={preview} onSelect={select} onRemove={remove} onAnalyze={analyze} busy={loading}/>}
      </div>
      <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-white/30">
        Your uploaded photo is used only to generate your AuraCheck and is not permanently stored by AuraCheck. A compressed preview can be saved locally on this device for History.
      </p>
    </div>
  );
}

export default function AnalyzePage(){
  return <Suspense fallback={<div className="py-20 text-center text-white/50">Opening AuraCheck…</div>}><Analyzer/></Suspense>;
}
