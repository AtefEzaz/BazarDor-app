import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getData, slugify } from "@/lib/api";
import { toBn } from "@/lib/format";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await params;
  const slug = slugify(decodeURIComponent(raw));
  const { products, categories } = await getData();

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = products.filter((p) => p.category === slug || p.categoryName === category.name);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
        <span className="text-4xl">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-sm text-ink/70">{toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      {items.length ? (
        <CategoryProducts products={items} />
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-10 text-center">
          <p className="text-5xl">🕳️</p>
          <p className="mt-3 text-lg font-semibold">এই বিভাগে এখনো কোনো পণ্য নেই</p>
          <a href="/" className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-fg hover:bg-brand-dark">হোম পেজে ফিরে যান</a>
        </div>
      )}
    </div>
  );
}
