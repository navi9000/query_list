import { type FC, type PropsWithChildren, useState } from "react"
import { AuthContext } from "./auth-context"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const isAuth = !!accessToken

  const saveAccessToken = (value: string) => {
    setAccessToken(value)
  }

  const dropAccessToken = () => {
    setAccessToken(null)
  }

  const saveUsername = (value: string) => {
    setUsername(value)
  }

  const dropUsername = () => {
    setUsername(null)
  }

  const value = {
    isAuth,
    accessToken,
    username,
    saveAccessToken,
    dropAccessToken,
    saveUsername,
    dropUsername,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
