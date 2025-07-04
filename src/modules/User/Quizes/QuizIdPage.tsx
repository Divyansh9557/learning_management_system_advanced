'use client'
import React, { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, Flag } from 'lucide-react';

const QuizIdPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft] = useState(1800); // 30 minutes

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of React hooks?",
      options: [
        "To replace class components entirely",
        "To allow state and lifecycle features in functional components",
        "To improve performance of React applications",
        "To handle routing in React applications"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Which hook is used for managing component state?",
      options: ["useEffect", "useContext", "useState", "useReducer"],
      correct: 2
    },
    {
      id: 3,
      question: "What does the useEffect hook do?",
      options: [
        "Manages component state",
        "Handles side effects in functional components",
        "Creates context for component tree",
        "Optimizes component rendering"
      ],
      correct: 1
    }
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answerIndex });
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">React Hooks Quiz</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-orange-400">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
              <button className="flex items-center px-3 py-2 bg-yellow-900 text-yellow-200 rounded-lg hover:bg-yellow-800 transition-colors">
                <Flag className="w-4 h-4 mr-2" />
                Flag
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-700">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-900/20 text-blue-300'
                          : 'border-gray-600 hover:border-gray-500 text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-600'
                        }`}>
                          {selectedAnswers[currentQuestion] === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                <button
                  onClick={goToPrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={goToNext}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigator Panel */}
          <div className="space-y-6">

            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <h3 className="font-semibold mb-4">Questions</h3>
              <div className="grid grid-cols-3 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentQuestion === index
                        ? 'bg-blue-600 text-white'
                        : selectedAnswers[index] !== undefined
                        ? 'bg-green-900 text-green-300'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-400 space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded mr-2" />
                  Current question
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-900 rounded mr-2" />
                  Answered
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-700 rounded mr-2" />
                  Not answered
                </div>
              </div>
            </div>

            {/* Quiz Info */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
              <h3 className="font-semibold mb-4">Quiz Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Questions</span>
                  <span className="font-medium">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Answered</span>
                  <span className="font-medium">
                    {Object.keys(selectedAnswers).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Remaining</span>
                  <span className="font-medium">
                    {questions.length - Object.keys(selectedAnswers).length}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizIdPage;
