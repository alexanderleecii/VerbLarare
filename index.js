require("dotenv").config()
const path = require("path")
const express = require("express")
const app = express()
const port = process.env.PORT || 8080

// where ever the built package is
const buildFolder = "./client/build"
// load the value in the server
const { REACT_APP_SERVER_URL } = process.env
// treat the index.html as a template and substitute the value
// at runtime
app.set("views", path.join(__dirname, buildFolder))
app.engine("html", require("ejs").renderFile)
app.use(
  "/static",
  express.static(path.join(__dirname, `${buildFolder}/static`)),
)
app.get("/app", function(req, res) {
  res.render("index.html", { REACT_APP_SERVER_URL })
})

// MongoDB connection
const db = require("./db")

//Routing
const listsRoutes = require("./routes/lists")

app.use("/lists", listsRoutes)

//app.use("/app", express.static("../client/build"))

app.listen(port)