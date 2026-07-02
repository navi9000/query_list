import { useAuthContext } from "@/features/auth/model/use-auth-context"
import { useEffect, type FC } from "react"
import { Outlet } from "react-router"
import UnauthorizedHeader from "./unauthorized-header"
import AuthorizedHeader from "./authorized-header"
import { useRefreshMutation } from "@/features/auth"
import {
  clearRefreshToken,
  readRefreshToken,
  storeRefreshToken,
} from "@/utils/tokens"

const Layout: FC = () => {
  const { isAuth, saveAccessToken, saveUsername } = useAuthContext()
  const [refreshRequest, { isLoading }] = useRefreshMutation()

  useEffect(() => {
    ;(async () => {
      const storedRefreshToken = readRefreshToken()
      if (!storedRefreshToken) {
        return
      }
      const { data, error } = await refreshRequest({
        refresh_token: storedRefreshToken,
      })
      if (error) {
        clearRefreshToken()
        return
      }
      if (data) {
        const { access_token, refresh_token, username } = data
        storeRefreshToken(refresh_token)
        saveAccessToken(access_token)
        saveUsername(username)
      }
    })()
  }, [])

  return (
    <>
      <header>
        {isLoading && <div style={{ height: "56px" }}></div>}
        {!isLoading && isAuth && <AuthorizedHeader />}
        {!isLoading && !isAuth && <UnauthorizedHeader />}
      </header>
      <Outlet />
    </>
  )
}

export default Layout
