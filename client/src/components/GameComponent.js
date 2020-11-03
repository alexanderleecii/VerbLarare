import React from "react"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import "../styles/GameComponent.css"

export class GameComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loadedDictionnary: this.props.dictionnary,
            index: 0,
            field1: "",
            field1Error: false,
            field2: "",
            field2Error: false,
            field3: "",
            field3Error: false,
            field4: "",
            field4Error: false,
            field5: "",
            field5Error: false,
        }

        this.handleValidation = this.handleValidation.bind(this)
    }

    componentDidMount = () => {
        this.setState({
            index: this.randomIndex(),
        })
    }

    randomIndex = () => {
        return Math.floor(Math.random() * this.state.loadedDictionnary.length)
    }

    handleValidation = () => {
        const { dictionnary } = this.props
        const { index, field1, field2, field3, field4, field5 } = this.state
        const field1Error = field1 !== dictionnary[index].conjugation.inf,
            field2Error = field2 !== dictionnary[index].conjugation.pres,
            field3Error = field3 !== dictionnary[index].conjugation.pret,
            field4Error = field4 !== dictionnary[index].conjugation.sup,
            field5Error = field5 !== dictionnary[index].conjugation.imp

        switch (this.props.level) {
            case 1:
                if (field1Error || field2Error) {
                    this.setState({
                        field1Error: field1Error,
                        field2Error: field2Error,
                    })
                } else {
                    const tmp = [...this.state.loadedDictionnary]
                    tmp.splice(index, 1)
                    this.setState({
                        loadedDictionnary: tmp,
                        index: this.randomIndex(),
                        field1: "",
                        field1Error: false,
                        field2: "",
                        field2Error: false,
                    })
                }
                break
            case 2:
                if (field1Error || field2Error || field3Error) {
                    this.setState({
                        field1Error: field1Error,
                        field2Error: field2Error,
                        field3Error: field3Error,
                    })
                } else {
                    const tmp = [...this.state.loadedDictionnary]
                    tmp.splice(index, 1)
                    this.setState({
                        loadedDictionnary: tmp,
                        index: this.randomIndex(),
                        field1: "",
                        field1Error: false,
                        field2: "",
                        field2Error: false,
                        field3: "",
                        field3Error: false,
                    })
                }
                break
            case 3:
                if (field1Error || field2Error || field3Error || field4Error || field5Error) {
                    this.setState({
                        field1Error: field1Error,
                        field2Error: field2Error,
                        field3Error: field3Error,
                        field4Error: field4Error,
                        field5Error: field5Error,
                    })
                } else {
                    const tmp = [...this.state.loadedDictionnary]
                    tmp.splice(index, 1)
                    this.setState({
                        loadedDictionnary: tmp,
                        index: this.randomIndex(),
                        field1: "",
                        field1Error: false,
                        field2: "",
                        field2Error: false,
                        field3: "",
                        field3Error: false,
                        field4: "",
                        field4Error: false,
                        field5: "",
                        field5Error: false,
                    })
                }
                break
            default:
                break
        }
    }

    displayGame = () => {
        return (
            <div id="game-container">
                <div id="progress-bar-container">
                    <div className="text-level3">Progress</div>
                    <LinearProgress
                        id="progress-bar"
                        variant="determinate"
                        value={
                            (100 * (this.props.dictionnary.length - this.state.loadedDictionnary.length)) /
                            this.props.dictionnary.length
                        }
                    />
                </div>
                <div className="game-header">
                    <div className="text-level2">Translation:</div>
                    <div className="displayed-verb">{this.props.dictionnary[this.state.index].translation}</div>
                </div>
                <div className="form">
                    <div className="textfield-area">
                        <div className="textfield-container">
                            <div className="text-level3">Infinitiv</div>
                            <TextField
                                error={this.state.field1Error}
                                id="filled-basic"
                                label="Infinitiv"
                                variant="filled"
                                value={this.state.field1}
                                onChange={(e) => this.setState({ field1: e.currentTarget.value })}
                                autoComplete="off"
                            />
                        </div>
                        <div className="textfield-container">
                            <div className="text-level3">Presens</div>
                            <TextField
                                error={this.state.field2Error}
                                id="filled-basic"
                                label="Presens"
                                variant="filled"
                                value={this.state.field2}
                                onChange={(e) => this.setState({ field2: e.currentTarget.value })}
                                autoComplete="off"
                            />
                        </div>
                        {this.props.level > 1 ? (
                            <div className="textfield-container">
                                <div className="text-level3">Preteritum</div>
                                <TextField
                                    error={this.state.field3Error}
                                    id="filled-basic"
                                    label="Preteritum"
                                    variant="filled"
                                    value={this.state.field3}
                                    onChange={(e) => this.setState({ field3: e.currentTarget.value })}
                                    autoComplete="off"
                                />
                            </div>
                        ) : (
                            <div className="disabled-verb-container">
                                <div className="text-level3">Preteritum</div>
                                <div className="disabled-verb">
                                    {this.props.dictionnary[this.state.index].conjugation.pret}
                                </div>
                            </div>
                        )}

                        {this.props.level > 2 ? (
                            <div className="textfield-container">
                                <div className="text-level3">Supinum</div>
                                <TextField
                                    error={this.state.field4Error}
                                    id="filled-basic"
                                    label="Supinum"
                                    variant="filled"
                                    value={this.state.field4}
                                    onChange={(e) => this.setState({ field4: e.currentTarget.value })}
                                    autoComplete="off"
                                />
                            </div>
                        ) : (
                            <div className="disabled-verb-container">
                                <div className="text-level3">Supinum</div>
                                <div className="disabled-verb">
                                    {this.props.dictionnary[this.state.index].conjugation.sup}
                                </div>
                            </div>
                        )}

                        {this.props.level > 2 ? (
                            <div className="textfield-container">
                                <div className="text-level3">Imperative</div>
                                <TextField
                                    error={this.state.field5Error}
                                    id="filled-basic"
                                    label="Imperative"
                                    variant="filled"
                                    value={this.state.field5}
                                    onChange={(e) => this.setState({ field5: e.currentTarget.value })}
                                    autoComplete="off"
                                />
                            </div>
                        ) : (
                            <div className="disabled-verb-container">
                                <div className="text-level3">Imperative</div>
                                <div className="disabled-verb">
                                    {this.props.dictionnary[this.state.index].conjugation.imp}
                                </div>
                            </div>
                        )}
                    </div>
                    <Button variant="contained" onClick={this.handleValidation} disableElevation>
                        Next
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="main-container">
                {this.state.index < this.props.dictionnary.length ? (
                    this.displayGame()
                ) : (
                    <div id="end-screen">Bra jobbat!</div>
                )}
            </div>
        )
    }
}

GameComponent.propTypes = {
    dictionnary: PropTypes.array.isRequired,
    level: PropTypes.number.isRequired,
}

export default GameComponent
