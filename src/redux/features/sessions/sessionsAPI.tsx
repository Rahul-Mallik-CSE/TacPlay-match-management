/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  SessionDetailsResponse,
  SessionInfoResponse,
  SessionPlayerInfoResponse,
  SessionsListQuery,
  SessionsListResponse,
} from "@/types/SessionTypes";

const sessionsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOwnerSessions: builder.query<SessionsListResponse, SessionsListQuery>({
      query: ({ page, limit, status, match_type }) => ({
        url: "/api/session/owner/sessions/",
        method: "GET",
        params: {
          page,
          limit,
          ...(status && status !== "all" ? { status } : {}),
          ...(match_type && match_type !== "all" ? { match_type } : {}),
        },
      }),
      providesTags: ["Sessions"],
    }),
    getOwnerSessionDetails: builder.query<SessionDetailsResponse, number>({
      query: (sessionId) => ({
        url: `/api/session/owner/sessions/${sessionId}/`,
        method: "GET",
      }),
      providesTags: ["Sessions"],
    }),
    getOwnerSessionInfo: builder.query<SessionInfoResponse, number>({
      query: (sessionId) => ({
        url: `/api/session/owner/sessions/${sessionId}/info/`,
        method: "GET",
      }),
      providesTags: ["Sessions"],
    }),
    getOwnerSessionPlayerInfo: builder.query<
      SessionPlayerInfoResponse,
      { sessionId: number; bookingId: number }
    >({
      query: ({ sessionId, bookingId }) => ({
        url: `/api/session/owner/sessions/${sessionId}/players/${bookingId}/`,
        method: "GET",
      }),
      providesTags: ["Sessions"],
    }),
  }),
});

export const {
  useGetOwnerSessionsQuery,
  useGetOwnerSessionDetailsQuery,
  useGetOwnerSessionInfoQuery,
  useGetOwnerSessionPlayerInfoQuery,
} = sessionsAPI;

export default sessionsAPI;
