import { apiSlice } from "../api/apiSlice";

const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation<VoidFunction, void>({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
    })

})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = userApiSlice;