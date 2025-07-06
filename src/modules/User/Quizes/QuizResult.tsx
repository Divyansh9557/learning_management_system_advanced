'use client';
import { motion } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface QuizResultsProps {
  score: number;
  totalPoints: number;
  onRestart: () => void;
}

const QuizResults = ({ score, totalPoints, onRestart }: QuizResultsProps) => {
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

  const percentage = Math.round((score / totalPoints) * 100);

  return (
    <div className="relative min-h-screen w-full bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl text-center"
        >
          <Card className="bg-white/5 border-white/[0.1] backdrop-blur-sm p-4 sm:p-6">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl text-white mb-4">
                Quiz Completed!
              </CardTitle>

              <div className="space-y-4">
                <div className="text-5xl sm:text-6xl font-bold text-white">
                  {percentage}%
                </div>
                <p className="text-white/60 text-sm sm:text-lg">
                  You scored {score} out of {totalPoints} points
                </p>

                <div className="flex justify-center gap-2 flex-wrap text-sm sm:text-base">
                  {percentage >= 80 && (
                    <Badge className="bg-green-500/20 text-green-200">
                      Excellent!
                    </Badge>
                  )}
                  {percentage >= 60 && percentage < 80 && (
                    <Badge className="bg-yellow-500/20 text-yellow-200">
                      Good Job!
                    </Badge>
                  )}
                  {percentage < 60 && (
                    <Badge className="bg-red-500/20 text-red-200">
                      Keep Practicing!
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="mt-6 flex gap-5 justify-center ">
              <Link href={'/quizzes'} >
              <Button
              variant="outline"
              className="w-full sm:w-auto bg-white/5 hover:text-white border-white/10 text-white hover:bg-white/10"
              >
                   Back
              </Button>
                </Link>
              <Button
                onClick={onRestart}
                variant="outline"
                className="w-full sm:w-auto bg-white/5 hover:text-white border-white/10 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Quiz Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResults;
