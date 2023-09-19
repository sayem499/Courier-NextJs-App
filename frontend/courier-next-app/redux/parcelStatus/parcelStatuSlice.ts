import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParcelStatus {
    _id: string;
    parcelStatus: [string];
    parcel_id: string;
    stepAction: number;
}

type ParcelStatusState = {
    parcelStatus: ParcelStatus | null ;
}

const initialState: ParcelStatusState = {
    parcelStatus: null
}

const parcelStatusSlice = createSlice({
    name: 'parcelStatusState',
    initialState,
    reducers: {
        resetParcelStatus: () => initialState,

        getParcelStatus: (state, action: PayloadAction<ParcelStatus>) => {
            state.parcelStatus = action.payload
        }

        
    },

}) 

export const { getParcelStatus, resetParcelStatus } = parcelStatusSlice.actions;
export default parcelStatusSlice.reducer;