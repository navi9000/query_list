import type { FC } from "react"
import Button from "antd/es/button"
import Flex from "antd/es/flex"
import Typography from "antd/es/typography"
import Form from "antd/es/form"
import { useAuthContext } from "@/features/auth/model/use-auth-context"
import { clearRefreshToken } from "@/utils/tokens"

const AuthorizedHeader: FC = () => {
  const { username, dropUsername, dropAccessToken } = useAuthContext()

  const onClick = () => {
    dropUsername()
    dropAccessToken()
    clearRefreshToken()
  }

  return (
    <Form>
      <Flex justify="space-between">
        <Form.Item>
          <Typography.Text>Привет, {username}</Typography.Text>
        </Form.Item>

        <Button onClick={onClick}>Выйти</Button>
      </Flex>
    </Form>
  )
}

export default AuthorizedHeader
