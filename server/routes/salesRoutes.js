const express = require("express");

const router = express.Router();


const {

createSale,

getSales,

getSaleInvoice

} = require("../controllers/salesController");



// Create Sale

router.post(
    "/",
    createSale
);

router.get(
    "/",
    getSales
);
router.get(

"/invoice/:id",

getSaleInvoice

);



module.exports = router;