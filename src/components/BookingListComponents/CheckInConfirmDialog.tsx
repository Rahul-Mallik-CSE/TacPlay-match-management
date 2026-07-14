/** @format */

"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

type CheckInConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const CheckInConfirmDialog: React.FC<CheckInConfirmDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border border-white/10 max-w-sm"
      >
        <DialogHeader className="items-center">
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="w-6 h-6 text-custom-red" />
            <DialogTitle>{t("bookings.details.confirmCheckIn")}</DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            {t("bookings.details.confirmDescription")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-3 sm:justify-center mt-2">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors"
          >
            {t("common.yesSure")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckInConfirmDialog;
