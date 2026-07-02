import { createContext } from "react"

export interface AuthContextApi {
  isAuth: boolean
  accessToken: string | null
  username: string | null
  saveAccessToken: (value: string) => void
  dropAccessToken: () => void
  saveUsername: (value: string) => void
  dropUsername: () => void
}

export const AuthContext = createContext<AuthContextApi | null>(null)
