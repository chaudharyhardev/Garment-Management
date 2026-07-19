const db = require("../config/db");


// ==========================
// Get All Suppliers
// ==========================

exports.getSuppliers = (req, res) => {

    db.all(

        `
        SELECT *
        FROM suppliers
        ORDER BY id DESC
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


// ==========================
// Add Supplier
// ==========================

exports.addSupplier = (req, res) => {

    const {

        name,
        phone,
        email,
        address

    } = req.body;


    db.run(

        `
        INSERT INTO suppliers
        (
            name,
            phone,
            email,
            address
        )

        VALUES(?,?,?,?)
        `,

        [
            name,
            phone,
            email,
            address
        ],

        function (err) {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json({

                message: "Supplier Added Successfully",

                id: this.lastID

            });

        }

    );

};


// ==========================
// Update Supplier
// ==========================

exports.updateSupplier = (req, res) => {

    const { id } = req.params;

    const {

        name,
        phone,
        email,
        address

    } = req.body;


    db.run(

        `
        UPDATE suppliers

        SET
            name=?,
            phone=?,
            email=?,
            address=?

        WHERE id=?
        `,

        [
            name,
            phone,
            email,
            address,
            id
        ],

        function (err) {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json({

                message: "Supplier Updated Successfully"

            });

        }

    );

};


// ==========================
// Delete Supplier
// ==========================

exports.deleteSupplier = (req, res) => {

    const { id } = req.params;

    db.run(

        "DELETE FROM suppliers WHERE id=?",

        [id],

        function (err) {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json({

                message: "Supplier Deleted Successfully"

            });

        }

    );

};