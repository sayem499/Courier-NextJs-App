import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    delivery: null,
    deliveries: []
}

const deliverySlice = createSlice({
    name: 'deliveryState',
    initialState,
    reducers: {
        
        resetDeliveries: () => initialState,

        setDelivery: (state, action) => {
            state.delivery = action.payload
        },

        setDeliveries: (state, action) => {
            state.deliveries = action.payload
        },

    }
})

export const { resetDeliveries, setDeliveries, setDelivery } = deliverySlice.actions
export default deliverySlice.reducer