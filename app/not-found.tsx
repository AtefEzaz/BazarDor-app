import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-10 text-center">
      <p className="text-6xl">🛒</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পাতাটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-ink/70">আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।</p>
      <Link href="/" className="mt-6 inline-block rounded-lg border border-brand-dark bg-brand px-5 py-2.5 text-sm font-semibold text-brand-fg hover:bg-brand-dark">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
