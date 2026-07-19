const db = require("../config/db");


// Add Customer

exports.addCustomer = (req,res)=>{

    const {
        name,
        phone,
        address
    } = req.body;


    const sql = `
    INSERT INTO customers
    (
        name,
        phone,
        address
    )

    VALUES(?,?,?)
    `;


    db.run(
        sql,
        [
            name,
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

                message:"Customer added successfully",

                id:this.lastID

            });


        }
    );

};



// Get Customers

exports.getCustomers=(req,res)=>{


    db.all(
        `
        SELECT *
        FROM customers
        ORDER BY id DESC
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

// Update Customer

exports.updateCustomer = (req,res)=>{


    const {id} = req.params;


    const {

        name,
        phone,
        address

    } = req.body;



    const sql = `

    UPDATE customers

    SET

    name=?,

    phone=?,

    address=?

    WHERE id=?

    `;



    db.run(

        sql,

        [
            name,
            phone,
            address,
            id
        ],

        function(err){


            if(err){

                return res.status(500).json({

                    error:err.message

                });

            }



            res.json({

                message:"Customer updated successfully"

            });


        }

    );



};
// Delete Customer

exports.deleteCustomer = (req,res)=>{


    const {id} = req.params;


    db.run(

        `DELETE FROM customers WHERE id=?`,

        [id],

        function(err){


            if(err){

                return res.status(500).json({
                    error:err.message
                });

            }


            res.json({

                message:"Customer deleted successfully"

            });


        }

    );


};

// Customer Purchase History

exports.getCustomerHistory = (req,res)=>{


const {id}=req.params;


db.all(

`
SELECT

sales.id,
sales.invoice_no,
sales.total_amount,
sales.discount,
sales.final_amount,
sales.payment_method,
sales.created_at

FROM sales


WHERE sales.customer_id=?


ORDER BY sales.id DESC

`,

[id],

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