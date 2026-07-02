import type { FC } from "react"
import EditButton from "./edit-button"
import DeleteButton from "./delete-button"
import { useAuthContext } from "@/features/auth/model/use-auth-context"
import Flex from "antd/es/flex"

const ItemControls: FC<{ id: number }> = ({ id }) => {
  const { isAuth } = useAuthContext()
  return (
    <Flex justify="flex-end" gap="small">
      <EditButton id={id} />
      {isAuth && <DeleteButton id={id} />}
    </Flex>
  )
}

export default ItemControls
