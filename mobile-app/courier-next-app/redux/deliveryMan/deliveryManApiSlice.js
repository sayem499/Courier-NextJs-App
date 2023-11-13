import { apiSlice } from "../api/apiSlice";

const DELIVERYMAN_URL = '/api/deliveryman';

export const deliveryManApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginDeliveryMan: builder.mutation({
            query: (data) => ({
                url: `${DELIVERYMAN_URL}/auth_deliveryman`,
                method: 'POST',
                body: data
            })
        }),
    }),
});

export const { useLoginDeliveryManMutation, 
                } = deliveryManApiSlice