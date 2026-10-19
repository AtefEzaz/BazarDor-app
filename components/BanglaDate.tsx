"use client";
import { useEffect, useState } from "react";
import { toBn } from "@/lib/format";

export default function BanglaDate({ className = "" }: { className?: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const d = new Date();
    const s = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }).format(d);
    setText(toBn(s));
  }, []);
  return <span className={className} suppressHydrationWarning>{text || "\u00A0"}</span>;
}
