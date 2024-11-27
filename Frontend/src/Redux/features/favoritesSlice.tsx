import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FavoritesArray } from '../../Static/types'


const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        loading: 'idle',
        favoritesData: [] ,
    },
    reducers: {
        favoritesLoading(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        favoritesReceived(state, action:PayloadAction<any>) {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.favoritesData = action.payload
                console.log(state.favoritesData)
            }
        },
    }
})

export const { favoritesLoading, favoritesReceived } = favoritesSlice.actions
export default favoritesSlice.reducer