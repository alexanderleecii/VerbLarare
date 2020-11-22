import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import { fetchGames } from "../redux/features/games/gamesSlice"
import "../styles/GamePicker.css"

export class GamePicker extends React.Component {
    constructor(props) {
        super(props)
        this.props.fetchGames()
    }
    render() {
        return (
            <div className="main-container">
                <div>Load your progress from one of the games below:</div>
                <div id="list-picker-buttons">
                    {this.props.games.map((item) => (
                        <Button
                            key={item.id}
                            variant="contained"
                            onClick={() => this.props.onNext(item)}
                            disableElevation
                        >
                            {item.id}
                        </Button>
                    ))}
                </div>
            </div>
        )
    }
}

GamePicker.propTypes = {
    onNext: PropTypes.func.isRequired,
    // Redux
    games: PropTypes.array,
    fetchGames: PropTypes.func,
}

const mapStateToProps = (state) => ({
    games: state.games.games,
})

const mapDispatchToProps = {
    fetchGames,
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePicker)
