"use client";

import React from "react";
import ContentViewLayout from "../base/ContentViewLayout";
import ContentHeader from "../base/ContentHeader";
import TableOfContents from "./TableOfContents";
import StudyGuideSection from "./StudyGuideSection";
import RelatedContent from "../base/RelatedContent";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface StudyGuideViewProps {
  id: number;
  title: string;
  description: string;
  course: string;
  created: string;
  sections: Section[];
  relatedContent: any[]; // Using the same type as in the RelatedContent component
}

const StudyGuideView = ({
  id,
  title,
  description,
  course,
  created,
  sections,
  relatedContent,
}: StudyGuideViewProps) => {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections.length > 0 ? sections[0].id : ""
  );

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScroll = () => {
    // Find which section is most visible in the viewport
    const sectionElements = sections.map(section => 
      document.getElementById(section.id)
    );
    
    const visibleSections = sectionElements.filter(el => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight / 2 && rect.bottom > 0;
    });

    if (visibleSections.length > 0 && visibleSections[0]?.id) {
      setActiveSection(visibleSections[0].id);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ContentViewLayout
      title={title}
      description={description}
      type="Study Guide"
      course={course}
      created={created}
    >
      <ContentHeader
        title={title}
        subtitle={`${sections.length} sections • Created ${created}`}
        type="Study Guide"
        tags={[course]}
        onDownload={() => console.log("Download clicked")}
        onPrint={() => window.print()}
        onCopy={() => console.log("Copy clicked")}
        onShare={() => console.log("Share clicked")}
      />

      <div className="flex flex-col md:flex-row">
        {/* Table of Contents - sidebar */}
        <div className="w-full md:w-64 border-r border-b md:border-b-0">
          <ScrollArea className="h-[calc(100vh-300px)] md:h-auto md:max-h-[calc(100vh-200px)]">
            <TableOfContents 
              sections={sections}
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
            />
          </ScrollArea>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            {sections.map((section) => (
              <StudyGuideSection
                key={section.id}
                id={section.id}
                title={section.title}
                content={section.content}
              />
            ))}
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

export default StudyGuideView;
