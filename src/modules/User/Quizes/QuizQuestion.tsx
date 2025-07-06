'use client'
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface QuizQuestionProps {
  question: QuizQuestion;
  answer: string;
  onAnswerChange: (questionId: string, answer: string) => void;
}

const QuizQuestion = ({ question, answer, onAnswerChange }: QuizQuestionProps) => {
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
      key={question.id}
    >
      <Card className="bg-white/[0.02] border-white/[0.1] backdrop-blur-sm mb-8">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            {question.question}
          </CardTitle>
          <div className="flex justify-end">
            <Badge variant="outline" className="border-white/[0.2] text-white/60">
              {question.points} {question.points === 1 ? 'point' : 'points'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === 'multiple-choice' && (
            <RadioGroup 
              value={answer || ""} 
              onValueChange={(value) => onAnswerChange(question.id, value)}
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    className="border-white/[0.3] text-white"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-white/80 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'true-false' && (
            <RadioGroup 
              value={answer || ""} 
              onValueChange={(value) => onAnswerChange(question.id, value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="true" 
                  id="true"
                  className="border-white/[0.3] text-white"
                />
                <Label htmlFor="true" className="text-white/80 cursor-pointer">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="false" 
                  id="false"
                  className="border-white/[0.3] text-white"
                />
                <Label htmlFor="false" className="text-white/80 cursor-pointer">False</Label>
              </div>
            </RadioGroup>
          )}

          {question.type === 'short-answer' && (
            <Input
              value={answer || ""}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              placeholder="Enter your answer..."
              className="bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/40"
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizQuestion;