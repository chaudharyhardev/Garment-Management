const db = require("../config/db");
const fs = require("fs");
const path = require("path");


// Add Product

exports.addProduct = (req,res)=>{


const {

name,
category,
size,
color,
cost_price,
selling_price,
stock,
shop_id

}=req.body;


const image = req.file
? req.file.filename
: null;



const sql = `

INSERT INTO products

(
name,
category,
size,
color,
cost_price,
selling_price,
stock,
shop_id,
image
)

VALUES(?,?,?,?,?,?,?,?,?)

`;



db.run(

sql,

[
name,
category,
size,
color,
cost_price,
selling_price,
stock,
shop_id,
image
],

function(err){


if(err){

return res.status(500)
.json({
error:err.message
});

}



// Save Initial Stock History
db.run(

`INSERT INTO stock_history
(product_id,type,quantity,note)
VALUES(?,?,?,?)`,

[
this.lastID,
"IN",
stock,
"Initial Stock"
],

(err)=>{

if(err){

console.log("Stock History Error:",err.message);

}

res.json({

message:"Product added",

id:this.lastID

});

}

);


}


);



};



exports.updateProduct = (req, res) => {

    const { id } = req.params;

    const {
        name,
        category,
        size,
        color,
        cost_price,
        selling_price,
        stock,
        shop_id
    } = req.body;

    const image = req.file ? req.file.filename : req.body.image;

    const sql = `
        UPDATE products
        SET
            name = ?,
            category = ?,
            size = ?,
            color = ?,
            cost_price = ?,
            selling_price = ?,
            stock = ?,
            shop_id = ?,
            image = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            name,
            category,
            size,
            color,
            cost_price,
            selling_price,
            stock,
            shop_id,
            image,
            id
        ],
        function (err) {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Product updated successfully"
            });

        }
    );

};

// Get Products

exports.getProducts=(req,res)=>{


db.all(

`

SELECT 
products.*,
garment_shops.shop_name

FROM products

LEFT JOIN garment_shops

ON products.shop_id = garment_shops.id

ORDER BY products.id DESC

`,

[],

(err,rows)=>{


if (err) {

    console.error("SQLite Error:", err);

    return res.status(500).json({
        error: err.message
    });

}


res.json(rows);


}


);


};

// Delete Product

exports.deleteProduct = (req, res) => {

    const { id } = req.params;


    // Get image name first

    db.get(
        "SELECT image FROM products WHERE id = ?",
        [id],
        (err, product) => {


            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }


            if (!product) {

                return res.status(404).json({
                    error: "Product not found"
                });

            }


            // Delete image from folder

            if (product.image) {

                const imagePath = path.join(
                    __dirname,
                    "../uploads/products",
                    product.image
                );


                fs.unlink(imagePath, (err)=>{

                    if(err){

                        console.log(
                            "Image delete error:",
                            err.message
                        );

                    }

                });

            }



            // Delete product from database

            db.run(
                "DELETE FROM products WHERE id = ?",
                [id],
                function(err){


                    if(err){

                        return res.status(500).json({
                            error: err.message
                        });

                    }


                    res.json({
                        message:"Product deleted successfully"
                    });


                }
            );


        }
    );

};