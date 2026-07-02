import { type FC, type PropsWithChildren, useState } from "react"
import { AuthContext } from "./auth-context"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true)

  const value = {
    isAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
