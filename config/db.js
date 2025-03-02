const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MOGO_URL)
const db = mongoose.connection

db.on("error", console.error.bind(console, "Error to connect to the db"))

db.once("open", ()=> {
    console.log("DB connecting...");
})