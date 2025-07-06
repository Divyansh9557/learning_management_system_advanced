'use client'
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface QuizPreviewProps {
  quiz: Quiz;
}

const QuizPreview = ({ quiz }: QuizPreviewProps) => {
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

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white/[0.02] border-white/[0.1] backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white mb-2">{quiz.title}</CardTitle>
          <p className="text-white/60">{quiz.description}</p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-200">
              <Clock className="w-3 h-3 mr-1" />
              {quiz.timeLimit} minutes
            </Badge>
            <Badge variant="secondary" className="bg-rose-500/20 text-rose-200">
              {quiz.questions.length} questions
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="border-b border-white/[0.1] pb-6 last:border-b-0">
              <h3 className="text-white font-semibold mb-3">
                {index + 1}. {question.question}
              </h3>
              {question.type === 'multiple-choice' && (
                <div className="space-y-2 ml-4">
                  {question.options?.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-white/[0.3]" />
                      <span className="text-white/80">{option}</span>
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'true-false' && (
                <div className="space-y-2 ml-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-white/[0.3]" />
                    <span className="text-white/80">True</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-white/[0.3]" />
                    <span className="text-white/80">False</span>
                  </div>
                </div>
              )}
              {question.type === 'short-answer' && (
                <div className="ml-4">
                  <div className="w-full h-8 bg-white/[0.05] border border-white/[0.1] rounded" />
                </div>
              )}
              <div className="flex justify-end mt-2">
                <Badge variant="outline" className="border-white/[0.2] text-white/60">
                  {question.points} {question.points === 1 ? 'point' : 'points'}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizPreview;