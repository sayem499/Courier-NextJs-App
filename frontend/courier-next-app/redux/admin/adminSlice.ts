import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 


interface Admin {
    _id: string,
    admin_email: string,
    admin_password: string,
}

type AdminState = {
    admin: Admin | null,
    admins: Admin[] | [],
}

const currentAdmin = typeof window !== 'undefined' ? localStorage.getItem('admin') : null;

const initialState: AdminState = {
    admin: currentAdmin != null ? JSON.parse(currentAdmin) : null ,
    admins: []
}

export const adminSlice = createSlice({
    name: 'adminState',
    initialState,
    reducers: {
        resetAdmin: () => initialState,

        setAdminData: (state, action: PayloadAction<Admin>) => {
            state.admin = action.payload
            localStorage.setItem('admin', JSON.stringify(action.payload))
        },

        logoutAdmin: (state) => {
            state.admin = null;
            localStorage.removeItem('admin')
        },
    },
})

export const { resetAdmin, setAdminData, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer