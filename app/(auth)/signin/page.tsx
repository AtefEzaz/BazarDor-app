"use client";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AuthShell, { inputCls, primaryBtn } from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";
import { signIn } from "@/lib/auth-client";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toasted = useRef(false);

  // toast when a protected page sent the user here
  useEffect(() => {
    if (params.get("reason") === "login" && !toasted.current) {
      toasted.current = true;
      toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email")).trim();
    const password = String(fd.get("password"));
    if (!email || !password) return setError("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">ইমেইল</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={inputCls}
          />
        </div>
        {error && (
          <p className="rounded-lg bg-rise/10 px-3 py-2 text-sm text-rise">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? "অপেক্ষা করুন…" : "সাইন ইন"}
        </button>

        <div className="flex items-center gap-3 text-xs text-ink/60">
          <span className="h-px flex-1 bg-line" />
          অথবা
          <span className="h-px flex-1 bg-line" />
        </div>
        <SocialButtons />
        <p className="text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-brand hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
