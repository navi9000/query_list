import type { FC } from "react"
import Input from "antd/es/input"
import Form from "antd/es/form"
import Button from "antd/es/button"
import Flex from "antd/es/flex"

const UnauthorizedHeader: FC = () => {
  return (
    <Form autoComplete="off">
      <Flex justify="flex-end" gap="small">
        <Form.Item name="login">
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item name="password">
          <Input type="password" placeholder="Пароль" />
        </Form.Item>
        <Button>Войти</Button>
      </Flex>
    </Form>
  )
}

export default UnauthorizedHeader
