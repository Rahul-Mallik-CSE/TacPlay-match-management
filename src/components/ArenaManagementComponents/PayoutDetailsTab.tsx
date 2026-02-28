/** @format */

"use client";

import React from "react";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PayoutDetailsTab = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Business &amp; Payout Information
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Provide business details and payout information to receive booking
            payments and manage subscriptions securely.
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

      {/* Business Details */}
      <div className="space-y-5">
        {/* Business Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Business Name
          </label>
          <Input
            defaultValue="TACPLAY Arena Ltd"
            readOnly
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* Business Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Business Type
          </label>
          <Select defaultValue="registered">
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
            defaultValue="+44 7700 900123"
            readOnly
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>
      </div>

      {/* Payout Account Details */}
      <div className="space-y-5">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-primary">
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
              defaultValue="TACPLAY Arena Ltd"
              readOnly
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Bank Name
            </label>
            <Input
              defaultValue="Barclays Bank UK PLC"
              readOnly
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
            defaultValue="12345678"
            readOnly
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
              defaultValue="GB29 NWBK 6016 1331 9268 19"
              readOnly
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              SWIFT / BIC Code
            </label>
            <Input
              defaultValue="BARCGB22"
              readOnly
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutDetailsTab;
