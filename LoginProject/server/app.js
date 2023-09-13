const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/connection');
const cors = require('cors');
const userSchema = require('./model/model')
const PORT = 5000;
const { registerValidation } = require('./validation/validation')

app.use(cors())
app.use(express.json());
// app.get("/", (req, res) => {
//     res.send(" Welcome to express js ");
// })

// Register Functionality

app.post('/register', async (req, res) => {

    const password = req.body.password;
    const Cpassword = req.body.Cpassword;

    if (password !== Cpassword) return res.status(404).send("Password and confirm Password are not same.");

    const { error } = await registerValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const emailExist = await userSchema.findOne({ email: req.body.email });
    // if (emailExist) return res.status(404).json({ error: " Email Already Exist... " });
    if (emailExist) return res.status(404).send( " Email Already Exist... ");

    const userData = new userSchema({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: password,
        Cpassword: Cpassword
    });

    try {
        const saveData = await userData.save({ new: true });
        res.json({ message: " Registration Successful. " })
    } catch (error) {
        console.log(error);
    }

})

// ------------------------

// Login Functionality

app.post("/login", async (req, res) => {
    const emailExist = await userSchema.findOne({ email: req.body.email });
    if (!emailExist) return res.status(404).json({ error: " Email Does Not Exist... " });

    if (emailExist.password === req.body.password) {
        return res.status(200).json({ message: "Login Successful..." });
    }
    else {
        return res.status(404).json({ error: "Invalid Password.." });
    }
})

// -------------------

app.listen(PORT, () => {
    console.log(` Server is running on port : ${PORT} `);
})
