const express = require("express");

const router = express.Router();


const {

createDelivery,

getDeliveries,

updateDeliveryStatus,

updateDeliveryPerson

} = require("../controllers/deliveryController");



// Create Delivery

router.post(
    "/",
    createDelivery
);



// Get Deliveries

router.get(
    "/",
    getDeliveries
);



// Update Status

router.put(
    "/:id/status",
    updateDeliveryStatus
);
router.put(
"/:id/person",
updateDeliveryPerson
);



module.exports = router;