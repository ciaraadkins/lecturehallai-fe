"use client";

import React from "react";
import ContentViewLayout from "../base/ContentViewLayout";
import ContentHeader from "../base/ContentHeader";
import AudioPlayer from "./AudioPlayer";
import Transcript from "./Transcript";
import RelatedContent from "../base/RelatedContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Chapter {
  id: string;
  title: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
}

interface AudioViewProps {
  id: number;
  title: string;
  description: string;
  course: string;
  created: string;
  audioUrl: string;
  duration: number; // in seconds
  transcript: string;
  chapters?: Chapter[];
  relatedContent: any[]; // Using the same type as in the RelatedContent component
}

const AudioView = ({
  id,
  title,
  description,
  course,
  created,
  audioUrl,
  duration,
  transcript,
  chapters = [],
  relatedContent,
}: AudioViewProps) => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState<string>("transcript");

  // Format duration from seconds to MM:SS or HH:MM:SS
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Find current chapter based on playback time
  const getCurrentChapter = () => {
    if (!chapters.length) return null;

    return chapters.find(
      (chapter, index) => {
        const isLastChapter = index === chapters.length - 1;
        const isInChapterTimeRange = currentTime >= chapter.startTime && currentTime < chapter.endTime;
        const isAfterLastChapterStart = isLastChapter && currentTime >= chapter.startTime;
        
        return isInChapterTimeRange || isAfterLastChapterStart;
      }
    );
  };

  // Handle chapter navigation
  const handleChapterClick = (startTime: number) => {
    // Update current time to jump to chapter
    setCurrentTime(startTime);
    
    // This will be passed to the AudioPlayer component
    // which will handle the actual seeking
  };

  return (
    <ContentViewLayout
      title={title}
      description={description}
      type="Audio"
      course={course}
      created={created}
    >
      <ContentHeader
        title={title}
        subtitle={`${formatDuration(duration)} • Created ${created}`}
        type="Audio"
        tags={[course]}
        onDownload={() => console.log("Download clicked")}
        onPrint={() => window.print()}
        onCopy={() => console.log("Copy clicked")}
        onShare={() => console.log("Share clicked")}
      />

      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {/* Audio player */}
          <AudioPlayer
            audioUrl={audioUrl}
            onTimeUpdate={setCurrentTime}
            currentTime={currentTime}
            chapters={chapters}
          />

          {/* Tabs for transcript and chapters */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-8"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="chapters" disabled={chapters.length === 0}>
                Chapters ({chapters.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="transcript" className="mt-4">
              <Transcript 
                text={transcript} 
                currentTime={currentTime}
              />
            </TabsContent>
            
            <TabsContent value="chapters" className="mt-4">
              <div className="border rounded-lg divide-y">
                {chapters.map((chapter) => {
                  const isCurrent = 
                    currentTime >= chapter.startTime && 
                    currentTime < chapter.endTime;
                  
                  return (
                    <div 
                      key={chapter.id}
                      className={`p-3 cursor-pointer transition-colors ${
                        isCurrent ? "bg-primary/10" : "hover:bg-muted"
                      }`}
                      onClick={() => handleChapterClick(chapter.startTime)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{chapter.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDuration(chapter.startTime)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

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

export default AudioView;
