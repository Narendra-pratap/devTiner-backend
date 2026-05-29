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
// sign up api
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

// get user by email
app.get("/user", async (req, res) => {

    try {

        const email = req.query.emailId;

        const user = await User.findOne({ emailId: email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(user);

    } catch (err) {

        res.status(500).send("Error: " + err.message);
    }

});

//get user by id;
app.get("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("USER NOT FOUND");
        }
        return res.status(200).send(user);
    } catch (err) {
        if (err.name == "CastError") {
            return res.status(400).send("invalid user id");
        }
        return res.status(500).send("Error:" + err.message);
    }
})
// get user /feed
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send("Error:" + err.message);
    }
})





