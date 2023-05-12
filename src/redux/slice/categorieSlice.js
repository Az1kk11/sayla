import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    categories : [],
    error: null
}

export const categorieSlice = createSlice({
    name : 'categorie',
    initialState,
    reducers: {
        getCategorieStart: state => {
            state.isLoading = true
        },
        getCategorieSuccess: (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        },
        getCategorieFailure: (state, action) => {
            state.error = action.payload
        },
    }
})

export const {
    getCategorieStart,
    getCategorieSuccess,
    getCategorieFailure
} = categorieSlice.actions

export default categorieSlice.reducer