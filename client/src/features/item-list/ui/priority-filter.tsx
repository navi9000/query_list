import { useMemo, type FC } from "react"
import Select from "antd/es/select"
import { useSearchParams } from "react-router"
import { priorityOptions } from "../model/priority-options"

const SEARCH_PARAMETER = "priority"

const PriorityFilter: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get(SEARCH_PARAMETER) ?? ""
  const value = useMemo(() => {
    return priorityOptions.map(({ value }) => value).includes(search)
      ? search
      : null
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
      options={priorityOptions}
      value={value}
      onChange={onChange}
      allowClear
    />
  )
}

export default PriorityFilter
