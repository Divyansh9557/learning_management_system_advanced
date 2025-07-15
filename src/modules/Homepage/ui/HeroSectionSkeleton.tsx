import { Skeleton } from "@/components/ui/skeleton";

export const HeroSectionSkeleton = () => {
  return (
    <section className="bg-[#0f0f0f] min-h-screen flex items-center justify-center px-6 py-16 sm:px-10 md:px-20">
      <div className="max-w-5xl w-full space-y-6 text-center">
        {/* Badge */}
        <div className="flex justify-center">
          <Skeleton className="h-6 w-28 rounded-full bg-[#312630]" />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/5 mx-auto rounded bg-[#312630]" />
          <Skeleton className="h-10 w-2/5 mx-auto rounded bg-[#312630]" />
        </div>

        {/* Subtitle */}
        <Skeleton className="h-4 w-4/5 mx-auto rounded bg-[#312630]" />
        <Skeleton className="h-4 w-3/5 mx-auto rounded bg-[#312630]" />
      </div>
    </section>
  );
};