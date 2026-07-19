const db = require("../config/db");


// Get Stock History

exports.getStockHistory = (req, res) => {

    db.all(

        `
        SELECT

            stock_history.id,

            products.name AS product_name,

            stock_history.type,

            stock_history.quantity,

            stock_history.note,

            stock_history.created_at

        FROM stock_history

        JOIN products

        ON stock_history.product_id = products.id

        ORDER BY stock_history.created_at DESC
        `,

        [],

        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json(rows);

        }

    );

};