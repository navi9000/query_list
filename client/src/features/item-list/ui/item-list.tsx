import { useGetItemsQuery, type Item } from "@/entities/item"
import type { FC } from "react"
import Typography from "antd/es/typography"
import Table, { type ColumnsType } from "antd/es/table"

const columns: ColumnsType<Item> = [
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
  const { data, isLoading, isError } = useGetItemsQuery()
  console.log({ data, isLoading, isError })

  return (
    <div>
      <Typography.Title>Список заявок</Typography.Title>
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
