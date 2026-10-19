import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-10 md:flex-row md:justify-between">
      <div className="max-w-xl text-center md:text-left">
        <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
          <BanglaDate />
        </span>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
        <p className="mt-3 text-base text-ink/80">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        {/* anchor link — scrolls on the same page, no route change */}
        <a
          href="#সব-পণ্য"
          className="mt-5 inline-block rounded-lg border border-brand-dark bg-brand px-5 py-2.5 text-sm font-semibold text-brand-fg hover:bg-brand-dark"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <Image src="/bazar-hero.png" alt="বাজারের ঝুড়ি" width={315} height={263} priority className="h-auto w-56 md:w-80" />
    </section>
  );
}
