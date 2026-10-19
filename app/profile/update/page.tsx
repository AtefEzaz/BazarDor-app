"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";
import { inputCls, primaryBtn } from "@/components/AuthShell";
import { useRequireLogin } from "@/components/useRequireLogin";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { session, isPending } = useRequireLogin("/profile/update");
  const [loading, setLoading] = useState(false);

  if (isPending || !session) {
    return <div className="mx-auto h-56 max-w-md animate-pulse rounded-2xl bg-line" />;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name")).trim();
    if (!name) return toast.error("নাম লিখুন");

    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-1 text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mb-5 text-sm text-ink/70">আপনার নাম পরিবর্তন করুন।</p>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">নাম</label>
          <input name="name" defaultValue={session.user.name} className={inputCls} />
        </div>
        <button type="submit" disabled={loading} className={primaryBtn}>{loading ? "অপেক্ষা করুন…" : "তথ্য আপডেট করুন"}</button>
      </form>
      <Link href="/profile" className="mt-5 block text-center text-sm text-ink/70 hover:underline">← প্রোফাইলে ফিরে যান</Link>
    </div>
  );
}
