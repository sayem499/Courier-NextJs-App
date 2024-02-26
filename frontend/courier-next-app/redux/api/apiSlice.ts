import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 

const baseQuery = fetchBaseQuery({baseUrl:'https://courier-nextjs-app.onrender.com', credentials: 'include'});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Parcel', 'ParcelStatus', 'Admin'],
    endpoints: (builder) => ({}),

});