<<<<<<< HEAD
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

=======
import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
>>>>>>> 87d58c25cc1dca63f662984feeca7413993234e6
