import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SummarySectionProps {
  number: number;
  title: string;
  content: string;
}

const SummarySection = ({ number, title, content }: SummarySectionProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium text-sm">
            {number}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <div 
              className="prose prose-slate dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummarySection;
