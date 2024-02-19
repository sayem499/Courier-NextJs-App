import { apiSlice } from "../api/apiSlice";

const DELIVERYMAN_URL = '/api/deliveryman';

export const deliveryManApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setDeliveryMan: builder.mutation({
            query: (data) => ({
                url: `${DELIVERYMAN_URL}/set_deliveryman`,
                method: 'POST',
                body: data
            })
        }),

        getDeliverymanWithPhonenumber: builder.mutation({
            query: (data) => ({
                url: `${DELIVERYMAN_URL}/get_with_phonenumber_admin`,
                method: 'POST',
                body: data
            })
        }),

        updateDeliverymanWithId: builder.mutation({
            query: (data) => ({
                url: `${DELIVERYMAN_URL}/update_deliveryman`,
                method: 'PUT',
                body: data
            })
        }),
    }),
});

export const { useSetDeliveryManMutation, useGetDeliverymanWithPhonenumberMutation, useUpdateDeliverymanWithIdMutation } = deliveryManApiSlice