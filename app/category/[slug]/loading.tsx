import { GridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-24 animate-pulse rounded-2xl bg-line" />
      <div className="h-16 animate-pulse rounded-2xl bg-line" />
      <GridSkeleton count={6} />
    </div>
  );
}
