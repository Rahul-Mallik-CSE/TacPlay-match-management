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

const StepPackageManagement = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Field Packages Management
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create bundled packages for players and events including equipment and
          paintballs.
        </p>
      </div>

      {/* Package Type 1 */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-primary">Package Type 1</h3>

        {/* Package Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Package Name
          </label>
          <Input
            placeholder="Enter package name"
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Description
          </label>
          <Textarea
            placeholder="Describe this package..."
            className="bg-input/30 border-white/10 text-primary min-h-[100px]"
          />
        </div>

        {/* Package Fee */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Package Fee
          </label>
          <Input
            placeholder="$0.00"
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* Include Items */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Include Items
          </label>
          <Select>
            <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
              <SelectValue placeholder="Select package items" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="paintballs">Paintballs</SelectItem>
              <SelectItem value="mask">Mask</SelectItem>
              <SelectItem value="gun">Gun</SelectItem>
              <SelectItem value="vest">Vest</SelectItem>
              <SelectItem value="gloves">Gloves</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default StepPackageManagement;
