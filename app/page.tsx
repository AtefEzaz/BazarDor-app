import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getData } from "@/lib/api";
import { toBn } from "@/lib/format";

export default async function Home() {
  const { products } = await getData();
  const risers = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div className="space-y-10">
      <Hero />

      <section>
        <h2 className="mb-4 text-xl font-bold"><span className="mr-2 text-base text-rise">▲</span>আজ দাম বেড়েছে</h2>
        <ProductGrid products={risers} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold"><span className="mr-2 text-base text-fall">▼</span>আজ দাম কমেছে</h2>
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-ink/70">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
