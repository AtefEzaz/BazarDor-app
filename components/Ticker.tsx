import type { Product } from "@/lib/types";
import { fmtNum, fmtPct, trendOf } from "@/lib/format";

const COLOR = { up: "text-rise", down: "text-fall", flat: "text-ink/50" };
const ARROW = { up: "▲", down: "▼", flat: "—" };

export default function Ticker({ products }: { products: Product[] }) {
  const items = products.slice(0, 20);
  const loop = [...items, ...items]; // duplicated so the loop is seamless

  return (
    <div className="ticker-wrap overflow-hidden border-b border-line bg-surface">
      <div className="ticker-track flex">
        {loop.map((p, i) => {
          const t = trendOf(p.change);
          return (
            <div key={i} className="flex shrink-0 items-center gap-2 border-r border-page px-4 py-2 text-sm">
              <span>{p.emoji}</span>
              <span className="font-medium">{p.name}</span>
              <span>{fmtNum(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}</span>
              <span className={`font-semibold ${COLOR[t]}`}>{ARROW[t]} {fmtPct(p.change)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
