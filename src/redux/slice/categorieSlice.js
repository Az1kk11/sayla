import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    categories: [],
    categorieDetail: [],
    error: null
}

export const categorieSlice = createSlice({
    name: 'categorie',
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

        postCategorieStart: state => {
            state.isLoading = true
        },
        postCategorieSuccess: state => {
            state.isLoading = false
        },
        postCategorieFailure: state => {
            state.isLoading = false
            state.error = 'Error'
        },

        getCategorieDetailStart: state => {
            state.isLoading = true
        },
        getCategorieDetailSuccess: (state, action) => {
            state.isLoading = false
            state.categorieDetail = action.payload
        },
        getCategorieDetailFailure: (state, action) => {
            state.isLoading = false
        },
    }
})

export const {
    getCategorieStart,
    getCategorieSuccess,
    getCategorieFailure,

    postCategorieStart,
    postCategorieSuccess,
    postCategorieFailure,

    getCategorieDetailStart,
    getCategorieDetailSuccess,
    getCategorieDetailFailure

} = categorieSlice.actions

export default categorieSlice.reducer