import type { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>Header</header>
      {children}
    </>
  )
}

export default Layout
