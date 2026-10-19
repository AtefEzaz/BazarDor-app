"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthShell, { inputCls, primaryBtn } from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name")).trim();
    const email = String(fd.get("email")).trim();
    const password = String(fd.get("password"));
    const confirm = String(fd.get("confirm"));

    const fail = (m: string) => { setError(m); toast.error(m); };
    if (!name || !email || !password) return fail("সব ঘর পূরণ করুন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("পাসওয়ার্ড দুটি মেলেনি");

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) return fail(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">নাম</label>
          <input name="name" placeholder="যেমন: রহিম উদ্দিন" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">ইমেইল</label>
          <input name="email" type="email" placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
          <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input name="confirm" type="password" placeholder="আবার লিখুন" className={inputCls} />
        </div>
        {error && <p className="rounded-lg bg-rise/10 px-3 py-2 text-sm text-rise">{error}</p>}
        <button type="submit" disabled={loading} className={primaryBtn}>{loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}</button>

        <div className="flex items-center gap-3 text-xs text-ink/60">
          <span className="h-px flex-1 bg-line" />অথবা<span className="h-px flex-1 bg-line" />
        </div>
        <SocialButtons />
        <p className="text-center text-sm">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-brand hover:underline">সাইন ইন করুন</Link>
        </p>
      </form>
    </AuthShell>
  );
}
