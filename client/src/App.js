import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ListPicker from "./components/ListPicker"
import LevelPicker from "./components/LevelPicker"
import GamePicker from "./components/GamePicker"
import GameComponent from "./components/GameComponent"
import VerbImporter from "./components/VerbImporter"
import Button from "@material-ui/core/Button"
import { Views } from "./enums/viewEnums"
import { fetchLists } from "./redux/features/verbLists/verbListsSlice"
import { fetchGames } from "./redux/features/games/gamesSlice"
import "./styles/App.css"

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mainView: Views.LIST_PICKER,
            level: 1,
            initDictionnary: null,
            currentDictionnary: null,
        }
    }

    componentDidMount = async () => {
        await this.props.fetchGames()
        if (this.props.games.length > 0) {
            this.setState({
                mainView: Views.GAME_PICKER,
            })
        } else {
            this.setState({
                mainView: Views.LIST_PICKER,
            })
        }
    }

    chooseDictionnary = (dict) => {
        this.setState({
            mainView: Views.LEVEL_PICKER,
            initDictionnary: dict,
            currentDictionnary: dict.dictionnary,
        })
    }

    chooseLevel = (level) => {
        this.setState({
            mainView: Views.GAME,
            level: level,
        })
    }

    chooseGame = async (game) => {
        await this.props.fetchLists()
        const initDictionnary = this.props.verbLists.find((item) => item._id === game.init_dictionnary_id)
        if (initDictionnary) {
            this.setState({
                mainView: Views.LEVEL_PICKER,
                initDictionnary: initDictionnary,
                currentDictionnary: game.current_dictionnary,
            })
        } else {
            this.setState({
                mainView: Views.LIST_PICKER,
            })
        }
    }

    displayMainContainer = () => {
        switch (this.state.mainView) {
            case Views.LIST_PICKER:
                return <ListPicker onNext={this.chooseDictionnary} />
            case Views.GAME_PICKER:
                return <GamePicker onNext={this.chooseGame} />
            case Views.LEVEL_PICKER:
                return <LevelPicker onNext={this.chooseLevel} />
            case Views.GAME:
                return (
                    <GameComponent
                        initDictionnary={this.state.initDictionnary}
                        currentDictionnary={this.state.currentDictionnary}
                        level={this.state.level}
                    />
                )
            case Views.IMPORTER:
                return <VerbImporter />
            default:
                console.log("Not handled")
                break
        }
    }

    render() {
        return (
            <div className="App">
                <div id="app-header">
                    {this.state.mainView !== Views.IMPORTER ? (
                        <div id="nav-import">
                            <Button variant="contained" onClick={() => this.setState({ mainView: Views.IMPORTER })}>
                                Import verb list
                            </Button>
                        </div>
                    ) : null}
                    {this.state.mainView !== Views.LIST_PICKER ? (
                        <div id="nav-play">
                            <Button
                                variant="contained"
                                onClick={() => {
                                    this.props.fetchGames()
                                    if (this.props.games.length > 0) {
                                        this.setState({
                                            mainView: Views.GAME_PICKER,
                                        })
                                    } else {
                                        this.setState({
                                            mainView: Views.LIST_PICKER,
                                        })
                                    }
                                }}
                            >
                                {this.state.mainView !== Views.IMPORTER ? "Restart" : "Play"}
                            </Button>
                        </div>
                    ) : null}
                </div>
                {this.displayMainContainer()}
            </div>
        )
    }
}

App.propTypes = {
    // Redux
    games: PropTypes.array,
    fetchGames: PropTypes.func,
    fetchLists: PropTypes.func,
    verbLists: PropTypes.array,
}

const mapStateToProps = (state) => ({
    games: state.games.games,
    verbLists: state.verbLists.lists,
})

const mapDispatchToProps = {
    fetchGames,
    fetchLists,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
