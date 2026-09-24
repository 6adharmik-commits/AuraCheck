import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-black tracking-tight">
      <span className="grid h-9 w-9 place-items-center rounded-xl gradient-btn shadow-glow"><Sparkles size={18}/></span>
      <span className="text-xl">Aura<span className="gradient-text">Check</span></span>
    </Link>
  );
}
