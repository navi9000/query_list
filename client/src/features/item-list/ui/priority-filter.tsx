import { useMemo, type FC } from "react"
import Select from "antd/es/select"
import { useSearchParams } from "react-router"

const options = [
  {
    value: "low",
    label: "Низкий",
  },
  { value: "normal", label: "Обычный" },
  { value: "high", label: "Высокий" },
]

const SEARCH_PARAMETER = "priority"

const PriorityFilter: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get(SEARCH_PARAMETER) ?? ""
  const value = useMemo(() => {
    return options.map(({ value }) => value).includes(search) ? search : null
  }, [search])

  const onChange = (value: string | null) => {
    setSearchParams((prev) => {
      if (!value) {
        prev.delete(SEARCH_PARAMETER)
      } else {
        prev.set(SEARCH_PARAMETER, value)
      }

      prev.delete("page")

      return prev
    })
  }

  return (
    <Select
      style={{ width: "200px" }}
      placeholder="Выбрать приоритет"
      options={options}
      value={value}
      onChange={onChange}
      allowClear
    />
  )
}

export default PriorityFilter
