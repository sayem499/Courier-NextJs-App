import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deliveryMan: [],
}

export const deliveryManSlice = createSlice({
    name: 'deliveryManState',
    initialState,
    reducers: {
        resetDeliveryMan: () => initialState,

        setDeliveryMan: (state, action) => {
            state.deliveryMan.push(action.payload);
        },
    },
});

export const { resetDeliveryMan, setDeliveryMan} = deliveryManSlice.actions;
export default deliveryManSlice.reducer; 