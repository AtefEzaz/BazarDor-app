export type Market = {
  name: string;
  division: string;
  min: number;
  max: number;
  avg: number;
};

export type Category = { slug: string; name: string; emoji: string };

export type Product = {
  id: string;
  name: string;
  emoji: string;
  unit: string; // e.g. "প্রতি কেজি"
  category: string; // category slug
  categoryName: string;
  price: number;
  change: number; // percent, +up / -down
  description: string;
  markets: Market[];
  min: number;
  max: number;
  avg: number;
};
