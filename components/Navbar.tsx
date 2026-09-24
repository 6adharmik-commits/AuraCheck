import Link from "next/link";
import Brand from "./Brand";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 hidden border-b border-white/5 bg-black/55 backdrop-blur-xl lg:block">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-8">
        <Brand />
        <nav className="flex items-center gap-7 text-sm font-semibold text-white/65">
          <Link className="transition hover:text-white" href="/">Home</Link>
          <Link className="transition hover:text-white" href="/analyze">Analyze</Link>
          <Link className="transition hover:text-white" href="/history">History</Link>
          <Link className="transition hover:text-white" href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
