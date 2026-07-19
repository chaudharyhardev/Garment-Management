const express = require("express");

const router = express.Router();


const {

addCustomer,
getCustomers,
updateCustomer,
deleteCustomer,
getCustomerHistory

} = require("../controllers/customerController");



// Add Customer

router.post(
    "/",
    addCustomer
);



// Get Customers

router.get(
    "/",
    getCustomers
);
router.put(
    "/:id",
    updateCustomer
);
router.delete(
    "/:id",
    deleteCustomer
);
router.get(

"/:id/history",

getCustomerHistory

);



module.exports = router;