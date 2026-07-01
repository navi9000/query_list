import type { FC } from "react"
import EditButton from "./edit-button"

const ItemControls: FC<{ id: number }> = ({ id }) => {
  return (
    <div>
      <EditButton id={id} />
    </div>
  )
}

export default ItemControls
