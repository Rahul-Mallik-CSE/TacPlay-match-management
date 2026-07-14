/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { useGetArenaInfoQuery } from "@/redux/features/arenaManagement/arenaManagementAPI";
import { useGetFieldOwnerSubscriptionStatusQuery } from "@/redux/features/subscriptions/subscriptionsAPI";
import { toAbsoluteMediaUrl } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import ArenaManagementLoading from "./ArenaManagementLoading";
import CoverImageSlider from "./CoverImageSlider";
import LightboxModal from "./LightboxModal";
import ArenaProfileSection from "./ArenaProfileSection";
import ArenaTabsSection from "./ArenaTabsSection";
import ManageCoverImagesModal from "./ManageCoverImagesModal";

const ArenaManagementPage = () => {
  const { t } = useTranslation("dashboard");
  const { data, isLoading, isFetching } = useGetArenaInfoQuery();
  const { data: subscriptionStatus } = useGetFieldOwnerSubscriptionStatusQuery(undefined);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const currentPlan = subscriptionStatus?.data?.plan_name;
  const isBronze = currentPlan === "Bronze Plan" || subscriptionStatus?.data?.plan_code === "field_bronze_monthly";

  const arenaInfo = data?.data;
  const userInfo = arenaInfo?.user_info;
  const fullName = userInfo?.full_name || t("arena.arenaOwner");
  const email = userInfo?.email || "";

  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "AO";

  const mediaList = arenaInfo?.media || [];
  const mappedUrls = mediaList
    .map((m) => toAbsoluteMediaUrl(m.file_url))
    .filter((url): url is string => !!url);
  const imageUrls = mappedUrls.length > 0 ? mappedUrls : ["/profile-cover.png"];

  const profileImageUrl = toAbsoluteMediaUrl(userInfo?.profile_image);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % imageUrls.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  useEffect(() => {
    if (imageUrls.length <= 1 || isLightboxOpen || isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageUrls.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imageUrls.length, isLightboxOpen, isHovered]);

  useEffect(() => {
    if (currentSlide >= imageUrls.length) {
      setCurrentSlide(Math.max(0, imageUrls.length - 1));
    }
  }, [imageUrls.length, currentSlide]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      else if (e.key === "ArrowRight") setCurrentSlide((prev) => (prev + 1) % imageUrls.length);
      else if (e.key === "ArrowLeft") setCurrentSlide((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, imageUrls.length]);

  if ((isLoading || isFetching) && !arenaInfo) {
    return <ArenaManagementLoading />;
  }

  return (
    <div className="w-full pt-3 pb-6 md:pb-12 md:pt-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <CoverImageSlider
          imageUrls={imageUrls}
          currentSlide={currentSlide}
          isHovered={isHovered}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
          onGoToSlide={setCurrentSlide}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onOpenLightbox={() => setIsLightboxOpen(true)}
          onOpenManageModal={() => setIsManageModalOpen(true)}
        />

        <LightboxModal
          isOpen={isLightboxOpen}
          imageUrls={imageUrls}
          currentSlide={currentSlide}
          onClose={() => setIsLightboxOpen(false)}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
          onGoToSlide={setCurrentSlide}
        />

        <ArenaProfileSection
          fullName={fullName}
          email={email}
          initials={initials}
          profileImageUrl={profileImageUrl}
          showProBadge={!isBronze}
        />

        <ArenaTabsSection />
      </div>

      <ManageCoverImagesModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        arenaInfo={arenaInfo}
      />
    </div>
  );
};

export default ArenaManagementPage;
