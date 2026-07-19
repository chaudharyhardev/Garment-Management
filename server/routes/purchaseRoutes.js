const express = require("express");

const router = express.Router();

const {
    createPurchase,
    getPurchases,
    getPurchaseById
} = require("../controllers/purchaseController");


const {
    verifyToken,
    isAdmin
} = require("../middleware/authMiddleware");


// Create Purchase

router.post(
    "/",
    verifyToken,
    isAdmin,
    createPurchase
);
// Get all purchases

router.get(
    "/",
    verifyToken,
    getPurchases
);


// Purchase details

router.get(
    "/:id",
    verifyToken,
    getPurchaseById
);


module.exports = router;