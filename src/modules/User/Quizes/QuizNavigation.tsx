'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<string, string>;
  questions: any[];
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  answers, 
  questions, 
  onPrevious, 
  onNext, 
  onSubmit 
}: QuizNavigationProps) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center">
      <Button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        variant="outline"
        className="bg-white/[0.05] border-white/[0.1] text-white hover:bg-white/[0.1] disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <div className="flex gap-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentQuestion 
                ? 'bg-indigo-500' 
                : answers[questions[index].id] 
                  ? 'bg-green-500' 
                  : 'bg-white/[0.2]'
            }`}
          />
        ))}
      </div>

      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Submit Quiz
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default QuizNavigation;