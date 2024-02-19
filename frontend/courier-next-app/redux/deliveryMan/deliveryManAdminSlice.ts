import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Deliveryman {
    _id: string,
    deliveryMan_username: string,
    deliveryMan_phonenumber: string,
    deliveryMan_email: string,
    deliveryMan_password: string,
    deliveryMan_image: string,
}

type DeliverymanState = {
    deliveryman: Deliveryman | null,
    deliverymans: Deliveryman[] | []
}

const initialState: DeliverymanState = {
    deliveryman: null,
    deliverymans: [],
}

export const deliveryManSlice = createSlice({
    name: 'deliveryManSlice',
    initialState,
    reducers: {
        resetDeliveryman: () => initialState,

        setDeliveryManData: (state, action: PayloadAction<Deliveryman>) => {
            state.deliveryman = action.payload
        },

        setDeliveryMansData: (state, action: PayloadAction<Deliveryman[]>) => {
            state.deliverymans = action.payload
        }
    }

})

export const { resetDeliveryman, setDeliveryManData, setDeliveryMansData } = deliveryManSlice.actions
export default deliveryManSlice.reducer