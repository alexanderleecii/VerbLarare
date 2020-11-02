require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected")
})

mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error: ", err)
})

const state = {
    client: null,
}

exports.get = async () => {
    if (state.client) return state.client
    await mongoose.connect(process.env.DB_URL + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    const conn = mongoose.connection
    state.client = conn.getClient()
    return state.client
}