import mongoose from "mongoose";
import orderItemSchema from "./orderItemModel";

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User", 
        required:true, 
    }, 
    items:[orderItemSchema], 
    total:{
        type:Number, 
        default:0, 
    }, 
    status:{
        type:String, 
        enum:["pending", "paid", "completed", "cancelled"], 
        default:"pending"
    }, 
    shippingAddress:{
        street:{
        type:String, 
        required:true, 


        }, 
        city:{
            type:String, 
            required:true, 

        }, 
        country:{
            type:String, 
            required:true, 
        }, 
        postalCode:{
            type:String, 

        }, 
    }, 
    paymentIntentId:{
        type:String, 

    }, 
    stripeSessionId:{
        type:String
    }, 
    paidAt:{
        type:Date, 
    }

}, {timestamps:true})

export default mongoose.models.Order||mongoose.model("Order", orderSchema)
