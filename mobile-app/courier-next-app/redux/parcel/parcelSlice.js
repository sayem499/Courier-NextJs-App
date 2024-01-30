import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    parcel: null,
    parcels: []
}

const parcelSlice = createSlice({
    name: 'parcelSlice',
    initialState,
    reducers: {
        resetParcel: () => initialState,

        setParcel: (state, action) => {
            state.parcel = action.payload
        },

        setParcels: (state, action) => {
            state.parcels = action.payload
        },
    }
})

export const { resetParcel, setParcel, setParcels } = parcelSlice.actions
export default parcelSlice.reducer