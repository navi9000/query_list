import { type FC, useMemo } from "react"
import Select from "antd/es/select"
import { useSearchParams } from "react-router"

const options = [
  { value: "created_at", label: "По дате" },
  { value: "priority", label: "По приоритету" },
]

const SortSelector: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const sort_by = searchParams.get("sort_by") ?? ""
  const value = useMemo(() => {
    return options.map(({ value }) => value).includes(sort_by)
      ? sort_by
      : options[0].value
  }, [sort_by])

  const onChange = (value: string) => {
    setSearchParams((prev) => {
      if (value === "created_at") {
        prev.delete("sort_by")
      } else {
        prev.append("sort_by", value)
      }

      return prev
    })
  }

  return (
    <Select
      style={{ width: "200px" }}
      placeholder="Сортировать по..."
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}

export default SortSelector
