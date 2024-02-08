import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    parcelStatus: null,
    parcelStatuses: [],
    parcelStatusesDeliveries: [],
}


const parccelStatusSlice = createSlice({
    name: 'parcelsStatusSlice',
    initialState,
    reducers: {

        resetParcelStatus: () => initialState,

        setParcelStatus: (state, action) => {
            state.parcelStatus = action.payload
        },

        setParcelStatuses: (state, action) => {
            state.parcelStatuses = action.payload
        },

        setParcelStatusesDeliveries: (state, action) => {
            state.parcelStatusesDeliveries = action.payload
        },

        updatedParcelStatuses: (state, action) => {
            state.parcelStatuses.map((statuses) => {
                if (statuses._id === action.payload._id) {
                        statuses.parcelStatus = action.payload.parcelStatus
                        statuses.parcel_id = action.payload.parcel_id
                        statuses.stepAction = action.payload.stepAction
                        statuses.isPaid = action.payload.isPaid
                        statuses.sender_id = action.payload.sender_id
                        statuses.deliveryCost = action.payload.deliiveryCost
                        statuses.isReturned = action.payload.isReturned
                        statuses.deliveryMan_phonenumber = action.payload.delieryMan_phonenumber
                        statuses.iPicked = action.payload.isPicked
                }
            })
        },

    },
})

export const { resetParcelStatus, setParcelStatus, setParcelStatuses, updatedParcelStatuses, setParcelStatusesDeliveries } = parccelStatusSlice.actions
export default parccelStatusSlice.reducer;