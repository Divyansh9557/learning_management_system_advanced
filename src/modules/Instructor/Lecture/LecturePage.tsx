"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus, Video, Edit, Trash2, Play, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";


interface Props {
  courseId: string;
}


const LecturePage = ({ courseId }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.lecture.get.queryOptions({ courseId }));

  const { mutate: deleteLecture, isPending } = useMutation(
    trpc.lecture.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.lecture.get.queryOptions({ courseId })
        );
      },
    })
  );

  const handleNext = () => {
    router.push(`/instructor/course/publish/${courseId}`);
  };

  const handlePrev = () => {
    router.push("/instructor/dashboard");
  };

  const handleAddLecture = () => {
    router.push(`/instructor/lecture/${courseId}/new`);
  };

  const handleEditLecture = (lectureId: string) => {
    router.push(`/instructor/lecture/${courseId}/${lectureId}`);
  };

  const handleDeleteLecture = (lectureId: string) => {
    deleteLecture({ lectureId });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Content & Pricing</h1>
          <p className="text-gray-400">
            Manage your course lectures and set pricing
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Course Lectures</CardTitle>
              <Button
                onClick={handleAddLecture}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lecture
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p>
                    No lectures added yet. Click &quot;Add Lecture&quot; to get
                    started.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data?.map((lecture, index) => (
                    <div
                      key={lecture.id}
                      className="bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {lecture.title}
                            </h4>

                            <div className="flex items-center gap-4 mt-2">
                              {lecture.videoUrl && (
                                <div className="flex items-center gap-1 text-green-400">
                                  <Play className="w-3 h-3" />
                                  <span className="text-xs">
                                    Video uploaded
                                  </span>
                                </div>
                              )}
                              {lecture.duration && (
                                <span className="text-xs text-gray-500">
                                  {(lecture.duration / 60).toFixed(0)}:
                                  {lecture.duration % 60} minutes
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditLecture(lecture.id)}
                            className="text-gray-400 hover:text-black"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                disabled={isPending}
                                size="sm"
                                variant="ghost"
                                className="text-gray-400 hover:text-red-400"
                              >
                              
                                  <Trash2 className="w-4 h-4" />
                               
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="bg-gray-900 text-white border border-gray-700">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Lecture
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  Are you sure you want to delete{" "}
                                  <span className="text-white font-semibold">
                                    {lecture.title}
                                  </span>
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                  onClick={() =>
                                    handleDeleteLecture(lecture.id)
                                  }
                                >
                                  {
                                    isPending?<Loader className="animate-spin" />:"Delete"
                                  }
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handlePrev}
            className="bg-gray-800 border-gray-700 text-white "
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Next: Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LecturePage;
