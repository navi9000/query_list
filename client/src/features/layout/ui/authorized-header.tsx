import type { FC } from "react"
import Button from "antd/es/button"
import Flex from "antd/es/flex"
import Typography from "antd/es/typography"

const AuthorizedHeader: FC = () => {
  const username = "username"
  return (
    <Flex justify="space-between">
      <Typography.Text>Привет, {username}</Typography.Text>
      <Button>Выйти</Button>
    </Flex>
  )
}

export default AuthorizedHeader
