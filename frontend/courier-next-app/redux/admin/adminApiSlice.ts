import { apiSlice } from "../api/apiSlice";

const ADMIN_URL = '/api/admins';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginAdmin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),

        getAllAdmins: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/getall`,
                method: 'GET'
            })
        }),

        registerAdmin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/register`,
                method: 'POST',
                body: data
            })
        }),

        logoutAdmin: builder.mutation<VoidFunction, void>({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST',
            })
        }),

        updateAdmin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/update`,
                method: 'PUT',
                body: data
            })
        }),

        checkTokenAdmin: builder.mutation<VoidFunction, void>({
            query: () => ({
                url: `${ADMIN_URL}/token_check`,
                method: 'GET',
            })
        }),
    })
})


export const {  useLoginAdminMutation, 
                useGetAllAdminsMutation, 
                useRegisterAdminMutation, 
                useLogoutAdminMutation, 
                useUpdateAdminMutation,
                useCheckTokenAdminMutation } = adminApiSlice