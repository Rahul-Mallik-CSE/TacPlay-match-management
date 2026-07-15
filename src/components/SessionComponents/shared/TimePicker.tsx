/** @format */

import React, { useEffect, useRef } from "react";
import { Clock } from "lucide-react";

type TimePickerProps = {
  value: string;
  onChange: (time24: string) => void;
  placeholder?: string;
};

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = ["00", "30"];

const to12 = (time24: string) => {
  if (!time24) return { hour: 1, minute: "00", period: "AM" as "AM" | "PM" };
  const [h, m] = time24.split(":").map(Number);
  const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return { hour: hour12, minute: String(m).padStart(2, "0"), period };
};

const to24 = (hour: number, minute: string, period: "AM" | "PM") => {
  let h = hour;
  if (period === "AM" && hour === 12) h = 0;
  else if (period === "PM" && hour !== 12) h = hour + 12;
  return `${String(h).padStart(2, "0")}:${minute}`;
};

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder = "Select time",
}) => {
  const { hour, minute, period } = to12(value);
  const [open, setOpen] = React.useState(false);
  const [selHour, setSelHour] = React.useState(hour);
  const [selMin, setSelMin] = React.useState(minute);
  const [selPeriod, setSelPeriod] = React.useState<"AM" | "PM">(period);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelHour(hour);
    setSelMin(minute);
    setSelPeriod(period);
  }, [hour, minute, period]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const display = value ? to24(selHour, selMin, selPeriod) : "";

  const hourScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && hourScrollRef.current) {
      const idx = selHour - 1;
      const item = hourScrollRef.current.children[idx] as HTMLElement | undefined;
      if (item) {
        item.scrollIntoView({ block: "center" });
      }
    }
  }, [open, selHour]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="form-input-style w-full flex items-center justify-between text-left"
      >
        <span className={value ? "text-primary" : "text-secondary/60"}>
          {display || placeholder}
        </span>
        <Clock className="w-4 h-4 text-secondary" />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-72 bg-card border border-white/10 rounded-lg shadow-xl p-3">
          <div className="flex gap-2 mb-3">
            <div className="flex-1 text-center text-xs text-secondary font-medium uppercase">
              Hour
            </div>
            <div className="flex-1 text-center text-xs text-secondary font-medium uppercase">
              Min
            </div>
            <div className="w-16 text-center text-xs text-secondary font-medium uppercase">
              Period
            </div>
          </div>

          <div className="flex gap-2">
            <div
              ref={hourScrollRef}
              className="flex-1 h-48 overflow-y-auto rounded-lg border border-white/10 scrollbar-thin"
            >
              {HOURS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setSelHour(h)}
                  className={`w-full py-2 text-sm transition-colors ${
                    selHour === h
                      ? "bg-red-600 text-white font-medium"
                      : "text-primary/80 hover:bg-white/5"
                  }`}
                >
                  {String(h).padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="flex-1 h-48 overflow-y-auto rounded-lg border border-white/10">
              {MINUTES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelMin(m)}
                  className={`w-full py-2 text-sm transition-colors ${
                    selMin === m
                      ? "bg-red-600 text-white font-medium"
                      : "text-primary/80 hover:bg-white/5"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="w-16 h-48 rounded-lg border border-white/10 flex flex-col">
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelPeriod(p)}
                  className={`flex-1 text-sm font-medium transition-colors ${
                    selPeriod === p
                      ? "bg-red-600 text-white"
                      : "text-primary/80 hover:bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 text-xs text-secondary hover:text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onChange(to24(selHour, selMin, selPeriod));
                setOpen(false);
              }}
              className="px-4 py-1.5 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
