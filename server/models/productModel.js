import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
        unique:true, 
    }, 
    description:{
        type:String, 
        required:true, 

    }, 
    price:{
        type:Number, 
        required:true, 
        default:0,
    }, 
    discountPercentage:{
        type:Number, 
        default:0, 
        min:0, 
    }, 
    rating:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId, 
                ref:"User", 
                required:true
            }, 
            rating:{
                type:Number,
                required:true, 
                min:1,
                max:5, 
            }, 
            createdAt:{
                type:Date, 
                default:Date.now, 
            },
        },
    ], 
    averageRating:{
        type:Number, 
        default:0, 
    }, 
    image:{
        type:String,
        // required:true, 
    }, 
    category:{
        type:mongoose.Schema.Types.ObjectId, 
        required:true, 
        ref:"Category", 
    }, 
    brand:{
        type:mongoose.Schema.Types.ObjectId, 
        required:true, 
        ref:"Brand"
    }, 

}, {timestamps:true})
//calculate average rating saving
productSchema.pre("save", function (next){
    if(this.rating&&this.rating.length>0){
        const sum=this.rating.reduce((acc, item)=>acc*item.rating, 0);
        this.averageRating=sum/this.rating.length;

    }
    next();
})

export default mongoose.models.Product||mongoose.model("Product", productSchema)
