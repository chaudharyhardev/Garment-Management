const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;


exports.login = (req, res) => {

    const { email, password } = req.body;

    db.get(

        "SELECT * FROM users WHERE email = ?",

        [email],

        async (err, user) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (!user) {
                return res.status(401).json({
                    message: "Invalid Email or Password"
                });
            }

            const match = await bcrypt.compare(
                password,
                user.password
            );

            if (!match) {
                return res.status(401).json({
                    message: "Invalid Email or Password"
                });
            }

            const token = jwt.sign(

                {
                    id: user.id,
                    role: user.role
                },

                SECRET_KEY,

                {
                    expiresIn: "1d"
                }

            );

            res.json({

                message: "Login Successful",

                token,

                user: {

                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role

                }

            });

        }

    );

};