const db = require("../config/db");


// Create Sale

exports.createSale = (req,res)=>{


const {

customer_id,
products,
discount,
payment_method

}=req.body;



let total = 0;



products.forEach(item=>{

total += item.price * item.quantity;

});



const final_amount = total - discount;

const invoice_no = 
"INV-" + Date.now();



db.run(

`
INSERT INTO sales
(
invoice_no,
customer_id,
total_amount,
discount,
final_amount,
payment_method
)

VALUES(?,?,?,?,?,?)

`,

[
invoice_no,
customer_id,
total,
discount,
final_amount,
payment_method
],


function(err){


if(err){

return res.status(500).json({
error:err.message
});

}



const sale_id = this.lastID;



// Insert sale items

const stmt = db.prepare(

`
INSERT INTO sale_items

(
sale_id,
product_id,
quantity,
price,
subtotal
)

VALUES(?,?,?,?,?)

`

);



products.forEach(item=>{


stmt.run(

[
sale_id,
item.product_id,
item.quantity,
item.price,
item.price * item.quantity
]

);


// decrease stock

// decrease stock

db.run(

`
UPDATE products

SET stock = stock - ?

WHERE id=?

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
"OUT",
item.quantity,
"Sale"
]

);



});



stmt.finalize();

// Get customer details and create delivery

db.get(

`
SELECT
phone,
address
FROM customers
WHERE id=?
`,

[customer_id],

(err, customer) => {

if(err){

console.log(err);

}

db.run(

`
INSERT INTO deliveries
(
sale_id,
customer_id,
delivery_address,
phone,
status
)

VALUES(?,?,?,?,?)
`,

[
sale_id,
customer_id,
customer ? customer.address : "",
customer ? customer.phone : "",
"Pending"
]

);

}

);

res.json({

message:"Sale created successfully",

sale_id

});


}



);


};
// Get All Sales

exports.getSales = (req,res)=>{


db.all(

`

SELECT

sales.id,

sales.invoice_no,

customers.name AS customer_name,

sales.total_amount,

sales.discount,

sales.final_amount,

sales.payment_method,

sales.created_at


FROM sales


LEFT JOIN customers

ON sales.customer_id = customers.id


ORDER BY sales.id DESC

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

// Get Single Invoice


exports.getSaleInvoice  = (req,res)=>{


const {id}=req.params;



const invoiceQuery = `

SELECT

sales.*,

customers.name AS customer_name,

customers.phone AS customer_phone,

customers.address AS customer_address


FROM sales


LEFT JOIN customers

ON sales.customer_id = customers.id


WHERE sales.id=?

`;



db.get(

invoiceQuery,

[id],

(err,sale)=>{


if(err){

return res.status(500).json({

error:err.message

});

}



if(!sale){

return res.status(404).json({

message:"Invoice not found"

});

}



// Get products

db.all(

`

SELECT

sale_items.quantity,

sale_items.price,

sale_items.subtotal,

products.name AS product_name


FROM sale_items


LEFT JOIN products

ON sale_items.product_id = products.id


WHERE sale_items.sale_id=?


`,

[id],


(err,items)=>{


if(err){

return res.status(500).json({

error:err.message

});

}



res.json({

sale,

items

});


}


);



}


);


};