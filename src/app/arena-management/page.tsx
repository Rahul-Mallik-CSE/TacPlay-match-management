/** @format */

"use client";

import React from "react";
import Image from "next/image";
import { Crown, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArenaInfoTab from "@/components/ArenaManagementComponents/ArenaInfoTab";
import FieldSetupTab from "@/components/ArenaManagementComponents/FieldSetupTab";
import PackageManagementTab from "@/components/ArenaManagementComponents/PackageManagementTab";
import PayoutDetailsTab from "@/components/ArenaManagementComponents/PayoutDetailsTab";
import BillingsTab from "@/components/ArenaManagementComponents/BillingsTab";

const ArenaManagementPage = () => {
  return (
    <div className="w-full">
      {/* Cover Image */}
      <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden rounded-t-xl">
        <Image
          src="/profile-cover.png"
          alt="Arena Cover"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Profile Section */}
      <div className="relative px-4 sm:px-6 pb-4">
        {/* Avatar */}
        <div className="relative -mt-10 sm:-mt-12 md:-mt-14 mb-3 flex items-end justify-between">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-card bg-muted overflow-hidden shrink-0">
              <div className="w-full h-full bg-linear-to-br from-custom-red/40 to-custom-yellow/40 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-primary">
                  KH
                </span>
              </div>
            </div>
            <div className="pb-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                Kamrul Hossain
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                khk22008@gmail.com
              </p>
            </div>
          </div>

          {/* Pro Badge */}
          <div className="pb-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-custom-red text-white text-xs sm:text-sm font-semibold">
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Pro
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="px-4 sm:px-6 pb-6">
        <Tabs defaultValue="arena-info" className="w-full">
          <TabsList
            variant="line"
            className="w-full justify-start overflow-x-auto border-b border-white/10 gap-0"
          >
            <TabsTrigger
              value="arena-info"
              className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
              Arena Info
            </TabsTrigger>
            <TabsTrigger
              value="field-setup"
              className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
              Field Setup
            </TabsTrigger>
            <TabsTrigger
              value="package-management"
              className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
              Package Management
            </TabsTrigger>
            <TabsTrigger
              value="payout-details"
              className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
              Payout Details
            </TabsTrigger>
            <TabsTrigger
              value="billings"
              className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
            >
              Billings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="arena-info" className="mt-6">
            <ArenaInfoTab />
          </TabsContent>
          <TabsContent value="field-setup" className="mt-6">
            <FieldSetupTab />
          </TabsContent>
          <TabsContent value="package-management" className="mt-6">
            <PackageManagementTab />
          </TabsContent>
          <TabsContent value="payout-details" className="mt-6">
            <PayoutDetailsTab />
          </TabsContent>
          <TabsContent value="billings" className="mt-6">
            <BillingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArenaManagementPage;
