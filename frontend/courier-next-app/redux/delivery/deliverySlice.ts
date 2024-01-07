import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Delivery {
    _id: string,
    deliveryMan_phonenumber: string,
    deliveries: [string],
    pickups: [string],
}

type DeliveryState = {
    delivery: Delivery | null,
    deliveries: Delivery[] | null,
}

const initialState: DeliveryState = {
    delivery: null,
    deliveries: null,
}

export const deliverySlice = createSlice({
    name: 'deliverySlice',
    initialState,
    reducers: {
        resetDelivery: () => initialState,

        setDeliveryData: (state, action: PayloadAction<Delivery>) => {
            state.delivery = action.payload
        },

    },
})

export const { resetDelivery, setDeliveryData } = deliverySlice.actions
export default deliverySlice.reducer