'use client'
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizTimerProps {
  timeLeft: number;
}

const QuizTimer = ({ timeLeft }: QuizTimerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Badge variant="secondary" className="bg-red-500/20 text-red-200">
      <Clock className="w-3 h-3 mr-1" />
      {formatTime(timeLeft)}
    </Badge>
  );
};

export default QuizTimer;
