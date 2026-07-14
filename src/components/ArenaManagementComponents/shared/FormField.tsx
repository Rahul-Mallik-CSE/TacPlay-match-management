/** @format */

"use client";

import React from "react";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  className,
}) => {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <label className="text-sm font-medium text-primary">{label}</label>
      {children}
    </div>
  );
};

export default FormField;
