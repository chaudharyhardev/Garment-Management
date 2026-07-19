const db = require("../config/db");

exports.getDashboardStats = (req, res) => {

    const stats = {};

    // Total Products
    db.get(
        "SELECT COUNT(*) AS totalProducts FROM products",
        [],
        (err, productResult) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            stats.totalProducts = productResult.totalProducts;

            // Total Customers
            db.get(
                "SELECT COUNT(*) AS totalCustomers FROM customers",
                [],
                (err, customerResult) => {

                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    stats.totalCustomers = customerResult.totalCustomers;

                    // Total Sales Amount
                    db.get(
                        "SELECT IFNULL(SUM(final_amount),0) AS totalSales FROM sales",
                        [],
                        (err, salesResult) => {

                            if (err) {
                                return res.status(500).json({ error: err.message });
                            }

                            stats.totalSales = salesResult.totalSales;

                            // Low Stock (stock <= 5)
                            db.get(
                                "SELECT COUNT(*) AS lowStock FROM products WHERE stock <= 5",
                                [],
                                (err, lowStockResult) => {

                                    if (err) {
                                        return res.status(500).json({ error: err.message });
                                    }

                                    stats.lowStock = lowStockResult.lowStock;

                                    res.json(stats);

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};

exports.getRecentSales = (req, res) => {

    db.all(

        `
        SELECT

        sales.id,
        sales.invoice_no,
        customers.name AS customer_name,
        sales.final_amount,
        sales.payment_method,
        sales.created_at

        FROM sales

        LEFT JOIN customers

        ON sales.customer_id = customers.id

        ORDER BY sales.id DESC

        LIMIT 5
        `,

        [],

        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json(rows);

        }

    );

};

exports.getLowStockProducts = (req, res) => {

    db.all(

        `
        SELECT
            id,
            name,
            stock,
            selling_price

        FROM products

        WHERE stock <= 5

        ORDER BY stock ASC
        `,

        [],

        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json(rows);

        }

    );

};

exports.getMonthlySales = (req, res) => {

    db.all(

        `
        SELECT

            strftime('%Y-%m', created_at) AS month,

            SUM(final_amount) AS totalSales

        FROM sales

        GROUP BY month

        ORDER BY month ASC
        `,

        [],

        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);

        }

    );

};

exports.getTopSellingProducts = (req, res) => {

    db.all(

        `
        SELECT

            products.id,
            products.name,

            SUM(sale_items.quantity) AS soldQuantity,

            SUM(sale_items.subtotal) AS revenue

        FROM sale_items

        JOIN products
            ON sale_items.product_id = products.id

        GROUP BY products.id

        ORDER BY soldQuantity DESC

        LIMIT 5
        `,

        [],

        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);

        }

    );

};