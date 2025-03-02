const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : String,
    category : String,
    image : String
},{timestamps : true})
const Products = mongoose.model("Products", productSchema);

module.exports = Products;