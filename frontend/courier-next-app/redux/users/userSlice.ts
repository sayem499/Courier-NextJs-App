import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';


interface User {
    _id: string;
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_phonenumber: string;
};





type UserState = {
    user: User | null;
}

const currentUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

const initialState: UserState = {
    user: currentUser !== null ? JSON.parse(currentUser) : null
};

export const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        resetUser: () => initialState,
        
        setUserData: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
})


export const { setUserData, resetUser, logout } = userSlice.actions
export default userSlice.reducer;