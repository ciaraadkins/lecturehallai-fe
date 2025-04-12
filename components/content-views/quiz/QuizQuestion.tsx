import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: {
    id: string;
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
    explanation: string;
    type: "multiple-choice" | "true-false";
  };
  selectedAnswers: string[];
  onSelectAnswer: (answerId: string) => void;
  showCorrectAnswer?: boolean;
}

const QuizQuestion = ({
  question,
  selectedAnswers,
  onSelectAnswer,
  showCorrectAnswer = false,
}: QuizQuestionProps) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {/* Question text */}
        <div 
          className="text-xl font-medium mb-6" 
          dangerouslySetInnerHTML={{ __html: question.question }}
        />

        {/* Answer options */}
        <RadioGroup 
          value={selectedAnswers[0] || ""}
          onValueChange={onSelectAnswer}
          className="space-y-3"
        >
          {question.options.map((option) => {
            const isSelected = selectedAnswers.includes(option.id);
            const isCorrect = option.isCorrect;
            
            // Determine the appearance based on selection and correctness
            let optionClassName = "p-4 border rounded-lg transition-colors";
            
            if (showCorrectAnswer) {
              if (isCorrect) {
                optionClassName = cn(optionClassName, "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800");
              } else if (isSelected && !isCorrect) {
                optionClassName = cn(optionClassName, "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800");
              }
            } else if (isSelected) {
              optionClassName = cn(optionClassName, "bg-primary/5 border-primary/30");
            } else {
              optionClassName = cn(optionClassName, "hover:bg-muted");
            }
            
            return (
              <div key={option.id} className={optionClassName}>
                <div className="flex items-start">
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id}
                    disabled={showCorrectAnswer}
                    className="mt-1"
                  />
                  <div className="ml-3 flex-1">
                    <Label 
                      htmlFor={option.id} 
                      className="text-base font-normal cursor-pointer"
                    >
                      <div dangerouslySetInnerHTML={{ __html: option.text }} />
                    </Label>
                  </div>
                </div>
              </div>
            );
          })}
        </RadioGroup>

        {/* Explanation (shown when answers are revealed) */}
        {showCorrectAnswer && question.explanation && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-1">Explanation:</h4>
            <div 
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: question.explanation }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
