import { Skeleton } from "@/components/ui/skeleton";


export const LectureSkeleton = () => {
    return (<>
    
   <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
    <div className="flex items-center gap-4 flex-1">
      <Skeleton className="w-8 h-8 rounded-full bg-gray-700" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-gray-700" />
        <Skeleton className="h-3 w-1/2 bg-gray-700" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Skeleton className="w-6 h-6 bg-gray-700 rounded-md" />
      <Skeleton className="w-6 h-6 bg-gray-700 rounded-md" />
    </div>
  </div>
    
    </>)
}
;