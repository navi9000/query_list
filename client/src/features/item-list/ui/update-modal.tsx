import { useState, type FC, type MouseEventHandler } from "react"
import Modal from "antd/es/modal"
import Form from "antd/es/form"
import Input from "antd/es/input"
import Select from "antd/es/select"
import { priorityOptions } from "../model/priority-options"
import { useEditItemMutation, type Item } from "@/entities/item"
import { statusOptions } from "../model/status-options"

type Props = {
  isOpen: boolean
  close: () => void
  item: Item
}

const UpdateModal: FC<Props> = ({ isOpen, close, item }) => {
  const [editItem, { isLoading }] = useEditItemMutation()
  const [status, setStatus] = useState(item.status)
  const disableStatusChange = item.status === "done"

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
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
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Form>
        <Form.Item label="Название*">
          <Input name="title" value={item.title} disabled />
        </Form.Item>
        <Form.Item label="Описание">
          <Input.TextArea
            name="description"
            value={item.description ?? ""}
            disabled
          />
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
          <Select options={priorityOptions} value={item.priority} disabled />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateModal
