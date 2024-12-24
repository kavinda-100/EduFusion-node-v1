import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type {UserTypeForFrontend} from '@shared/types'
import {RootState} from "@/store";

type UserStateType = {
    user: UserTypeForFrontend | null
    isLoggedIn: boolean
}

const initialState: UserStateType = {
    user: null,
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserTypeForFrontend>) => {
            state.user = action.payload
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.user = null
            state.isLoggedIn = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions
// Selectors
export const selectUser = (state: RootState) => state.user.user
// Reducer
export default userSlice.reducer