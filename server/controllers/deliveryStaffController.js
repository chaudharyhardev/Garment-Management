const db = require("../config/db");

// ==========================
// Add Delivery Staff
// ==========================

exports.addDeliveryStaff = (req, res) => {

    const {
        name,
        phone,
        address,
        delivery_area,
        vehicle_type,
        status
    } = req.body;

    db.run(

        `
        INSERT INTO delivery_staff
        (
            name,
            phone,
            address,
            delivery_area,
            vehicle_type,
            status
        )

        VALUES(?,?,?,?,?,?)
        `,

        [
            name,
            phone,
            address,
            delivery_area,
            vehicle_type,
            status
        ],

        function(err){

            if(err){

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json({

                message: "Delivery Staff Added Successfully",

                id: this.lastID

            });

        }

    );

};


// ==========================
// Get All Delivery Staff
// ==========================

exports.getDeliveryStaff = (req, res) => {

    db.all(

        `
        SELECT *

        FROM delivery_staff

        ORDER BY id DESC
        `,

        [],

        (err, rows) => {

            if(err){

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json(rows);

        }

    );

};


// ==========================
// Update Delivery Staff
// ==========================

exports.updateDeliveryStaff = (req, res) => {

    const { id } = req.params;

    const {
        name,
        phone,
        address,
        delivery_area,
        vehicle_type,
        status
    } = req.body;

    db.run(

        `
        UPDATE delivery_staff

        SET

        name=?,
        phone=?,
        address=?,
        delivery_area=?,
        vehicle_type=?,
        status=?

        WHERE id=?
        `,

        [
            name,
            phone,
            address,
            delivery_area,
            vehicle_type,
            status,
            id
        ],

        function(err){

            if(err){

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json({
                message: "Delivery Staff Updated Successfully"
            });

        }

    );

};


// ==========================
// Delete Delivery Staff
// ==========================

exports.deleteDeliveryStaff = (req, res) => {

    const { id } = req.params;

    db.run(

        `
        DELETE FROM delivery_staff

        WHERE id=?
        `,

        [id],

        function(err){

            if(err){

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json({
                message: "Delivery Staff Deleted Successfully"
            });

        }

    );

};