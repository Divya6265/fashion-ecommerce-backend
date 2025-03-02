const express = require("express");
require("dotenv").config()
const app = express()
require("./config/db");
const Users = require("./model/users")
const Products = require("./model/products")
const cors = require('cors')
const port = process.env.PORT
const path = require("path")

app.use(cors({
    origin : "https://fashion-ecommerce-frontend.vercel.app"
}))


app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.static(path.join(__dirname, 'public')))

app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

app.use(express.urlencoded())
app.use(express.json())
app.listen(port, () => console.log(`Server is up and running ${port}`))

app.use("/", require("./routes"))