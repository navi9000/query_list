import type { ItemPriority } from "@/entities/item/model/schema"

export const priorityOptions: { label: string; value: ItemPriority }[] = [
  {
    value: "low",
    label: "Низкий",
  },
  { value: "normal", label: "Обычный" },
  { value: "high", label: "Высокий" },
]
