import { useState, type FC, type MouseEventHandler } from "react"
import Input from "antd/es/input"
import Form from "antd/es/form"
import Button from "antd/es/button"
import Flex from "antd/es/flex"
import { useLoginMutation } from "@/features/auth"
import { useAuthContext } from "@/features/auth/model/use-auth-context"
import Typography from "antd/es/typography"

const UnauthorizedHeader: FC = () => {
  const [loginRequest, { isLoading, error }] = useLoginMutation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { saveAccessToken, saveUsername } = useAuthContext()

  const onSubmit: MouseEventHandler<HTMLElement> = async (e) => {
    e.preventDefault()

    const { data } = await loginRequest({ username, password })

    if (data) {
      const { access_token, refresh_token, username } = data
      saveAccessToken(access_token)
      saveUsername(username)
    }
  }

  console.log({ error })

  return (
    <Form autoComplete="off">
      <Flex justify="flex-end" gap="small">
        {!!error && (
          <Typography.Text type="danger" style={{ marginTop: "4px" }}>
            {error.data.detail}
          </Typography.Text>
        )}
        <Form.Item name="username">
          <Input
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="password">
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Button onClick={onSubmit} disabled={isLoading} loading={isLoading}>
          Войти
        </Button>
      </Flex>
    </Form>
  )
}

export default UnauthorizedHeader
