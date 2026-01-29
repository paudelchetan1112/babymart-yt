import express from "express"
import { getBrands, createBrand, getBrandById, updateBrand, deleteBrand } from "../controller/brandController.js";
import { admin, protect } from "../middleware/authMiddleware.js"


const router=express.Router();
router.route("/").get(getBrands).post(protect, admin, createBrand)

router.route("/:id")
.get(getBrandById)
.put(protect, admin, updateBrand)
.delete(protect, admin, deleteBrand)

export default router;