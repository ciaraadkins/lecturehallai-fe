import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, RotateCcw, ArrowRight } from "lucide-react";
import QuizQuestion from "./QuizQuestion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  questions: {
    id: string;
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
    explanation: string;
    type: "multiple-choice" | "true-false";
  }[];
  answers: Record<string, string[]>;
  results: {
    score: number;
    total: number;
    percentage: number;
  };
  onRetake: () => void;
}

const QuizResults = ({
  questions,
  answers,
  results,
  onRetake,
}: QuizResultsProps) => {
  // Calculate which questions were correct
  const questionResults = questions.map((question) => {
    const userAnswers = answers[question.id] || [];
    const correctAnswers = question.options
      .filter((option) => option.isCorrect)
      .map((option) => option.id);

    const isCorrect =
      userAnswers.length === correctAnswers.length &&
      userAnswers.every((answerId) => correctAnswers.includes(answerId));

    return {
      ...question,
      isCorrect,
      userAnswers,
    };
  });

  // Get the grade based on percentage
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { label: "A", color: "text-green-500" };
    if (percentage >= 80) return { label: "B", color: "text-emerald-500" };
    if (percentage >= 70) return { label: "C", color: "text-yellow-500" };
    if (percentage >= 60) return { label: "D", color: "text-amber-500" };
    return { label: "F", color: "text-red-500" };
  };

  const grade = getGrade(results.percentage);

  // Get a message based on score
  const getMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent work!";
    if (percentage >= 80) return "Great job!";
    if (percentage >= 70) return "Good effort!";
    if (percentage >= 60) return "You passed, but there's room for improvement.";
    return "You might want to review this material and try again.";
  };

  return (
    <div className="space-y-8">
      {/* Results summary */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center">
            <div className={cn("text-6xl font-bold mb-4", grade.color)}>
              {grade.label}
            </div>
            <div className="text-3xl font-bold mb-2">
              {results.score} / {results.total} ({results.percentage}%)
            </div>
            <p className="text-muted-foreground mb-6">
              {getMessage(results.percentage)}
            </p>
            <div className="flex gap-4">
              <Button onClick={onRetake} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
              <Button asChild>
                <a href="/student/content-hub">
                  Back to Content Hub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed results for each question */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Question Review</h2>
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={[questionResults.find(q => !q.isCorrect)?.id || ""].filter(Boolean)}
        >
          {questionResults.map((question, index) => (
            <AccordionItem key={question.id} value={question.id}>
              <AccordionTrigger className="flex justify-between px-4 hover:no-underline hover:bg-muted/40">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {question.isCorrect ? (
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-1">
                        <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    Question {index + 1}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4 pb-2">
                <QuizQuestion
                  question={question}
                  selectedAnswers={question.userAnswers}
                  onSelectAnswer={() => {}}
                  showCorrectAnswer={true}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default QuizResults;
