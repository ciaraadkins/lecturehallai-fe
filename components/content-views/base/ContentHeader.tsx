import React from "react";
import { Badge } from "@/components/ui/badge";
import ContentActions from "./ContentActions";

interface ContentHeaderProps {
  title: string;
  subtitle?: string;
  tags?: string[];
  type: string;
  allowEdit?: boolean;
  allowDelete?: boolean;
  onDownload?: () => void;
  onPrint?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ContentHeader = ({
  title,
  subtitle,
  tags = [],
  type,
  allowEdit = false,
  allowDelete = false,
  onDownload,
  onPrint,
  onCopy,
  onShare,
  onEdit,
  onDelete,
}: ContentHeaderProps) => {
  return (
    <div className="border-b p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{type}</Badge>
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
        
        <ContentActions
          onDownload={onDownload}
          onPrint={onPrint}
          onCopy={onCopy}
          onShare={onShare}
          onEdit={onEdit}
          onDelete={onDelete}
          allowEdit={allowEdit}
          allowDelete={allowDelete}
        />
      </div>
    </div>
  );
};

export default ContentHeader;
