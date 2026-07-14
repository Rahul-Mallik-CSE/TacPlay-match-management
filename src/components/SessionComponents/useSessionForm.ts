/** @format */

"use client";

import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { useGetOwnerSessionDetailsQuery, useUpdateOwnerSessionMutation } from "@/redux/features/sessions/sessionsAPI";
import { toAbsoluteMediaUrl } from "@/lib/utils";
import { toast } from "react-toastify";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useTranslation } from "react-i18next";

export type SessionType = "teams" | "manual_player";

export type EditSessionForm = {
  session_name: string;
  match_type: "ranked" | "social";
  session_visibility: "premium" | "public" | "private";
  description: string;
  match_date: string;
  start_time: string;
  end_time: string;
  booking_cut_off_time: string;
  booking_cut_off_unit: "hours" | "minutes" | "days";
  team_a_player: string;
  team_b_player: string;
  session_type: SessionType;
  team_a_name: string;
  team_b_name: string;
  entry_fee: string;
};

const DEFAULT_FORM: EditSessionForm = {
  session_name: "",
  match_type: "ranked",
  session_visibility: "premium",
  description: "",
  match_date: "",
  start_time: "",
  end_time: "",
  booking_cut_off_time: "12",
  booking_cut_off_unit: "hours",
  team_a_player: "",
  team_b_player: "",
  session_type: "teams",
  team_a_name: "",
  team_b_name: "",
  entry_fee: "",
};

const isValidTime = (value: string) =>
  /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);

const convertToMinutes = (time: string) => {
  if (!isValidTime(time)) return null;
  const [hourString, minuteString] = time.split(":");
  const hour = Number(hourString);
  const minute = Number(minuteString);
  return (hour % 24) * 60 + minute;
};

const to12HourTimeWithPeriod = (time: string) => {
  if (!isValidTime(time)) return { time: "", period: "AM" as const };
  const [hourString, minuteString] = time.split(":");
  const hour24 = Number(hourString);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return { time: `${String(hour12).padStart(2, "0")}:${minuteString}`, period };
};

const convertTo24HourTime = (time12h: string, period: string) => {
  if (!time12h) return "";
  const parts = time12h.split(":");
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] || "00";
  if (period === "PM" && hours < 12) hours += 12;
  else if (period === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
};

export function useSessionForm(sessionId: number | null, open: boolean, onOpenChange: (open: boolean) => void) {
  const { t } = useTranslation("dashboard");

  const { data, isLoading: isDetailsLoading, isFetching: isDetailsFetching } =
    useGetOwnerSessionDetailsQuery(sessionId as number, {
      skip: !open || sessionId === null,
    });

  const [updateOwnerSession, { isLoading: isUpdating }] =
    useUpdateOwnerSessionMutation();

  const details = data?.data;
  const [form, setForm] = useState<EditSessionForm>(DEFAULT_FORM);

  const [teamALogo, setTeamALogo] = useState<File | null>(null);
  const [teamBLogo, setTeamBLogo] = useState<File | null>(null);
  const [teamALogoPreview, setTeamALogoPreview] = useState<string | null>(null);
  const [teamBLogoPreview, setTeamBLogoPreview] = useState<string | null>(null);

  const teamARef = useRef<HTMLInputElement>(null);
  const teamBRef = useRef<HTMLInputElement>(null);
  const matchDateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && details) {
      setForm({
        session_name: details.session_name || "",
        match_type: (details.match_type || "ranked") as "ranked" | "social",
        session_visibility: (details.session_visibility || "premium") as "premium" | "public" | "private",
        description: details.description || "",
        match_date: details.match_date || "",
        start_time: convertTo24HourTime(details.start_time, details.start_time_period),
        end_time: convertTo24HourTime(details.end_time, details.end_time_period),
        booking_cut_off_time: String(details.booking_cut_off_time ?? "12"),
        booking_cut_off_unit: (details.booking_cut_off_unit || "hours") as "hours" | "minutes" | "days",
        team_a_player: String(details.team_a_player ?? ""),
        team_b_player: String(details.team_b_player ?? ""),
        session_type: (details.session_type || "teams") as SessionType,
        team_a_name: details.team_a_name || "",
        team_b_name: details.team_b_name || "",
        entry_fee: String(details.entry_fee ?? ""),
      });
      setTeamALogo(null);
      setTeamBLogo(null);
      setTeamALogoPreview(details.team_a_logo ? toAbsoluteMediaUrl(details.team_a_logo) : null);
      setTeamBLogoPreview(details.team_b_logo ? toAbsoluteMediaUrl(details.team_b_logo) : null);
    }
  }, [open, details]);

  const handleFieldChange = useCallback(
    <T extends keyof EditSessionForm>(key: T, value: EditSessionForm[T]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleTeamAUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setTeamALogo(file);
    if (file) setTeamALogoPreview(URL.createObjectURL(file));
  }, []);

  const handleTeamBUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setTeamBLogo(file);
    if (file) setTeamBLogoPreview(URL.createObjectURL(file));
  }, []);

  const durationDisplay = useMemo(() => {
    const start = convertToMinutes(form.start_time);
    const end = convertToMinutes(form.end_time);
    if (start === null || end === null) return t("sessions.create.autoCount");
    const resolvedEnd = end <= start ? end + 24 * 60 : end;
    const durationMinutes = resolvedEnd - start;
    return durationMinutes > 0
      ? `${durationMinutes} ${t("sessions.create.min")}`
      : t("sessions.create.autoCount");
  }, [form.end_time, form.start_time, t]);

  const validateForm = useCallback(() => {
    if (!form.session_name.trim()) return t("sessions.create.validation.sessionNameRequired");
    if (!form.description.trim()) return t("sessions.create.validation.descriptionRequired");
    if (!form.match_date) return t("sessions.create.validation.matchDateRequired");
    if (!isValidTime(form.start_time)) return t("sessions.create.validation.startTimeFormat");
    if (!isValidTime(form.end_time)) return t("sessions.create.validation.endTimeFormat");
    const start = convertToMinutes(form.start_time);
    const end = convertToMinutes(form.end_time);
    if (start === null || end === null) return t("sessions.create.validation.invalidTimes");
    const resolvedEnd = end <= start ? end + 24 * 60 : end;
    if (resolvedEnd - start <= 0) return t("sessions.create.validation.endTimeAfterStart");
    const cutOff = Number(form.booking_cut_off_time);
    if (!Number.isInteger(cutOff) || cutOff <= 0) return t("sessions.create.validation.cutOffPositive");
    const teamAPlayers = Number(form.team_a_player);
    const teamBPlayers = Number(form.team_b_player);
    if (!Number.isInteger(teamAPlayers) || teamAPlayers <= 0) return t("sessions.create.validation.teamAPlayersPositive");
    if (!Number.isInteger(teamBPlayers) || teamBPlayers <= 0) return t("sessions.create.validation.teamBPlayersPositive");
    const entryFee = Number(form.entry_fee);
    if (Number.isNaN(entryFee) || entryFee < 0) return t("sessions.create.validation.entryFeePositive");
    if (form.session_type === "manual_player") {
      if (!form.team_a_name.trim()) return t("sessions.create.validation.teamANameRequired");
      if (!form.team_b_name.trim()) return t("sessions.create.validation.teamBNameRequired");
      if (!teamALogoPreview) return t("sessions.create.validation.teamALogoRequired");
      if (!teamBLogoPreview) return t("sessions.create.validation.teamBLogoRequired");
    }
    return null;
  }, [form, teamALogoPreview, teamBLogoPreview, t]);

  const buildPayload = useCallback(() => {
    const payload = new FormData();
    payload.append("session_name", form.session_name.trim());
    payload.append("match_type", form.match_type);
    payload.append("session_visibility", form.session_visibility);
    payload.append("description", form.description.trim());
    payload.append("match_date", form.match_date);
    const start12 = to12HourTimeWithPeriod(form.start_time);
    const end12 = to12HourTimeWithPeriod(form.end_time);
    payload.append("start_time", start12.time);
    payload.append("start_time_period", start12.period);
    payload.append("end_time", end12.time);
    payload.append("end_time_period", end12.period);
    payload.append("booking_cut_off_time", form.booking_cut_off_time);
    payload.append("booking_cut_off_unit", form.booking_cut_off_unit);
    payload.append("team_a_player", form.team_a_player);
    payload.append("team_b_player", form.team_b_player);
    payload.append("session_type", form.session_type);
    payload.append("entry_fee", form.entry_fee);
    if (form.session_type === "manual_player") {
      payload.append("team_a_name", form.team_a_name.trim());
      payload.append("team_b_name", form.team_b_name.trim());
      if (teamALogo) payload.append("team_a_logo", teamALogo);
      if (teamBLogo) payload.append("team_b_logo", teamBLogo);
    }
    return payload;
  }, [form, teamALogo, teamBLogo]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationError = validateForm();
      if (validationError) { toast.error(validationError); return; }
      if (!sessionId) return;
      try {
        const response = await updateOwnerSession({ sessionId, payload: buildPayload() }).unwrap();
        toast.success(getSuccessMessage(response, t("sessions.details.updated")));
        onOpenChange(false);
      } catch (error) {
        toast.error(getErrorMessage(error, t("sessions.details.updateFailed")));
      }
    },
    [validateForm, sessionId, buildPayload, updateOwnerSession, onOpenChange, t],
  );

  return {
    form,
    details,
    isLoading: isDetailsLoading || isDetailsFetching,
    isUpdating,
    teamALogo,
    teamBLogo,
    teamALogoPreview,
    teamBLogoPreview,
    teamARef,
    teamBRef,
    matchDateRef,
    startTimeRef,
    endTimeRef,
    durationDisplay,
    handleFieldChange,
    handleTeamAUpload,
    handleTeamBUpload,
    handleSubmit,
  };
}
