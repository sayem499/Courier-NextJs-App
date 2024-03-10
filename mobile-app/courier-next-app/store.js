import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./redux/api/apiSlice";
import { Platform } from 'react-native';
import deliveryManReducer from './redux/deliveryMan/deliveryManSlice';
import deliveryReducer from './redux/delivery/deliverySlice';
import parcelReducer from './redux/parcel/parcelSlice';
import parcelStatusReducer from "./redux/parcelStatus/parcelStatusSlice";
import themeReducer from "./redux/theme/themeSlice";

export const store = configureStore({
    reducer: {
        deliveryManState: deliveryManReducer,
        deliveryState: deliveryReducer,
        parcelState: parcelReducer,
        parcelStatusState: parcelStatusReducer,
        themeState: themeReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false,
    enhancers:[],
});