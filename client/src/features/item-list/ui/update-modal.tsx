import { useState, type FC, type MouseEventHandler } from "react"
import Modal from "antd/es/modal"
import Form from "antd/es/form"
import Input from "antd/es/input"
import Select from "antd/es/select"
import { priorityOptions } from "../model/priority-options"
import { useEditItemMutation, type Item } from "@/entities/item"
import { statusOptions } from "../model/status-options"
import type { ItemStatus } from "@/entities/item/model/schema"

type Props = {
  isOpen: boolean
  close: () => void
  item: Item | null
}

const UpdateModal: FC<Props> = ({ isOpen, close, item }) => {
  const [editItem, { isLoading }] = useEditItemMutation()
  const [status, setStatus] = useState<ItemStatus | null>(null)
  const disableStatusChange = item?.status === "done"
  const [prevId, setPrevId] = useState<number | null>(null)

  if (item?.id && item.id !== prevId) {
    setPrevId(item.id)
    setStatus(item.status)
  }

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    if (!item || !status) {
      return
    }
    if (status === item.status) {
      return
    }
    const { error } = await editItem({
      id: item.id,
      status,
    })

    if (!error) {
      close()
    }
  }

  const onCancel = () => {
    close()
  }

  return (
    <Modal
      open={isOpen}
      title="Редактирование записи"
      okText="Изменить"
      cancelText="Отмена"
      onOk={onSubmit}
      onCancel={onCancel}
      okButtonProps={{
        disabled: isLoading || disableStatusChange,
        loading: isLoading,
      }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      {!!item && (
        <Form initialValues={{ ...item }} key={item.id}>
          <Form.Item label="Название*" name="title">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Описание" name="description">
            <Input.TextArea disabled />
          </Form.Item>
          <Form.Item label="Статус" name="status">
            <Select
              options={statusOptions}
              value={status}
              onChange={setStatus}
              disabled={disableStatusChange}
            />
          </Form.Item>
          <Form.Item label="Приоритет" name="priority">
            <Select
              options={priorityOptions}
              // defaultValue={item.priority}
              // value={item.priority}
              disabled
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default UpdateModal
