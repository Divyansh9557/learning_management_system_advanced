'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const CourseCreate = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Programming',
    description: '',
    objectives: ''
  });

  const handleNext = () => {
    router.push('/instructor/lecture/22');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Title & Description</h1>
          <p className="text-gray-400">Set your course name, category, and detailed description</p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="block text-sm font-medium mb-2">Course Title</Label>
                <Input 
                  id="title"
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter course title"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="block text-sm font-medium mb-2">Category</Label>
                <select 
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                >
                  <option>Programming</option>
                  <option>Design</option>
                  <option>Business</option>
                  <option>Marketing</option>
                </select>
              </div>

              <div>
                <Label htmlFor="description" className="block text-sm font-medium mb-2">Course Description</Label>
                <Textarea 
                  id="description"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                  placeholder="Describe what students will learn in detail..."
                />
                <p className="text-xs text-gray-500 mt-1">Rich text formatting supported</p>
              </div>

              <div>
                <Label htmlFor="objectives" className="block text-sm font-medium mb-2">Learning Objectives</Label>
                <Textarea 
                  id="objectives"
                  rows={4}
                  value={formData.objectives}
                  onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  placeholder="List key learning objectives..."
                />
                <p className="text-xs text-gray-500 mt-1">Rich text formatting supported</p>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={() => router.push('/instructor/dashboard')}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                Back to Dashboard
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next: Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseCreate;