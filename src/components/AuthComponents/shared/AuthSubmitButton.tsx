/** @format */

import React from "react";

type AuthSubmitButtonProps = {
  label: string;
  loadingLabel?: string;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  label,
  loadingLabel,
  isLoading = false,
  onClick,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className="w-full py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
    >
      {isLoading && loadingLabel ? loadingLabel : label}
    </button>
  );
};

export default AuthSubmitButton;
