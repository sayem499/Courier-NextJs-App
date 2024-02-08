import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./redux/api/apiSlice";
import deliveryManReducer from './redux/deliveryMan/deliveryManSlice';
import deliveryReducer from './redux/delivery/deliverySlice';
import parcelReducer from './redux/parcel/parcelSlice';
import parcelStatusReducer from "./redux/parcelStatus/parcelStatusSlice";

export const store = configureStore({
    reducer: {
        deliveryManState: deliveryManReducer,
        deliveryState: deliveryReducer,
        parcelState: parcelReducer,
        parcelStatusState: parcelStatusReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }).concat(apiSlice.middleware),
    devTools: true,
});