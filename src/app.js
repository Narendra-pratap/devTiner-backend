const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/User");
const signUpDataValidation = require("./utilis/validation");


//middleware call
app.use(express.json());
connectDB().then(() => {
    console.log("database connected successfull");
    app.listen(3000, () => {
        console.log("server is listning on port 30000");
    })
}).catch((err) => {
    console.log("ERROR:", err.message);
})
// register user
app.post("/signup", async (req, res) => {
    try {
        signUpDataValidation(req);
        const user = new User(req.body);
        await user.save();
        return res.status(201).send(
            `${req.body.firstName} your account created successfully`
        );

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send(
                `user already exists with ${req.body.emailId}`
            );
        }
        res.status(400).send("Error:" + err.message);
    }


})
app.get("/", (req, res) => {
    res.send("Welcome to home page");
})
