const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');
const cors = require('cors')

const app = express();
// convert data into json format
app.use(express.json());
// Static file

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:["http://localhost:3000","https://djstore-ecommerce.onrender.com"]
}));
//use EJS as the view engine
// app.set("view engine", "ejs");

app.get("/", cors(), (req, res) => {

});

// app.get("/login", (req, res) => {
//     res.render("login");
// });
// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// app.post("/sendData", async(req,res)=>{
//     const {email,name,password} = req.body
//     try{
//         // await collection.insertMany([{email:email}])
//         const data = {
//             email:req.body.email,
//             name: req.body.name,
//             password: req.body.password
//         }
//         console.log(data);
//     }
//     catch(e){
//         console.log(e);
//     }
// })

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ email: data.email });

    if (existingUser) {
        res.json({ status: "fail" });

    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        res.json({
            status: "success",
            name: data.name
        })
        console.log(userdata);
    }

});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        // console.log(check);
        if (!check) {
            const check = await collection.findOne({ name: req.body.email });
            if (!check) {
                res.json({
                    status: "User cannot found"
                })
            }
            else {
                // Compare the hashed password from the database with the plaintext password
                const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
                if (!isPasswordMatch) {
                    res.json({ status: "Wrong Password" });
                }
                else {
                    res.json({
                        status: "success",
                        name: check.name
                    });
                }
            }

        }
        else {
            // Compare the hashed password from the database with the plaintext password
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (!isPasswordMatch) {
                res.json({ status: "Wrong Password" });
            }
            else {
                res.json({
                    status: "success",
                    name: check.name
                });
            }
        }

    }
    catch {
        res.send("wrong Details");
    }
});


// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});