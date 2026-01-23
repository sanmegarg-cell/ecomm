import { Skeleton } from './ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-3 left-3">
          <Skeleton className="w-16 h-8 rounded-full" />
        </div>
        <div className="absolute top-3 right-3">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-2/3 mb-1" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
