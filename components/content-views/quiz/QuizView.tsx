"use client";

import React from "react";
import ContentViewLayout from "../base/ContentViewLayout";
import ContentHeader from "../base/ContentHeader";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";
import RelatedContent from "../base/RelatedContent";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  type: "multiple-choice" | "true-false";
}

interface QuizViewProps {
  id: number;
  title: string;
  description: string;
  course: string;
  created: string;
  questions: QuizQuestion[];
  relatedContent: any[]; // Using the same type as in the RelatedContent component
}

const QuizView = ({
  id,
  title,
  description,
  course,
  created,
  questions,
  relatedContent,
}: QuizViewProps) => {
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = React.useState(false);
  const [quizStarted, setQuizStarted] = React.useState(false);

  // Calculate overall progress
  const progress = {
    current: currentQuestionIndex + 1,
    total: questions.length,
    percentage: Math.round(((currentQuestionIndex + 1) / questions.length) * 100),
    answeredQuestions: Object.keys(answers).length,
  };

  // Handle answer selection
  const handleSelectAnswer = (questionId: string, answerId: string, allowMultiple: boolean = false) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      if (allowMultiple) {
        // For multiple select questions
        const currentAnswers = prev[questionId] || [];
        if (currentAnswers.includes(answerId)) {
          newAnswers[questionId] = currentAnswers.filter((id) => id !== answerId);
        } else {
          newAnswers[questionId] = [...currentAnswers, answerId];
        }
      } else {
        // For single select questions
        newAnswers[questionId] = [answerId];
      }
      return newAnswers;
    });
  };

  // Navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Show results when all questions are viewed
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate quiz results
  const calculateResults = () => {
    let correctCount = 0;
    let totalQuestions = questions.length;

    questions.forEach((question) => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers = question.options
        .filter((option) => option.isCorrect)
        .map((option) => option.id);

      // Check if user answers match correct answers exactly
      const isCorrect =
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((answerId) => correctAnswers.includes(answerId));

      if (isCorrect) correctCount++;
    });

    return {
      score: correctCount,
      total: totalQuestions,
      percentage: Math.round((correctCount / totalQuestions) * 100),
    };
  };

  // Reset the quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = currentQuestion ? answers[currentQuestion.id] || [] : [];

  // Handle starting the quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <ContentViewLayout
      title={title}
      description={description}
      type="Quiz"
      course={course}
      created={created}
    >
      <ContentHeader
        title={title}
        subtitle={`${questions.length} questions • Created ${created}`}
        type="Quiz"
        tags={[course]}
        onDownload={() => console.log("Download clicked")}
        onPrint={() => window.print()}
        onCopy={() => console.log("Copy clicked")}
        onShare={() => console.log("Share clicked")}
      />

      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {!quizStarted && !showResults ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Ready to Start</h2>
              <p className="text-muted-foreground mb-8">
                This quiz contains {questions.length} questions. You can navigate between questions and review your answers before submitting.
              </p>
              <Button size="lg" onClick={startQuiz}>
                Start Quiz
              </Button>
            </div>
          ) : showResults ? (
            <QuizResults
              questions={questions}
              answers={answers}
              results={calculateResults()}
              onRetake={resetQuiz}
            />
          ) : (
            <>
              {/* Progress */}
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Question {progress.current} of {progress.total}
                  </span>
                  <span>
                    {progress.answeredQuestions} answered
                  </span>
                </div>
                <Progress value={progress.percentage} className="h-2" />
              </div>

              {/* Question */}
              {currentQuestion && (
                <QuizQuestion
                  question={currentQuestion}
                  selectedAnswers={currentAnswers}
                  onSelectAnswer={(answerId) =>
                    handleSelectAnswer(currentQuestion.id, answerId)
                  }
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <Button onClick={goToNextQuestion}>
                  {currentQuestionIndex < questions.length - 1
                    ? "Next"
                    : "Finish Quiz"}
                  {currentQuestionIndex < questions.length - 1 && (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
            </>
          )}

          {/* Related content at the bottom */}
          {relatedContent.length > 0 && (
            <div className="mt-12 border-t pt-6">
              <RelatedContent 
                items={relatedContent}
                currentItemId={id}
              />
            </div>
          )}
        </div>
      </div>
    </ContentViewLayout>
  );
};

export default QuizView;
