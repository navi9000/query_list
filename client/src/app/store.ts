import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { itemApi } from "@/entities/item"
import { authApi } from "@/features/auth"

const reducer = combineReducers({
  [itemApi.reducerPath]: itemApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware, authApi.middleware),
})

export default store
