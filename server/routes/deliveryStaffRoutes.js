const express = require("express");

const router = express.Router();

const {

    addDeliveryStaff,

    getDeliveryStaff,

    updateDeliveryStaff,

    deleteDeliveryStaff

} = require("../controllers/deliveryStaffController");


// ==========================
// Add Delivery Staff
// ==========================

router.post(
    "/",
    addDeliveryStaff
);


// ==========================
// Get All Delivery Staff
// ==========================

router.get(
    "/",
    getDeliveryStaff
);


// ==========================
// Update Delivery Staff
// ==========================

router.put(
    "/:id",
    updateDeliveryStaff
);


// ==========================
// Delete Delivery Staff
// ==========================

router.delete(
    "/:id",
    deleteDeliveryStaff
);

module.exports = router;