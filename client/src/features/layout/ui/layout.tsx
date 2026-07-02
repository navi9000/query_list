import { useAuthContext } from "@/features/auth/model/use-auth-context"
import type { FC } from "react"
import { Outlet } from "react-router"
import UnauthorizedHeader from "./unauthorized-header"
import AuthorizedHeader from "./authorized-header"

const Layout: FC = () => {
  const { isAuth } = useAuthContext()
  return (
    <>
      <header>{isAuth ? <AuthorizedHeader /> : <UnauthorizedHeader />}</header>
      <Outlet />
    </>
  )
}

export default Layout
