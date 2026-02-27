/** @format */

"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface EditAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditAccountDialog: React.FC<EditAccountDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [fullName, setFullName] = useState("John Smith");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border border-white/10 max-w-sm"
      >
        <DialogHeader className="items-center">
          <DialogTitle className="text-xl font-bold text-primary">
            Edit Account Info
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary">
            Update your profile picture and display name.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 mt-2">
          {/* Avatar Upload */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-linear-to-br from-custom-red/30 to-custom-yellow/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">JS</span>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-custom-red text-white flex items-center justify-center shadow-lg hover:bg-custom-red/80 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Full Name */}
          <div className="w-full space-y-2">
            <label className="text-sm text-secondary">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountDialog;
