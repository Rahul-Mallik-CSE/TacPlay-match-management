/** @format */

"use client";

import React from "react";

type ProfileAvatarProps = {
  imageUrl: string | null;
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_MAP = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
} as const;

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imageUrl,
  initials,
  size = "md",
  className,
}) => {
  return (
    <div
      className={`${SIZE_MAP[size]} rounded-full bg-linear-to-br from-custom-red/30 to-custom-yellow/30 flex items-center justify-center shrink-0 ${className ?? ""}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="text-xl sm:text-2xl font-bold text-primary">
          {initials}
        </span>
      )}
    </div>
  );
};

export default ProfileAvatar;
