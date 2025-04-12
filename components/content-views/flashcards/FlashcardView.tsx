"use client";

import React from "react";
import ContentViewLayout from "../base/ContentViewLayout";
import ContentHeader from "../base/ContentHeader";
import FlashcardDeck from "./FlashcardDeck";
import FlashcardControls from "./FlashcardControls";
import RelatedContent from "../base/RelatedContent";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardViewProps {
  id: number;
  title: string;
  description: string;
  course: string;
  created: string;
  flashcards: Flashcard[];
  relatedContent: any[]; // Using the same type as in the RelatedContent component
}

const FlashcardView = ({
  id,
  title,
  description,
  course,
  created,
  flashcards,
  relatedContent,
}: FlashcardViewProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [knownCards, setKnownCards] = React.useState<Set<string>>(new Set());
  const [mode, setMode] = React.useState<"all" | "unknown" | "known">("all");
  const [isShuffled, setIsShuffled] = React.useState(false);

  // Filter flashcards based on current mode
  const filteredFlashcards = React.useMemo(() => {
    if (mode === "all") return flashcards;
    if (mode === "known") return flashcards.filter(card => knownCards.has(card.id));
    if (mode === "unknown") return flashcards.filter(card => !knownCards.has(card.id));
    return flashcards;
  }, [flashcards, knownCards, mode]);

  // Calculate progress
  const progress = {
    known: knownCards.size,
    total: flashcards.length,
    percentage: Math.round((knownCards.size / flashcards.length) * 100) || 0,
  };

  // Handle marking a card as known/unknown
  const toggleCardKnown = (cardId: string) => {
    setKnownCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  // Handle navigation
  const goToNext = () => {
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to first card
      setCurrentIndex(0);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Loop to last card
      setCurrentIndex(filteredFlashcards.length - 1);
    }
  };

  // Handle shuffling
  const toggleShuffle = () => {
    if (!isShuffled) {
      // Implement Fisher-Yates shuffle
      const shuffled = [...filteredFlashcards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      // Reset the current index
      setCurrentIndex(0);
    } else {
      // Reset to original order
      setCurrentIndex(0);
    }
    setIsShuffled(!isShuffled);
  };

  // Reset the study session
  const resetSession = () => {
    setKnownCards(new Set());
    setCurrentIndex(0);
    setMode("all");
    setIsShuffled(false);
  };

  // Current card
  const currentCard = filteredFlashcards[currentIndex] || null;

  return (
    <ContentViewLayout
      title={title}
      description={description}
      type="Flashcards"
      course={course}
      created={created}
    >
      <ContentHeader
        title={title}
        subtitle={`${flashcards.length} flashcards • Created ${created}`}
        type="Flashcards"
        tags={[course]}
        onDownload={() => console.log("Download clicked")}
        onPrint={() => window.print()}
        onCopy={() => console.log("Copy clicked")}
        onShare={() => console.log("Share clicked")}
      />

      <div className="p-6 overflow-visible">
        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-6 flex items-center justify-between bg-background p-2 rounded-lg border">
            <div className="text-sm">
              Card {currentIndex + 1} of {filteredFlashcards.length}
            </div>
            <div className="text-sm">
              {progress.known} of {progress.total} marked as known ({progress.percentage}%)
            </div>
          </div>

          {/* Flash card deck */}
          {currentCard ? (
            <FlashcardDeck
              card={currentCard}
              isKnown={knownCards.has(currentCard.id)}
              onToggleKnown={() => toggleCardKnown(currentCard.id)}
              onNext={goToNext}
              onPrevious={goToPrevious}
            />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium">No flashcards available</h3>
              <p className="text-muted-foreground">
                Try changing your filters or resetting the session.
              </p>
            </div>
          )}

          {/* Controls */}
          <FlashcardControls
            currentMode={mode}
            onModeChange={setMode}
            isShuffled={isShuffled}
            onToggleShuffle={toggleShuffle}
            onReset={resetSession}
            progress={progress}
          />

          {/* Related content at the bottom */}
          {relatedContent.length > 0 && (
            <div className="mt-12 border-t pt-6 pb-12">
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

export default FlashcardView;
