import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CreateLectureSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <Skeleton className="h-10 w-40 mb-4" />
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        {/* Lecture Details Card */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        {/* Video Upload Card */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-48 w-full rounded-md" />
            <Skeleton className="h-10 w-40" />
          </CardContent>
        </Card>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
};

export default CreateLectureSkeleton;
