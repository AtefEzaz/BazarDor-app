import { GridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="h-64 animate-pulse rounded-3xl bg-line" />
      <GridSkeleton count={6} />
      <GridSkeleton count={6} />
    </div>
  );
}
