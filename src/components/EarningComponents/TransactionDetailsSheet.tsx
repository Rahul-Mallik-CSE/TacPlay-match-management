/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useGetEarningDetailsQuery } from "@/redux/features/earnings/earningsAPI";
import { pdf } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import EarningPlayerInfoSection from "./EarningPlayerInfoSection";
import EarningPaymentInfoSection from "./EarningPaymentInfoSection";
import TransactionPdfDocument from "./TransactionPdfDocument";

interface TransactionDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId: number | null;
}

const TransactionDetailsSheet: React.FC<TransactionDetailsSheetProps> = ({
  open,
  onOpenChange,
  transactionId,
}) => {
  const { t } = useTranslation("dashboard");
  const [isDownloading, setIsDownloading] = useState(false);
  const { data, isLoading, isFetching, isError } = useGetEarningDetailsQuery(
    transactionId as number,
    { skip: !open || transactionId === null },
  );

  const details = data?.data.transaction_details;

  const handleDownload = async () => {
    if (!details || !details.actions.can_download || isDownloading) return;
    setIsDownloading(true);
    try {
      const blob = await pdf(
        <TransactionPdfDocument
          details={details}
          footerText={t("earnings.details.pdfFooter")}
        />,
      ).toBlob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `${details.payment_info.display_transaction_id.replace(/[^a-zA-Z0-9_-]+/g, "-")}.pdf`;
      anchor.click();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
      >
        <SheetHeader className="p-5 pb-0">
          <div className="flex items-center">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </div>
          <SheetTitle className="text-xl font-bold text-primary">
            {details?.title ?? t("earnings.details.title")}
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            {details?.subtitle ?? t("earnings.details.subtitle")}
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 pb-5">
          {isLoading || isFetching ? (
            <div className="py-6 text-sm text-muted-foreground">
              {t("earnings.details.loading")}
            </div>
          ) : null}

          {isError ? (
            <div className="py-6 text-sm text-destructive">
              {t("earnings.details.loadFailed")}
            </div>
          ) : null}

          {details ? (
            <>
              <EarningPlayerInfoSection playerInfo={details.player_info} />
              <EarningPaymentInfoSection
                paymentInfo={details.payment_info}
                statusDisplay={details.status_display}
              />
            </>
          ) : null}
        </div>

        <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="cursor-pointer flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
          >
            {details?.actions.cancel_button_text ??
              t("earnings.details.cancel")}
          </button>
          <button
            onClick={handleDownload}
            disabled={!details?.actions.can_download || isDownloading}
            className="cursor-pointer flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {isDownloading
              ? t("earnings.details.generating")
              : (details?.actions.download_button_text ??
                t("earnings.details.download"))}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetailsSheet;
