/** @format */

"use client";

import React from "react";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ArenaInfoTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Tell Us About Your Field
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            This information will be visible to players when they browse and
            book sessions at your arena.
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          className="w-fit flex items-center gap-2"
        >
          <Pen className="w-4 h-4" />
          Edit Information
        </Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Field / Arena Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Field / Arena Name
          </label>
          <Input
            placeholder="Toggle Fun Club"
            defaultValue="Toggle Fun Club"
            readOnly
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
            defaultValue="A fully equipped outdoor paintball arena designed for competitive and social matches. The field features tactical obstacles, safety-controlled zones, and structured layouts suitable for team-based gameplay."
            readOnly
            className="bg-input/30 border-white/10 text-primary min-h-[100px]"
          />
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Country</label>
            <Select defaultValue="united-country">
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="united-country">United Country</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">City</label>
            <Select defaultValue="canada">
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="toronto">Toronto</SelectItem>
                <SelectItem value="vancouver">Vancouver</SelectItem>
                <SelectItem value="montreal">Montreal</SelectItem>
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
            defaultValue="Flat 4B, 27 Maple Grove, Birmingham, West Midlands, United State"
            readOnly
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>
      </div>
    </div>
  );
};

export default ArenaInfoTab;
