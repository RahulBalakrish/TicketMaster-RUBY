import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EventsArray } from '../../Static/types'


const NewsSlice = createSlice({
    name: "news",
    initialState: {
        loading: 'idle',
        newsData: [] ,
    },
    reducers: {
        newsLoading(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        newsReceived(state, action:PayloadAction<any>) {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.newsData = action.payload?.events
                console.log(state.newsData)
            }
        },
    }
})

export const { newsLoading, newsReceived } = NewsSlice.actions
export default NewsSlice.reducer