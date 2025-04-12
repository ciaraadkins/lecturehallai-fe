"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardDeckProps {
  card: {
    id: string;
    front: string;
    back: string;
  };
  isKnown: boolean;
  onToggleKnown: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const FlashcardDeck = ({
  card,
  isKnown,
  onToggleKnown,
  onNext,
  onPrevious,
}: FlashcardDeckProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  // Reset flipped state when card changes
  React.useEffect(() => {
    setIsFlipped(false);
  }, [card.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      onPrevious();
    } else if (e.key === "ArrowRight") {
      onNext();
    } else if (e.key === " " || e.key === "Enter") {
      handleFlip();
    }
  };

  return (
    <div
      className="mb-6 focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Card
        className={cn(
          "w-full min-h-[300px] flex items-center justify-center p-8 cursor-pointer transition-all duration-500 shadow-lg hover:shadow-xl relative",
          isKnown ? "border-green-500 border-2" : "",
          isFlipped ? "bg-primary/5" : ""
        )}
        onClick={handleFlip}
      >
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <Button
            variant={isKnown ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full", 
              isKnown ? "bg-green-500 hover:bg-green-600" : ""
            )}
            onClick={(e) => {
              e.stopPropagation();
              onToggleKnown();
            }}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>

        <div
          className={cn(
            "w-full h-full flex items-center justify-center transition-all duration-300 absolute inset-0",
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: card.front }} />
          </div>
        </div>

        <div
          className={cn(
            "w-full h-full flex items-center justify-center transition-all duration-300 absolute inset-0",
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: card.back }} />
          </div>
        </div>
      </Card>

      <div className="flex justify-between mt-4 sticky bottom-0 bg-background p-2 rounded-b-lg border-t">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleFlip}>
          {isFlipped ? "Show Question" : "Show Answer"}
        </Button>
        <Button variant="outline" onClick={onNext}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FlashcardDeck;
