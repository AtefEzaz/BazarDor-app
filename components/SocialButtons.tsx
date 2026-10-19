"use client";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SocialButtons() {
  async function social(provider: "google" | "github") {
    const { error } = await signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি`);
  }
  const btn = "flex flex-1 items-center justify-center gap-2 rounded-lg border border-line px-3 py-2.5 text-sm font-semibold hover:bg-page";
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button type="button" onClick={() => social("google")} className={btn}>
        <span className="font-bold text-[#4285f4]">G</span> Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => social("github")} className={btn}>
        <span>🐙</span> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
