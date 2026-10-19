"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import type { Category } from "@/lib/types";
import BanglaDate from "./BanglaDate";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
            <Image src="/logo-icon.png" alt="" width={18} height={18} className="brightness-0 invert" />
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold">বাজার দর</span>
            <BanglaDate className="block text-xs text-ink/70" />
          </span>
        </Link>

        {isPending ? (
          <div className="h-10 w-32 animate-pulse rounded-lg bg-line" />
        ) : user ? (
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-page"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand font-semibold text-brand-fg">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </span>
              <span className="hidden max-w-[110px] truncate sm:block">{user.name}</span>
              <span className="text-xs">▾</span>
            </button>
            {open && (
              <div
                className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-line bg-surface p-1.5 shadow-lg"
                onMouseLeave={() => setOpen(false)}
              >
                <p className="truncate px-3 py-2 text-xs text-ink/60">{user.email}</p>
                <Link href="/profile" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-page">
                  👤 আমার প্রোফাইল
                </Link>
                <button onClick={handleSignOut} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rise hover:bg-page">
                  ↩ সাইন আউট
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-page">সাইন ইন</Link>
            <Link href="/signup" className="rounded-lg border border-brand-dark bg-brand px-3 py-2 text-sm font-semibold text-brand-fg hover:bg-brand-dark">সাইন আপ</Link>
          </div>
        )}
      </div>

      {/* category links */}
      <nav className="border-t border-page">
        <ul className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/category/${c.slug}`}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    active ? "border border-brand-dark bg-brand-dark text-brand-fg" : "hover:bg-page"
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
