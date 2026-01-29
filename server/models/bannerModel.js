import mongoose from "mongoose"


const bannerSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
    }, 
    title:{
        type:String, 
        required:true, 
    }, 
    startFrom:{
        type:Number, 
        required:true, 
    }, 
    image:{
        type:String, 
        required:true, 
    }, 
    bannerType:{
        type:String, 
        required:true, 
    }
},{timestamps:true});


export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
