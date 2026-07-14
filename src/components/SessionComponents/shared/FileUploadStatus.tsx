/** @format */

import React from "react";
import { CheckCircle2, FileImage } from "lucide-react";

type FileUploadStatusProps = {
  fileName: string;
  size: number;
  t: (key: string) => string;
};

const FileUploadStatus: React.FC<FileUploadStatusProps> = ({
  fileName,
  size,
  t,
}) => {
  const sizeKB = (size / 1024).toFixed(1);
  const sizeMB = (size / (1024 * 1024)).toFixed(2);

  return (
    <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-3 py-2">
      <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center shrink-0">
        <FileImage className="w-4 h-4 text-emerald-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-primary truncate">{fileName}</p>
        <p className="text-[10px] text-secondary">
          {Number(sizeMB) > 1 ? `${sizeMB} MB` : `${sizeKB} KB`}
        </p>
      </div>
      <div className="flex items-center gap-1 text-emerald-400">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="text-[10px]">{t("sessions.create.uploadComplete")}</span>
      </div>
    </div>
  );
};

export default FileUploadStatus;
