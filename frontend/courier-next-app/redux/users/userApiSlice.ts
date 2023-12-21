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

        checkToken: builder.mutation<VoidFunction, void>({
            query: () => ({
                url: `${USERS_URL}/token_check`,
                method: 'GET',
            })
        }),
    })

})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useCheckTokenMutation } = userApiSlice;