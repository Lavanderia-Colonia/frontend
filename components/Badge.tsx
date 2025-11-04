import React from "react";

export default function Badge({ color = "gray", text = "" }: { color?: string; text?: string }) {
  const colorMap: Record<string, string> = {
    green: "bg-emerald-500",
    red: "bg-rose-500",
    gray: "bg-slate-300",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block h-3 w-3 rounded-full ${colorMap[color] ?? colorMap.gray}`} />
      {text ? <span className="text-xs text-slate-600">{text}</span> : null}
    </div>
  );
}
