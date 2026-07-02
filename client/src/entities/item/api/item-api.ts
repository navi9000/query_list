import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  ApiResultResponse,
  ItemCreateRequest,
  ItemDeleteRequest,
  ItemListResponse,
} from "../model/schema"

export const itemApi = createApi({
  reducerPath: "items",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000" + "/queries",
  }),
  tagTypes: ["items"],
  keepUnusedDataFor: 1800,
  endpoints: (builder) => ({
    getItems: builder.query<
      ItemListResponse,
      {
        page?: number
        status?: string
        priority?: string
        search?: string
        sort_by?: string
      } | void
    >({
      query: (params) => ({
        url: "/",
        params: params && Object.keys(params).length > 0 ? params : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "items" as const, id })),
              { type: "items", id: "LIST" },
            ]
          : [{ type: "items", id: "LIST" }],
    }),

    addItem: builder.mutation<ApiResultResponse, ItemCreateRequest>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "items", id: "LIST" }],
    }),

    editItem: builder.mutation<
      ApiResultResponse,
      { id: number; status: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "items", id }],
    }),

    deleteItem: builder.mutation<ApiResultResponse, ItemDeleteRequest>({
      query: ({ id, accessToken }) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "items", id }],
    }),
  }),
})

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} = itemApi
