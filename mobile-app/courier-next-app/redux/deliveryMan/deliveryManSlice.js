import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deliveryMan: null,
}

export const deliveryManSlice = createSlice({
    name: 'deliveryManState',
    initialState,
    reducers: {
        resetDeliveryMan: () => initialState,

        setDeliveryMan: (state, action) => {
            state.deliveryMan = action.payload
        },
    },
});

export const { resetDeliveryMan, setDeliveryMan} = deliveryManSlice.actions;
export default deliveryManSlice.reducer; 