import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
//getUsers
export const getUsers=asyncHandler(async(req, res)=>{
    try {
        const users=await User.find({}).select("-password")
        res.status(200).json({
            success:true, 
            users, 
        })
    } catch (error) {
        console.log("Error while fetching users", error)
        res.status(404)
        throw new Error("Error while fetching users")
    }
})



//createUser

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, addresses } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    addresses: addresses || [],
  });

  if (user) {
    res.status(201).json({
      success: true,
      user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//getUserById
export const getUserById=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select("-password")
    if(user){
        res.json(user)

    }
    else{
        res.status(404)
        throw new Error("user not found")

    }
})

// updateuser

export const updateUser=asyncHandler(async(req, res)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        res.status(404)
        throw new Error("User not found")

    }
    //Allow updates by the user themselves or admins
  user.name=req.body.name||user.name;
  if(req.body.password){
    user.password=req.body.password;


  }
  if(req.body.role){
    user.role=req.body.role;
  }
  user.addresses=req.body.addresses||user.addresses;

  //avatar

  const updatedUser=await user.save();
  res.status(200).json({
    _id: updatedUser._id, 
    name: updatedUser.name, 
    email: updatedUser.email, 
    avatar: updatedUser.avatar, 
    role: updatedUser.role, 
    addresses: updatedUser.addresses, 

  });
});


export const deleteUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
//Delete user's cart
//Delete User's order (if any exist)
// delete the user 


await user.deleteOne();
res.status(200).json({
    success:true, 
    message:"user deleted successfully!", 
})
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})
//addAddress
export const addAddress=asyncHandler(async(req, res)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        res.status(404)
        throw new Error("User not found")
        
    }
    //only allow user to modify their own addresses or admin 

    if( user._id.toString()!==req.user._id.toString()&&req.user.role!=="admin")
    {
        res.status(403)
        throw new Error("Not authorized to modify this user's addresses")
    }
    const {street, city, country, postalCode, isDefault}=req.body;
    if(!street|| !city || !country|| !postalCode ){
        res.status(400);
        throw new Error("All address field are required");

    }
    //if this is set as default, make other addresses non-default

    if(isDefault){
        user.addresses.forEach((addr)=>{
            addr.isDefault=false;
        }
    )
    }
    //if this is the first address, make it default

    if(user.addresses.length===0)
    {
        user.addresses.push({
            street, 
            city, 
            country, 
            postalCode, 
            isDefault:true, 
        }
    )
    }
    else{
        user.addresses.push({
            street, 
            city, 
            country, 
            postalCode, 
            isDefault:isDefault||false, 
        });
    }
    await user.save();
    res.json({
        success:true, 
        addresses:user.addresses, 
        message:"Address added successfully "
    })
})

export const  updateAddress=asyncHandler(async(req, res)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        res.status(404)
        throw new Error("User not found")

    }
    //only User to modify their own address or admin

    if(
        user._id.toString()!==req.user._id.toString()&&req.user.role!=="admin")
        {
            res.status(403);
            throw new Error("Not authorized to modify this user's addresses")

        }
        const address=user.addresses.id(req.params.addressId)

        if(!address){
            res.status(404);
            throw new Error("Address not found")

        }

        const {street, city, country, postalCode, isDefault}=req.body;
        if(street) address.street=street;
        if(city) address.city=city;
        if(country) address.country=country;
        if(postalCode) address.postalCode=postalCode;


        //if this is set as default, make other addresses non-default
        if(isDefault){
            user.addresses.forEach((addr)=>{
                addr.isDefault=false;

            });
            address.isDefault=true;
        }
        await user.save();
        res.json({
            success:true, 
            addresses:user.addresses, 
            message:"Address updated successfully", 
        })
    
})
//deleteaddresses

export const  deleteAddress=asyncHandler(async(req, res)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        res.status(404);
        throw new Error("User not found");

    }
    //only allow user to modify their own addresses or admin
    if(user._id.toString()!==req.user._id.toString()&&req.user.role!=="admin"){
        res.status(403);
        throw new Error("Not authorized to modify this user's addresses");

    }
    const address=user.addresses.id(req.params.addressId)
    if(!address){
        res.status(404)
        throw new Error("Address not found")

    }
    //if deleting default address, make the first remaining address default

    const wasDefault=address.isDefault;
    user.addresses.pull(req.params.addressId);
    if(wasDefault&&user.addresses.length>0){
        user.addresses[0].isDefault=true;

    }
  await user.save();
  res.json({
    success:true,
    addresses:user.addresses, 
    message:"Address deleted successfully", 
  })
})