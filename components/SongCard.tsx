import { ExternalLink, Music2 } from "lucide-react";
import { SongMatch } from "@/lib/types";

export default function SongCard({ song }:{ song:SongMatch }) {
  const url=`https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.title} ${song.artist}`)}`;
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[.035] p-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/20"><Music2 size={20}/></div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-black">{song.title}</p>
        <p className="truncate text-xs text-white/45">{song.artist}</p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-pink-300">matches {song.matchReason}</p>
      </div>
      <a href={url} target="_blank" rel="noreferrer" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/8" aria-label={`Search ${song.title} on YouTube`}><ExternalLink size={16}/></a>
    </div>
  );
}
