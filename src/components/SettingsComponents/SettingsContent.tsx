/** @format */

"use client";

import React, { useState } from "react";
import SettingsPageHeader from "./SettingsPageHeader";
import ProfileAvatar from "./shared/ProfileAvatar";
import PersonalInfoFields from "./PersonalInfoFields";
import ProfileActionButtons from "./ProfileActionButtons";
import EditAccountDialog from "./EditAccountDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { useGetFieldOwnerProfileQuery } from "@/redux/features/settings/settingsAPI";
import { toAbsoluteMediaUrl } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const getInitials = (fullName?: string) => {
  if (!fullName) return "U";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

const SettingsContent: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { data, isLoading, isFetching, isError } =
    useGetFieldOwnerProfileQuery();
  const profile = data?.data;
  const profileImageUrl = toAbsoluteMediaUrl(profile?.profile_image);
  const initials = getInitials(profile?.full_name);

  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <SettingsPageHeader />

        <div className="rounded-xl border border-white/5 bg-card p-5 sm:p-6 space-y-8">
          <div className="flex items-center gap-4">
            <ProfileAvatar
              imageUrl={profileImageUrl}
              initials={initials}
              size="lg"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-primary">
                {profile?.full_name || "-"}
              </h2>
              <p className="text-sm text-secondary">
                {t("settingsPage.arenaOwner")}
              </p>
            </div>
          </div>

          {isLoading || isFetching ? (
            <div className="text-sm text-secondary">
              {t("settingsPage.loading")}
            </div>
          ) : null}

          {isError ? (
            <div className="text-sm text-destructive">
              {t("settingsPage.loadFailed")}
            </div>
          ) : null}

          <PersonalInfoFields
            fullName={profile?.full_name || ""}
            email={profile?.email_address || ""}
            password={profile?.password || "********"}
            contactNumber={profile?.contact_number || ""}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <ProfileActionButtons
            onChangePassword={() => setPasswordOpen(true)}
            onEditProfile={() => setEditOpen(true)}
          />
        </div>

        <EditAccountDialog
          key={`${profile?.id ?? "profile"}-${editOpen ? "open" : "closed"}`}
          open={editOpen}
          onOpenChange={setEditOpen}
          profile={profile ?? null}
        />
        <ChangePasswordDialog
          open={passwordOpen}
          onOpenChange={setPasswordOpen}
        />
      </div>
    </div>
  );
};

export default SettingsContent;
