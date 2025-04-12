import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Printer, 
  Copy, 
  Share2, 
  Edit, 
  Trash2 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContentActionsProps {
  onDownload?: () => void;
  onPrint?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  allowEdit?: boolean;
  allowDelete?: boolean;
}

const ContentActions = ({
  onDownload = () => {},
  onPrint = () => {},
  onCopy = () => {},
  onShare = () => {},
  onEdit,
  onDelete,
  allowEdit = false,
  allowDelete = false,
}: ContentActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onDownload}
        className="hidden md:flex"
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onPrint}
        className="hidden md:flex"
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 md:hidden"
        onClick={onDownload}
      >
        <Download className="h-4 w-4" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            More
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy to clipboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
          {allowEdit && (
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          {allowDelete && (
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ContentActions;
