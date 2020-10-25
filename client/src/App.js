import React from "react"
import ListPicker from "./components/ListPicker"
import LevelPicker from "./components/LevelPicker"
import GameComponent from "./components/GameComponent"
import VerbImporter from "./components/VerbImporter"
import Button from "@material-ui/core/Button"
import { Views } from "./enums/viewEnums"
import "./styles/App.css"

export class App extends React.Component {
    constructor() {
        super()
        this.state = {
            mainView: Views.LIST_PICKER,
            level: 1,
            dictionnary: null,
        }
    }

    chooseDictionnary = (dict) => {
        this.setState({
            mainView: Views.LEVEL_PICKER,
            dictionnary: dict,
        })
    }

    chooseLevel = (level) => {
        this.setState({
            mainView: Views.GAME,
            level: level,
        })
    }

    displayMainContainer = () => {
        switch (this.state.mainView) {
            case Views.LIST_PICKER:
                return <ListPicker onNext={this.chooseDictionnary} />
            case Views.LEVEL_PICKER:
                return <LevelPicker onNext={this.chooseLevel} />
            case Views.GAME:
                return <GameComponent dictionnary={this.state.dictionnary} level={this.state.level} />
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
                {this.state.mainView !== Views.IMPORTER ? (
                    <div id="nav-import">
                        <Button variant="contained" onClick={() => this.setState({ mainView: Views.IMPORTER })}>
                            Import verb list
                        </Button>
                    </div>
                ) : null}
                {this.state.mainView !== Views.LIST_PICKER ? (
                    <div id="nav-play">
                        <Button variant="contained" onClick={() => this.setState({ mainView: Views.LIST_PICKER })}>
                            {this.state.mainView !== Views.IMPORTER ? "Restart" : "Play"}
                        </Button>
                    </div>
                ) : null}
                {this.displayMainContainer()}
            </div>
        )
    }
}

export default App
