"use client";

import React from "react";
import ContentViewLayout from "../base/ContentViewLayout";
import ContentHeader from "../base/ContentHeader";
import SummarySection from "./SummarySection";
import RelatedContent from "../base/RelatedContent";

interface KeyPoint {
  id: string;
  title: string;
  content: string;
}

interface SummaryViewProps {
  id: number;
  title: string;
  description: string;
  course: string;
  created: string;
  overview: string;
  keyPoints: KeyPoint[];
  relatedContent: any[]; // Using the same type as in the RelatedContent component
}

const SummaryView = ({
  id,
  title,
  description,
  course,
  created,
  overview,
  keyPoints,
  relatedContent,
}: SummaryViewProps) => {
  return (
    <ContentViewLayout
      title={title}
      description={description}
      type="Summary"
      course={course}
      created={created}
    >
      <ContentHeader
        title={title}
        subtitle={`${keyPoints.length} key points • Created ${created}`}
        type="Summary"
        tags={[course]}
        onDownload={() => console.log("Download clicked")}
        onPrint={() => window.print()}
        onCopy={() => console.log("Copy clicked")}
        onShare={() => console.log("Share clicked")}
      />

      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {/* Overview section */}
          {overview && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: overview }} />
              </div>
            </div>
          )}

          {/* Key points */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Key Points</h2>
            <div className="space-y-6">
              {keyPoints.map((point, index) => (
                <SummarySection
                  key={point.id}
                  number={index + 1}
                  title={point.title}
                  content={point.content}
                />
              ))}
            </div>
          </div>

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

export default SummaryView;
