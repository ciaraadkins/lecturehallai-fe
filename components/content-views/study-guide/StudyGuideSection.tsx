import React from "react";

interface StudyGuideSectionProps {
  id: string;
  title: string;
  content: string;
}

const StudyGuideSection = ({ id, title, content }: StudyGuideSectionProps) => {
  return (
    <section id={id} className="mb-10 scroll-mt-16">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div 
        className="prose prose-slate dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

export default StudyGuideSection;
