const express = require("express");

const router = express.Router();

const {
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
} = require("../controllers/supplierController");

const {
    verifyToken,
    isAdmin
} = require("../middleware/authMiddleware");


// Get all suppliers
router.get(
    "/",
    verifyToken,
    getSuppliers
);


// Add supplier
router.post(
    "/",
    verifyToken,
    isAdmin,
    addSupplier
);


// Update supplier
router.put(
    "/:id",
    verifyToken,
    isAdmin,
    updateSupplier
);


// Delete supplier
router.delete(
    "/:id",
    verifyToken,
    isAdmin,
    deleteSupplier
);

module.exports = router;