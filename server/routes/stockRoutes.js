const express = require("express");

const router = express.Router();

const { getStockHistory } = require("../controllers/stockController");

const {
    verifyToken,
    isAdmin
} = require("../middleware/authMiddleware");

router.get(
    "/history",
    verifyToken,
    isAdmin,
    getStockHistory
);

module.exports = router;