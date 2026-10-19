import Link from "next/link";
import type { Product } from "@/lib/types";
import { fmtTaka } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.id}`}
      className="block rounded-2xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-page text-2xl">{p.emoji}</span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{p.name}</h3>
          <p className="text-xs text-ink/70">{p.unit}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-ink/70">আজকের দাম</p>
          <p className="text-xl font-bold">{fmtTaka(p.price)}</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
