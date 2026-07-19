const db = require("../config/db");

// ==========================
// Create Purchase
// ==========================

exports.createPurchase = (req, res) => {

    const {
    shop_id,
    products
} = req.body;

    let total = 0;

    products.forEach(item => {
        total += item.cost_price * item.quantity;
    });

    const purchase_no = "PUR-" + Date.now();

    db.run(

        `
        INSERT INTO purchases
(
purchase_no,
shop_id,
total_amount
)

VALUES(?,?,?)
        `,

        [
    purchase_no,
    shop_id,
    total
],

        function (err) {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            const purchase_id = this.lastID;

            const stmt = db.prepare(

                `
                INSERT INTO purchase_items
                (
                    purchase_id,
                    product_id,
                    quantity,
                    cost_price,
                    subtotal
                )

                VALUES(?,?,?,?,?)
                `

            );

            products.forEach(item => {

                stmt.run(

                    [
                        purchase_id,
                        item.product_id,
                        item.quantity,
                        item.cost_price,
                        item.cost_price * item.quantity
                    ]

                );

                // Increase Stock
                db.run(

                    `
                    UPDATE products

                    SET stock = stock + ?

                    WHERE id = ?
                    `,

                    [
                        item.quantity,
                        item.product_id
                    ]

                );

                // Save Stock History
                db.run(

                    `
                    INSERT INTO stock_history
                    (
                        product_id,
                        type,
                        quantity,
                        note
                    )

                    VALUES(?,?,?,?)
                    `,

                    [
                        item.product_id,
                        "IN",
                        item.quantity,
                        "Purchase"
                    ]

                );

            });

            stmt.finalize();

            res.json({

                message: "Purchase Created Successfully",

                purchase_id

            });

        }

    );

};

// Get All Purchases

exports.getPurchases = (req,res)=>{


db.all(

`
SELECT

p.id,
p.purchase_no,
p.total_amount,
p.created_at,

g.shop_name

FROM purchases p

LEFT JOIN garment_shops g

ON p.shop_id = g.id

ORDER BY p.id DESC

`,

[],

(err,rows)=>{


if(err){

return res.status(500).json({

error:err.message

});

}


res.json(rows);


}


);


};



// Get Purchase Details

// Get Purchase Invoice Details

exports.getPurchaseById = (req,res)=>{

    const { id } = req.params;


    db.get(

    `
    SELECT

    p.id,
    p.purchase_no,
    p.total_amount,
    p.created_at,

    g.shop_name,
    g.owner_name,
    g.phone,
    g.address

    FROM purchases p

    LEFT JOIN garment_shops g

    ON p.shop_id = g.id

    WHERE p.id = ?

    `,

    [id],

    (err,purchase)=>{


        if(err){

            return res.status(500).json({
                error:err.message
            });

        }


        db.all(

        `
        SELECT

        pi.id,
        pi.quantity,
        pi.cost_price,
        pi.subtotal,

        pr.name AS product_name

        FROM purchase_items pi


        LEFT JOIN products pr

        ON pi.product_id = pr.id


        WHERE pi.purchase_id = ?

        `,

        [id],

        (err,items)=>{


            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }


            res.json({

                purchase,

                items

            });


        });


    });


};