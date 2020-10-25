import { createSlice } from "@reduxjs/toolkit"

// const dictionnary = [
//     {
//         key: "1",
//         translation: "To do",
//         conjugation: {
//             inf: "göra",
//             pres: "gör",
//             pret: "gjorde",
//             sup: "gjort",
//             imp: "göra",
//         },
//     },
//     {
//         key: "2",
//         translation: "To talk",
//         conjugation: {
//             inf: "prata",
//             pres: "pratar",
//             pret: "pratade",
//             sup: "pratat",
//             imp: "prata",
//         },
//     },
//     {
//         key: "3",
//         translation: "To watch",
//         conjugation: {
//             inf: "titta",
//             pres: "tittar",
//             pret: "tittade",
//             sup: "tittat",
//             imp: "titta",
//         },
//     },
// ]

// const testList = {
//     id: "19990905T154",
//     title: "TestList",
//     dictionnary: dictionnary,
// }

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
    return async (dispatch) => {
        dispatch(getLists())

        try {
            // eslint-disable-next-line no-undef
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/lists/getAllLists`)
            const data = await response.json()

            dispatch(getListsSuccess(data))
        } catch (error) {
            dispatch(getListsFailure())
        }
    }
}

export default verbListsSlice.reducer
