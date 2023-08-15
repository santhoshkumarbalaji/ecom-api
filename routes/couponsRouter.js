import exppress from "express";
import {createCouponCtrl,getAllCouponsCtrl,getCouponCtrl,updateCouponCtrl,deleteCouponCtrl,} from "../controllers/couponsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const couponsRouter = exppress.Router();

couponsRouter.post("/",isLoggedIn, createCouponCtrl);
couponsRouter.get("/",getAllCouponsCtrl);
couponsRouter.get("/:id",getCouponCtrl);
couponsRouter.put("/update/:id", isLoggedIn, isAdmin, updateCouponCtrl);
couponsRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponCtrl);

export default couponsRouter;