export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 animate-pulse rounded-xl bg-line" />
        <div className="space-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-line" />
          <div className="h-3 w-16 animate-pulse rounded bg-line" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-14 animate-pulse rounded bg-line" />
          <div className="h-6 w-24 animate-pulse rounded bg-line" />
        </div>
        <div className="h-6 w-14 animate-pulse rounded-full bg-line" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
