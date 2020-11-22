import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    loading: false,
    hasErrors: false,
    games: [],
}

const gamesSlice = createSlice({
    name: "games",
    initialState: initialState,
    reducers: {
        getGames(state) {
            state.loading = true
        },
        getGamesSuccess(state, { payload }) {
            state.lists = payload
            state.loading = false
            state.hasErrors = false
        },
        getGamesFailure(state) {
            state.loading = false
            state.hasErrors = true
        },
        saveGame(state, action) {
            const { id, init_dictionnary_id, current_dictionnary } = action.payload
            state.games.push({ id, init_dictionnary_id, current_dictionnary })
            console.log(state.games)
        },
        saveProgress(state, action) {
            const { id, current_dictionnary } = action.payload
            const game = state.games.find((game_id) => game_id === id)
            game.current_dictionnary = current_dictionnary
        },
    },
})

export const { getGames, getGamesSuccess, getGamesFailure, saveGame, saveProgress } = gamesSlice.actions

// Asynchronous thunk action
export const fetchGames = () => {
    // eslint-disable-next-line no-undef
    const serverURL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_SERVER_URL : ""
    return async (dispatch) => {
        dispatch(getGames())

        try {
            // eslint-disable-next-line no-undef
            const response = await fetch(`${serverURL}/games/getAllGames`)
            const data = await response.json()

            dispatch(getGamesSuccess(data))
        } catch (error) {
            dispatch(getGamesFailure())
        }
    }
}

export default gamesSlice.reducer
