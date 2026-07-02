import { useDeleteItemMutation } from "@/entities/item"
import { DeleteOutlined } from "@ant-design/icons"
import Button from "antd/es/button"
import { type FC } from "react"

interface Props {
  id: number
}

const DeleteButton: FC<Props> = ({ id }) => {
  const [deleteItem, { isLoading }] = useDeleteItemMutation()

  const onClick = async () => {
    const { error } = await deleteItem(id)
  }
  return (
    <Button onClick={onClick}>
      <DeleteOutlined />
    </Button>
  )
}

export default DeleteButton
