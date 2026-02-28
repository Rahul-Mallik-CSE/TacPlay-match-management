/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import AuthBanner from "@/components/AuthComponents/AuthBanner";
import { Checkbox } from "@/components/ui/checkbox";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <AuthBanner>
      <div className="flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/Tacplay-logo-2.png"
          alt="TacPlay"
          width={100}
          height={60}
          className="object-contain mb-6"
        />

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-center">
          Register Your Field
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
          Create your Field Owner account to publish sessions, manage bookings,
          and grow your tactical community on TACPLAY.
        </p>

        {/* Form */}
        <div className="w-full space-y-5">
          {/* Owner Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Owner Name
            </label>
            <input
              type="text"
              placeholder="Enter restaurant owner name"
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          {/* Business Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Business Email
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                className="w-full px-4 py-2.5 pr-11 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="w-full px-4 py-2.5 pr-11 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showConfirmPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="border-white/20 data-[state=checked]:bg-custom-yellow data-[state=checked]:border-custom-yellow"
            />
            <label className="text-sm text-muted-foreground">
              I agree to terms &amp; conditions
            </label>
          </div>

          {/* Sign Up Button */}
          <button className="w-full py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border">
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Already have account */}
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthBanner>
  );
};

export default SignUpPage;
