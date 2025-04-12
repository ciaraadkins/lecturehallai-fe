"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shuffle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardControlsProps {
  currentMode: "all" | "unknown" | "known";
  onModeChange: (mode: "all" | "unknown" | "known") => void;
  isShuffled: boolean;
  onToggleShuffle: () => void;
  onReset: () => void;
  progress: {
    known: number;
    total: number;
    percentage: number;
  };
}

const FlashcardControls = ({
  currentMode,
  onModeChange,
  isShuffled,
  onToggleShuffle,
  onReset,
  progress,
}: FlashcardControlsProps) => {
  return (
    <div className="mt-8 space-y-4 mb-12 bg-background p-4 rounded-lg border">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>
            {progress.known}/{progress.total} cards ({progress.percentage}%)
          </span>
        </div>
        <Progress value={progress.percentage} className="h-2" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Mode selector */}
        <Tabs
          value={currentMode}
          onValueChange={(value) => onModeChange(value as any)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="all">All Cards</TabsTrigger>
            <TabsTrigger value="unknown">
              To Learn ({progress.total - progress.known})
            </TabsTrigger>
            <TabsTrigger value="known">Known ({progress.known})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleShuffle}
            className={cn(isShuffled && "bg-primary/20")}
            aria-label={isShuffled ? "Unshuffle cards" : "Shuffle cards"}
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            aria-label="Reset study session"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key explanation */}
      <div className="text-xs text-muted-foreground mt-2">
        <p>
          <strong>Keyboard shortcuts:</strong> Use arrow keys for navigation, space or enter to flip the card
        </p>
      </div>
    </div>
  );
};

export default FlashcardControls;
