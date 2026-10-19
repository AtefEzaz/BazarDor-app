import { fmtPct, trendOf } from "@/lib/format";

const COLOR = { up: "text-rise", down: "text-fall", flat: "text-ink/50" };
const ARROW = { up: "▲", down: "▼", flat: "—" };

export default function ChangeBadge({ change }: { change: number }) {
  const t = trendOf(change);
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-page px-2.5 py-1 text-xs font-semibold ${COLOR[t]}`}>
      <span className="font-normal">{ARROW[t]}</span>
      {fmtPct(change)}
    </span>
  );
}
