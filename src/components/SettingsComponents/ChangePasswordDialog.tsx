/** @format */

"use client";

import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    onOpenChange(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border border-white/10 max-w-sm"
      >
        <DialogHeader className="items-center">
          <DialogTitle className="text-xl font-bold text-primary">
            Set a new password
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary text-center">
            Your new password must be different from previously used passwords.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-sm text-secondary">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm text-secondary">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-secondary">
              Must be at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm text-secondary">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 pr-10 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-custom-red/10 border border-custom-red/20">
              <AlertCircle className="w-4 h-4 text-custom-red shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors mt-1"
          >
            Change Password
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
