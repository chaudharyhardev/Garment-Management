const db = require("../config/db");


// Create Delivery

exports.createDelivery = (req,res)=>{


const {

sale_id,
customer_id,
delivery_address,
phone,
delivery_person

}=req.body;



db.run(

`
INSERT INTO deliveries
(
sale_id,
customer_id,
delivery_address,
phone,
delivery_person
)

VALUES(?,?,?,?,?)

`,

[
sale_id,
customer_id,
delivery_address,
phone,
delivery_person
],


function(err){


if(err){

return res.status(500).json({

error:err.message

});

}


res.json({

message:"Delivery created successfully",

id:this.lastID

});


}


);


};



// Get All Deliveries

exports.getDeliveries=(req,res)=>{


db.all(

`
SELECT

deliveries.*,

customers.name AS customer_name,

sales.invoice_no


FROM deliveries


LEFT JOIN customers

ON deliveries.customer_id = customers.id


LEFT JOIN sales

ON deliveries.sale_id = sales.id


ORDER BY deliveries.id DESC

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



// Update Delivery Status

exports.updateDeliveryStatus=(req,res)=>{


const {id}=req.params;


const {status}=req.body;



db.run(

`
UPDATE deliveries

SET status=?

WHERE id=?

`,

[
status,
id
],


function(err){


if(err){

return res.status(500).json({

error:err.message

});

}


res.json({

message:"Delivery status updated"

});


}


);


};

exports.updateDeliveryPerson=(req,res)=>{

const {id}=req.params;

const {delivery_person}=req.body;


db.run(

`
UPDATE deliveries

SET delivery_person=?

WHERE id=?

`,

[
delivery_person,
id
],


function(err){

if(err){

return res.status(500).json({
error:err.message
});

}


res.json({

message:"Delivery person updated"

});


}


);


};