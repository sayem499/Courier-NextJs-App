import { apiSlice } from "../api/apiSlice";

const DELIVERY_URL = '/api/delivery';

const deliveryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        setDelivery: builder.mutation({
            query: (data) => ({
                url: `${DELIVERY_URL}/set_delivery`,
                method: 'POST',
                body: data
            }),
        }),

        updateDeliveryWithPhonenumber: builder.mutation({
            query: (data) => ({
                url: `${DELIVERY_URL}/update_delivery`,
                method: 'PUT',
                body: data
            }),
        }),

        updateDeliveryWithPhonenumberAdmin: builder.mutation({
            query: (data) => ({
                url: `${DELIVERY_URL}/update_delivery_admin`,
                method: 'PUT',
                body: data
            }),
        }),

        getDeliveryWithPhonenumber: builder.mutation({
            query: (data) => ({
                url: `${DELIVERY_URL}/get_with_phonenumber_admin`,
                method: 'POST',
                body: data
            }),
        }),


    }),
});


export const { useSetDeliveryMutation, useUpdateDeliveryWithPhonenumberMutation, useUpdateDeliveryWithPhonenumberAdminMutation, useGetDeliveryWithPhonenumberMutation } = deliveryApiSlice