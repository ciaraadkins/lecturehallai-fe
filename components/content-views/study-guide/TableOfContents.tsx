import React from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const TableOfContents = ({
  sections,
  activeSection,
  onSectionClick,
}: TableOfContentsProps) => {
  return (
    <div className="p-4">
      <h3 className="font-semibold mb-4 text-sm tracking-tight">
        TABLE OF CONTENTS
      </h3>
      <nav>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={cn(
                  "text-sm px-3 py-1.5 rounded-md w-full text-left transition-colors",
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
