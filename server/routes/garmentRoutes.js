const express = require("express");

const router = express.Router();


const {
addGarment,
getGarments,
updateGarment,
deleteGarment
}=require("../controllers/garmentController");



router.post(
"/",
addGarment
);


router.get(
"/",
getGarments
);
router.put(
"/:id",
updateGarment
);


router.delete(
"/:id",
deleteGarment
);



module.exports = router;