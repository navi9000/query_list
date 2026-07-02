export function valueAdapter<
  T extends { value: string; label: string }[],
  K extends T[number]["value"],
>(srcValue: K, options: T) {
  return options.find((item) => item.value === srcValue)?.label
}
