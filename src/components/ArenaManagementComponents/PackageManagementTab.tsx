/** @format */

"use client";

import React from "react";
import { Pen, Plus } from "lucide-react";
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

interface PackageData {
  id: number;
  name: string;
  description: string;
  fee: string;
}

const samplePackages: PackageData[] = [
  {
    id: 1,
    name: "Basic Package",
    description:
      "A fully equipped outdoor paintball arena designed for competitive and social matches. The field features tactical obstacles, safety-controlled zones, and structured layouts suitable for team-based gameplay.",
    fee: "59",
  },
];

const PackageManagementTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Field Packages Management
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create bundled packages for players and events including equipment
            and paintballs.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <Pen className="w-4 h-4" />
            Edit Information
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Package
          </Button>
        </div>
      </div>

      {/* Package Cards */}
      <div className="space-y-8">
        {samplePackages.map((pkg) => (
          <div key={pkg.id} className="space-y-5">
            <h3 className="text-lg sm:text-xl font-bold text-primary">
              Package Type {pkg.id}
            </h3>

            {/* Package Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                Package Name
              </label>
              <Input
                defaultValue={pkg.name}
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
                defaultValue={pkg.description}
                readOnly
                className="bg-input/30 border-white/10 text-primary min-h-[100px]"
              />
            </div>

            {/* Package Fee */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                Package Fee
              </label>
              <Input
                defaultValue={pkg.fee}
                readOnly
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
        ))}
      </div>
    </div>
  );
};

export default PackageManagementTab;
