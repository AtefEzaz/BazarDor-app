import Link from "next/link";

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md py-4">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-ink/70">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-line bg-surface p-6">{children}</div>
      <Link href="/" className="mt-5 block text-center text-sm text-ink/70 hover:underline">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}

export const inputCls =
  "w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
export const primaryBtn =
  "w-full rounded-lg border border-brand-dark bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:bg-brand-dark disabled:opacity-60";
