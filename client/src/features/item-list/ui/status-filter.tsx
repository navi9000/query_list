import { useMemo, type FC } from "react"
import Select from "antd/es/select"
import { useSearchParams } from "react-router"
import { statusOptions } from "../model/status-options"

const SEARCH_PARAMETER = "status"

const StatusFilter: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get(SEARCH_PARAMETER) ?? ""
  const value = useMemo(() => {
    return statusOptions.map(({ value }) => value).includes(search)
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
      placeholder="Выбрать статус"
      options={statusOptions}
      value={value}
      onChange={onChange}
      allowClear
    />
  )
}

export default StatusFilter
