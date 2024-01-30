import { apiSlice } from "../api/apiSlice";

const PARCEL_URL = '/api/parcel';

const parcelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getParcelsWithTrackerId: builder.mutation({
            query:(data) => ({
                url: `${PARCEL_URL}/get_parcel_with_tracker_id`,
                method: 'POST',
                body: data
            })
        }),
    }),
})

export const { useGetParcelsWithTrackerIdMutation } = parcelApiSlice;