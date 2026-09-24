import { AuraRatings } from "@/lib/types";

export default function RatingBars({ ratings }:{ ratings:AuraRatings }) {
  return (
    <div className="space-y-4">
      {Object.entries(ratings).map(([name,value])=>(
        <div key={name}>
          <div className="mb-2 flex items-center justify-between text-xs font-bold"><span className="capitalize text-white/60">{name}</span><span>{value}</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" style={{width:`${value}%`, transition:"width 900ms cubic-bezier(.2,.8,.2,1)"}}/>
          </div>
        </div>
      ))}
    </div>
  );
}
