/** @format */

"use client";

import React from "react";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FieldSetupTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Match Requirements &amp; Capacity
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Adjust minimum players, team format, and session limits to ensure
            fair gameplay and ranked match qualification.
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
        {/* Min/Max Players Per Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Minimum Players Per Team
            </label>
            <Input
              type="number"
              defaultValue="6"
              readOnly
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Maximum Players Per Team
            </label>
            <Input
              type="number"
              defaultValue="8"
              readOnly
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        {/* Min/Max Players Per Session */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Minimum Players Per Sessions
            </label>
            <Input
              type="number"
              defaultValue="16"
              readOnly
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Maximum Players Per Sessions
            </label>
            <Input
              type="number"
              defaultValue="16"
              readOnly
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        {/* Default Session Duration */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Default Session Duration
          </label>
          <div className="flex gap-3">
            <Input
              type="number"
              defaultValue="50"
              readOnly
              className="bg-input/30 border-white/10 text-primary h-11 flex-1"
            />
            <Select defaultValue="minute">
              <SelectTrigger className="w-28 bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="minute">Minute</SelectItem>
                <SelectItem value="hour">Hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Base Price Per Player */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Base Price Per Player
          </label>
          <Input
            defaultValue="$25.25"
            readOnly
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* Allow Social Matches */}
        <div className="flex items-center justify-between py-3 border-t border-white/5">
          <label className="text-sm font-medium text-primary">
            Allow Social Matches
          </label>
          <div className="flex items-center gap-3">
            <Switch
              defaultChecked={true}
              className="data-[state=checked]:bg-custom-yellow"
            />
            <span className="text-sm text-muted-foreground">On</span>
          </div>
        </div>

        {/* Allow Ranked Matches */}
        <div className="flex items-center justify-between py-3 border-t border-white/5">
          <label className="text-sm font-medium text-primary">
            Allow Ranked Matches
          </label>
          <div className="flex items-center gap-3">
            <Switch
              defaultChecked={false}
              className="data-[state=checked]:bg-custom-yellow"
            />
            <span className="text-sm text-muted-foreground">Off</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldSetupTab;
