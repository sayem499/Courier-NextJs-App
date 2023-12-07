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

        getParcelWithId: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_URL}/get_with_id`,
                method: 'POST',
                body: data
            })
        }),

        getParcelWithAdminLocationPickup: builder.mutation({
            query: (data) => ({
                url:`${PARCEL_URL}/get_with_location_pickup`,
                method: 'POST',
                body: data
            })
        }),

        getParcelWithAdminLocationDelivery: builder.mutation({
            query: (data) => ({
                url:`${PARCEL_URL}/get_with_location_delivery`,
                method: 'POST',
                body: data
            })
        }),

        updateParcelWithId: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_URL}/update`,
                method: 'PUT',
                body: data
            })
        }),

    })

})

export const { useSetparcelMutation, useGetparcelsMutation, useUpdateParcelWithIdMutation, useGetParcelWithIdMutation, useGetParcelWithAdminLocationPickupMutation, useGetParcelWithAdminLocationDeliveryMutation } = parcelApiSlice;