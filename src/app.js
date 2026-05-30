const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/User");
const signUpDataValidation = require("./utilis/validation");
const bcrypt = require("bcryptjs");


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

        // API validation
        signUpDataValidation(req);

        const { firstName, lastName, emailId, password } = req.body;

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword
        });

        await user.save();

        return res.status(201).send({
            message: "User created successfully"
        });

    } catch (err) {

        console.log(err);

        // Duplicate email
        if (err.code === 11000) {
            return res.status(409).send({
                message: "Email already exists"
            });
        }

        // Mongoose validation error
        if (err.name === "ValidationError") {
            return res.status(400).send({
                message: err.message
            });
        }

        // Unexpected error
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

//login api
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(400).send({
                message: "Email and Password are required"
            });

        }
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(401).send({
                message: "Invalid Credentials"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                message: "Invalid Credentials"
            });
        }

        return res.status(200).send({
            message: "User LoggedIn Successfully."
        });
    } catch (err) {
        return res.status(500).send({
            message: "server side errror"
        })
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

//delete user from the database;
app.delete("/user/:id", async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(
            `${user.firstName} deleted successfully`
        );

    } catch (err) {
        return res.status(500).send("Error: " + err.message);
    }
});

app.patch("/user/:id", (req, res) => {
    try {
        const allowUpdates = ["about", "skills", "photoUrl", "password"];
        const data = req.body;
        object
        const userId = req.params.id;

        const user = User.findByIdAndUpdate({ _id: userId });



    } catch (err) {

    }
})



