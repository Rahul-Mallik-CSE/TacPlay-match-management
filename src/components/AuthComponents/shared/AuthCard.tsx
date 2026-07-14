/** @format */

import React from "react";

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

const AuthCard: React.FC<AuthCardProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-root-bg relative overflow-hidden px-4">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-custom-red/20 rounded-full blur-[120px] pointer-events-none" />
      <div
        className={`relative w-full max-w-sm rounded-2xl border border-white/10 bg-card/80 backdrop-blur-sm p-6 sm:p-8 space-y-6 ${className ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
