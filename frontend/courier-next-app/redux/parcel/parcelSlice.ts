import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Parcel {
    _id: string;
    sender_id: string;
    receiverName: string;
    receiverPhonenumber: string;
    address: string;
    division: string;
    district: string;
    upazila: string;
    postcode: string;
    senderName: string;
    senderPhonenumber: string;
    senderAddress: string;
    senderDivision: string;
    senderDistrict: string;
    senderUpazila: string;
    senderPostcode: string;
    parcelWeight: string;
    parcelType: string;
    tracker_id: string;
    parcelPrice: number;
    courierType: string;
    cashCollectionAmount: number;
    deliveryCost:number;
    
}

type ParcelState = {
    parcel: Parcel | null;
    parcels: Parcel[] | [];
}

const initialState: ParcelState = {
    parcel: null,
    parcels: []
}

export const parcelSlice = createSlice({
    name: 'parcelState',
    initialState,
    reducers: {
        resetParcel: () => initialState,

        getParcels: (state, action: PayloadAction<Parcel[]>) => {
            state.parcels = action.payload;
        }
    },
})

export const { getParcels, resetParcel } = parcelSlice.actions;
export default parcelSlice.reducer;
