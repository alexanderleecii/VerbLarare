import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    loading: false,
    hasErrors: false,
    lists: [],
}

const verbListsSlice = createSlice({
    name: "verbLists",
    initialState: initialState,
    reducers: {
        getLists(state) {
            state.loading = true
        },
        getListsSuccess(state, { payload }) {
            state.lists = payload
            state.loading = false
            state.hasErrors = false
        },
        getListsFailure(state) {
            state.loading = false
            state.hasErrors = true
        },
        addList(state, action) {
            const { id, title, dictionnary } = action.payload
            state.push({ id, title, dictionnary })
        },
    },
})

export const { getLists, getListsSuccess, getListsFailure, addList } = verbListsSlice.actions

// Asynchronous thunk action
export const fetchLists = () => {
    // eslint-disable-next-line no-undef
    const serverURL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_SERVER_URL : ""
    return async (dispatch) => {
        dispatch(getLists())

        try {
            // eslint-disable-next-line no-undef
            const response = await fetch(`${serverURL}/lists/getAllLists`)
            const data = await response.json()

            dispatch(getListsSuccess(data))
        } catch (error) {
            dispatch(getListsFailure())
        }
    }
}

export default verbListsSlice.reducer
