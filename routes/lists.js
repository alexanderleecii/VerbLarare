const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

const dbManager = require("../db")

const getAll = async (req, res) => {
    const client = dbManager.get()
    try {
        await client.connect()

        const database = client.db("verblists")
        const collection = await database.collection("lists")
        const lists = await collection.find().toArray()
        console.log(lists)

        res.status(200).json(lists)
    } catch (error) {
        throw error
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close()
    }
}

const getById = async (req, res) => {
    const client = dbManager.get()
    try {
        await client.connect()

        const database = client.db("verblists")
        const collection = await database.collection("lists")
        const list = await collection.find({ id : req.params.id }).toArray()
        console.log(list)

        res.status(200).json(list)
    } catch (error) {
        throw error
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close()
    }
}

const createList = async (req, res) => {
    const client = dbManager.get()
    try {
        await client.connect()

        const database = client.db("verblists")
        const collection = await database.collection("lists")
        const item = req.body
        await collection.insertOne(item)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false })
        throw error
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close()
    }
}

router.get("/getAllLists", getAll)
router.get("/:id", getById)
router.post("/addList", jsonParser, createList)

module.exports = router
