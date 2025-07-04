import React from 'react';
import { Clock, Users, Trophy, Play } from 'lucide-react';
import Link from 'next/link';

const QuizesPage: React.FC = () => {
  const quizzes = [
    {
      id: 1,
      title: "React Hooks Fundamentals",
      description: "Test your knowledge of useState, useEffect, and custom hooks",
      duration: "30 minutes",
      questions: 15,
      difficulty: "Intermediate",
      attempts: 234,
      course: "Advanced React Development",
      status: "available"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features",
      description: "Arrow functions, destructuring, async/await, and more",
      duration: "25 minutes",
      questions: 12,
      difficulty: "Beginner",
      attempts: 567,
      course: "Modern JavaScript",
      status: "completed"
    },
    {
      id: 3,
      title: "TypeScript Basics",
      description: "Types, interfaces, and TypeScript fundamentals",
      duration: "40 minutes",
      questions: 20,
      difficulty: "Intermediate",
      attempts: 189,
      course: "TypeScript Mastery",
      status: "locked"
    },
    {
      id: 4,
      title: "CSS Grid & Flexbox",
      description: "Modern CSS layout techniques and responsive design",
      duration: "20 minutes",
      questions: 10,
      difficulty: "Beginner",
      attempts: 423,
      course: "CSS Fundamentals",
      status: "available"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-900 text-green-300';
      case 'Intermediate':
        return 'bg-yellow-900 text-yellow-300';
      case 'Advanced':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-800 bg-green-900/20';
      case 'locked':
        return 'border-gray-700 bg-gray-800/50 opacity-60';
      default:
        return 'border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quizzes & Assessments</h1>
          <p className="text-gray-400">Test your knowledge and track your progress with interactive quizzes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Quizzes',
              value: quizzes.length,
              icon: <Play className="w-6 h-6 text-white" />,
              color: 'from-blue-500 to-purple-600',
            },
            {
              label: 'Completed',
              value: quizzes.filter((q) => q.status === 'completed').length,
              icon: <Trophy className="w-6 h-6 text-white" />,
              color: 'from-green-500 to-emerald-600',
            },
            {
              label: 'Available',
              value: quizzes.filter((q) => q.status === 'available').length,
              icon: <Clock className="w-6 h-6 text-white" />,
              color: 'from-orange-500 to-red-600',
            },
            {
              label: 'Total Attempts',
              value: quizzes.reduce((sum, quiz) => sum + quiz.attempts, 0),
              icon: <Users className="w-6 h-6 text-white" />,
              color: 'from-purple-500 to-pink-600',
            },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={`bg-gray-800 rounded-xl p-6 shadow-sm border hover:shadow-md transition-all ${getStatusColor(quiz.status)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{quiz.description}</p>
                  <p className="text-xs text-blue-400 font-medium">{quiz.course}</p>
                </div>
                {quiz.status === 'completed' && <Trophy className="w-6 h-6 text-green-500 flex-shrink-0" />}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{quiz.duration}</span>
                  </div>
                  <div>
                    <span>{quiz.questions} questions</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  <div className="flex items-center text-xs text-gray-400">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{quiz.attempts} attempts</span>
                  </div>
                </div>
              </div>

              <Link href={`/quizzes/${quiz.id}`} legacyBehavior>
                <button
                  disabled={quiz.status === 'locked'}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    quiz.status === 'locked'
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : quiz.status === 'completed'
                      ? 'bg-green-900 text-green-300 hover:bg-green-800'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {quiz.status === 'locked' ? 'Locked' : quiz.status === 'completed' ? 'Retake Quiz' : 'Start Quiz'}
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
