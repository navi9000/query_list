import { useGetItemsQuery, type Item } from "@/entities/item"
import { useState, type FC } from "react"
import Typography from "antd/es/typography"
import Table, { type ColumnsType } from "antd/es/table"
import Flex from "antd/es/flex"
import Button from "antd/es/button"
import { formatDate } from "@/utils/dates"
import { useSearchParams } from "react-router"
import SortSelector from "./sort-selector"
import StatusFilter from "./status-filter"
import PriorityFilter from "./priority-filter"
import Search from "./search"
import CreateModal from "./create-modal"
import ModalContextProvider from "./modal-context-provider"
import { useUpdateModal } from "../api/use-update-modal"
import UpdateModal from "./update-modal"
import ItemControls from "./item-controls"

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
    render: ({ id }) => <ItemControls id={id} />,
  },
]

const ItemList: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const openCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const { selectedItem, isUpdateModalOpen, openUpdateModal, closeUpdateModal } =
    useUpdateModal(data?.data)

  return (
    <ModalContextProvider open={openUpdateModal}>
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
        <Flex justify="flex-end">
          <Button onClick={openCreateModal}>Добавить</Button>
        </Flex>

        {!isLoading && !isError && !!data && (
          <Table
            dataSource={data.data}
            columns={columns}
            pagination={{
              total: data.meta.total,
              current: data.meta.page,
              pageSize: data.meta.page_size,
              onChange: (page) =>
                setSearchParams((prev) => ({ ...prev, page })),
            }}
            rowKey={(item) => item.id.toString()}
          />
        )}
        <CreateModal isOpen={isCreateModalOpen} close={closeCreateModal} />
        <UpdateModal
          isOpen={isUpdateModalOpen}
          close={closeUpdateModal}
          item={selectedItem}
        />
      </div>
    </ModalContextProvider>
  )
}

export default ItemList
