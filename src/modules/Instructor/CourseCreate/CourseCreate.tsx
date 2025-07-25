/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadOnCloudinary } from "@/actions/uploadOnCloudinary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import {  courseGetOneInstructor } from "@/types/types";

// 🧠 Zod schema with price
const courseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  category: z.string().min(1, "Please select a category"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid non-negative number",
    }),
  description: z.string().min(1, "Description is required"),
  thumbnailUrl: z
    .any()
    .refine((file) => file?.length === 1, "Thumbnail is required")
    .refine(
      (file) => file?.[0]?.type.startsWith("image/"),
      "File must be an image"
    ),
});

type CourseFormData = z.infer<typeof courseSchema>;


interface CourseCreateProps {
  initialValues?:courseGetOneInstructor
}

const CourseCreate = ({initialValues}:CourseCreateProps) => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);
  const {courseId} = useParams() as {courseId:string}

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    trpc.course.create.mutationOptions({
      onSuccess: (data: any) => {
        setIsLoading(false);
        queryClient.invalidateQueries(
          trpc.course.getManyInstructor.queryOptions()
        );
        router.push(`/instructor/lecture/${data.id}`);
      },
      onError: (error) => {
        console.error("Error creating course:", error);
        setIsLoading(false);
      },
    })
  );
  const { mutate:updateCourse } = useMutation(
    trpc.course.updateCourse.mutationOptions({
      onSuccess: () => {
        setIsLoading(false);
        queryClient.invalidateQueries(
          trpc.course.getManyInstructor.queryOptions()
        );
        router.push(`/instructor/dashboard`);
      },
      onError: (error) => {
        console.error("Error creating course:", error);
        setIsLoading(false);
      },
    })
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues:{
      category: initialValues?.category || "",
      difficulty:initialValues?.difficulty || "beginner",
      description:initialValues?.description || "",
      price:initialValues?.price.toString() || "0",
      title:initialValues?.title || ""
    }
  });

  const onSubmit = async (data: CourseFormData) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("thumbnail", data.thumbnailUrl[0]);

    const response = await uploadOnCloudinary(formData) as any;

    const { category, description, difficulty, title, price } = data;
    
    if(initialValues){
         updateCourse({
          category,
          courseId,
          description,
          difficulty,
          price:parseInt(price),
          thumbnailUrl:response.secure_url,
          title,
         })
    }
    else{
       mutate({
      title,
      category,
      difficulty,
      description,
      price: parseInt(price),
      thumbnailUrl: response.secure_url,
    });
  };
    }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnailUrl", [file]);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Course Title & Description
          </h1>
          <p className="text-gray-400">
            {initialValues
              ? " Update your course name, category, and detailed description"
              : " Set your course name, category, and detailed description"}
          </p>
        </div>

        <Card className="bg-[#111112] border border-gray-800 text-white shadow-md">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  placeholder="Enter course title"
                  className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  {...register("category")}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                >
                  <option value="">Select Category</option>
                  <option>Programming</option>
                  <option>Design</option>
                  <option>Business</option>
                  <option>Marketing</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <select
                  id="difficulty"
                  {...register("difficulty")}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                >
                  <option value="">Select Difficulty</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {errors.difficulty && (
                  <p className="text-red-500 text-sm">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Course Price (in ₹)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price (e.g., 499)"
                  className="bg-gray-800 border border-gray-700 text-white"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  rows={6}
                  placeholder="Describe what students will learn in detail..."
                  className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Course Thumbnail</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="bg-gray-800 border border-gray-700 text-white"
                  onChange={handleThumbnailChange}
                />
                {previewUrl && (
                  <div className="mt-2">
                    <Image
                      src={previewUrl}
                      alt="Thumbnail Preview"
                      width={300}
                      height={180}
                      className="rounded border border-gray-600 object-contain"
                    />
                  </div>
                )}
                {errors.thumbnailUrl && (
                  <p className="text-red-500 text-sm">
                    {errors.thumbnailUrl.message as string}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/instructor/dashboard")}
                  className="bg-gray-800 border border-gray-700 text-white hover:bg-gray-700"
                >
                  Back to Dashboard
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {initialValues
                    ? loading
                      ? "Uploading..."
                      : "Update Course"
                    : loading
                    ? "Uploading..."
                    : "Upload Course"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseCreate;
