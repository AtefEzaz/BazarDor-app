"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";
import { useRequireLogin } from "@/components/useRequireLogin";

export default function ProfilePage() {
  const router = useRouter();
  const { session, isPending } = useRequireLogin("/profile");

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-24 animate-pulse rounded-2xl bg-line" />
        <div className="h-48 animate-pulse rounded-2xl bg-line" />
      </div>
    );
  }
  const user = session.user;

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-ink/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row">
        <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand text-3xl font-bold text-brand-fg">
          {user.name?.[0]?.toUpperCase() ?? "U"}
        </span>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-ink/80">{user.email}</p>
        </div>
        <button onClick={handleSignOut} className="rounded-lg border border-rise px-4 py-2 text-sm font-semibold text-rise hover:bg-rise/5">
          ↩ সাইন আউট
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="mb-3 text-lg font-semibold">তথ্য</h2>
        <dl className="mb-5 space-y-2 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-ink/70">নাম</dt><dd className="font-medium">{user.name}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-ink/70">ইমেইল</dt><dd className="font-medium">{user.email}</dd></div>
        </dl>
        <Link href="/profile/update" className="block rounded-lg border border-brand-dark bg-brand px-4 py-2.5 text-center text-sm font-semibold text-brand-fg hover:bg-brand-dark">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
