import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl:'http://192.168.0.134:8000', credentials: 'include' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['DeliveryMan'],
    endpoints: (builder) => ({}),
})