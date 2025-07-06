/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {  useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Video, Save, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { uploadImage } from "@/actions/uploadOnCloudinary";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LectureTypes } from "@/types/lectureTypes";

// 
const lectureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  videoFile: z
    .instanceof(File, { message: "Video file is required" })
    .refine((file) => file.type.startsWith("video/"), {
      message: "File must be a video format",
    }).nullish(),
});

type LectureFormData = z.infer<typeof lectureSchema>;

interface Props{
  initialValues?: LectureTypes[0],
  editLectureId?:string;
}

const CreateLecture = ({initialValues}:Props) => {
  const router = useRouter();
  const { courseId, lectureId }: { courseId: string; lectureId: string } =
    useParams();


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LectureFormData>({
    resolver: zodResolver(lectureSchema),
    defaultValues: {
      title: initialValues ? initialValues.title : "",
      videoFile: undefined,
    },
  });

  const [isUploading, setIsUploading] = useState(false);
  const videoFile = watch("videoFile");
  const videoUrl = videoFile ? URL.createObjectURL(videoFile) : "";


  const handleFileUpload = async (file: File) => {
    if (!file || !file.type.startsWith("video/")) return;

    setIsUploading(true);

    setValue("videoFile", file, { shouldValidate: true });
    setIsUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

    const trpc= useTRPC()
    const queryClient = useQueryClient()
 
    const {mutate:createLecture} = useMutation(
      trpc.lecture.create.mutationOptions({
        onSuccess:()=>{
             queryClient.invalidateQueries(
              trpc.lecture.get.queryOptions({
                courseId:courseId || ""
              })
             )
             router.push(`/instructor/lecture/${courseId}`)
        }
      })
    )
    const {mutate:updateLecture} = useMutation(
      trpc.lecture.update.mutationOptions({
        onSuccess:()=>{
             queryClient.invalidateQueries(
              trpc.lecture.get.queryOptions({
                courseId:courseId || ""
              })
             )
             router.push(`/instructor/lecture/${courseId}`)
        }
      })
    )

  const handleBack = (e: any) => {
    e.preventDefault()
    router.push(`/instructor/lecture/${courseId}`);
  };



  const onSubmit = async(data: LectureFormData) => {

    if(initialValues){
           setIsUploading(true)
    let res;
    if(data.videoFile){
       res = await uploadImage(data.videoFile) as any

    }

    const duration = Math.ceil(res.duration)


     updateLecture({lectureId,duration,title:data.title,videoUrl:res.secure_url})
    }

    else{
      setIsUploading(true)
    let res;
    if(data.videoFile){
       res = await uploadImage(data.videoFile) as any

    }

    const duration = Math.ceil(res.duration)


     createLecture({courseId,duration,title:data.title,videoUrl:res.secure_url})

    }
    
    
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={()=> router.push(`/instructor/lecture/${courseId}`) }
            className="text-gray-400 hover:bg-gray-300 hover:text-black mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course Content
          </Button>
          <h1 className="text-3xl font-bold mb-2">
            {initialValues ? "Edit Lecture" : "Add New Lecture"}
          </h1>
          <p className="text-gray-400">
            {initialValues
              ? "Update lecture details and video"
              : "Create a new lecture for your course"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          {/* Lecture Details */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Lecture Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white block text-sm mb-2">Lecture Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter lecture title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

             
            </CardContent>
          </Card>

          {/* Video Upload */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Video Upload</CardTitle>
            </CardHeader>
            <CardContent>
              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="w-full h-2 bg-gray-800 overflow-hidden rounded-full">
                    <div className="h-full w-full bg-blue-500 animate-loader-bar" />
                  </div>
                  <p className="text-sm text-gray-300">Uploading video...</p>
                </div>
              ) : videoUrl ? (
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Video className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="font-medium text-white">Video uploaded</p>
                        <p className="text-sm text-gray-400">{videoFile?.name}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setValue("videoFile",undefined)}
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  >
                    Replace Video
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center border-gray-700"
                  onDragEnter={handleDrop}
                  onDragOver={handleDrop}
                  onDrop={handleDrop}
                >
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400 mb-2">Drop video file here or click to upload</p>
                  <p className="text-sm text-gray-500 mb-4">Support: MP4, MOV, AVI</p>
                  <input
                    type="file"
                    accept="video/*"
                    id="video-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Video File
                    </label>
                  </Button>
                  {errors.videoFile && (
                    <p className="text-red-500 text-sm mt-2">{errors.videoFile.message}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="bg-gray-800  hover:text-white text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              
              type="submit"
              disabled={!watch("title") || !watch("videoFile") || isUploading }
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {initialValues ? "Update Lecture" : "Save Lecture"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLecture;
