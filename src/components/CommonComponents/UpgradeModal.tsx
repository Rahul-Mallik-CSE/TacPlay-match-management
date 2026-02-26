/** @format */
"use client";
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: "bronze",
    name: "Bronze Plan",
    price: "Free",
    period: "/ 10 Days",
    description: "Start managing sessions with essential tools.",
    buttonLabel: "Active Bronze",
    buttonVariant: "outline" as const,
    features: [
      "Create and manage sessions",
      "Accept player bookings",
      "Appear in field search results",
      "Basic booking overview",
      "Limited sessions per month",
      "Push Notification",
      "Player Review & Rating",
    ],
    popular: false,
    borderClass: "border border-[#2C2740]",
    selectedBorderClass:
      "border-2 border-[#cdba20] shadow-[0_0_20px_rgba(205,186,32,0.3)]",
  },
  {
    id: "silver",
    name: "Silver Plan",
    price: "€59",
    period: "/ 6 month",
    description: "Unlock ranked hosting and deeper match insights.",
    buttonLabel: "Upgrade to Silver",
    buttonVariant: "red" as const,
    features: [
      "Everything in Bronze",
      "Host ranked matches",
      "Advanced booking analytics",
      "Increased monthly session limit",
      "Priority listing in search",
      "Ai Smart Scheduling",
      "Discount Count & Promotion",
      "Email & Push Campaign",
      "Priority Email Support",
    ],
    popular: true,
    borderClass:
      "border-2 border-transparent bg-[linear-gradient(#0b0b0f,#0b0b0f)_padding-box,linear-gradient(135deg,#cdba20,#C00069)_border-box]",
    selectedBorderClass:
      "border-2 border-transparent bg-[linear-gradient(#0b0b0f,#0b0b0f)_padding-box,linear-gradient(135deg,#cdba20,#C00069)_border-box] shadow-[0_0_24px_rgba(205,186,32,0.35)]",
  },
  {
    id: "gold",
    name: "Gold Elite Plan",
    price: "€139",
    period: "Per year",
    description: "Full control, unlimited sessions, complete analytics.",
    buttonLabel: "Go Gold",
    buttonVariant: "outline" as const,
    features: [
      "Everything in Silver",
      "Unlimited session creation",
      "Full earnings tracking",
      "Detailed performance insights",
      "Custom field branding",
    ],
    popular: false,
    borderClass: "border border-[#2C2740]",
    selectedBorderClass:
      "border-2 border-[#cdba20] shadow-[0_0_20px_rgba(205,186,32,0.3)]",
  },
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("silver");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-[#0b0b0f] border border-[#2C2740] max-w-300 sm:max-w-300 w-full max-h-[90vh] overflow-y-auto p-0 rounded-2xl"
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-4 text-center ">
          <DialogClose asChild>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex items-center gap-1.5 text-[#9a98b8] hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
              <span className="w-6 h-6 rounded-full border border-[#2C2740] flex items-center justify-center">
                <X size={12} />
              </span>
            </button>
          </DialogClose>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Power Your Field. Control Every Match.
          </h2>
          <p className="text-[#9a98b8] text-sm max-w-md mx-auto leading-relaxed">
            Choose a plan that unlocks the right tools to manage sessions, host
            ranked games, and grow your arena on TACPLAY.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-8 items-start">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "relative rounded-2xl p-5 cursor-pointer transition-all duration-200",
                  isSelected ? plan.selectedBorderClass : plan.borderClass,
                  "bg-[#0b0b0f]",
                )}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#980009] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}

                {/* Plan name + avatars */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#525273] border-2 border-[#0b0b0f] flex items-center justify-center text-[10px] font-bold text-white">
                      S
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#7c5cad] border-2 border-[#0b0b0f] flex items-center justify-center text-[10px] font-bold text-white">
                      R
                    </div>
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-1">
                  <span className="text-white text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-[#9a98b8] text-sm ml-1">
                    {plan.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#cdba20] text-xs mb-4">
                  {plan.description}
                </p>

                {/* Button */}
                <button
                  className={cn(
                    "w-full py-2.5 rounded-xl text-sm font-semibold transition-all mb-5",
                    plan.buttonVariant === "red"
                      ? "bg-linear-to-r from-[#980009] via-[#C00069] to-[#980009] text-white shadow-[0_0_12px_rgba(192,0,105,0.4)] hover:opacity-90"
                      : "bg-transparent border border-[#525273] text-white hover:border-white",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(plan.id);
                  }}
                >
                  {plan.buttonLabel}
                </button>

                {/* Features */}
                <div>
                  <p className="text-white font-semibold text-sm mb-3">
                    Included Features:
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-[#d1cfe8]"
                      >
                        <Check
                          size={14}
                          className="text-[#980009] shrink-0"
                          strokeWidth={3}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
