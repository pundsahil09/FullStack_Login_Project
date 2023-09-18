const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/connection');
const cors = require('cors');
const userSchema = require('./model/model')
const PORT = 5000;
const { registerValidation } = require('./validation/validation');
const bcrypt = require('bcrypt');

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
    if (emailExist) return res.status(404).send(" Email Already Exist... ");

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt); // sequring password in database
    const ChashPass = await bcrypt.hash(Cpassword, salt); // sequring Confirm password in database

    const userData = new userSchema({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPass,
        Cpassword: ChashPass
    });

    try {
        const saveData = await userData.save({ new: true });
        res.json({ message: " Registration Successful. " })
    } catch (error) {
        console.log(error);
    }

})

// -------------------------------------------------------------------------------

// Login Functionality

app.post("/login", async (req, res) => {
    const emailExist = await userSchema.findOne({ email: req.body.email });
    if (!emailExist) return res.status(404).json({ error: " Email Does Not Exist... " });

    // if (emailExist.password === req.body.password) {
    //     return res.status(200).json({ message: "Login Successful..." });
    // }
    // else {
    //     return res.status(404).json({ error: "Invalid Password.." });
    // }

    const isPass = await bcrypt.compare(req.body.password, emailExist.password);
    if (!isPass) return res.status(401).json({ error: "Invalid Password.." });

    res.status(200).json({ message: "Login Successful..." });
})

// -------------------------------------------------------------------------------

// Forgot Password functionality

app.put("/forgotPass", async (req, res) => {
    try {

        const emailExist = await userSchema.findOne({ email: req.body.email });
        if (!emailExist) return res.status(402).json({ error: "Invalid Email Address.." });

        // if (req.body.password !== req.body.Cpassword) return res.status(401).send(" Password and confirm password is not same ");
        if (req.body.password !== req.body.Cpassword) return res.status(401).json({error:"Password and confirm password is not same"});

        // created function to hash password
        const hashPassword = async (password) => {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            return hashPass;
        }

        // convewrting normal password to hash pass
        if (req.body.password && req.body.Cpassword) {
            req.body.password = await hashPassword(req.body.password)
            req.body.Cpassword = await hashPassword(req.body.Cpassword)
        }

        // updating hashpass
        let result = await userSchema.findOneAndUpdate({ email: req.body.email }, { $set: req.body });
        res.json({ message: "Data Updated.." })
    } catch (error) {
        console.log(error);
    }
})

// -------------------------------------------------------------------------------


app.listen(PORT, () => {
    console.log(` Server is running on port : ${PORT} `);
})
