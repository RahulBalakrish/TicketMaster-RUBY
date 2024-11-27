import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AttractionsArray } from '../../Static/types'


const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        loading: 'idle',
        ticketsData: [] ,
    },
    reducers: {
        ticketsLoading(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        ticketsReceived(state, action:PayloadAction<any>) {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.ticketsData = action.payload
                console.log(state.ticketsData)
            }
        },
    }
})

export const { ticketsLoading, ticketsReceived } = ticketsSlice.actions
export default ticketsSlice.reducer