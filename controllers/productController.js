const Products = require("../model/products")



module.exports.Products = async (req, res) => {
    return res.send({
        products :  await Products.find({}).sort({ createdAt: -1 }),
    })
} 

module.exports.getAllProduct = async (req, res) => {
    const {id} = req.query
    return res.render("home", {
        title : "Products",
        products :  await Products.find({}).sort({ createdAt: -1 }),
        product : await Products.findById(id) || null
    }
)
} 
module.exports.addProduct =  async (req, res) => {
    console.log(req.body)
    
    try{
        const product = await Products.create(req.body)
        console.log(`product added into db ${product}`)
    }catch(err){
        console.error("Error to add product into db",err);
    }
    return res.redirect("back")
    
} 
module.exports.deleteProduct = async (req, res) => {
    const {id} = req.params
    console.log(id)
    try{
        const product = await Products.findByIdAndDelete(id)
        console.log(`product deleted ${product}`);
    }catch(err){
        
        console.error("Error to delete product from db",err);
    }
    return res.redirect("back")
} 
module.exports.updateeProduct = async (req, res) => {
    const {name, price, description, image, category, id} = req.body
    console.log(req.body) 
    console.log(name, price, description, image, category, id) 
    try{
        const product = await Products.findByIdAndUpdate(req.body.id,{
            name : name,
            price : price,
            description : description,
            image : image,
            category : category
        })
        console.log(`product updated ${product}`);
    }catch(err){
    
    console.error("Error to delete product from db",err);
}
return res.redirect("/")
} 