'use client'
import React from 'react';
import { Clock, Users, Trophy, Play } from 'lucide-react';
import Link from 'next/link';
import { useTRPC } from '@/trpc/client';
import {  useSuspenseQuery } from '@tanstack/react-query';

const QuizesPage: React.FC = () => {

  const trpc = useTRPC()

  const {data} = useSuspenseQuery(
    trpc.quiz.getMany.queryOptions()
  )


   const totalAttempt = data.reduce((acc,quiz)=>{
            return acc + Number(quiz.totalAttempts)
   },0)
   const totalAvailable = data.reduce((acc,quiz)=>{
            return acc + (quiz.attempted?0:1)
   },0)
   const totalCompleted = data.reduce((acc,quiz)=>{
            return acc + (quiz.attempted?1:0)
   },0)

  console.log(totalAttempt)
  console.log(data)
  return (
    <div className="min-h-screen  p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quizzes & Assessments</h1>
          <p className="text-gray-400">
            Test your knowledge and track your progress with interactive quizzes
          </p>
        </div>
        

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Quizzes",
              value: data.length,
              icon: <Play className="w-6 h-6 text-white" />,
              color: "from-blue-500 to-purple-600",
            },
            {
              label: "Completed",
              value: totalCompleted,
              icon: <Trophy className="w-6 h-6 text-white" />,
              color: "from-green-500 to-emerald-600",
            },
            {
              label: "Available",
              value: totalAvailable,
              icon: <Clock className="w-6 h-6 text-white" />,
              color: "from-orange-500 to-red-600",
            },
            {
              label: "Total Attempts",
              value: totalAttempt,
              icon: <Users className="w-6 h-6 text-white" />,
              color: "from-purple-500 to-pink-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#0f0f0f] rounded-xl p-6 shadow-sm border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((quiz) => (
            <div
              key={quiz.id}
              className={`bg-[#0f0f0f] rounded-xl p-6 shadow-sm border hover:shadow-md transition-all `}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {quiz.description}
                  </p>
                </div>
                {"completed" === "completed" && (
                  <Trophy className="w-6 h-6 text-green-500 flex-shrink-0" />
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{quiz.timeLimit} minutes </span>
                  </div>
                  <div>
                    <span> {quiz.questions?.length} questions</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium `}
                  >
                    {/* {quiz.difficulty} */}
                    hard
                  </span>
                  <div className="flex items-center text-xs text-gray-400">
                    <Users className="w-3 h-3 mr-1" />
                    <span> {quiz.totalAttempts}</span>
                  </div>
                </div>
              </div>

              <Link href={`/quizzes/${quiz.id}`}>
                <button
                  className={`w-full border hover:bg-gray-100/20 py-3 px-4 rounded-lg font-medium transition-colors ${ quiz.attempted? "bg-green-500 hover:bg-green-600 " :"" } `}
                >
                  {quiz.attempted ? "Re-attempt" : "Start Quiz"}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizesPage;
