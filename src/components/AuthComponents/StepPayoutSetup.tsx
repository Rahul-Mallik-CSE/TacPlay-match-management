/** @format */

"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StepPayoutSetup = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Business &amp; Payout Information
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide business details and payout information to receive booking
          payments and manage subscriptions securely.
        </p>
      </div>

      {/* Business Details */}
      <div className="space-y-5">
        {/* Business Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Business Name
          </label>
          <Input
            placeholder="Enter business name"
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* Business Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Business Type
          </label>
          <Select>
            <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="registered">Registered Company</SelectItem>
              <SelectItem value="sole-trader">Sole Trader</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="llc">LLC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contact Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Contact Phone Number
          </label>
          <Input
            placeholder="+44 7700 900123"
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>
      </div>

      {/* Payout Account Details */}
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-bold text-primary">
            Payout Account Details
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Provide your bank details to receive payments from player bookings.
          </p>
        </div>

        {/* Bank Account Holder Name & Bank Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Bank Account Holder Name
            </label>
            <Input
              placeholder="Account holder name"
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Bank Name
            </label>
            <Input
              placeholder="Bank name"
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Account Number
          </label>
          <Input
            placeholder="Enter account number"
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* IBAN & SWIFT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              IBAN / Routing Number
            </label>
            <Input
              placeholder="IBAN or routing number"
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              SWIFT / BIC Code
            </label>
            <Input
              placeholder="SWIFT code"
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPayoutSetup;
