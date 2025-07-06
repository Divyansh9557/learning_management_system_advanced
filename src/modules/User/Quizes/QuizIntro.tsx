'use client';
import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Quiz {
  title: string;
  description: string;
  timeLimit: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[];
}

interface QuizIntroProps {
  quiz: Quiz;
  onStartQuiz: () => void;
}

const QuizIntro = ({ quiz, onStartQuiz }: QuizIntroProps) => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="relative min-h-screen w-full bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />

      <div className="z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl text-center"
        >
          <Card className="bg-white/5 border-white/[0.1] backdrop-blur-sm p-4 sm:p-6">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-white mb-4">
                {quiz.title}
              </CardTitle>
              <p className="text-white/60 text-sm sm:text-base mb-6">
                {quiz.description}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-200 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {quiz.timeLimit} minutes
                </Badge>
                <Badge variant="secondary" className="bg-rose-500/20 text-rose-200 text-sm">
                  {quiz.questions.length} questions
                </Badge>
                
              </div>
            </CardHeader>

            <CardContent>
              <Button
                onClick={onStartQuiz}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white px-6 py-4 text-base sm:text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizIntro;
