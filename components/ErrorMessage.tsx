import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/8 p-4 text-sm">
      <AlertCircle className="mt-0.5 shrink-0 text-red-300" size={18}/>
      <div className="flex-1">
        <p className="text-red-100">{message}</p>
        {onRetry && <button onClick={onRetry} className="mt-3 font-black text-white underline underline-offset-4">TRY AGAIN</button>}
      </div>
    </div>
  );
}
