<<<<<<< HEAD
import express from "express"
import { admin, protect } from "../middleware/authMiddleware.js";
import {createProduct} from "../controller/productController.js"
const router=express.Router();


//getProducts


//createProducts
router.route("/").post(protect, admin, createProduct)



//

export default router;
=======
import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.route("/").post(protect, admin, createProduct);

export default router;
>>>>>>> 87d58c25cc1dca63f662984feeca7413993234e6
