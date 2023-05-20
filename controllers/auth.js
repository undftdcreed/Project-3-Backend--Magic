const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

//sign up
// POST /api/register
router.post("/register", async (req, res, next) => {});

//SIGN in
//POST /api/login
router.post("/login", async (req, res, next) => {});

router.post("/register", async (req, res, next) => {
    //has the password before storing the user info in the database
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        req.body.password = passwordHash;

        const newUser = await User.create(req.body);

        res.status(201).json({
            currentUser: newUser,
            isLoggedIn: true,
        });
    } catch (err){
        res.status(400).json({ err: err.message });
    }
});







module.exports = router;