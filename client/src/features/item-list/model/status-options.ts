import type { ItemStatus } from "@/entities/item/model/schema"

export const statusOptions: { label: string; value: ItemStatus }[] = [
  {
    value: "new",
    label: "Новый",
  },
  { value: "in_progress", label: "В работе" },
  { value: "done", label: "Готово" },
]
