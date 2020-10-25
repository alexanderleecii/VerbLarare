import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import "../styles/LevelPicker.css"

export class LevelPicker extends React.Component {
    render() {
        return (
            <div className="main-container">
                <div>Please choose your level:</div>
                <div id="level-picker-buttons">
                    <div className="level-picker-button-container">
                        <div className="level-descriptor">Only infinitive and present tense</div>
                        <Button variant="contained" onClick={() => this.props.onNext(1)} disableElevation>
                            Level 1
                        </Button>
                    </div>
                    <div className="level-picker-button-container">
                        <div className="level-descriptor">Infinitive, present and preteritum</div>
                        <Button variant="contained" onClick={() => this.props.onNext(2)} disableElevation>
                            Level 2
                        </Button>
                    </div>
                    <div className="level-picker-button-container">
                        <div className="level-descriptor">Infinitive, present, preteritum and imperative</div>
                        <Button variant="contained" onClick={() => this.props.onNext(3)} disableElevation>
                            Level 3
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

LevelPicker.propTypes = {
    onNext: PropTypes.func.isRequired,
}

export default LevelPicker
