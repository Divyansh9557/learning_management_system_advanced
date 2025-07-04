'use client'
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Video, Save, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";


const CreateLecture = () => {
  const router = useRouter();
  const { lectureId } = useParams();
  const isEdit = lectureId && lectureId !== 'new';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null as File | null,
    videoUrl: ''
  });

  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // In a real app, you'd fetch lecture data here
      setFormData({
        title: 'Introduction to React',
        description: 'Learn the basics of React components and JSX',
        videoFile: null,
        videoUrl: 'sample-video.mp4'
      });
    }
  }, [isEdit]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('video/')) {
      setFormData(prev => ({ ...prev, videoFile: file, videoUrl: URL.createObjectURL(file) }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // In a real app, you'd save the lecture data here
    console.log('Saving lecture:', formData);
    router.push('/instructor/lecture');
  };

  const handleBack = () => {
    router.push('/instructor/lecture/21');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course Content
          </Button>
          <h1 className="text-3xl font-bold mb-2">
            {isEdit ? 'Edit Lecture' : 'Add New Lecture'}
          </h1>
          <p className="text-gray-400">
            {isEdit ? 'Update lecture details and video' : 'Create a new lecture for your course'}
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Lecture Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium mb-2">
                  Lecture Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter lecture title"
                />
              </div>

              <div>
                <Label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  placeholder="Describe what students will learn in this lecture"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Video Upload</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.videoUrl ? (
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Video className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="font-medium text-white">Video uploaded</p>
                        <p className="text-sm text-gray-400">
                          {formData.videoFile ? formData.videoFile.name : 'Current video file'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setFormData(prev => ({ ...prev, videoFile: null, videoUrl: '' }))}
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  >
                    Replace Video
                  </Button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-blue-400 bg-blue-400/10' : 'border-gray-700'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400 mb-2">Drop video file here or click to upload</p>
                  <p className="text-sm text-gray-500 mb-4">Support for MP4, MOV, AVI files</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="video-upload"
                  />
                  <Button 
                    asChild
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Video File
                    </label>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.title.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update Lecture' : 'Save Lecture'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;