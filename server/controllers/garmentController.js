const db = require("../config/db");


// Add garment shop
exports.addGarment = (req,res)=>{

    const {
        shop_name,
        owner_name,
        phone,
        address
    } = req.body;


    const sql = `
    INSERT INTO garment_shops
    (shop_name,owner_name,phone,address)

    VALUES(?,?,?,?)
    `;


    db.run(
        sql,
        [
            shop_name,
            owner_name,
            phone,
            address
        ],

        function(err){

            if(err){
                return res.status(500).json({
                    error:err.message
                });
            }


            res.json({
                message:"Garment shop added",
                id:this.lastID
            });

        }
    );

};




// Get all garment shops

exports.getGarments=(req,res)=>{


    db.all(
        "SELECT * FROM garment_shops ORDER BY id DESC",

        [],

        (err,rows)=>{


            if(err){

                return res.status(500)
                .json({
                    error:err.message
                });

            }


            res.json(rows);

        }
    );


};


// Update garment shop

exports.updateGarment = (req,res)=>{

    const id = req.params.id;

    const {
        shop_name,
        owner_name,
        phone,
        address
    } = req.body;


    const sql = `
    UPDATE garment_shops

    SET
    shop_name=?,
    owner_name=?,
    phone=?,
    address=?

    WHERE id=?
    `;


    db.run(
        sql,
        [
            shop_name,
            owner_name,
            phone,
            address,
            id
        ],

        function(err){

            if(err){

                return res.status(500)
                .json({
                    error:err.message
                });

            }


            res.json({
                message:"Garment shop updated"
            });


        }
    );


};





// Delete garment shop

exports.deleteGarment=(req,res)=>{


const id=req.params.id;


db.run(

"DELETE FROM garment_shops WHERE id=?",

[id],

function(err){


if(err){

return res.status(500)
.json({
error:err.message
});

}



res.json({

message:"Garment shop deleted"

});


}

);


};