import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./redux/api/apiSlice";
import deliveryManReducer from './redux/deliveryMan/deliveryManSlice'

export const store = configureStore({
    reducer: {
        deliveryManState: deliveryManReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});