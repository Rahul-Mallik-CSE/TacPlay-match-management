/** @format */

"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthPasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
};

const AuthPasswordField: React.FC<AuthPasswordFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={label.toLowerCase().replace(/\s+/g, "_")}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pr-11 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default AuthPasswordField;
