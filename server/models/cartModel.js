<<<<<<< HEAD
import mongoose from "mongoose"

const cartItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Product", 
        required:true,
    }, 
    name:{
        type:String, 
        required:true, 
    }, 
    price:{
        type:Number, 
        required:true, 
    }, 
   quantity:{
    type:Number, 
    required:true, 
    min:1, 
   }, 
   image:{
    type:String, 
   }
})

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User", 
        required:true, 
        unique:true, 
    }, 
    items:[cartItemSchema]

}, {timestamps:true});


export default mongoose.models.Cart||mongoose.model("Cart", cartSchema)
=======
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
>>>>>>> 87d58c25cc1dca63f662984feeca7413993234e6
