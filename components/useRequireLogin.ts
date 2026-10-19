"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

/** Use on private pages: redirects to /signin (with a toast) if not logged in. */
export function useRequireLogin(redirect: string) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন");
      router.replace(`/signin?redirect=${redirect}`);
    }
  }, [isPending, session, router, redirect]);
  return { session, isPending };
}
