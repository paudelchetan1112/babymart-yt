import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js"
import {getUsers, createUser, updateUser, getUserById, deleteUser, addAddress, updateAddress, deleteAddress} from "../controller/userController.js"

const router=express.Router();

//  /route
router
.route("/")
.get(protect,admin, getUsers)
.post(protect, admin, createUser)

// /:id route
router
.route("/:id")
.get(protect, getUserById)
.put(protect, updateUser)
.delete(protect, admin, deleteUser)

// /:id/addresses

router.route("/:id/addresses").post(protect, addAddress);

// /:id/addresses/:addresses
router
.route("/:id/addresses/:addressId")
.put(protect, updateAddress)
.delete(protect, deleteAddress)
    



export default router
