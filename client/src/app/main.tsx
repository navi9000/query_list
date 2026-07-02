import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import store from "./store"
import Routes from "./routes"
import AuthProvider from "@/features/auth/model/auth-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
