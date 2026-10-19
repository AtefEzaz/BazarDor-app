"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { toBn } from "@/lib/format";
import ProductGrid from "./ProductGrid";

type Sort = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  // sorts by the real number (not the Bengali text), so ১,৮৫০ > ৯৯ works
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-line bg-surface p-4">
        <label htmlFor="sort" className="text-sm">সাজান</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="cursor-pointer rounded-lg border border-ink/40 bg-surface px-3 py-1.5 text-xs"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <p className="text-sm text-ink/70">মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </div>
  );
}
