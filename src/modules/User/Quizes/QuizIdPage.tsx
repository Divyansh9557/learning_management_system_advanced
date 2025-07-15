/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion"; 
import QuizNavigation from "./QuizNavigation"; 
import QuizResults from "./QuizResult"; 
import QuizTimer from "./QuizTime";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useParams } from "next/navigation";

// Sample quiz data
// const sampleQuiz = {
//   title: "JavaScript Fundamentals",
//   description: "Test your knowledge of JavaScript basics",
//   timeLimit: 0.5,
//   questions: [
//     {
//       id: "1",
//       type: "multiple-choice" as const,
//       question: "What is the correct way to declare a variable in JavaScript?",
//       options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
//       correctAnswer: "var myVar;",
//       points: 1
//     },
//     {
//       id: "2",
//       type: "true-false" as const,
//       question: "JavaScript is a compiled language.",
//       correctAnswer: "false",
//       points: 1
//     },
//     {
//       id: "3",
//       type: "short-answer" as const,
//       question: "What method is used to add an element to the end of an array?",
//       correctAnswer: "push",
//       points: 2
//     }
//   ]
// };

const QuizTaker = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const {quizId} = useParams() as { quizId: string };;
  const [sampleQuiz,setSampleQuiz]= useState<any>(
{
  title: "JavaScript Fundamentals",
  description: "Test your knowledge of JavaScript basics",
  timeLimit: 0.5,
  questions: [
    {
      id: "1",
      type: "multiple-choice" as const,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
      correctAnswer: "var myVar;",
      points: 1
    },
    {
      id: "2",
      type: "true-false" as const,
      question: "JavaScript is a compiled language.",
      correctAnswer: "false",
      points: 1
    },
    {
      id: "3",
      type: "short-answer" as const,
      question: "What method is used to add an element to the end of an array?",
      correctAnswer: "push",
      points: 2
    }
  ]
}
  )

  const trpc = useTRPC() 

  
  const { data } = useSuspenseQuery(
    trpc.quiz.getOne.queryOptions({ quizId: typeof quizId === "string" ? quizId : "" })
  )


  useEffect(()=>{
    setTimeLeft((data?.timeLimit ?? 0) * 60)
    setSampleQuiz(data)
  },[data])

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleSubmitQuiz();
    }
  }, [quizStarted, quizCompleted, timeLeft]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(sampleQuiz.timeLimit * 60);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    sampleQuiz.questions.forEach((question:any) => {
      const userAnswer = answers[question.id]?.toLowerCase();
      const correctAnswer = question.correctAnswer.toLowerCase();
      if (userAnswer === correctAnswer) {
        totalScore += question.points;
      }
    });
    return totalScore;
  };
  const queryClient = useQueryClient()

  const {mutate:UpdateQuiz} = useMutation(
    trpc.quiz.attemptQuiz.mutationOptions({
      onSuccess:async()=>{
          await queryClient.invalidateQueries(
             trpc.quiz.getMany.queryOptions()
           )
      }
    })
  )

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);
    UpdateQuiz({quizId})
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(sampleQuiz.timeLimit * 60);
    setQuizCompleted(false);
    setScore(0);
  };

  const totalPoints = sampleQuiz.questions.reduce((sum:any, q:any) => sum + q.points, 0);

  if (!quizStarted) {
    return <QuizIntro quiz={sampleQuiz} onStartQuiz={startQuiz} />;
  }

  if (quizCompleted) {
    return (
      <QuizResults
        score={score}
        totalPoints={totalPoints}
        onRestart={resetQuiz}
      />
    );
  }

  const question = sampleQuiz.questions[currentQuestion];

  return (
    <div className=" min-h-screen w-full  overflow-x-hidden">
      <div className=" z-10 container max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {sampleQuiz.title}
            </h1>
            <p className="text-sm sm:text-base text-white/60">
              Question {currentQuestion + 1} of {sampleQuiz.questions.length}
            </p>
          </div>
          <div className="flex items-center">
            <QuizTimer timeLeft={timeLeft} />
          </div>
        </div>

        {/* Question Block */}
        <QuizQuestion
          question={question}
          answer={answers[question.id]}
          onAnswerChange={handleAnswerChange}
        />

        {/* Navigation Block */}
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={sampleQuiz.questions.length}
          answers={answers}
          questions={sampleQuiz.questions}
          onPrevious={prevQuestion}
          onNext={nextQuestion}
          onSubmit={handleSubmitQuiz}
        />
      </div>
    </div>
  );
};

export default QuizTaker;
