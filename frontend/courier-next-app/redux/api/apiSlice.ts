import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store';

const baseQuery = fetchBaseQuery({
    baseUrl:'https://courier-nextjs-app.onrender.com' && 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        let token = null;
        if ((getState() as RootState).userState.user)
            token = (getState() as RootState).userState.user?.user_token
        if ((getState() as RootState).adminState.admin)
            token = (getState() as RootState).adminState.admin?.admin_token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Parcel', 'ParcelStatus', 'Admin'],
    endpoints: (builder) => ({}),

});