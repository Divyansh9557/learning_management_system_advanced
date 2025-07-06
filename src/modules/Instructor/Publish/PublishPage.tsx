'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Eye, Users, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";


const PublishPage = () => {
  const { courseId } = useParams() as { courseId: string }
  const router= useRouter()
  const [agreed, setAgreed] = useState(false);

  const handlePublish = () => {
    // Handle publish logic here
    router.push('/instructor/dashboard');
  };

  const trpc = useTRPC()

  const {data} = useSuspenseQuery(
    trpc.course.getOne.queryOptions({courseId})
  )
   
  console.log(data)
  const handlePrev = () => {
    router.back()
  };


  const duration = data?.reduce((acc,data)=>{
     if(data.lecture.duration){
      return acc + data.lecture.duration
     } else {
       return acc + 0
     }
  } ,0)

  function formatSecondsToTime(totalSeconds:number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Pad with zeros for HH:MM:SS
  const pad = (num: number) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl text-white font-bold mb-2">Review & Publish</h1>
          <p className="text-white">Review your course details and publish when ready</p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Course Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl text-white font-semibold mb-4">{data[0].course.title}</h3>
                <p className="text-white mb-4">
                  {data[0].course.description}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-700 rounded">
                    <Eye className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                    <p className="text-sm">Preview</p>
                  </div>
                  <div className="text-center p-3 bg-gray-700 rounded">
                    <Users className="w-6 h-6 mx-auto mb-1 text-green-400" />
                    <p className="text-sm">Students</p>
                  </div>
                  <div className="text-center p-3 bg-gray-700 rounded">
                    <Star className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                    <p className="text-sm">Rating</p>
                  </div>
                  <div className="text-center p-3 bg-gray-700 rounded">
                    <CheckCircle className="w-6 h-6 mx-auto mb-1 text-purple-400" />
                    <p className="text-sm">Complete</p>
                  </div>
                </div>

                <div className="border-t text-white border-gray-700 pt-4">
                  <h4 className="font-semibold  mb-2">Course Includes:</h4>
                  <ul className="text-sm text-white  space-y-1">
                    <li>• {data.length} video lessons ({formatSecondsToTime(duration)} hours total)</li>
                    <li>• Downloadable resources</li>
                    <li>• Certificate of completion</li>
                    <li>• Lifetime access</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 text-white p-4 rounded">
                <h4 className="font-semibold mb-2">Publish Checklist</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Course title and description added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Course content uploaded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Pricing configured</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded" 
                />
                <Label  htmlFor="terms" className=" text-white text-sm">
                  I agree to the terms and conditions and course publishing guidelines
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            Previous
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={!agreed}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            Publish Course
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishPage;