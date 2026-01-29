<<<<<<< HEAD
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
=======
import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    startFrom: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bannerType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
>>>>>>> 87d58c25cc1dca63f662984feeca7413993234e6
