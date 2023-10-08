import { apiSlice } from "../api/apiSlice"; 

const PARCEL_STATUS_URL = '/api/parcelStatus';

export const parcelStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getParcelStatusWithStepAction: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/get_with_step_action`,
                method: 'POST',
                body: data
            })
        }),

        setParcelStatus: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/set`,
                method: 'POST',
                body: data
            })
        }),

        getParcelStatusWithId: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/get_with_id`,
                method: 'POST',
                body: data
            })
        }),

        getParcelStatusWithParcelId: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/get_with_parcel_id`,
                method: 'POST',
                body: data
            })
        }),

        updateParcelStatusWithTrackerId: builder.mutation({
            query: (data) => ({
                url: `${PARCEL_STATUS_URL}/update`,
                method: 'PUT',
                body: data
            })
        }),

    })
});


export const { useSetParcelStatusMutation, useGetParcelStatusWithIdMutation, useGetParcelStatusWithParcelIdMutation, useGetParcelStatusWithStepActionMutation, useUpdateParcelStatusWithTrackerIdMutation } = parcelStatusApiSlice;