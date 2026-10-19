import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getData } from "@/lib/api";
import { fmtNum, fmtPct, fmtTaka, trendOf } from "@/lib/format";

const COLOR = { up: "text-rise", down: "text-fall", flat: "text-ink/50" };
const ARROW = { up: "▲", down: "▼", flat: "—" };

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Protected route: must be signed in
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?reason=login&redirect=/product/${slug}`);

  const { products } = await getData();
  const p = products.find((x) => x.id === slug);
  if (!p) notFound();

  const t = trendOf(p.change);
  const unit = p.unit.replace("প্রতি ", "");
  const minM = p.markets.find((m) => m.min === p.min)?.name;
  const maxM = p.markets.find((m) => m.max === p.max)?.name;
  const diff = Math.abs(Math.round((p.price * p.change) / (100 + p.change)));
  const trendText =
    t === "up" ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${fmtNum(diff)} টাকা`
    : t === "down" ? `গতকালের তুলনায় আজ দাম কমেছে · ${fmtNum(diff)} টাকা`
    : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const stats = [
    { label: "সর্বনিম্ন দাম", value: p.min, color: "text-fall", note: minM ? `${minM}-এ সবচেয়ে কম` : "সবচেয়ে কম দামের বাজার" },
    { label: "সর্বাধিক দাম", value: p.max, color: "text-rise", note: maxM ? `${maxM}-এ সবচেয়ে বেশি` : "সবচেয়ে বেশি দামের বাজার" },
    { label: "গড় দাম", value: p.avg, color: "text-brand", note: `প্রতি ${unit}-এর হিসাবে` },
  ];

  return (
    <div className="space-y-5">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/70">
        <Link href="/" className="hover:underline">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:underline">{p.categoryName}</Link>
        <span>›</span>
        <span className="text-ink">{p.name}</span>
      </nav>

      {/* summary */}
      <section className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-page text-4xl">{p.emoji}</span>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{p.name}</h1>
          <p className="mt-1 text-sm text-ink/70">{p.unit}{p.categoryName && ` · ${p.categoryName}`}</p>
          <p className="mt-2 text-sm">{p.description}</p>
          <p className="mt-1 text-sm text-ink/80">{trendText}</p>
          {p.categoryName && (
            <span className="mt-3 inline-block rounded-full bg-page px-3 py-1 text-xs font-medium">{p.categoryName}</span>
          )}
        </div>
        <div className="rounded-2xl bg-page p-5 text-center">
          <p className="text-sm text-ink/70">আজকের দাম</p>
          <p className="text-3xl font-bold">{fmtNum(p.price)}</p>
          <p className="text-sm text-ink/70">টাকা / {unit}</p>
          <p className={`mt-1 text-sm font-semibold ${COLOR[t]}`}>{ARROW[t]} {fmtPct(p.change)}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="mb-3 text-lg font-semibold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-xs text-ink/70">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{fmtTaka(s.value)}</p>
              <p className="text-xs text-ink/70">{s.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-8 text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
        {p.markets.length ? (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-line bg-page/60">
                <tr>
                  {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বাধিক", "গড়"].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.markets.map((m, i) => (
                  <tr key={i} className={i % 2 ? "bg-page" : ""}>
                    <td className="px-4 py-3 font-medium">{m.name}</td>
                    <td className="px-4 py-3">{m.division}</td>
                    <td className="px-4 py-3">{fmtTaka(m.min)}</td>
                    <td className="px-4 py-3">{fmtTaka(m.max)}</td>
                    <td className="px-4 py-3">{fmtTaka(m.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-ink/70">এই পণ্যের বাজারভিত্তিক তথ্য এখনো নেই।</p>
        )}
      </section>
    </div>
  );
}
