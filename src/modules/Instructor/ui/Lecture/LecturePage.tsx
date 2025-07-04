'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus, Video, Edit, Trash2, Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface Lecture {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration?: string;
  order: number;
}

const LecturePage = () => {
  const router = useRouter()
  const [lectures, setLectures] = useState<Lecture[]>([
    {
      id: "1",
      title: "Introduction to React",
      description: "Learn the basics of React components and JSX",
      videoUrl: "sample-video.mp4",
      duration: "15:30",
      order: 1
    },
    {
      id: "2", 
      title: "State and Props",
      description: "Understanding React state management and component props",
      duration: "22:45",
      order: 2
    }
  ]);
  
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleNext = () => {
    router.push('/instructor/course/publish/2');
  };

  const handlePrev = () => {
    router.push('/instructor/dashboard');
  };

  const handleAddLecture = () => {
    router.push("/instructor/lecture/212/new");
  };

  const handleEditLecture = (lectureId: string) => {
    router.push(`/instructor/lecture/221/${lectureId}`);
  };

  const handleDeleteLecture = (lectureId: string) => {
    setLectures(lectures.filter(lecture => lecture.id !== lectureId));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Content & Pricing</h1>
          <p className="text-gray-400">Manage your course lectures and set pricing</p>
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
              {lectures.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p>No lectures added yet. Click &quot;Add Lecture&quot; to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lectures.map((lecture, index) => (
                    <div key={lecture.id} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{lecture.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{lecture.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              {lecture.videoUrl && (
                                <div className="flex items-center gap-1 text-green-400">
                                  <Play className="w-3 h-3" />
                                  <span className="text-xs">Video uploaded</span>
                                </div>
                              )}
                              {lecture.duration && (
                                <span className="text-xs text-gray-500">{lecture.duration}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditLecture(lecture.id)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteLecture(lecture.id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="block text-sm font-medium mb-2">Course Price ($)</Label>
                  <Input 
                    id="price"
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="99.99"
                  />
                </div>
                <div>
                  <Label htmlFor="discount" className="block text-sm font-medium mb-2">Discount (%)</Label>
                  <Input 
                    id="discount"
                    type="number" 
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="10"
                  />
                </div>
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