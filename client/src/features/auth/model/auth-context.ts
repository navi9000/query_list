import { createContext } from "react"

export interface AuthContextApi {
  isAuth: boolean
}

export const AuthContext = createContext<AuthContextApi | null>(null)
