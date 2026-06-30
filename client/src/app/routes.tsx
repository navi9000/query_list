import { Layout } from "@/features/layout"
import { ItemList } from "@/features/item-list"
import { type FC } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ItemList />,
      },
      {
        path: "*",
        element: <div>Не найдено</div>,
      },
    ],
  },
])

const Routes: FC = () => {
  return <RouterProvider router={router} />
}

export default Routes
