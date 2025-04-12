import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Headphones, ListChecks } from "lucide-react";

interface RelatedContentItem {
  id: number;
  title: string;
  description: string;
  type: string;
  course: string;
  created: string;
}

interface RelatedContentProps {
  items: RelatedContentItem[];
  currentItemId?: number;
}

const getIconForType = (type: string) => {
  switch (type) {
    case "Study Guide":
    case "Summary":
      return FileText;
    case "Flashcards":
      return BookOpen;
    case "Quiz":
      return ListChecks;
    case "Audio":
      return Headphones;
    default:
      return FileText;
  }
};

const RelatedContent = ({ items, currentItemId }: RelatedContentProps) => {
  // Filter out the current item and show at most 3 related items
  const filteredItems = items
    .filter(item => item.id !== currentItemId)
    .slice(0, 3);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Related Content</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {filteredItems.map((item) => {
          const Icon = getIconForType(item.type);
          
          return (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex flex-wrap gap-2">
                  <Badge>{item.type}</Badge>
                  <Badge variant="outline">{item.course}</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xs text-muted-foreground">Created {item.created}</span>
                <Link 
                  href={`/student/content/${item.id}`} 
                  className="text-primary hover:underline"
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedContent;
