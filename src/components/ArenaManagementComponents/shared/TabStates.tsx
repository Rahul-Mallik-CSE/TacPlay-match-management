/** @format */

"use client";

import { Loader2 } from "lucide-react";

type TabStateProps = {
  message?: string;
};

export function TabLoadingState({ message }: TabStateProps) {
  return (
    <div className="py-10 flex items-center justify-center text-muted-foreground">
      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      {message ?? "Loading..."}
    </div>
  );
}

export function TabErrorState({ message }: TabStateProps) {
  return (
    <div className="py-10 text-sm text-destructive">
      {message ?? "Something went wrong."}
    </div>
  );
}
