import { AuthContext } from "./auth-context"
import { use } from "react"

export function useAuthContext() {
  const context = use(AuthContext)
  if (!context) {
    throw new Error(
      "useAuthContext must be called within an AuthContextProvider",
    )
  }
  return context
}
