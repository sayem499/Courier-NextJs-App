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
    }),
});

export const { useSetDeliveryManMutation } = deliveryManApiSlice