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

        logoutDeliveryMan: builder.mutation({
            query: () => ({
                url: `${DELIVERYMAN_URL}/logout_deliveryman`,
                method: 'POST',
            })
        }),
    }),
});

export const { useLoginDeliveryManMutation,
                useLogoutDeliveryManMutation, 
                } = deliveryManApiSlice