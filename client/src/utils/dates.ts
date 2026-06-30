export const formatDate = (value: string) => {
  if (!value) {
    return "-"
  }

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
  }).format(new Date(value))
}
