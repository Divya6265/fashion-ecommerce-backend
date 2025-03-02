const express = require("express")
const route = express.Router()

const productController = require("../controllers/productController")
route.get("/", productController.getAllProduct);
route.get("/products", productController.Products);

route.post("/addProduct", productController.addProduct)
route.get("/deleteProduct/:id", productController.deleteProduct)
route.post("/updateProduct", productController.updateeProduct)



route.use("/user", require("./user"));


module.exports = route;
