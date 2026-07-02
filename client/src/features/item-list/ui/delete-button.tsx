import { useDeleteItemMutation } from "@/entities/item"
import { DeleteOutlined } from "@ant-design/icons"
import Button from "antd/es/button"
import { type FC } from "react"

interface Props {
  id: number
  accessToken: string
}

const DeleteButton: FC<Props> = ({ id, accessToken }) => {
  const [deleteItem, { isLoading }] = useDeleteItemMutation()

  const onClick = async () => {
    const { error } = await deleteItem({ id, accessToken })
  }
  return (
    <Button onClick={onClick} disabled={isLoading} loading={isLoading}>
      <DeleteOutlined />
    </Button>
  )
}

export default DeleteButton
