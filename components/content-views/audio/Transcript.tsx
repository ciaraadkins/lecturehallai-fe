"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface TranscriptSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

interface TranscriptProps {
  text: string;
  currentTime: number;
  segments?: TranscriptSegment[];
}

const Transcript = ({
  text,
  currentTime,
  segments = [],
}: TranscriptProps) => {
  const [showTimestamps, setShowTimestamps] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const activeSegmentRef = React.useRef<HTMLParagraphElement | null>(null);
  
  // Parse text into segments if segments not provided
  const parsedSegments = React.useMemo(() => {
    if (segments.length > 0) return segments;
    
    // If no segments provided, create a simple segments array
    // This is just a basic implementation - in a real app, you'd have proper transcript
    // segmentation with timestamps
    const paragraphs = text.split("\n\n");
    return paragraphs.map((paragraph, index) => ({
      id: `segment-${index}`,
      text: paragraph,
      startTime: index * 30, // Just a placeholder - 30 seconds per paragraph
      endTime: (index + 1) * 30,
    }));
  }, [text, segments]);
  
  // Find current active segment based on playback time
  const activeSegment = React.useMemo(() => {
    if (parsedSegments.length === 0) return null;
    
    return parsedSegments.find(
      (segment, index) => {
        const isLastSegment = index === parsedSegments.length - 1;
        const isInSegmentTimeRange = 
          currentTime >= segment.startTime && 
          currentTime < segment.endTime;
        const isAfterLastSegmentStart = 
          isLastSegment && currentTime >= segment.startTime;
        
        return isInSegmentTimeRange || isAfterLastSegmentStart;
      }
    );
  }, [parsedSegments, currentTime]);
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  
  // Handle copy to clipboard
  const copyTranscript = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Scroll to active segment
  React.useEffect(() => {
    if (activeSegment && activeSegmentRef.current) {
      activeSegmentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeSegment?.id]);
  
  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Transcript</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTimestamps(!showTimestamps)}
          >
            {showTimestamps ? "Hide Timestamps" : "Show Timestamps"}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center"
          onClick={copyTranscript}
        >
          <Copy className="h-4 w-4 mr-1" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] p-4">
        <div className="space-y-4">
          {parsedSegments.map((segment) => {
            const isActive = segment.id === activeSegment?.id;
            
            return (
              <div 
                key={segment.id}
                className={`transition-colors ${
                  isActive ? "bg-primary/10 -mx-2 px-2 py-1 rounded" : ""
                }`}
              >
                {showTimestamps && (
                  <div className="text-xs text-muted-foreground mb-1">
                    {formatTime(segment.startTime)}
                  </div>
                )}
                <p 
                  ref={isActive ? activeSegmentRef : null}
                  className={`text-sm ${
                    isActive ? "font-medium" : ""
                  }`}
                >
                  {segment.text}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Transcript;
