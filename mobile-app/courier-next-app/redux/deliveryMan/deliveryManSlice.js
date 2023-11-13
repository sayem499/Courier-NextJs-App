import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageData = async () => {
   const res = await AsyncStorage.getItem('deliveryman')
   return res;
}

const setStorageData = async (data) => {
    const res = await AsyncStorage.setItem('deliveryman', data) 
}



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

        logoutDeliveryMan: () => {
            state.deliveryMan = null
        },
    },
});

export const { resetDeliveryMan, setDeliveryMan, logoutDeliveryMan } = deliveryManSlice.actions;
export default deliveryManSlice.reducer; 