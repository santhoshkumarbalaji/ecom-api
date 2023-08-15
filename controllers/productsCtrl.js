import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";


//@desc Create new Product
//@route  Post/api/v1/products
//@access Private/Admin
export const createProdutCtrl = asyncHandler(async(req,res)=>{

const convertedImgs = req.files.map((file)=>file.path);
const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty } = req.body;
//Product exists
const productExists = await Product.findOne({name});
if(productExists)
{
    throw new Error("Products Already Exists");
}
  //find the brand
  const brandFound = await Brand.findOne({
    name: brand?.toLowerCase()
  });

  if (!brandFound) {
    throw new Error(
      "Brand not found, please create brand first or check brand name"
    );
  } 

//find the category
 const categoryFound = await Category.findOne({
    name: category,
  });
  if (!categoryFound) {
    throw new Error(
      "Category not found, please create category first or check category name"
    );
  }
//create Product
const product = await Product.create({
    name, 
    description, 
    brand,
    category, 
    sizes, 
    colors,
    user:req.userAuthId, 
    price, 
    totalQty, 
    images: convertedImgs,  
});
// //push the product into category
categoryFound.products.push(product._id);
// //resave
await categoryFound.save();
//push the product into brand
brandFound.products.push(product._id);
//resave
await brandFound.save();
//send response
res.json({
    status:"success",
    message:"Product created successfully",
    product,
    });
});

//@desc  Get all products
//@route Get /api/v1/products
//@access Public
export const getProductsCtrl = asyncHandler(async(req,res)=>{
console.log(req.query);
//query
let productQuery=Product.find();

//search by name  api search:-{{badeURL}}/products?name=hats
if (req.query.name)
{
productQuery = productQuery.find({
name:{ $regex:req.query.name, $options:"i" },
});
}

//filter by brand  api search:-{{badeURL}}/products?name=hats&brand=nike
if (req.query.brand)
{
productQuery = productQuery.find({
brand:{ $regex:req.query.brand, $options:"i" },
    });
}
//filter by  category api search:-{{badeURL}}/products?name=hats&brand=nike&category=men
if (req.query. category)
{
productQuery = productQuery.find({
category:{ $regex:req.query. category, $options:"i" },
    });
}
//filter by colors  api search:-{{badeURL}}/products?name=hats&brand=nike&category=men&colors=black
if (req.query. color)
{
productQuery = productQuery.find({
colors:{ $regex:req.query. color, $options:"i" },
    });
}
//filter by sizes  api search:-{{badeURL}}/products?name=hats&brand=nike&category=men&colors=black&sizes=xl
if (req.query. sizes)
{
productQuery = productQuery.find({
sizes:{ $regex:req.query. sizes, $options:"i" },
    });
}
//filter by price  api search:-{{badeURL}}/products?price=700-1100
if(req.query.price)
{
const priceRange = req.query.price.split("-");
//gte :-greater then or equal to
//lte:- leaser then or equal to
productQuery = productQuery.find ({
    price:{$gte:priceRange[0],$lte:priceRange[1]},
});
}
//paginatiom api search:- {{badeURL}}/products?page=1&limit=10
//page
const page = parseInt (req.query.page)?parseInt (req.query.page):1;

//limit
const limit = parseInt (req.query.limit)?parseInt (req.query.limit):10;

//startIdx
const startIndex =(page -1)*limit;

//endIdx
const endIndex = page*limit;

//total
const total = await Product.countDocuments()

productQuery = productQuery.skip(startIndex).limit(limit);

// pagination results  api search:- {{badeURL}}/products?page=1&limit=1
const pagination ={};
if (endIndex<total)
{
    pagination.next=
    {
        page:page+1,
        limit,
    };
}
if (startIndex>0)
{
    pagination.prev=
    {
        page:page-1,
        limit,
    };
}
//await the querry
const products = await productQuery.populate('reviews');
res.json({
        status:"success",
        total,
        results:products.length,
        pagination,
        message:"Products fetched successfully",
        products,
    });
});

//@desc    Get single products
//@route   Get /api/products/:id
//@access  Public
//api search:- {{badeURL}}/products/64c268b4443ddc61ae5ceb1f
export const getProductCtrl = asyncHandler(async(req,res)=>{
    console.log(req.params);
    const product = await Product.findById(req.params.id).populate('reviews');
    if(!product){
        throw new Error("Product not found");
    }
    res.json({
        status:"success",
        message:"Product fetched successfully",
        product,
    });
});
//@desc    update products
//@route   PUT/api/products/:id/update
//@access  Private/Admin
//api search:- {{badeURL}}/products/64c268b4443ddc61ae5ceb1f     "totalQty":100  from 120 to 100

export const updateProductCtrl = asyncHandler(async(req,res)=>{
 const{
    name, 
    description, 
    brand,
    category, 
    sizes, 
    colors,
    user, 
    price, 
    totalQty   
 }   = req.body;
 
 //update
 const product = await Product.findByIdAndUpdate(req.params.id,{
        name, 
        description, 
        brand,
        category, 
        sizes, 
        colors,
        user, 
        price, 
        totalQty  
 },
 {
    new:true,
 });
 res.json({
    status:"success",
    message:"Product Updated successfully",
    product,
});
});

//@desc    delete products
//@route   Delete/api/products/:id/delete
//@access  Private/Admin
//api search:- {{badeURL}}/products/64c268b4443ddc61ae5ceb1f/delete?

export const deleteProductCtrl = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Product deleted successfully",
    });
  });