import express from "express";
import { createCategoryCtrl,getAllCategoriesCtrl,getSingleCategoryCtrl,updateCategoryCtrl,deleteCategoryCtrl} from "../controllers/categoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import catetgoryFileUpload from "../config/categoryUpload.js";



const categoriesRouter = express.Router();
 
categoriesRouter.post('/',isLoggedIn,catetgoryFileUpload.single("file"), createCategoryCtrl);
categoriesRouter.get('/',getAllCategoriesCtrl);
categoriesRouter.get('/:id',getSingleCategoryCtrl);
categoriesRouter.put('/:id',updateCategoryCtrl);
categoriesRouter.delete('/:id',deleteCategoryCtrl);

export default categoriesRouter;