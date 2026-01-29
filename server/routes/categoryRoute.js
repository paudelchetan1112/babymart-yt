import express from "express"

import { protect, admin } from "../middleware/authMiddleware.js"
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controller/categoryController.js";

const router=express.Router();

router.route("/").get(getCategories).post(protect, admin, createCategory);

router
.route("/:id")
.get(protect,getCategoryById)
.put(protect, admin, updateCategory)
.delete(protect, admin, deleteCategory)


export default router;


