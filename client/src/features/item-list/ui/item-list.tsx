import { useGetItemsQuery, type Item } from "@/entities/item"
import type { FC } from "react"
import Typography from "antd/es/typography"
import Table, { type ColumnsType } from "antd/es/table"
import Flex from "antd/es/flex"
import { formatDate } from "@/utils/dates"
import { useSearchParams } from "react-router"
import SortSelector from "./sort-selector"
import StatusFilter from "./status-filter"
import PriorityFilter from "./priority-filter"
import Search from "./search"

const columns: ColumnsType<Item> = [
  {
    title: "Дата создания",
    dataIndex: "created_at",
    key: "created_at",
    render: (value: string) => formatDate(value),
  },
  {
    title: "Наименование",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Приоритет",
    dataIndex: "priority",
    key: "priority",
  },
  {
    key: "buttons",
    render: () => <div>Buttons</div>,
  },
]

const ItemList: FC = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get("page")
  const status = searchParams.get("status")
  const priority = searchParams.get("priority")
  const search = searchParams.get("search")
  const sort_by = searchParams.get("sort_by")
  const { data, isLoading, isError } = useGetItemsQuery({
    page: page ? +page : undefined,
    status: status ?? undefined,
    priority: priority ?? undefined,
    search: search ?? undefined,
    sort_by: sort_by ?? undefined,
  })

  return (
    <div>
      <Typography.Title>Список заявок</Typography.Title>
      <Flex justify="space-between">
        <Flex gap="small">
          <SortSelector />
          <StatusFilter />
          <PriorityFilter />
        </Flex>
        <Search />
      </Flex>

      {!isLoading && !isError && !!data && (
        <Table
          dataSource={data.data}
          columns={columns}
          pagination={{
            total: data.meta.total,
            current: data.meta.page,
            pageSize: data.meta.page_size,
          }}
        />
      )}
    </div>
  )
}

export default ItemList
