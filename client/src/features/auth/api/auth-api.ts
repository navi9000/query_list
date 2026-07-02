import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface LoginRequest {
  username: string
  password: string
}

interface RefreshRequest {
  refresh_token: string
}

interface LoginResponse {
  access_token: string
  refresh_token: string
  username: string
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" + "/auth" }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),

    refresh: builder.mutation<LoginResponse, RefreshRequest>({
      query: (body) => ({
        url: "/refresh",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useRefreshMutation } = authApi
