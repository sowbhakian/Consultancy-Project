const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));


// database Host
mongoose.connect("mongodb://localhost:27017/foodProduct", { useNewUrlParser: true });


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number
});

const user = new mongoose.model("user", userSchema);

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/product", (req, res) => {
    res.render("product");
})
app.get("/contact", (req, res) => {
    res.render("contact");
})

app.listen(9000, () => {
    console.log("server is running on port 9000");
})