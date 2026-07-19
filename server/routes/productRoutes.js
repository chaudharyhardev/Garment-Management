const express=require("express");

const router=express.Router();


const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");



const upload =
require("../middleware/uploadMiddleware");


router.post(
"/",
upload.single("image"),
addProduct
);
router.put(
    "/:id",
    upload.single("image"),
    updateProduct
);
const {
    verifyToken,
    isAdmin
} = require("../middleware/authMiddleware");


router.delete(
    "/:id",
    verifyToken,
    isAdmin,
    deleteProduct
);
router.get(
"/",
getProducts
);



module.exports=router;