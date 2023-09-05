import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/redux/users/userSlice';
import { apiSlice } from "@/redux/api/apiSlice";
export const store = configureStore({
    reducer: {
        userState: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch