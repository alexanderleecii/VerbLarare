import { combineReducers } from "@reduxjs/toolkit"
import verbListsReducer from "../features/verbLists/verbListsSlice"

export default combineReducers({
    verbLists: verbListsReducer,
})
