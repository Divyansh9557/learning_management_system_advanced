'use client'
import { motion } from "framer-motion";
import { Edit3, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Quiz {
  title: string;
  description: string;
  timeLimit: number;
}

interface QuizSettingsProps {
  quiz: Quiz;
  onUpdateQuiz: (updates: Partial<Quiz>) => void;
}

const QuizSettings = ({ quiz, onUpdateQuiz }: QuizSettingsProps) => {
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
      transition={{ delay: 0.1 }}
    >
      <Card className="mb-8 bg-white/[0.02] border-white/[0.1] backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Quiz Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white/80">Quiz Title</Label>
              <Input
                id="title"
                value={quiz.title}
                onChange={(e) => onUpdateQuiz({ title: e.target.value })}
                placeholder="Enter quiz title..."
                className="bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeLimit" className="text-white/80 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time Limit (minutes)
              </Label>
              <Input
                id="timeLimit"
                type="number"
                value={quiz.timeLimit}
                onChange={(e) => onUpdateQuiz({ timeLimit: parseInt(e.target.value) })}
                className="bg-white/[0.05] border-white/[0.1] text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white/80">Description</Label>
            <Textarea
              id="description"
              value={quiz.description}
              onChange={(e) => onUpdateQuiz({ description: e.target.value })}
              placeholder="Enter quiz description..."
              className="bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/40"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizSettings;