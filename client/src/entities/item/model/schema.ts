export type ItemStatus = "new" | "in_progress" | "done"
export type ItemPriority = "low" | "normal" | "high"

export interface Item {
  id: number
  title: string
  description: string | null
  status: ItemStatus
  priority: ItemPriority
  created_at: string
  updated_at: string
}

export interface ItemListResponse {
  is_success: boolean
  data: Item[]
  meta: {
    page: number
    page_size: number
    total: number
    total_pages: number
  }
}

type PickAndStringify<T, K extends keyof T> = {
  [P in K]: T[P] extends string | null
    ? T[P]
    : T[P] extends { value: string }
      ? T[P]["value"]
      : never
}

export type ItemCreateRequest = Partial<
  PickAndStringify<Item, "title" | "description" | "priority">
>

export type ItemUpdateRequest = Partial<PickAndStringify<Item, "status">>

export interface ApiResultResponse {
  result: "ok"
}
