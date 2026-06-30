import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Layout } from "@/features/layout"
import { ItemList } from "@/features/item-list"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <ItemList />
    </Layout>
  </StrictMode>,
)
