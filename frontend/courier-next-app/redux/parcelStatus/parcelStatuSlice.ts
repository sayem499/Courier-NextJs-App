import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParcelStatus {
    _id: string;
    parcelStatus: [string];
    parcel_id: string;
    stepAction: number;
    isPaid: boolean;
    sender_id: string;
    deliveryCost: number;
    isReturned: boolean;
}

type ParcelStatusState = {
    parcelStatus: ParcelStatus | null ;
    parcelStatuses: ParcelStatus[] | [] ;
}

const initialState: ParcelStatusState = {
    parcelStatus: null,
    parcelStatuses: []
}

const parcelStatusSlice = createSlice({
    name: 'parcelStatusState',
    initialState,
    reducers: {
        resetParcelStatus: () => initialState,

        getParcelStatus: (state, action: PayloadAction<ParcelStatus>) => {
            state.parcelStatus = action.payload
        },

        getParcelStatuses: (state, action: PayloadAction<ParcelStatus[]>) => {
            state.parcelStatuses = action.payload
        },

        
    },

}) 

export const { getParcelStatus, resetParcelStatus, getParcelStatuses } = parcelStatusSlice.actions;
export default parcelStatusSlice.reducer;