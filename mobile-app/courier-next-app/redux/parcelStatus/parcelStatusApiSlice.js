import { apiSlice } from "../api/apiSlice"; 

const PARCEL_STATUS_URL = '/api/parcelStatus';

const parcelStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        updateParcelStatusWithTrackerId: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/update`,
                method: 'PUT',
                body: data
            })
        }),

        getParcelStatusesWithIds: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/get_with_ids`,
                method: 'POST',
                body: data
            })
        }),
    }),
})

export const {
    useUpdateParcelStatusWithTrackerIdMutation,
    useGetParcelStatusesWithIdsMutation,
} = parcelStatusApiSlice;