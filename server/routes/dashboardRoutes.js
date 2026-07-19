const express = require("express");

const router = express.Router();

const {
    getDashboardStats,
    getRecentSales,
    getLowStockProducts,
    getMonthlySales,
    getTopSellingProducts
} = require("../controllers/dashboardController");

router.get(
    "/stats",
    getDashboardStats
);


router.get(
    "/recent-sales",
    getRecentSales
);

router.get(
    "/low-stock",
    getLowStockProducts
);

router.get(
    "/monthly-sales",
    getMonthlySales
);

router.get(
    "/top-products",
    getTopSellingProducts
);

module.exports = router;