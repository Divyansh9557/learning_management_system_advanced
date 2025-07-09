/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Star, Clock, User, BookOpen, Download } from "lucide-react";
import { CourseTab } from "./CourseTab";
import { useParams } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTRPC } from "@/trpc/client";
import { toPng } from "html-to-image";

const CourseIdPage = () => {
  const [active, setActive] = useState<number>(0);
  const { courseId } = useParams() as { courseId: string };
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [markedComplete, setMarkedComplete] = useState(false);

  const trpc = useTRPC();

  const { data, isLoading } = useSuspenseQuery(
    trpc.course.getOne.queryOptions({ courseId })
  );
  const { mutate: markAsComplete } = useMutation(
    trpc.lecture.markAsComplete.mutationOptions({})
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleRefresh = async () => {
      await queryClient.invalidateQueries(
        trpc.course.getOne.queryOptions({ courseId })
      );
    };
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (!video || markedComplete) return;

      const { currentTime, duration } = video;
      const progress = currentTime / duration;

      if (progress > 0.85) {
        console.log(`✅ Lecture ${active + 1} is 85% watched, mark complete!`);
        setMarkedComplete(true);
        markAsComplete({ lectureId: data.lectureWithProgress[active].id,courseId });
      }
      if (
        data.lectureCompleted !== data.lectureWithProgress.length &&
        progress > 0.95
      ) {
        handleRefresh();
      }
    };

    video?.addEventListener("timeupdate", handleTimeUpdate);
    return () => video?.removeEventListener("timeupdate", handleTimeUpdate);
  }, [
    markedComplete,
    active,
    markAsComplete,
    data.lectureWithProgress,
    data.lectureCompleted,
  ]);

  const handleLectureChange = (n: number) => {
    setActive(n);
    setMarkedComplete(false); // reset progress tracker on.lectureWithProgress change
  };

  const formatSecondsToHHMMSS = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const duration = () => {
    const time = data?.lectureWithProgress.reduce(
      (acc, curr) => acc + (curr.duration || 0),
      0
    );
    return formatSecondsToHHMMSS(time || 0);
  };

  const ref = useRef<HTMLDivElement>(null)
 
   const onButtonClick = useCallback(() => {
     if (ref.current === null) {
       return
     }
 
     toPng(ref.current, { cacheBust: true, })
       .then((dataUrl) => {
         const link = document.createElement('a')
         link.download = 'certificate.png'
         link.href = dataUrl
         link.click()
       })
       .catch((err) => {
         console.log(err)
       })
   }, [ref])
  if (isLoading)
    return <div className="text-center py-10 text-white">Loading...</div>;


  return (
    <div className="text-white bg-[#0d0d0d] min-h-screen">
      {/* Video Section */}
      <div className="bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-video bg-black rounded-b-xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              controls
              ref={videoRef}
              poster={data?.course.thumbnailUrl || ""}
              onClick={() => console.log("hello")}
            >
              <source
                src={data?.lectureWithProgress[active]?.videoUrl || ""}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
        {/* Left: Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-md">
            <h1 className="text-2xl font-bold text-white mb-4">
              {data?.lectureWithProgress[active]?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{data?.instructor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>4.8 (2,341 reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{duration()} total</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{data?.lectureWithProgress.length} lessons</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between">
              {data.lectureCompleted === data.lectureWithProgress.length ? (
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium bg-green-600/20 text-green-300`}
                >
                  completed
                </span>
              ) : (
                <span className="text-sm text-gray-400">
                  Progress: {data.lectureCompleted} /{" "}
                  {data?.lectureWithProgress.length} completed
                </span>
              )}
              {data.lectureCompleted === data.lectureWithProgress.length ? (
                ""
              ) : (
                <div className="w-48 h-2 rounded-full bg-gray-700 overflow-hidden">
                  <div
                    style={{ width: `${data.progress}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <CourseTab
            handleLectureChange={handleLectureChange}
            data={data}
            active={active}
            onButtonClick={onButtonClick}
            ref= {ref}
          />
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-sm">
            <h3 className="font-semibold text-white mb-4">Course Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Completed</span>
                <span className="text-white font-medium">
                  {data.lectureCompleted} / {data?.lectureWithProgress.length}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  style={{ width: `${data.progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
              <p className="text-center text-sm text-gray-400">
                {data.progress}% Complete
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-sm">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
             <div className="space-y-3" >
              <button className="w-full  flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200">
              <Download className="w-4 h-4" />
              Download Resources
            </button>
           
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
