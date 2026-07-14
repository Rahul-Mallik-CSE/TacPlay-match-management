/** @format */

"use client";

import React, { useRef } from "react";
import { X, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

type UploadZoneProps = {
  previews: string[];
  isSaving: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePreview: (index: number) => void;
};

const UploadZone: React.FC<UploadZoneProps> = ({
  previews,
  isSaving,
  onFileChange,
  onRemovePreview,
}) => {
  const { t } = useTranslation("dashboard");
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80">
          {t("arena.uploadNewImages", "Add New Images")}
        </h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          multiple
          accept="image/*"
          className="hidden"
          disabled={isSaving}
        />
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`group/upload border-2 border-dashed border-[#2C2740] hover:border-custom-yellow/40 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 bg-[#0c0c11]/50 hover:bg-[#12121c]/30 flex flex-col items-center justify-center gap-2 ${
          isSaving ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-white/5 group-hover/upload:bg-custom-yellow/10 flex items-center justify-center text-white/60 group-hover/upload:text-custom-yellow transition-all duration-300 shadow-inner">
          <Upload className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-semibold text-white/90 group-hover/upload:text-white transition-colors">
            {t("arena.dragAndDropClick", "Click to select cover photos")}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {t("arena.uploadLimits", "PNG, JPG or JPEG formats up to 10MB")}
          </p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-semibold text-white/60">
            {t("arena.queuedUploads", "Queued for upload")} ({previews.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previews.map((preview, index) => (
              <div
                key={preview + index}
                className="relative aspect-video rounded-lg overflow-hidden border border-custom-yellow/20 bg-black/40 group/queued shadow-md"
              >
                <img
                  src={preview}
                  alt="Queued Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                  {t("arena.newBadge", "New")}
                </div>
                <button
                  type="button"
                  onClick={() => onRemovePreview(index)}
                  disabled={isSaving}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-red-500/80 hover:border-red-400 backdrop-blur-md transition-all shadow-md cursor-pointer disabled:opacity-50"
                  title={t("arena.removeNewImage", "Remove from upload list")}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
