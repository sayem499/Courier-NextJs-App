import { apiSlice } from "../api/apiSlice";

const PARCEL_URL = '/api/parcel';

export const parcelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setparcel: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_URL}/create_new`,
                method: 'POST',
                body: data
            })
        }),

        getparcels: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_URL}/get_all`,
                method: 'POST',
                body: data
            })
        }),
    })

})

export const { useSetparcelMutation, useGetparcelsMutation } = parcelApiSlice;