const BN = "০১২৩৪৫৬৭৮৯";

/** Convert any digits in a string/number to Bengali digits. */
export const toBn = (v: string | number) =>
  String(v).replace(/\d/g, (d) => BN[Number(d)]);

/** 1850 -> ১,৮৫০  |  63.5 -> ৬৩.৫ */
export const fmtNum = (n: number) =>
  toBn(n.toLocaleString("en-IN", { maximumFractionDigits: 2 }));

export const fmtTaka = (n: number) => `${fmtNum(n)} টাকা`;

export const fmtPct = (n: number) => `${toBn(Math.abs(n).toFixed(1))}%`;

export const trendOf = (change: number): "up" | "down" | "flat" =>
  change > 0 ? "up" : change < 0 ? "down" : "flat";
