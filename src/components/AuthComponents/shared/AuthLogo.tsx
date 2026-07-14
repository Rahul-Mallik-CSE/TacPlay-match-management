/** @format */

import React from "react";
import Image from "next/image";

type AuthLogoProps = {
  className?: string;
};

const AuthLogo: React.FC<AuthLogoProps> = ({ className }) => {
  return (
    <div className={`h-12 mb-4 ${className ?? ""}`}>
      <Image
        src="/Tacplay-logo-2.png"
        alt="TacPlay"
        width={200}
        height={200}
        className="object-contain h-12"
        priority
      />
    </div>
  );
};

export default AuthLogo;
