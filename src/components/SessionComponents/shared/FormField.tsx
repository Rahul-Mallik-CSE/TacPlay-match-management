/** @format */

import React from "react";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

const FormField: React.FC<FormFieldProps> = ({ label, children, className }) => (
  <div className={`space-y-1.5 ${className ?? ""}`}>
    <label className="text-sm text-primary font-medium">{label}</label>
    {children}
  </div>
);

export default FormField;
