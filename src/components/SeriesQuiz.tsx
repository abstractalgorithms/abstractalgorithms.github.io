'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Award, RefreshCw, BookOpen, X, Play, Save } from 'lucide-react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface SeriesQuizProps {
  seriesName: string
  questions: QuizQuestion[]
  onQuizComplete?: (score: number, passed: boolean) => void
  onQuizExit?: () => void
}

export default function SeriesQuiz({ seriesName, questions, onQuizComplete, onQuizExit }: SeriesQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [hasSavedProgress, setHasSavedProgress] = useState(false)

  const passingScore = 0.7 // 70% to pass
  const totalQuestions = questions.length
  const progressKey = `quiz-progress-${seriesName.toLowerCase().replace(/\s+/g, '-')}`

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(progressKey)
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress)
        setCurrentQuestion(progress.currentQuestion || 0)
        setAnswers(progress.answers || [])
        setQuizStarted(progress.quizStarted || false)
        setShowExplanation(progress.showExplanation || false)
        setHasSavedProgress(true)
      } catch (error) {
        console.error('Error loading quiz progress:', error)
      }
    }
  }, [progressKey])

  // Save progress whenever relevant state changes
  useEffect(() => {
    if (quizStarted && !showResults) {
      const progress = {
        currentQuestion,
        answers,
        quizStarted,
        showExplanation,
        timestamp: Date.now()
      }
      localStorage.setItem(progressKey, JSON.stringify(progress))
    }
  }, [currentQuestion, answers, quizStarted, showExplanation, showResults, progressKey])

  const clearSavedProgress = () => {
    localStorage.removeItem(progressKey)
    setHasSavedProgress(false)
  }

  const exitQuiz = () => {
    // Save current progress before exiting
    if (quizStarted && !showResults) {
      const progress = {
        currentQuestion,
        answers,
        quizStarted,
        showExplanation,
        timestamp: Date.now()
      }
      localStorage.setItem(progressKey, JSON.stringify(progress))
    }
    onQuizExit?.()
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    setShowExplanation(false)
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishQuiz()
    }
  }
  const finishQuiz = () => {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count
    }, 0)
    
    const finalScore = correctAnswers / totalQuestions
    setScore(finalScore)
    setShowResults(true)
    
    // Clear saved progress when quiz is completed
    clearSavedProgress()
    
    const passed = finalScore >= passingScore
    onQuizComplete?.(finalScore, passed)
    
    // Store completion in localStorage
    if (passed) {
      const badges = JSON.parse(localStorage.getItem('earnedBadges') || '[]')
      const badgeId = `${seriesName.toLowerCase().replace(/\s+/g, '-')}-completion`
      if (!badges.includes(badgeId)) {
        badges.push(badgeId)
        localStorage.setItem('earnedBadges', JSON.stringify(badges))
      }
    }
  }
  const restartQuiz = () => {
    clearSavedProgress()
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setScore(0)
    setShowExplanation(false)
    setQuizStarted(true)
  }

  const startQuiz = () => {
    clearSavedProgress()
    setQuizStarted(true)
  }

  const resumeQuiz = () => {
    setQuizStarted(true)
  }
  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {seriesName} - Knowledge Quiz
          </h2>
          <p className="text-gray-600 mb-6">
            Test your understanding of the concepts covered in this learning series. 
            You need to score at least 70% to earn your completion badge!
          </p>
          
          {hasSavedProgress && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-amber-800 mb-2">
                <Save className="w-5 h-5" />
                <span className="font-semibold">Saved Progress Found</span>
              </div>
              <p className="text-amber-700 text-sm">
                You have a quiz in progress. You can resume where you left off or start fresh.
              </p>
            </div>
          )}
          
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Questions: {totalQuestions}</span>
              <span>Passing Score: 70%</span>
              <span>Time: Unlimited</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasSavedProgress && (
              <button
                onClick={resumeQuiz}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center"
              >
                <Play className="w-4 h-4" />
                Resume Quiz
              </button>
            )}
            <button
              onClick={startQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {hasSavedProgress ? 'Start Fresh' : 'Start Quiz'}
            </button>
          </div>
          
          {onQuizExit && (
            <button
              onClick={onQuizExit}
              className="mt-4 text-gray-500 hover:text-gray-700 underline text-sm"
            >
              Exit Quiz
            </button>
          )}
        </div>
      </div>
    )
  }

  if (showResults) {
    const passed = score >= passingScore
    const correctCount = Math.round(score * totalQuestions)
    
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            passed ? 'bg-green-600' : 'bg-red-500'
          }`}>
            {passed ? (
              <Award className="w-10 h-10 text-white" />
            ) : (
              <XCircle className="w-10 h-10 text-white" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quiz Complete!
          </h2>
          
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="text-3xl font-bold mb-2">
              {correctCount}/{totalQuestions}
            </div>
            <div className="text-xl text-gray-600 mb-4">
              {Math.round(score * 100)}% Score
            </div>
            
            {passed ? (
              <div className="text-green-600 font-semibold">
                🎉 Congratulations! You've earned your completion badge!
              </div>
            ) : (
              <div className="text-red-500 font-semibold">
                You need 70% to pass. Try again!
              </div>
            )}
          </div>
          
          {passed && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-6 h-6" />
                <span className="font-semibold">{seriesName} Completion Badge Earned!</span>
              </div>
            </div>
          )}
          
          <button
            onClick={restartQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== undefined
  const userAnswer = answers[currentQuestion]
  const isCorrect = userAnswer === question.correctAnswer
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl border border-gray-200 shadow-lg">
      {/* Exit Button */}
      {onQuizExit && (
        <div className="flex justify-end mb-4">
          <button
            onClick={exitQuiz}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Exit Quiz"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 "
            
            if (!isAnswered) {
              buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            } else {
              if (index === question.correctAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800"
              } else if (index === userAnswer && index !== question.correctAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-800"
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600"
              }
            }

            return (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswer(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {isAnswered && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 ml-auto text-green-600" />
                  )}
                  {isAnswered && index === userAnswer && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 ml-auto text-red-600" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
            )}
            <div>
              <div className={`font-semibold mb-2 ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <div className="text-gray-700">
                {question.explanation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {showExplanation && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  )
}
