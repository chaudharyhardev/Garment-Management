const express = require("express");

const router = express.Router();


const {
    getUsers,
    createUser,
    deleteUser
} = require("../controllers/userController");


const {
    verifyToken,
    isAdmin
} = require("../middleware/authMiddleware");



// Get all users
router.get(
    "/",
    verifyToken,
    isAdmin,
    getUsers
);



// Create user
router.post(
    "/",
    verifyToken,
    isAdmin,
    createUser
);



// Delete user
router.delete(
    "/:id",
    verifyToken,
    isAdmin,
    deleteUser
);


module.exports = router;