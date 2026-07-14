/** @format */
"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useEditArenaInfoMutation } from "@/redux/features/arenaManagement/arenaManagementAPI";
import { useTranslation } from "react-i18next";
import ExistingImagesGrid from "./ExistingImagesGrid";
import UploadZone from "./UploadZone";

interface ManageCoverImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  arenaInfo: any;
}

export default function ManageCoverImagesModal({
  isOpen,
  onClose,
  arenaInfo,
}: ManageCoverImagesModalProps) {
  const { t } = useTranslation("dashboard");
  const [editArenaInfo, { isLoading: isSaving }] = useEditArenaInfoMutation();

  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newPreviews]);

  useEffect(() => {
    if (isOpen) {
      setDeletedIds([]);
      setNewFiles([]);
      setNewPreviews([]);
    }
  }, [isOpen]);

  const existingMedia = arenaInfo?.media || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newUrls = filesArray.map((file) => URL.createObjectURL(file));
      setNewFiles((prev) => [...prev, ...filesArray]);
      setNewPreviews((prev) => [...prev, ...newUrls]);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleDeleteExisting = (id: number) => {
    setDeletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSave = async () => {
    if (!arenaInfo) return;
    try {
      const deleteIdsString = deletedIds.join(",");
      const payload = {
        field_name: arenaInfo.field_name || "",
        description: arenaInfo.description || "",
        country: arenaInfo.country?.name || "",
        city: arenaInfo.city?.name || "",
        full_address: arenaInfo.full_address || "",
        images: newFiles,
        delete_image_ids: deleteIdsString || undefined,
      };
      const response = await editArenaInfo(payload).unwrap();
      toast.success(
        getSuccessMessage(response, t("arena.coverImagesUpdated", "Cover images updated successfully.")),
      );
      onClose();
    } catch (error) {
      toast.error(
        getErrorMessage(error, t("arena.coverImagesUpdateFailed", "Failed to update cover images.")),
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-[#0b0b0f] border border-[#2C2740] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0 rounded-2xl shadow-2xl"
      >
        <div className="relative px-6 pt-6 pb-4 border-b border-[#2C2740]">
          <DialogClose asChild disabled={isSaving}>
            <button
              onClick={onClose}
              disabled={isSaving}
              className="cursor-pointer absolute top-4 right-4 flex items-center gap-1.5 text-[#9a98b8] hover:text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("common.cancel", "Cancel")}
              <span className="w-6 h-6 rounded-full border border-[#2C2740] flex items-center justify-center">
                <X size={12} />
              </span>
            </button>
          </DialogClose>
          <DialogTitle asChild>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
              {t("arena.manageCoverImagesTitle", "Manage Cover Images")}
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <p className="text-[#9a98b8] text-xs sm:text-sm max-w-md">
              {t("arena.manageCoverImagesDesc", "Add new photos or remove existing ones from your cover slider.")}
            </p>
          </DialogDescription>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/80">
              {t("arena.currentImages", "Current Slider Images")} ({existingMedia.length})
            </h3>
            <ExistingImagesGrid
              media={existingMedia}
              deletedIds={deletedIds}
              isSaving={isSaving}
              onToggleDelete={toggleDeleteExisting}
            />
          </div>

          <UploadZone
            previews={newPreviews}
            isSaving={isSaving}
            onFileChange={handleFileChange}
            onRemovePreview={handleRemoveNewImage}
          />
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#2C2740] bg-[#0c0c11]/80">
          <DialogClose asChild disabled={isSaving}>
            <Button
              variant="outline"
              disabled={isSaving}
              className="h-10 text-xs sm:text-sm px-4 bg-transparent border-[#2C2740] text-white hover:bg-white/5"
            >
              {t("common.cancel", "Cancel")}
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving || (deletedIds.length === 0 && newFiles.length === 0)}
            className="h-10 text-xs sm:text-sm px-5 bg-custom-yellow text-black font-semibold hover:bg-custom-yellow/95 transition-all shadow-md shadow-custom-yellow/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("common.saving", "Saving...")}
              </>
            ) : (
              t("common.saveChanges", "Save Changes")
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
