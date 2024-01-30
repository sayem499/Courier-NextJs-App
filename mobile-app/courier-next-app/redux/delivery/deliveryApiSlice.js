import { apiSlice } from "../api/apiSlice";

const DELIVERY_URL = '/api/delivery';

const deliveryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getDeliveryWithPhonenumber: builder.mutation({
            query: (data) => ({
                url: `${DELIVERY_URL}/get_with_phonenumber`,
                method: 'POST',
                body: data
            }),
        }),

        updateDeliveryWithPhonenumber: builder.mutation({
            query: (data) => ({
                url: `${DELIVERY_URL}/update_delivery`,
                method: 'PUT',
                body: datat
            })
        }),


    }),
})

export const { useGetDeliveryWithPhonenumberMutation, useUpdateDeliveryWithPhonenumberMutation } = deliveryApiSlice 

