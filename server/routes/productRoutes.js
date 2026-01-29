import express from "express"
import { admin, protect } from "../middleware/authMiddleware.js";
import {createProduct} from "../controller/productController.js"
const router=express.Router();


//getProducts


//createProducts
router.route("/").post(protect, admin, createProduct)



//

export default router;