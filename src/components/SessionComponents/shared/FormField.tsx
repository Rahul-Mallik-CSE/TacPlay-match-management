/** @format */

import React from "react";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

const FormField: React.FC<FormFieldProps> = ({ label, children, className }) => (
  <div className={`w-full space-y-1.5 ${className ?? ""}`}>
    <label className="block text-sm text-primary font-medium">{label}</label>
    {children}
  </div>
);

export default FormField;
