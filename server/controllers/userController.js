const db = require("../config/db");
const bcrypt = require("bcrypt");


// Get all users

exports.getUsers = (req, res) => {

    db.all(

        `
        SELECT 
            id,
            name,
            email,
            role
        FROM users
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



// Create new user

exports.createUser = async (req, res) => {

    const {
        name,
        email,
        password,
        role
    } = req.body;


    try {


        const hash = await bcrypt.hash(
            password,
            10
        );


        db.run(

            `
            INSERT INTO users
            (name,email,password,role)

            VALUES(?,?,?,?)
            `,

            [
                name,
                email,
                hash,
                role
            ],


            function(err){

                if(err){

                    return res.status(500).json({
                        message: err.message
                    });

                }


                res.json({

                    message:"User Created Successfully",

                    id:this.lastID

                });


            }


        );


    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }


};



// Delete User

exports.deleteUser = (req,res)=>{


    const {id}=req.params;


    db.run(

        "DELETE FROM users WHERE id=?",

        [id],


        function(err){


            if(err){

                return res.status(500).json({
                    message:err.message
                });

            }


            res.json({

                message:"User Deleted"

            });


        }


    );


};