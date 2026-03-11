/** @format */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Pen, Plus, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface PackageData {
  id: number;
  name: string;
  description: string;
  fee: string;
}

const INCLUDE_ITEMS = [
  { value: "bbq", label: "BBQ" },
  { value: "paintballs-100", label: "Paintballs 100" },
  { value: "paintballs-200", label: "Paintballs 200" },
  { value: "paintballs-500", label: "Paintballs 500" },
  { value: "paintballs-1000", label: "Paintballs 1000" },
  { value: "birthday-cake", label: "Birthday Cake" },
  { value: "mask", label: "Mask" },
  { value: "gun", label: "Gun" },
  { value: "vest", label: "Vest" },
  { value: "beverages", label: "Beverages" },
  { value: "gloves", label: "Gloves" },
  { value: "snacks", label: "Snacks" },
  { value: "overalls", label: "Overalls" },
];

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
  const [selectedItems, setSelectedItems] = useState<Record<number, string[]>>(
    {},
  );
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown === null) return;
      const ref = dropdownRefs.current[openDropdown];
      if (ref && !ref.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const toggleItem = (pkgId: number, value: string) => {
    setSelectedItems((prev) => {
      const current = prev[pkgId] ?? [];
      const exists = current.includes(value);
      return {
        ...prev,
        [pkgId]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const removeItem = (pkgId: number, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [pkgId]: (prev[pkgId] ?? []).filter((v) => v !== value),
    }));
  };

  return (
    <div className="space-y-6 mb-8 md:mb-12">
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

              {/* Custom multi-select dropdown */}
              <div
                className="relative"
                ref={(el) => {
                  dropdownRefs.current[pkg.id] = el;
                }}
              >
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(openDropdown === pkg.id ? null : pkg.id)
                  }
                  className="w-full flex items-center justify-between bg-input/30 border border-white/10 text-primary h-11 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
                >
                  <span className="text-muted-foreground">
                    {(selectedItems[pkg.id]?.length ?? 0) > 0
                      ? `${selectedItems[pkg.id].length} item${selectedItems[pkg.id].length > 1 ? "s" : ""} selected`
                      : "Select package items"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-200",
                      openDropdown === pkg.id && "rotate-180",
                    )}
                  />
                </button>

                {/* Dropdown list */}
                {openDropdown === pkg.id && (
                  <div className="absolute z-50 bottom-full mb-1 w-full bg-card border border-white/10 rounded-md shadow-lg max-h-56 overflow-y-auto">
                    {INCLUDE_ITEMS.map((item) => {
                      const isChecked =
                        selectedItems[pkg.id]?.includes(item.value) ?? false;
                      return (
                        <div
                          key={item.value}
                          onClick={() => toggleItem(pkg.id, item.value)}
                          className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-white/5 select-none"
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() =>
                              toggleItem(pkg.id, item.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="text-sm text-primary">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected item tags */}
              {(selectedItems[pkg.id]?.length ?? 0) > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedItems[pkg.id].map((value) => {
                    const label =
                      INCLUDE_ITEMS.find((i) => i.value === value)?.label ??
                      value;
                    return (
                      <span
                        key={value}
                        className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {label}
                        <button
                          type="button"
                          onClick={() => removeItem(pkg.id, value)}
                          className="flex items-center justify-center hover:text-destructive transition-colors"
                          aria-label={`Remove ${label}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageManagementTab;
