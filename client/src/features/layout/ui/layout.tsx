import type { FC } from "react"
import { Outlet } from "react-router"

const Layout: FC = () => {
  return (
    <>
      <header>Header</header>
      <Outlet />
    </>
  )
}

export default Layout
