"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Download, Share2, Bookmark, BookmarkCheck } from "lucide-react";
import Link from "next/link";

interface ContentViewLayoutProps {
  title: string;
  description: string;
  type: string;
  course: string;
  created: string;
  children: React.ReactNode;
}

const ContentViewLayout = ({
  title,
  description,
  type,
  course,
  created,
  children,
}: ContentViewLayoutProps) => {
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-6xl">
      {/* Header navigation */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/student/content-hub">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Content Hub
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge>{type}</Badge>
              <Badge variant="outline">{course}</Badge>
              <span className="text-xs text-muted-foreground mt-1">
                Created {created}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              aria-label={isSaved ? "Unsave content" : "Save content"}
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="icon" aria-label="Share content">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Download content">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-card rounded-lg border shadow-sm overflow-visible">
        {children}
      </div>

      {/* Related content section could go here */}
    </div>
  );
};

export default ContentViewLayout;
