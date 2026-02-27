/** @format */

"use client";

import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Upload,
  Clock,
  CheckCircle2,
  FileImage,
} from "lucide-react";
import Link from "next/link";

const CreateSessionPage = () => {
  const [sessionType, setSessionType] = useState<string>("");
  const [sessionTypeOpen, setSessionTypeOpen] = useState(false);
  const [matchTypeOpen, setMatchTypeOpen] = useState(false);
  const [visibilityOpen, setVisibilityOpen] = useState(false);
  const [, setBookingCutOffUnit] = useState("Hours");
  const [cutOffUnitOpen, setCutOffUnitOpen] = useState(false);
  const [startAmPm, setStartAmPm] = useState("AM");
  const [endAmPm, setEndAmPm] = useState("AM");
  const [startAmPmOpen, setStartAmPmOpen] = useState(false);
  const [endAmPmOpen, setEndAmPmOpen] = useState(false);

  // File upload states
  const [teamALogo, setTeamALogo] = useState<File | null>(null);
  const [teamBLogo, setTeamBLogo] = useState<File | null>(null);
  const [teamAUploaded, setTeamAUploaded] = useState(false);
  const [teamBUploaded, setTeamBUploaded] = useState(false);
  const teamARef = useRef<HTMLInputElement>(null);
  const teamBRef = useRef<HTMLInputElement>(null);

  const handleTeamAUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTeamALogo(file);
      setTeamAUploaded(true);
    }
  };

  const handleTeamBUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTeamBLogo(file);
      setTeamBUploaded(true);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/sessions">
              <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              Create New Session
            </h1>
          </div>
          <p className="text-sm text-secondary ml-10">
            Set a new match session with teams, players, pricing and ranking
            rules.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-8">
          {/* ── Session Details ── */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-primary">
              Session Details
            </h2>

            {/* Session Name */}
            <FormField label="Session Name">
              <input
                type="text"
                placeholder="enter dish name..."
                className="form-input-style"
              />
            </FormField>

            {/* Match Type */}
            <FormField label="Match Type">
              <CustomSelect
                placeholder="enter dish name..."
                options={["Ranked", "Social"]}
                open={matchTypeOpen}
                onToggle={() => setMatchTypeOpen(!matchTypeOpen)}
                onSelect={() => {
                  setMatchTypeOpen(false);
                }}
              />
            </FormField>

            {/* Session Visibility */}
            <FormField label="Session Visibility">
              <CustomSelect
                placeholder="enter dish name..."
                options={["Public", "Private"]}
                open={visibilityOpen}
                onToggle={() => setVisibilityOpen(!visibilityOpen)}
                onSelect={() => setVisibilityOpen(false)}
              />
            </FormField>

            {/* Description */}
            <FormField label="Description">
              <textarea
                rows={4}
                placeholder="enter session description..."
                className="form-input-style resize-none min-h-24"
              />
            </FormField>
          </section>

          {/* ── Date & Time Configuration ── */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-primary">
              Date &amp; Time Configuration
            </h2>

            {/* Match Date */}
            <FormField label="Match Date">
              <input
                type="date"
                placeholder="DD / MM / YYYY"
                className="form-input-style"
              />
            </FormField>

            {/* Start & End Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Start Time">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="00 : 00"
                    className="form-input-style flex-1"
                  />
                  <AmPmSelect
                    value={startAmPm}
                    onChange={setStartAmPm}
                    open={startAmPmOpen}
                    onToggle={() => setStartAmPmOpen(!startAmPmOpen)}
                  />
                </div>
              </FormField>
              <FormField label="End Time">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="00 : 00"
                    className="form-input-style flex-1"
                  />
                  <AmPmSelect
                    value={endAmPm}
                    onChange={setEndAmPm}
                    open={endAmPmOpen}
                    onToggle={() => setEndAmPmOpen(!endAmPmOpen)}
                  />
                </div>
              </FormField>
            </div>

            {/* Duration */}
            <FormField label="Duration">
              <div className="relative">
                <input
                  type="text"
                  placeholder="auto count"
                  className="form-input-style pr-10"
                  readOnly
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              </div>
            </FormField>

            {/* Booking Cut-Off Time */}
            <FormField label="Booking Cut-Off Time">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="enter time"
                  className="form-input-style flex-1"
                />
                <CustomSelect
                  placeholder="Hours"
                  options={["Hours", "Minutes", "Days"]}
                  open={cutOffUnitOpen}
                  onToggle={() => setCutOffUnitOpen(!cutOffUnitOpen)}
                  onSelect={(val) => {
                    setBookingCutOffUnit(val);
                    setCutOffUnitOpen(false);
                  }}
                  className="w-28"
                />
              </div>
            </FormField>
          </section>

          {/* ── Teams & Capacity ── */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-primary">
              Teams &amp; Capacity
            </h2>

            {/* Team A & B Player count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Team A Player">
                <input
                  type="number"
                  placeholder="enter a player number"
                  className="form-input-style"
                />
              </FormField>
              <FormField label="Team B Player">
                <input
                  type="number"
                  placeholder="enter b player number"
                  className="form-input-style"
                />
              </FormField>
            </div>

            {/* Session Type */}
            <FormField label="Session Type">
              <CustomSelect
                placeholder="Select team mode"
                options={["Individual Player", "Team"]}
                open={sessionTypeOpen}
                onToggle={() => setSessionTypeOpen(!sessionTypeOpen)}
                onSelect={(val) => {
                  setSessionType(val);
                  setSessionTypeOpen(false);
                }}
              />
            </FormField>

            {/* Conditional Team Fields - only when "Team" is selected */}
            {sessionType === "Team" && (
              <>
                {/* Team Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Team A Name">
                    <input
                      type="text"
                      placeholder="enter A name"
                      className="form-input-style"
                    />
                  </FormField>
                  <FormField label="Team B Name">
                    <input
                      type="text"
                      placeholder="enter B name"
                      className="form-input-style"
                    />
                  </FormField>
                </div>

                {/* Team Logos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Team A Logo */}
                  <FormField label="Team A Logo">
                    <div className="space-y-3">
                      <div
                        onClick={() => teamARef.current?.click()}
                        className="border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-white/20 transition-colors"
                      >
                        <Upload className="w-6 h-6 text-secondary" />
                        <p className="text-xs text-secondary text-center">
                          Choose a file or upload it here.
                        </p>
                        <p className="text-[10px] text-secondary/60 text-center">
                          Pick any format, up to 50 mb in size for uploads.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => teamARef.current?.click()}
                        className="px-4 py-1.5 text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-600/30 transition-colors"
                      >
                        Upload Logo
                      </button>
                      <input
                        type="file"
                        ref={teamARef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleTeamAUpload}
                      />
                      {teamAUploaded && teamALogo && (
                        <FileUploadStatus
                          fileName={teamALogo.name}
                          size={teamALogo.size}
                        />
                      )}
                    </div>
                  </FormField>

                  {/* Team B Logo */}
                  <FormField label="Team B Logo">
                    <div className="space-y-3">
                      <div
                        onClick={() => teamBRef.current?.click()}
                        className="border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-white/20 transition-colors"
                      >
                        <Upload className="w-6 h-6 text-secondary" />
                        <p className="text-xs text-secondary text-center">
                          Choose a file or upload it here.
                        </p>
                        <p className="text-[10px] text-secondary/60 text-center">
                          Pick any format, up to 50 mb in size for uploads.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => teamBRef.current?.click()}
                        className="px-4 py-1.5 text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-600/30 transition-colors"
                      >
                        Upload Logo
                      </button>
                      <input
                        type="file"
                        ref={teamBRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleTeamBUpload}
                      />
                      {teamBUploaded && teamBLogo && (
                        <FileUploadStatus
                          fileName={teamBLogo.name}
                          size={teamBLogo.size}
                        />
                      )}
                    </div>
                  </FormField>
                </div>
              </>
            )}
          </section>

          {/* ── Pricing & Payment ── */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-primary">
              Pricing &amp; Payment
            </h2>

            <FormField label="Entry Fee">
              <input
                type="text"
                placeholder="Enter entry fee amount"
                className="form-input-style"
              />
            </FormField>
          </section>

          {/* ── Action Buttons ── */}
          <div className="flex items-center justify-center gap-4 pt-4 pb-8">
            <Link href="/sessions">
              <button
                type="button"
                className="px-10 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-10 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors border border-custom-red"
            >
              Create Session
            </button>
          </div>
        </form>
      </div>

      {/* Styles for form inputs */}
      <style jsx>{`
        .form-input-style {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: var(--primary);
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input-style::placeholder {
          color: var(--secondary);
          opacity: 0.6;
        }
        .form-input-style:focus {
          border-color: rgba(152, 0, 9, 0.5);
        }
      `}</style>
    </div>
  );
};

/* ── Reusable Sub-components ── */

const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm text-primary font-medium">{label}</label>
    {children}
  </div>
);

const CustomSelect = ({
  placeholder,
  options,
  open,
  onToggle,
  onSelect,
  className = "",
}: {
  placeholder: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (val: string) => void;
  className?: string;
}) => {
  const [selected, setSelected] = useState("");

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between bg-transparent border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-left outline-none hover:border-white/20 transition-colors"
      >
        <span className={selected ? "text-primary" : "text-secondary/60"}>
          {selected || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-secondary transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-card border border-white/10 rounded-lg shadow-xl overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                onSelect(option);
              }}
              className="w-full px-3.5 py-2 text-sm text-primary/80 hover:bg-muted/50 text-left transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AmPmSelect = ({
  value,
  onChange,
  open,
  onToggle,
}: {
  value: string;
  onChange: (val: string) => void;
  open: boolean;
  onToggle: () => void;
}) => (
  <div className="relative">
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-1 bg-transparent border border-white/10 rounded-lg px-3 py-2.5 text-sm text-primary outline-none hover:border-white/20 transition-colors"
    >
      {value}
      <ChevronDown
        className={`w-3 h-3 text-secondary transition-transform ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
    {open && (
      <div className="absolute z-50 top-full mt-1 w-full bg-card border border-white/10 rounded-lg shadow-xl overflow-hidden">
        {["AM", "PM"].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              onChange(opt);
              onToggle();
            }}
            className="w-full px-3 py-2 text-sm text-primary/80 hover:bg-muted/50 text-left transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
    )}
  </div>
);

const FileUploadStatus = ({
  fileName,
  size,
}: {
  fileName: string;
  size: number;
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
        <span className="text-[10px]">Complete</span>
      </div>
    </div>
  );
};

export default CreateSessionPage;
