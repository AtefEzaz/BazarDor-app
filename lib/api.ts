import type { Category, Market, Product } from "./types";
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./fallback";

// Main API first, then the two backups from the assignment README
const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const EMOJI_BY_CATEGORY: Record<string, string> = {
  chal: "🍚",
  dal: "🫘",
  tel: "🛢️",
  sobji: "🥬",
  mach: "🐟",
  mangsho: "🍗",
  "dim-dudh": "🥛",
  moshla: "🌶️",
};

async function getJSON(path: string): Promise<unknown | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch {
      /* try next base */
    }
  }
  return null;
}

/* ---------- tolerant helpers (API field names can differ) ---------- */
type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function toArray(json: unknown): Obj[] {
  if (Array.isArray(json)) return json.filter(isObj);
  if (isObj(json)) {
    for (const k of [
      "data",
      "products",
      "categories",
      "items",
      "result",
      "results",
    ]) {
      const v = json[k];
      if (Array.isArray(v)) return v.filter(isObj);
      if (isObj(v)) {
        const inner = toArray(v);
        if (inner.length) return inner;
      }
    }
  }
  return [];
}

const str = (o: Obj, keys: string[]): string => {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (typeof v === "number") return String(v);
  }
  return "";
};

const num = (o: Obj, keys: string[]): number | undefined => {
  for (const k of keys) {
    const v = o[k];
    const n =
      typeof v === "number"
        ? v
        : typeof v === "string"
          ? parseFloat(v.replace(/[^\d.-]/g, ""))
          : NaN;
    if (!Number.isNaN(n)) return n;
  }
  return undefined;
};

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/\s+/g, "-");

function normalizeCategory(o: Obj): Category {
  const slug =
    str(o, ["slug", "id", "key", "category", "value"]) || str(o, ["name"]);
  const name = str(o, ["name", "title", "label", "nameBn", "name_bn"]) || slug;
  const emoji =
    str(o, ["emoji", "icon", "image"]) || EMOJI_BY_CATEGORY[slug] || "🛒";
  return { slug: slugify(slug), name, emoji };
}

function normalizeMarkets(o: Obj): Market[] {
  const list = [
    "markets",
    "marketPrices",
    "market_prices",
    "bazars",
    "prices",
    "marketWise",
  ]
    .map((k) => o[k])
    .find((v) => Array.isArray(v)) as Obj[] | undefined;
  if (!list) return [];
  return list.filter(isObj).map((m) => {
    const avg =
      num(m, ["avg", "average", "avgPrice", "price", "todayPrice"]) ?? 0;
    return {
      name: str(m, ["name", "market", "marketName", "bazar", "bazarName"]),
      division: str(m, ["division", "region", "area", "district", "location"]),
      min: num(m, ["min", "minPrice", "minimum", "low"]) ?? avg,
      max: num(m, ["max", "maxPrice", "maximum", "high"]) ?? avg,
      avg,
    };
  });
}

function normalizeProduct(o: Obj, i: number, cats: Category[]): Product {
  const markets = normalizeMarkets(o);
  const avgFromMarkets = markets.length
    ? markets.reduce((s, m) => s + m.avg, 0) / markets.length
    : undefined;

  const price =
    num(o, [
      "price",
      "currentPrice",
      "todayPrice",
      "avgPrice",
      "averagePrice",
      "avg",
    ]) ??
    avgFromMarkets ??
    0;

  let change = num(o, [
    "change",
    "changePercent",
    "change_percent",
    "percentChange",
    "priceChange",
    "percentage",
    "trendPercent",
  ]);
  const prev = num(o, [
    "previousPrice",
    "yesterdayPrice",
    "prevPrice",
    "oldPrice",
  ]);
  if (change === undefined && prev) change = ((price - prev) / prev) * 100;
  change = change ?? 0;
  const dir = str(o, ["trend", "direction", "status"]).toLowerCase();
  if (change > 0 && (dir === "down" || dir === "fall")) change = -change;

  // category can be a string or an object
  const rawCat = o["category"] ?? o["categoryId"] ?? o["category_slug"];
  let catSlug = "";
  let catName = "";
  if (isObj(rawCat)) {
    const c = normalizeCategory(rawCat);
    catSlug = c.slug;
    catName = c.name;
  } else if (typeof rawCat === "string" || typeof rawCat === "number") {
    const key = slugify(String(rawCat));
    const hit = cats.find((c) => c.slug === key || slugify(c.name) === key);
    catSlug = hit?.slug ?? key;
    catName = hit?.name ?? String(rawCat);
  }

  const id = str(o, ["id", "_id", "slug"]) || String(i + 1);
  const mins = markets.map((m) => m.min);
  const maxs = markets.map((m) => m.max);

  return {
    id,
    name:
      str(o, ["name", "title", "nameBn", "name_bn", "productName"]) || "পণ্য",
    emoji:
      str(o, ["emoji", "icon", "image", "thumbnail"]) ||
      cats.find((c) => c.slug === catSlug)?.emoji ||
      "🛒",
    unit: (() => {
      const u = str(o, ["unit", "uom", "per"]);
      return !u ? "প্রতি কেজি" : u.startsWith("প্রতি") ? u : `প্রতি ${u}`;
    })(),
    category: catSlug,
    categoryName: catName,
    price,
    change,
    description:
      str(o, ["description", "summary", "details", "subtitle"]) ||
      "বিভিন্ন বাজারের তুলনামূলক দাম।",
    markets,
    min:
      num(o, ["minPrice", "min"]) ?? (mins.length ? Math.min(...mins) : price),
    max:
      num(o, ["maxPrice", "max"]) ?? (maxs.length ? Math.max(...maxs) : price),
    avg: num(o, ["avgPrice", "averagePrice"]) ?? avgFromMarkets ?? price,
  };
}

/* ---------- public API ---------- */
export async function getData(): Promise<{
  products: Product[];
  categories: Category[];
}> {
  const [pJson, cJson] = await Promise.all([
    getJSON("/products"),
    getJSON("/categories"),
  ]);

  let categories = toArray(cJson)
    .map(normalizeCategory)
    .filter((c) => c.slug);
  if (!categories.length) categories = FALLBACK_CATEGORIES;

  let products = toArray(pJson).map((o, i) =>
    normalizeProduct(o, i, categories),
  );
  // Safety net: if API is down or has an unexpected shape, the site still works
  if (!products.length || products.every((p) => !p.price))
    products = FALLBACK_PRODUCTS;

  // fill category names
  products = products.map((p) => ({
    ...p,
    categoryName:
      p.categoryName ||
      categories.find((c) => c.slug === p.category)?.name ||
      "",
  }));
  return { products, categories };
}
