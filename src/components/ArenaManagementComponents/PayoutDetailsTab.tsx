/** @format */

"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditPayoutDetailsMutation,
  useGetPayoutDetailsQuery,
} from "@/redux/features/arenaManagement/arenaManagementAPI";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import UpgradeModal from "@/components/CommonComponents/UpgradeModal";
import TabHeader from "./shared/TabHeader";
import FormField from "./shared/FormField";
import { TabLoadingState, TabErrorState } from "./shared/TabStates";
import PayoutLockedState from "./PayoutLockedState";

type PayoutForm = {
  business_name: string;
  business_type: string;
  contact_phone_number: string;
  bank_account_holder_name: string;
  bank_name: string;
  account_number: string;
  iban_routing_number: string;
  swift_bic_code: string;
};

const PayoutDetailsTab = () => {
  const { t } = useTranslation("dashboard");
  const { data, isLoading, isFetching, isError, error } = useGetPayoutDetailsQuery();
  const [editPayoutDetails, { isLoading: isSaving }] = useEditPayoutDetailsMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<PayoutForm | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const baseForm = useMemo<PayoutForm>(
    () => ({
      business_name: data?.data.business_name ?? "",
      business_type: data?.data.business_type ?? "",
      contact_phone_number: data?.data.contact_phone_number ?? "",
      bank_account_holder_name: data?.data.bank_account_holder_name ?? "",
      bank_name: data?.data.bank_name ?? "",
      account_number: data?.data.account_number ?? "",
      iban_routing_number: data?.data.iban_routing_number ?? "",
      swift_bic_code: data?.data.swift_bic_code ?? "",
    }),
    [data],
  );

  const form = isEditing ? (draft ?? baseForm) : baseForm;

  const handleToggleEdit = () => {
    if (isEditing) { setDraft(null); setIsEditing(false); return; }
    setDraft(baseForm);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!draft) return;
    try {
      const response = await editPayoutDetails({
        business_name: draft.business_name,
        business_type: draft.business_type,
        contact_phone_number: draft.contact_phone_number,
        bank_account_holder_name: draft.bank_account_holder_name,
        bank_name: draft.bank_name,
        account_number: draft.account_number,
        iban_routing_number: draft.iban_routing_number,
        swift_bic_code: draft.swift_bic_code,
      }).unwrap();
      toast.success(getSuccessMessage(response, t("arena.payoutTab.updated")));
      setDraft(null);
      setIsEditing(false);
    } catch (error) {
      toast.error(getErrorMessage(error, t("arena.payoutTab.updateFailed")));
    }
  };

  const updateDraft = (patch: Partial<PayoutForm>) =>
    setDraft((p) => (p ? { ...p, ...patch } : p));

  if (isLoading || isFetching) return <TabLoadingState message={t("arena.payoutTab.loading")} />;

  if (isError) {
    const isForbidden = error && "status" in error && error.status === 403;
    const errorData = error && "status" in error ? (error.data as Record<string, unknown> | undefined) : undefined;
    const errorMsg = typeof errorData?.message === "string" ? errorData.message : "";

    if (isForbidden || errorMsg.includes("Bronze plan") || errorMsg.includes("Essential Starter for Fields")) {
      return (
        <>
          <PayoutLockedState onUpgradeClick={() => setIsUpgradeModalOpen(true)} />
          <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
        </>
      );
    }
    return <TabErrorState message={t("arena.payoutTab.loadFailed")} />;
  }

  return (
    <div className="space-y-8">
      <TabHeader
        title={t("onboardingFields.payout.title")}
        subtitle={t("onboardingFields.payout.subtitle")}
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
      />

      <div className="space-y-5">
        <FormField label={t("onboardingFields.payout.bizNameLabel")}>
          <Input
            value={form.business_name}
            onChange={(e) => updateDraft({ business_name: e.target.value })}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </FormField>

        <FormField label={t("onboardingFields.payout.bizTypeLabel")}>
          <Select
            value={form.business_type}
            onValueChange={(v) => updateDraft({ business_type: v })}
            disabled={!isEditing}
          >
            <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
              <SelectValue placeholder={t("onboardingFields.payout.bizTypePlaceholder")} />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="individual">{t("onboardingFields.payout.typeIndividual")}</SelectItem>
              <SelectItem value="registered_company">{t("onboardingFields.payout.typeCompany")}</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label={t("onboardingFields.payout.phoneLabel")}>
          <Input
            value={form.contact_phone_number}
            onChange={(e) => updateDraft({ contact_phone_number: e.target.value })}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </FormField>
      </div>

      <div className="space-y-5">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-primary">
            {t("onboardingFields.payout.accountDetailsHeader")}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t("onboardingFields.payout.accountDetailsDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={t("onboardingFields.payout.holderLabel")}>
            <Input
              value={form.bank_account_holder_name}
              onChange={(e) => updateDraft({ bank_account_holder_name: e.target.value })}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </FormField>
          <FormField label={t("onboardingFields.payout.bankLabel")}>
            <Input
              value={form.bank_name}
              onChange={(e) => updateDraft({ bank_name: e.target.value })}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </FormField>
        </div>

        <FormField label={t("onboardingFields.payout.numberLabel")}>
          <Input
            value={form.account_number}
            onChange={(e) => updateDraft({ account_number: e.target.value })}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={t("onboardingFields.payout.ibanLabel")}>
            <Input
              value={form.iban_routing_number}
              onChange={(e) => updateDraft({ iban_routing_number: e.target.value })}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </FormField>
          <FormField label={t("onboardingFields.payout.swiftLabel")}>
            <Input
              value={form.swift_bic_code}
              onChange={(e) => updateDraft({ swift_bic_code: e.target.value })}
              readOnly={!isEditing}
              className="bg-input/30 border-white/10 text-primary h-11"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default PayoutDetailsTab;
