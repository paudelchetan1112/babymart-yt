import mongoose from "mongoose"

const brandSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
        unique:true, 
    }, 
    image:{
        type:String, 
        default:"", 
    }, 

}, {
    timestamps:true, 
})

export default mongoose.models.Brand||mongoose.model("Brand", brandSchema)

