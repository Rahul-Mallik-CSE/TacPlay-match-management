/** @format */

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City, Country, type ICity, type ICountry } from "country-state-city";
import {
  useEditArenaInfoMutation,
  useGetArenaInfoQuery,
} from "@/redux/features/arenaManagement/arenaManagementAPI";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import TabHeader from "./shared/TabHeader";
import FormField from "./shared/FormField";
import { TabLoadingState, TabErrorState } from "./shared/TabStates";

type ArenaInfoForm = {
  field_name: string;
  description: string;
  country: string;
  city: string;
  full_address: string;
};

const ArenaInfoTab = () => {
  const { t } = useTranslation("dashboard");
  const { data, isLoading, isFetching, isError } = useGetArenaInfoQuery();
  const [editArenaInfo, { isLoading: isSaving }] = useEditArenaInfoMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<ArenaInfoForm | null>(null);

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const currentArena = data?.data;

  const baseForm = useMemo<ArenaInfoForm>(
    () => ({
      field_name: currentArena?.field_name ?? "",
      description: currentArena?.description ?? "",
      country: currentArena?.country?.name ?? "",
      city: currentArena?.city?.name ?? "",
      full_address: currentArena?.full_address ?? "",
    }),
    [currentArena],
  );

  const form = isEditing ? (draft ?? baseForm) : baseForm;

  const countryOptions = useMemo(() => {
    const options = countries.map((country) => ({
      key: country.isoCode,
      value: country.name,
    }));
    if (!form.country) return options;
    const hasCurrent = options.some((c) => c.value === form.country);
    if (hasCurrent) return options;
    return [...options, { key: `custom-${form.country}`, value: form.country }];
  }, [countries, form.country]);

  const cityOptions = useMemo(() => {
    const options = cities.map((city) => ({
      key: city.name,
      value: city.name,
    }));
    if (!form.city) return options;
    const hasCurrent = options.some((c) => c.value === form.city);
    if (hasCurrent) return options;
    return [...options, { key: `custom-${form.city}`, value: form.city }];
  }, [cities, form.city]);

  useEffect(() => {
    let active = true;
    const loadCountries = () => {
      const data = Country.getAllCountries();
      if (!active) return;
      setCountries(Array.isArray(data) ? data : []);
    };
    loadCountries();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const loadCities = () => {
      const selectedCountry = countries.find((item) => item.name === form.country);
      if (!selectedCountry) { setCities([]); return; }
      const data = City.getCitiesOfCountry(selectedCountry.isoCode);
      if (!active) return;
      setCities(Array.isArray(data) ? data : []);
    };
    loadCities();
    return () => { active = false; };
  }, [countries, form.country]);

  const handleToggleEdit = () => {
    if (isEditing) { setDraft(null); setIsEditing(false); return; }
    setDraft(baseForm);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!draft) return;
    try {
      const response = await editArenaInfo({
        field_name: draft.field_name,
        description: draft.description,
        country: draft.country,
        city: draft.city,
        full_address: draft.full_address,
      }).unwrap();
      toast.success(getSuccessMessage(response, t("arena.arenaInfoTab.updated")));
      setDraft(null);
      setIsEditing(false);
    } catch (error) {
      toast.error(getErrorMessage(error, t("arena.arenaInfoTab.updateFailed")));
    }
  };

  const updateDraft = (patch: Partial<ArenaInfoForm>) =>
    setDraft((p) => (p ? { ...p, ...patch } : p));

  if (isLoading || isFetching) return <TabLoadingState message={t("arena.arenaInfoTab.loading")} />;
  if (isError) return <TabErrorState message={t("arena.arenaInfoTab.loadFailed")} />;

  return (
    <div className="space-y-6">
      <TabHeader
        title={t("onboardingFields.arena.title")}
        subtitle={t("onboardingFields.arena.subtitle")}
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
      />

      <div className="space-y-5">
        <FormField label={t("onboardingFields.arena.nameLabel")}>
          <Input
            placeholder={t("onboardingFields.arena.namePlaceholder")}
            value={form.field_name}
            onChange={(e) => updateDraft({ field_name: e.target.value })}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </FormField>

        <FormField label={t("onboardingFields.arena.descLabel")}>
          <Textarea
            placeholder={t("onboardingFields.arena.descPlaceholder")}
            value={form.description}
            onChange={(e) => updateDraft({ description: e.target.value })}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary min-h-25"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={t("onboardingFields.arena.countryLabel")}>
            <Select
              value={form.country}
              onValueChange={(v) => updateDraft({ country: v, city: "" })}
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder={t("onboardingFields.arena.countryPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {countryOptions.map((c) => (
                  <SelectItem key={c.key} value={c.value}>{c.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label={t("onboardingFields.arena.cityLabel")}>
            <Select
              value={form.city}
              onValueChange={(v) => updateDraft({ city: v })}
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder={t("onboardingFields.arena.cityPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {cityOptions.map((c) => (
                  <SelectItem key={c.key} value={c.value}>{c.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <FormField label={t("onboardingFields.arena.addressLabel")}>
          <Input
            placeholder={t("onboardingFields.arena.addressPlaceholder")}
            value={form.full_address}
            onChange={(e) => updateDraft({ full_address: e.target.value })}
            readOnly={!isEditing}
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </FormField>
      </div>
    </div>
  );
};

export default ArenaInfoTab;
