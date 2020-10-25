import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import { fetchLists } from "../redux/features/verbLists/verbListsSlice"
import "../styles/ListPicker.css"

export class ListPicker extends React.Component {
    constructor(props) {
        super(props)
        this.props.fetchLists()
    }
    render() {
        return (
            <div className="main-container">
                <div>Select a list of verbs below:</div>
                <div id="list-picker-buttons">
                    {this.props.verbLists.map((item) => (
                        <Button
                            key={item.id}
                            variant="contained"
                            onClick={() => this.props.onNext(item.dictionnary)}
                            disableElevation
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
            </div>
        )
    }
}

ListPicker.propTypes = {
    onNext: PropTypes.func.isRequired,
    // Redux
    verbLists: PropTypes.array,
    fetchLists: PropTypes.func,
}

const mapStateToProps = (state) => ({
    verbLists: state.verbLists.lists,
})

const mapDispatchToProps = {
    fetchLists,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPicker)
