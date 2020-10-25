require("dotenv").config()
const MongoClient = require("mongodb").MongoClient

const state = {
    client: null,
}

exports.get = () => {
    if (state.client) return state.client
    state.client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    return state.client
}