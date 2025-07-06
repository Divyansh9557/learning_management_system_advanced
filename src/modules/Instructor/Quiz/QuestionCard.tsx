'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Trash2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface QuestionCardProps {
  question: QuizQuestion;
  index: number;
  onUpdateQuestion: (id: string, field: keyof QuizQuestion, value: any) => void;
  onUpdateOption: (questionId: string, optionIndex: number, value: string) => void;
  onDeleteQuestion: (id: string) => void;
}

const 
QuestionCard = ({ 
  question, 
  index, 
  onUpdateQuestion, 
  onUpdateOption, 
  onDeleteQuestion 
}: QuestionCardProps) => {
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
      transition={{ delay: 0.1 * (index + 2) }}
    >
      <Card className="bg-white/[0.02] border-white/[0.1] backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Question {index + 1}
            </CardTitle>
            <Button
              onClick={() => onDeleteQuestion(question.id)}
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label className="text-white/80">Question</Label>
              <Textarea
                value={question.question}
                onChange={(e) => onUpdateQuestion(question.id, 'question', e.target.value)}
                placeholder="Enter your question..."
                className="bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/80">Question Type</Label>
                <Select 
                  value={question.type} 
                  onValueChange={(value) => onUpdateQuestion(question.id, 'type', value)}
                >
                  <SelectTrigger className="bg-white/[0.05] border-white/[0.1] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/[0.1]">
                    <SelectItem value="multiple-choice" className="text-white">Multiple Choice</SelectItem>
                    <SelectItem value="true-false" className="text-white">True/False</SelectItem>
                    <SelectItem value="short-answer" className="text-white">Short Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Points</Label>
                <Input
                  type="number"
                  value={question.points}
                  onChange={(e) => onUpdateQuestion(question.id, 'points', parseInt(e.target.value))}
                  className="bg-white/[0.05] border-white/[0.1] text-white"
                />
              </div>
            </div>
          </div>

          {question.type === 'multiple-choice' && (
            <div className="space-y-3">
              <Label className="text-white/80">Answer Options</Label>
              {question.options?.map((option, optIndex) => (
                <div key={optIndex} className="flex gap-2">
                  <Input
                    value={option}
                    onChange={(e) => onUpdateOption(question.id, optIndex, e.target.value)}
                    placeholder={`Option ${optIndex + 1}`}
                    className="bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/40"
                  />
                  <Button
                    onClick={() => onUpdateQuestion(question.id, 'correctAnswer', option)}
                    variant={question.correctAnswer === option ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      question.correctAnswer === option 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-white/[0.05] border-white/[0.1] text-white hover:bg-white/[0.1]"
                    )}
                  >
                    Correct
                  </Button>
                </div>
              ))}
            </div>
          )}

          {question.type === 'true-false' && (
            <div className="space-y-2">
              <Label className="text-white/80">Correct Answer</Label>
              <Select 
                value={question.correctAnswer} 
                onValueChange={(value) => onUpdateQuestion(question.id, 'correctAnswer', value)}
              >
                <SelectTrigger className="bg-white/[0.05] border-white/[0.1] text-white">
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/[0.1]">
                  <SelectItem value="true" className="text-white">True</SelectItem>
                  <SelectItem value="false" className="text-white">False</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {question.type === 'short-answer' && (
            <div className="space-y-2">
              <Label className="text-white/80">Sample Answer</Label>
              <Input
                value={question.correctAnswer}
                onChange={(e) => onUpdateQuestion(question.id, 'correctAnswer', e.target.value)}
                placeholder="Enter sample answer..."
                className="bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/40"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;