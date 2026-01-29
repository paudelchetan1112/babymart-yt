import asyncHandler from "express-async-handler"
import Category from "../models/categoryModel.js"
import cloudinary from "../config/cloudinary.js";

//@desc Get all Categories
//@route GET/api/categories
//@access Private
export const getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const perPage = parseInt(req.query.perPage) || 20; // Default to 20 per page
  const sortOrder = req.query.sortOrder || "asc"; // Default to ascending

  // Validate page and perPage
  if (page < 1 || perPage < 1) {
    res.status(400);
    throw new Error("Page and perPage must be positive integers");
  }

  // Validate sortOrder
  if (!["asc", "desc"].includes(sortOrder)) {
    res.status(400);
    throw new Error('Sort order must be "asc" or "desc"');
  }

  const skip = (page - 1) * perPage;
  const total = await Category.countDocuments({});
  const sortValue = sortOrder === "asc" ? 1 : -1;

  const categories = await Category.find({})
    .skip(skip)
    .limit(perPage)
    .sort({ createdAt: sortValue });

  const totalPages = Math.ceil(total / perPage);

  res.json({
    categories,
    total,
    page,
    perPage,
    totalPages,
  });
});

//@desc Get category by Id
//@route GET/api/categories/:id
//@access Private

export const getCategoryById=asyncHandler(async(req, res)=>{
    const category=await Category.findById(req.params.id)

    if(category){
        res.json(category);

    }
   else{
    res.status(404);
    throw new Error("Category not found");

   }

});


//@desc Create a category
// @route POST/api/categories
//@access Private/Admin
export const createCategory=asyncHandler(async(req,res)=>{
    const {name, image, categoryType}=req.body;


    //validate inputs

    if(!name||typeof name!=="string"){
        res.status(400);
        throw new Error("Category name is required and must be string ");
    }

    //validate categoryType
    const validCategoryTypes=["Featured", "Hot Categories", "Top Categories"];
    if(!validCategoryTypes.includes(categoryType)){
        res.status(400);
        throw new Error("Invalid category type");

    }
    const categoryExists=await Category.findOne({name})
    if(categoryExists){
        res.status(400);
        throw new Error("Category already exists");
    }
    let imageUrl="";
    if(image){
        const result=await cloudinary.uploader.upload(image, {
            folder:"admin-dashboard/categories", 
        });
        imageUrl=result.secure_url;
    }
    const category=await Category.create({
        name, 
        image:imageUrl||undefined, //store image URL if provided else undefined 
        categoryType, 

    });
    if(category){
        res.status(201).json(category);
    }
    else{
        res.status(400)
        throw new Error("Invalid Category data")
    }
})

//@desc Update a category
//@route PUT/api/categories/:id
//@access Private/Admin

export const updateCategory=asyncHandler(async(req, res)=>{
    const {name, image, categoryType}=req.body;
      if(!name||typeof name!=="string"){
        res.status(400);
        throw new Error("Category name is required and must be string ");
    }

    //validate categoryType
    const validCategoryTypes=["Featured", "Hot Categories", "Top Categories"];
    if(!validCategoryTypes.includes(categoryType)){
        res.status(400);
        throw new Error("Invalid category type");

    }
   const category=await Category.findById(req.params.id)

    if(category){
        category.name=name||category.name;
        category.categoryType=categoryType||category.categoryType;
    if(image!==undefined){
        if(image){
            const result=await cloudinary.uploader.upload(image, {folder:"admin-dashboard/categories", 

            })
            category.image=result.secure_url;
        }
        else{
            category.image=undefined; //clear image if empty string is provided 
        }
    }
        const updatedCategory=await category.save();
        res.json(updatedCategory);
    

    }
    else{
        res.status(404);
        throw new Error("Category not found ");

    }



    
})
//@desc Delete a category
//@route DELETE/api/categories/:Id
//@access Private/Admin

export const deleteCategory=asyncHandler(async(req, res)=>{
    const category=await Category.findById(req.params.id);
    if(category){
        await Category.deleteOne();
        res.json({message:"Category removed"});

    }
    else{
        res.status(404);
        throw new Error("Category not found ")
    }
});

