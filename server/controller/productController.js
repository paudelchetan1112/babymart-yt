import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
// import Cloudinary from "../config/cloudinary"


//createProduct

export const createProduct=asyncHandler(async(req, res)=>{
const {
    name,
    description, 
    price, 
    category, 
    brand, 
    image, 
    discountPercentage, 
    stock, 
}=req.body;

//check if product with same name exist


const productExists=await Product.findOne({name})
if(productExists){
    res.status(400)
    
        throw new Error("product with this name already exists")

}
    //upload image to cloudinary

    const product=await Product.create({
        name, description,category, price, brand,discountPercentage: discountPercentage||0, 
        stock:stock||0, 
        image:image||undefined, 

    });
    if(product){
        res.status(201).json(product)

    }
    else{
        res.status(400)
        throw new Error("Invalid product data")
    }


})