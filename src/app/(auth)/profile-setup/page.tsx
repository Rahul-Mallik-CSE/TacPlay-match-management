/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import StepArenaInfo from "@/components/AuthComponents/StepArenaInfo";
import StepBusinessSetup from "@/components/AuthComponents/StepBusinessSetup";
import StepPackageManagement from "@/components/AuthComponents/StepPackageManagement";
import StepPayoutSetup from "@/components/AuthComponents/StepPayoutSetup";

const steps = [
  { id: 1, label: "Arena Info" },
  { id: 2, label: "Business Setup" },
  { id: 3, label: "Package Management" },
  { id: 4, label: "Payout & Business Setup" },
];

const ProfileSetupPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    router.push("/");
  };

  const isLastStep = currentStep === steps.length - 1;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepArenaInfo />;
      case 1:
        return <StepBusinessSetup />;
      case 2:
        return <StepPackageManagement />;
      case 3:
        return <StepPayoutSetup />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-root-bg">
      {/* Left sidebar - stepper */}
      <aside className="hidden md:flex w-72 lg:w-80 flex-col border-r border-white/5 bg-card/50 p-6">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/Tacplay-logo.png"
            alt="TacPlay"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Steps */}
        <nav className="flex-1 space-y-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <button
                key={step.id}
                onClick={() => {
                  if (index <= currentStep) setCurrentStep(index);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  isActive
                    ? "bg-white/5 text-primary"
                    : isCompleted
                      ? "text-primary"
                      : "text-muted-foreground"
                }`}
              >
                {/* Step indicator */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-colors ${
                    isCompleted
                      ? "bg-green-500/20 text-green-400 border border-green-500/40"
                      : isActive
                        ? "bg-custom-red/20 text-custom-red border border-custom-red/40"
                        : "bg-white/5 text-muted-foreground border border-white/10"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-sm font-medium">{step.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header with logo */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5">
          <Image
            src="/Tacplay-logo.png"
            alt="TacPlay"
            width={100}
            height={35}
            className="object-contain"
          />
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Mobile stepper dots */}
        <div className="md:hidden flex items-center gap-2 px-4 pt-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            return (
              <div
                key={step.id}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <div
                  className={`h-1.5 w-full rounded-full transition-colors ${
                    isCompleted
                      ? "bg-green-500"
                      : isActive
                        ? "bg-custom-red"
                        : "bg-white/10"
                  }`}
                />
                <span className="text-[10px] text-muted-foreground truncate max-w-full">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 max-w-3xl">
          {renderStepContent()}
        </div>

        {/* Footer with navigation */}
        <div className="border-t border-white/5 p-4 sm:p-6 flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "border border-white/10 bg-input/30 text-primary hover:bg-input/50"
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={isLastStep ? handleSubmit : handleNext}
            className="px-6 py-2.5 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border"
          >
            {isLastStep ? "Submit & Approve" : "Continue"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfileSetupPage;
