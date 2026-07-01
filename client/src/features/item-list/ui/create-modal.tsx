import { useState, type FC, type MouseEventHandler } from "react"
import Modal from "antd/es/modal"
import Form from "antd/es/form"
import Input from "antd/es/input"
import Select from "antd/es/select"
import { priorityOptions } from "../model/priority-options"
import { useAddItemMutation, type ItemCreateRequest } from "@/entities/item"
import type { ItemPriority } from "@/entities/item/model/schema"

type Props = {
  isOpen: boolean
  close: () => void
}

const CreateModal: FC<Props> = ({ isOpen, close }) => {
  const [addItem, { isLoading }] = useAddItemMutation()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<ItemPriority | null>(null)

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    const data: ItemCreateRequest = {}
    if (title) {
      data.title = title
    }
    if (description) {
      data.description = description
    }
    if (priority) {
      data.priority = priority
    }
    const { error } = await addItem(data)
    if (!error) {
      setTitle("")
      setDescription("")
      setPriority(null)
      close()
    }
  }

  const onCancel = () => {
    close()
  }

  console.log({ priority })

  return (
    <Modal
      open={isOpen}
      title="Новая запись"
      okText="Создать"
      cancelText="Отмена"
      onOk={onSubmit}
      onCancel={onCancel}
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Form>
        <Form.Item label="Название*">
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Описание">
          <Input.TextArea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Приоритет" name="priority">
          <Select
            options={priorityOptions}
            value={priority}
            onChange={setPriority}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateModal
