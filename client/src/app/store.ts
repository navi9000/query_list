import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { itemApi } from "@/entities/item"

const reducer = combineReducers({
  [itemApi.reducerPath]: itemApi.reducer,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
})

export default store
