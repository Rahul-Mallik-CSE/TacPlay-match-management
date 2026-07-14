/** @format */

"use client";

import { Loader2, Pen, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

type TabHeaderProps = {
  title: string;
  subtitle?: string;
  isEditing: boolean;
  isSaving: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  extra?: React.ReactNode;
};

const TabHeader: React.FC<TabHeaderProps> = ({
  title,
  subtitle,
  isEditing,
  isSaving,
  onToggleEdit,
  onSave,
  extra,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="default"
          size="sm"
          className="w-fit flex items-center gap-2"
          onClick={onToggleEdit}
        >
          <Pen className="w-4 h-4" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
        {isEditing && (
          <Button
            variant="default"
            size="sm"
            className="w-fit flex items-center gap-2"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save
          </Button>
        )}
        {extra}
      </div>
    </div>
  );
};

export default TabHeader;
