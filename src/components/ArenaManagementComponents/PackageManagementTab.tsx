/** @format */

"use client";

import React, { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useEditPackageManagementMutation,
  useGetPackageManagementQuery,
} from "@/redux/features/arenaManagement/arenaManagementAPI";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import TabHeader from "./shared/TabHeader";
import FormField from "./shared/FormField";
import { TabLoadingState, TabErrorState } from "./shared/TabStates";

type PackageForm = {
  id?: number;
  package_name: string;
  description: string;
  package_fee: string;
  include_items: string[];
  is_active: boolean;
};

const EMPTY_PACKAGE: PackageForm = {
  package_name: "",
  description: "",
  package_fee: "",
  include_items: [],
  is_active: true,
};

type PackageCardProps = {
  pkg: PackageForm;
  index: number;
  isEditing: boolean;
  onUpdate: (index: number, patch: Partial<PackageForm>) => void;
  onRemove: (index: number) => void;
  onAddItem: (index: number, value: string) => void;
  onRemoveItem: (index: number, value: string) => void;
  itemInput: string;
  onItemInputChange: (value: string) => void;
};

const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  index,
  isEditing,
  onUpdate,
  onRemove,
  onAddItem,
  onRemoveItem,
  itemInput,
  onItemInputChange,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-primary">
          {t("arena.packagesTab.type", { index: index + 1 })}
        </h3>
        {isEditing && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onRemove(index)}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <FormField label={t("onboardingFields.packages.nameLabel")}>
        <Input
          value={pkg.package_name}
          onChange={(e) => onUpdate(index, { package_name: e.target.value })}
          readOnly={!isEditing}
          className="bg-input/30 border-white/10 text-primary h-11"
        />
      </FormField>

      <FormField label={t("onboardingFields.packages.descLabel")}>
        <Textarea
          value={pkg.description}
          onChange={(e) => onUpdate(index, { description: e.target.value })}
          readOnly={!isEditing}
          className="bg-input/30 border-white/10 text-primary min-h-25"
        />
      </FormField>

      <FormField label={t("onboardingFields.packages.feeLabel")}>
        <Input
          type="number"
          inputMode="decimal"
          step="0.01"
          value={pkg.package_fee}
          onChange={(e) => onUpdate(index, { package_fee: e.target.value })}
          readOnly={!isEditing}
          className="bg-input/30 border-white/10 text-primary h-11"
        />
      </FormField>

      <div className="flex items-center justify-between py-2 border-t border-white/5">
        <label className="text-sm font-medium text-primary">
          {t("arena.packagesTab.active")}
        </label>
        <div className="flex items-center gap-3">
          <Switch
            checked={pkg.is_active}
            onCheckedChange={(checked) => onUpdate(index, { is_active: checked })}
            disabled={!isEditing}
            className="data-[state=checked]:bg-custom-yellow"
          />
          <span className="text-sm text-muted-foreground">
            {pkg.is_active ? t("arena.on") : t("arena.off")}
          </span>
        </div>
      </div>

      <FormField label={t("onboardingFields.packages.includeLabel")}>
        <div className="flex gap-2">
          <Input
            placeholder={t("arena.packagesTab.placeholder")}
            className="bg-input/30 border-white/10 text-primary h-11"
            readOnly={!isEditing}
            value={itemInput}
            onChange={(e) => onItemInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter" || !isEditing) return;
              e.preventDefault();
              onAddItem(index, itemInput);
            }}
          />
          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={!isEditing}
            className="h-11 px-4"
            onClick={() => onAddItem(index, itemInput)}
          >
            {t("arena.add")}
          </Button>
        </div>

        {pkg.include_items.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {pkg.include_items.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/30 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {item}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index, item)}
                    className="flex items-center justify-center hover:text-destructive transition-colors"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        )}
      </FormField>
    </div>
  );
};

const PackageManagementTab = () => {
  const { t } = useTranslation("dashboard");
  const { data, isLoading, isFetching, isError } = useGetPackageManagementQuery();
  const [editPackageManagement, { isLoading: isSaving }] = useEditPackageManagementMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [draftPackages, setDraftPackages] = useState<PackageForm[] | null>(null);
  const [includeItemInputs, setIncludeItemInputs] = useState<Record<number, string>>({});

  const basePackages = useMemo(
    () =>
      (data?.data.packages ?? []).map((item) => ({
        id: item.id,
        package_name: item.package_name,
        description: item.description,
        package_fee: item.package_fee,
        include_items: item.include_items,
        is_active: item.is_active,
      })),
    [data],
  );

  const packages = isEditing ? (draftPackages ?? basePackages) : basePackages;

  const handleToggleEdit = () => {
    if (isEditing) { setDraftPackages(null); setIncludeItemInputs({}); setIsEditing(false); return; }
    setDraftPackages(basePackages);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!draftPackages) return;
    try {
      const response = await editPackageManagement({
        packages: draftPackages.map((item) => ({
          package_name: item.package_name,
          description: item.description,
          package_fee: item.package_fee,
          include_items: item.include_items,
          is_active: item.is_active,
        })),
      }).unwrap();
      toast.success(getSuccessMessage(response, t("arena.packagesTab.updated")));
      setDraftPackages(null);
      setIncludeItemInputs({});
      setIsEditing(false);
    } catch (error) {
      toast.error(getErrorMessage(error, t("arena.packagesTab.updateFailed")));
    }
  };

  const updatePackage = (index: number, patch: Partial<PackageForm>) =>
    setDraftPackages((p) => p ? p.map((item, i) => i === index ? { ...item, ...patch } : item) : p);

  const addPackage = () =>
    setDraftPackages((p) => p ? [...p, { ...EMPTY_PACKAGE }] : [{ ...EMPTY_PACKAGE }]);

  const removePackage = (index: number) =>
    setDraftPackages((p) => p ? p.filter((_, i) => i !== index) : p);

  const addItem = (index: number, rawValue: string) => {
    const value = rawValue.trim();
    if (!value) return;
    setDraftPackages((p) =>
      p ? p.map((pkg, i) => {
        if (i !== index) return pkg;
        if (pkg.include_items.includes(value)) return pkg;
        return { ...pkg, include_items: [...pkg.include_items, value] };
      }) : p,
    );
    setIncludeItemInputs((prev) => ({ ...prev, [index]: "" }));
  };

  const removeItem = (index: number, value: string) =>
    setDraftPackages((p) =>
      p ? p.map((pkg, i) =>
        i === index ? { ...pkg, include_items: pkg.include_items.filter((item) => item !== value) } : pkg,
      ) : p,
    );

  if (isLoading || isFetching) return <TabLoadingState message={t("arena.packagesTab.loading")} />;
  if (isError) return <TabErrorState message={t("arena.packagesTab.loadFailed")} />;

  return (
    <div className="space-y-6 mb-8 md:mb-12">
      <TabHeader
        title={t("onboardingFields.packages.title")}
        subtitle={t("onboardingFields.packages.subtitle")}
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
        extra={
          isEditing ? (
            <Button variant="default" size="sm" className="flex items-center gap-2" onClick={addPackage}>
              <Plus className="w-4 h-4" />
              {t("arena.packagesTab.addNew")}
            </Button>
          ) : undefined
        }
      />

      <div className="space-y-8">
        {packages.map((pkg, index) => (
          <PackageCard
            key={`${pkg.id ?? "new"}-${index}`}
            pkg={pkg}
            index={index}
            isEditing={isEditing}
            onUpdate={updatePackage}
            onRemove={removePackage}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            itemInput={includeItemInputs[index] ?? ""}
            onItemInputChange={(v) => setIncludeItemInputs((prev) => ({ ...prev, [index]: v }))}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageManagementTab;
