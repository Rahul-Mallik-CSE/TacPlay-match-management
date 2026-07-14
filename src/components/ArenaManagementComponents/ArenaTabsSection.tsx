/** @format */

"use client";

import { Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import ArenaInfoTab from "./ArenaInfoTab";
import FieldSetupTab from "./FieldSetupTab";
import PackageManagementTab from "./PackageManagementTab";
import PayoutDetailsTab from "./PayoutDetailsTab";
import BillingsTab from "./BillingsTab";

const TAB_ITEMS = [
  { value: "arena-info", translationKey: "arena.tabs.arenaInfo", hasIcon: true },
  { value: "field-setup", translationKey: "arena.tabs.fieldSetup", hasIcon: true },
  { value: "package-management", translationKey: "arena.tabs.packageManagement", hasIcon: true },
  { value: "payout-details", translationKey: "arena.tabs.payoutDetails", hasIcon: true },
  { value: "billings", translationKey: "arena.tabs.billings", hasIcon: false },
] as const;

const TAB_COMPONENTS: Record<string, React.FC> = {
  "arena-info": ArenaInfoTab,
  "field-setup": FieldSetupTab,
  "package-management": PackageManagementTab,
  "payout-details": PayoutDetailsTab,
  billings: BillingsTab,
};

const ArenaTabsSection: React.FC = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="px-4 sm:px-6 pb-6">
      <Tabs defaultValue="arena-info" className="w-full">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto border-b border-white/10 gap-0"
        >
          {TAB_ITEMS.map((tab) => {
            const TabIcon = tab.hasIcon ? Shield : null;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm data-[state=active]:text-custom-yellow after:bg-custom-yellow whitespace-nowrap"
              >
                {TabIcon && (
                  <TabIcon className="w-3.5 h-3.5 mr-1.5 hidden sm:inline-block" />
                )}
                {t(tab.translationKey)}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(TAB_COMPONENTS).map(([value, Component]) => (
          <TabsContent key={value} value={value} className="mt-6">
            <Component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ArenaTabsSection;
