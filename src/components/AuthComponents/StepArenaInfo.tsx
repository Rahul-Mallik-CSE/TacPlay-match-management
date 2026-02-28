/** @format */

"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";

const StepArenaInfo = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Tell Us About Your Field
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          This info will be visible to players when they browse and book
          sessions at your arena.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Field / Arena Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Field / Arena Name
          </label>
          <Input
            placeholder="Enter arena name"
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Description
          </label>
          <Textarea
            placeholder="Describe your arena..."
            className="bg-input/30 border-white/10 text-primary min-h-[100px]"
          />
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Country</label>
            <Select>
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">City</label>
            <Select>
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="ld">London</SelectItem>
                <SelectItem value="to">Toronto</SelectItem>
                <SelectItem value="sy">Sydney</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Full Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Full Address
          </label>
          <Input
            placeholder="Enter your full address"
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* Arena Thumbnail */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Arena Thumbnail
          </label>
          <p className="text-xs text-muted-foreground">
            Upload a photo to display as your arena&apos;s profile picture.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-16 h-16 rounded-lg bg-input/30 border border-white/10 border-dashed flex items-center justify-center">
              <Camera className="w-5 h-5 text-muted-foreground" />
            </div>
            <button className="px-4 py-2 rounded-lg border border-white/10 bg-input/30 text-sm text-primary hover:bg-input/50 transition-colors">
              Choose
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepArenaInfo;
