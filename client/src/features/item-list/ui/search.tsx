import { useEffect, useState, type ChangeEventHandler, type FC } from "react"
import Input from "antd/es/input"
import { useSearchParams } from "react-router"

const SEARCH_PARAMETER = "search"

let timeout: number | undefined

const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get(SEARCH_PARAMETER) ?? ""

  const [value, setValue] = useState(search)

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    clearTimeout(timeout)
    const input = e.target.value
    setValue(input)

    timeout = setTimeout(() => {
      setSearchParams((prev) => {
        if (input) {
          prev.set(SEARCH_PARAMETER, input)
        } else {
          prev.delete(SEARCH_PARAMETER)
        }
        prev.delete("page")
        return prev
      })
    }, 1000)
  }

  return (
    <Input.Search
      style={{ width: "200px" }}
      placeholder="Поиск..."
      value={value}
      onChange={onChange}
    />
  )
}

export default Search
