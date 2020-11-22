import { combineReducers } from "@reduxjs/toolkit"
import verbListsReducer from "../features/verbLists/verbListsSlice"
import gamesReducer from "../features/games/gamesSlice"

export default combineReducers({
    verbLists: verbListsReducer,
    games: gamesReducer,
})
