import { useMemo, type FC } from "react"
import Select from "antd/es/select"
import { useSearchParams } from "react-router"

const options = [
  {
    value: "new",
    label: "Новый",
  },
  { value: "in_progress", label: "В работе" },
  { value: "done", label: "Готово" },
]

const SEARCH_PARAMETER = "status"

const StatusFilter: FC = () => {
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
      placeholder="Выбрать статус"
      options={options}
      value={value}
      onChange={onChange}
      allowClear
    />
  )
}

export default StatusFilter
