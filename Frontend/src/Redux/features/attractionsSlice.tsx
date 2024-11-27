import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AttractionsArray } from '../../Static/types'


const attractionsSlice = createSlice({
    name: "attractions",
    initialState: {
        loading: 'idle',
        attractionsData: [] ,
    },
    reducers: {
        attractionsLoading(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        attractionsReceived(state, action:PayloadAction<any>) {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.attractionsData = action.payload?.attractions
                console.log(state.attractionsData)
            }
        },
    }
})

export const { attractionsLoading, attractionsReceived } = attractionsSlice.actions
export default attractionsSlice.reducer