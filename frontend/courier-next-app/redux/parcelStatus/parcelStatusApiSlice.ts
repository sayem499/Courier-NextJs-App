import { apiSlice } from "../api/apiSlice"; 

const PARCEL_STATUS_URL = '/api/parcelStatus';

export const parcelStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setParcelStatus: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/set`,
                method: 'POST',
                body: data
            })
        }),

        getParcelStatusWithId: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/get_with_id`,
                method: 'POST',
                body: data
            })
        }),

        getParcelStatusWithParcelId: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/get_with_parcel_id`,
                method: 'POST',
                body: data
            })
        }),

    })
});


export const { useSetParcelStatusMutation, useGetParcelStatusWithIdMutation, useGetParcelStatusWithParcelIdMutation } = parcelStatusApiSlice;