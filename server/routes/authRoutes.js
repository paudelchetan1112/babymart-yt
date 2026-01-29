import express from "express"
import { getUserProfile, registerUser } from "../controller/authController.js";
import { loginUser, logoutUser } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();
//login route
router.post("/login", loginUser)
//register route
router.post("/register", registerUser)

 //profile
router.get("/profile", protect, getUserProfile)


 //logout
 router.post("/logout", protect, logoutUser)


// router.get("/login", (req, res)=>{
// res.send("login is working")
// })
export default router;

