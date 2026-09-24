import Brand from "@/components/Brand";
import { ShieldCheck, Sparkles, Music2, Palette } from "lucide-react";

export default function AboutPage(){
  return (
    <div className="animate-in mx-auto max-w-3xl">
      <div className="mb-10 lg:hidden"><Brand/></div>
      <p className="text-xs font-black tracking-[.25em] text-pink-300">ABOUT</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-5xl">Style analysis without the weird stuff.</h1>
      <p className="mt-5 text-base leading-8 text-white/55">AuraCheck looks at visible fashion and aesthetic signals such as outfit, colors, styling, pose, lighting and composition. It is designed to stay positive and avoid identity or sensitive-attribute guessing.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          [Sparkles,"Positive by design","No insulting appearance judgments. The analysis stays focused on style and aesthetic."],
          [ShieldCheck,"Privacy-minded","Photos are sent to the analysis endpoint only when you press Analyze. AuraCheck does not permanently store them on its server."],
          [Music2,"No copyrighted hosting","Song recommendations come from a local curated catalog and link out to YouTube search."],
          [Palette,"Local color extraction","Dominant colors are sampled in your browser using Canvas, so that part does not need an external API."]
        ].map(([Icon,title,desc])=>{
          const C=Icon as typeof Sparkles;
          return <div key={String(title)} className="glass rounded-3xl p-5"><C size={20}/><h2 className="mt-4 font-black">{String(title)}</h2><p className="mt-2 text-sm leading-6 text-white/45">{String(desc)}</p></div>
        })}
      </div>
    </div>
  );
}
