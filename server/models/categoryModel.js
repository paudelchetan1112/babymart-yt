import mongoose from "mongoose"
const categorySchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
        unique:true, 
    }, 
    image:{
        type:String, 
        required:false, 
    }, 
    categoryType:{
        type:String, 
        required:true,
        enum:["Featured", "Hot Categories", "Top Categories"]
    }
},{timestamps:true,})

export default mongoose.models.Category||mongoose.model("Category", categorySchema)