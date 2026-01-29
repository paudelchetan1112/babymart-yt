import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
//register user
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, role ,addresses} = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("user already exists, try login");
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
      addresses:addresses||[],
    });
    if (user) {
      res
        .status(201)
        .json({
          success: true,
          data: { _id: user._id, name, email, role, addresses: addresses||[] },
        });
    } else {
      res.status(400);
      throw new Error("Invalid User data ");
    }
  } catch (error) {
    console.error("Error while creating user:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        addresses: user.addresses || [],
        token: generateToken(user._id),
        //token
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password ");
    }
  } catch (error) {
    console.log("something went wrong ", error);
    res.status(500);
    throw new Error("Invalid email or password ");
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        addresses: user.addresses || [],
      });
    } else {
      console.error("Profile:User not found for ID", req.user?._id);
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(501);
    throw new Error("User not found");
  }
});

//logoutUser

export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
