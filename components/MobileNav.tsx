"use client";
import Link from "next/link";
import { Home, ScanFace, History } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href:"/", label:"Home", icon:Home },
  { href:"/analyze", label:"Check", icon:ScanFace },
  { href:"/history", label:"History", icon:History },
];

export default function MobileNav() {
  const path = usePathname();
  return (
    <nav className="safe-bottom fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/10 bg-[#111]/90 px-4 pt-3 shadow-2xl backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around">
        {items.map(({href,label,icon:Icon}) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return <Link key={href} href={href} className={`min-w-16 text-center text-xs font-semibold ${active ? "text-white" : "text-white/45"}`}>
            <Icon className={`mx-auto mb-1 ${active ? "text-pink-400" : ""}`} size={21}/>
            {label}
          </Link>
        })}
      </div>
    </nav>
  );
}
