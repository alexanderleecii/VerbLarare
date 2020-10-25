import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import XLSX from "xlsx"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { addList } from "../redux/features/verbLists/verbListsSlice"

export class VerbImporter extends React.Component {
    constructor() {
        super()
        this.state = {
            filename: null,
            fileLoaded: false,
            data: null,
            nbVerbs: 0,
            listName: "",
            listAdded: false,
            error: false,
        }
        this.fileInputRef = React.createRef()

        this.handleFileInputChange = this.handleFileInputChange.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
    }

    transformJson = (json) => {
        let output = []
        json.map((item, index) =>
            output.push({
                key: "" + index,
                translation: item.Translation,
                conjugation: {
                    inf: item.Infinitiv,
                    pres: item.Presens,
                    pret: item.Preteritum,
                    sup: item.Supinum,
                    imp: item.Imperativ,
                },
            }),
        )
        return output
    }

    handleNewList = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: new Date().getTime(),
                title: this.state.listName,
                dictionnary: this.transformJson(this.state.data),
            }),
        }
        // eslint-disable-next-line no-undef
        fetch(`${process.env.REACT_APP_SERVER_URL}/lists/addList`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    this.setState({
                        filename: null,
                        fileLoaded: false,
                        data: null,
                        nbVerbs: 0,
                        listName: "",
                        listAdded: true,
                        error: false,
                    })
                } else {
                    this.setState({
                        filename: null,
                        fileLoaded: false,
                        data: null,
                        nbVerbs: 0,
                        listName: "",
                        listAdded: true,
                        error: true,
                    })
                }
            })
    }

    handleFileUpload = (file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            /* Parse data */
            const bstr = event.target.result
            const wb = XLSX.read(bstr, { type: "binary" })
            /* Get first worksheet */
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws)
            /* Update state */
            this.setState({
                filename: file.name,
                fileLoaded: true,
                data: data,
                nbVerbs: data.length,
                listAdded: false,
            })
        }
        reader.readAsBinaryString(file)
    }

    handleFileInputChange = (event) => {
        const file = event.target.files[0]
        this.handleFileUpload(file)
    }

    render() {
        return (
            <div className="main-container">
                <input
                    type="file"
                    accept=".xls,.xlsx,.csv"
                    ref={this.fileInputRef}
                    onChange={this.handleFileInputChange}
                    style={{ display: "none" }}
                />
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => this.fileInputRef.current.click()}
                    disableElevation
                >
                    Upload Excel file
                </Button>
                {this.state.fileLoaded ? (
                    <div>
                        <div>{this.state.filename} successfully loaded!</div>
                        <div>{this.state.nbVerbs} new verbs</div>
                        <div>Enter a name for your new list:</div>
                        <TextField
                            id="filled-basic"
                            label="List name"
                            variant="filled"
                            value={this.state.listName}
                            onChange={(e) => this.setState({ listName: e.currentTarget.value })}
                        />
                        <Button variant="contained" onClick={this.handleNewList}>
                            Add
                        </Button>
                    </div>
                ) : null}
                {this.state.listAdded ? (
                    <div>
                        <CheckCircleOutlineIcon />
                        List added!
                    </div>
                ) : null}
                {this.state.error ? <div style={{ color: "red" }}>There was an error uploading the list.</div> : null}
            </div>
        )
    }
}

VerbImporter.propTypes = {
    addList: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    addList,
}

export default connect(null, mapDispatchToProps)(VerbImporter)
