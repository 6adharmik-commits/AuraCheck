import Link from "next/link";
import { ScanFace, MessageCircle, Music2, ArrowRight, Sparkles } from "lucide-react";
import Brand from "@/components/Brand";

export default function HomePage() {
  return (
    <div className="animate-in">
      <div className="mb-10 flex items-center justify-between lg:hidden"><Brand/><Link href="/about" className="text-sm text-white/60">About</Link></div>
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] px-5 py-14 text-center sm:px-10 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl"/>
        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[.22em] text-white/65">
            <Sparkles size={14} className="text-pink-400"/> AI style scanner
          </div>
          <h1 className="text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl">What&apos;s your <span className="gradient-text">aura</span> today?</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            Upload your look and let AI discover your vibe, captions, songs and color palette.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/analyze" className="gradient-btn inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black shadow-glow transition hover:scale-[1.02]">
              CHECK MY AURA <ArrowRight size={18}/>
            </Link>
            <Link href="/analyze?demo=1" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-black transition hover:bg-white/10">
              TRY DEMO
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          [ScanFace,"AI Vibe Analysis","Get a positive, fashion-focused read on your outfit, styling and visual aesthetic."],
          [MessageCircle,"Caption Generator","Five short social-ready captions matched to the vibe of your look."],
          [Music2,"Song + Color Matching","A local soundtrack matcher plus dominant colors extracted from your photo."]
        ].map(([Icon,title,desc],i) => {
          const C = Icon as typeof ScanFace;
          return <div key={String(title)} className="glass rounded-3xl p-6" style={{animationDelay:`${i*80}ms`}}>
            <div className="mb-6 grid h-11 w-11 place-items-center rounded-2xl bg-white/8"><C size={21}/></div>
            <h2 className="text-lg font-extrabold">{String(title)}</h2>
            <p className="mt-2 text-sm leading-6 text-white/50">{String(desc)}</p>
          </div>
        })}
      </section>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-white/35">
        Your uploaded photo is used only to generate your AuraCheck and is not permanently stored by AuraCheck. Your device may keep a compressed preview in local history.
      </p>
    </div>
  );
}
