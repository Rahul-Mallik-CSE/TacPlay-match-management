/** @format */

"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Pen } from "lucide-react";
import EditAccountDialog from "@/components/SettingsComponents/EditAccountDialog";
import ChangePasswordDialog from "@/components/SettingsComponents/ChangePasswordDialog";

const SettingsPage = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-4 sm:p-6 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-secondary mt-1">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border border-white/5 bg-card p-5 sm:p-6 space-y-8">
        {/* Avatar & Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-custom-red/30 to-custom-yellow/30 flex items-center justify-center shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              JS
            </span>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-primary">
              John Smith
            </h2>
            <p className="text-sm text-secondary">Arena Owner</p>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-5">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm text-secondary">Full Name</label>
              <input
                type="text"
                readOnly
                value="John Smith"
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm text-secondary">Email Address</label>
              <input
                type="email"
                readOnly
                value="johnsmith@gmail.com"
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-secondary">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  readOnly
                  value="password123"
                  className="w-full px-4 py-2.5 pr-10 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <label className="text-sm text-secondary">Contact Number</label>
              <input
                type="tel"
                readOnly
                value="+880 25614 24536"
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setPasswordOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-sm text-primary font-medium hover:bg-white/5 transition-colors"
          >
            Password Change
          </button>
          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors"
          >
            <Pen className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Dialogs */}
      <EditAccountDialog open={editOpen} onOpenChange={setEditOpen} />
      <ChangePasswordDialog
        open={passwordOpen}
        onOpenChange={setPasswordOpen}
      />
    </div>
  );
};

export default SettingsPage;
