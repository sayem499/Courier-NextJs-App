import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/redux/users/userSlice';
import parcelReducer from '@/redux/parcel/parcelSlice';
import parcelStatusReducer from '@/redux/parcelStatus/parcelStatusSlice';
import adminReducer from '@/redux/admin/adminSlice';
import deliveryManReducer from '@/redux/deliveryMan/deliveryManAdminSlice';
import { apiSlice } from "@/redux/api/apiSlice";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        parcelState: parcelReducer,
        parcelStatusState: parcelStatusReducer,
        adminState: adminReducer,
        deliveryManState: deliveryManReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch