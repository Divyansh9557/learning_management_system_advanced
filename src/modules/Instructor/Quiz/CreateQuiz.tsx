/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizSettings from "./QuizSetting";
import QuestionCard from "./QuestionCard"; 
import QuizPreview from "./QuixPreview";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface Quiz {
  title: string;
  description: string;
  timeLimit: number;
  questions: QuizQuestion[];
}

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    title: '',
    description: '',
    timeLimit: 30,
    questions: []
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [error,setError] = useState<string|undefined>()

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1
    };
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (id: string, field: keyof QuizQuestion, value: any) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    }));
    setError(undefined)
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? {
          ...q,
          options: q.options?.map((opt, idx) => idx === optionIndex ? value : opt)
        } : q
      )
    }));
  };

  const deleteQuestion = (id: string) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const updateQuiz = (updates: Partial<Quiz>) => {
    setQuiz(prev => ({ ...prev, ...updates }));
  };

  const router= useRouter()
  const trpc =  useTRPC()
  const {mutate:createCourse,isPending}= useMutation(
    trpc.quiz.create.mutationOptions({
      onSuccess:()=>{
          router.push('/instructor/dashboard')
      }
    })
  )

  const saveQuiz = () => {
    console.log('Saving quiz:', quiz);

    if(quiz.questions.length ===0){
      alert("Please add questions to your quiz");
     
      return
    }
    if(quiz.description===""){
      alert("Please add description to your quiz");
      return
    }
    if(!quiz.title){
      alert("please provide title to your quiz");
      return
    }
    if(!quiz.timeLimit){
      alert("please provide time limit to your quiz");
      return
    }

    const check = ()=>{
       quiz.questions.map((q,index)=>{
        if(q.options?.length===0){
          alert(`Please add options to your question ${index+1} `)
          setError("1")
        }
        if(q.correctAnswer===""){
          alert(`Please add correct answer to your question ${index+1} `)
          setError("1")
        }
        if(q.question===""){
          alert(`Please add question to your question ${index + 1} `);
          setError("1")
        }
        if(q.points===0){
          alert(`Please add points to your question ${index+1} `)
          setError("1")
        }
      })
    }
    check()

    if(error==="1"){
      return
    }

    const question = JSON.stringify(quiz.questions)

    createCourse({
      description: quiz.description,
      title: quiz.title,
      timeLimit: quiz.timeLimit,
      questions: question,
    });

  };

  return (
    <div className="relative min-h-screen w-full bg-[#030303] overflow-hidden">
      {/* Background Elements */}
      
      
      

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                  Quiz Builder
                </span>
              </h1>
              <p className="text-white/60 text-lg">Create engaging quizzes for your students</p>
              
             
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setPreviewMode(!previewMode)}
                variant="outline"
                className="bg-white/[0.05] border-white/[0.1] text-white hover:bg-white/[0.1]"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
               disabled={isPending}
                onClick={saveQuiz}
                className="bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Quiz
              </Button>
            </div>
          </div>
        </motion.div>

        {!previewMode ? (
          <>
            <QuizSettings quiz={quiz} onUpdateQuiz={updateQuiz} />

            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  onUpdateQuestion={updateQuestion}
                  onUpdateOption={updateOption}
                  onDeleteQuestion={deleteQuestion}
                />
              ))}

              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * (quiz.questions.length + 3) }}
              >
                <Button
                  onClick={addQuestion}
                  variant="outline"
                  className="w-full bg-white/[0.02] border-white/[0.1] border-dashed hover:text-white text-white/80 hover:bg-white/[0.05] h-16"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Question
                </Button>
              </motion.div>
            </div>
          </>
        ) : (
          <QuizPreview quiz={quiz} />
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;