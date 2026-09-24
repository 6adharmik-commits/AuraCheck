"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { History, Trash2, ExternalLink, Sparkles } from "lucide-react";
import Brand from "@/components/Brand";
import { AuraResultRecord } from "@/lib/types";
import { clearHistory, deleteFromHistory, getHistory, setCurrentResult } from "@/lib/storage";

export default function HistoryPage(){
  const [items,setItems]=useState<AuraResultRecord[]>([]);
  const router=useRouter();
  useEffect(()=>setItems(getHistory()),[]);

  function open(record:AuraResultRecord){setCurrentResult(record);router.push("/analyze?result=1");}
  function remove(id:string){deleteFromHistory(id);setItems(getHistory());}
  function clear(){if(confirm("Clear all AuraCheck history on this device?")){clearHistory();setItems([]);}}

  return (
    <div className="animate-in">
      <div className="mb-8 flex items-center justify-between lg:hidden"><Brand/><span className="text-xs font-bold text-white/35">HISTORY</span></div>
      <div className="mb-7 flex items-end justify-between gap-4">
        <div><p className="text-xs font-black tracking-[.25em] text-pink-300">YOUR ARCHIVE</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">Aura History</h1></div>
        {items.length>0&&<button onClick={clear} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-white/65">Clear History</button>}
      </div>
      {items.length===0 ? (
        <div className="glass grid min-h-72 place-items-center rounded-[2rem] p-8 text-center">
          <div><History className="mx-auto text-white/20" size={42}/><h2 className="mt-4 text-xl font-black">No AuraChecks yet</h2><p className="mt-2 text-sm text-white/40">Your last 10 checks will appear here on this device.</p></div>
        </div>
      ):(
        <div className="grid gap-4 md:grid-cols-2">
          {items.map(item=>(
            <article key={item.id} className="glass overflow-hidden rounded-[2rem] p-4">
              <div className="flex gap-4">
                <div className="h-32 w-28 shrink-0 overflow-hidden rounded-2xl bg-white/5">
                  {item.imageDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageDataUrl} alt="" className="h-full w-full object-cover"/>
                  ):<div className="grid h-full place-items-center"><Sparkles className="text-white/20"/></div>}
                </div>
                <div className="min-w-0 flex-1 py-1">
                  <p className="text-[10px] font-black tracking-[.18em] text-white/30">{new Date(item.timestamp).toLocaleString()}</p>
                  <h2 className="mt-2 truncate text-xl font-black">{item.analysis.primaryVibe}</h2>
                  <p className="mt-1 truncate text-xs text-white/45">{item.analysis.secondaryVibe}</p>
                  <p className="mt-4 text-3xl font-black gradient-text">{item.analysis.ratings.aura}<span className="text-xs text-white/25"> / 100</span></p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={()=>open(item)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/8 px-3 py-3 text-xs font-black"><ExternalLink size={14}/> Open Result</button>
                <button onClick={()=>remove(item.id)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/8 px-3 py-3 text-xs font-black text-white/55"><Trash2 size={14}/> Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
