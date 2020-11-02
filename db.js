require("dotenv").config()
const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")

mongoose.connection.once('open', () => { console.log('MongoDB Connected') })
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err) })

const state = {
    client: null,
}

exports.get = () => {
    if (state.client) return state.client
    //state.client = new MongoClient(process.env.DB_URL + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    const conn = mongoose.createConnection(process.env.DB_URL + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    state.client = conn.getClient()
    return state.client
}