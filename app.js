const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

const products = [{

    "DAIRY": [{
            ProductName: "Paneer",
            Des: "asd asd asd asd asd asd asd",
            Price: "70"
        },
        {
            ProductName: "Flovoured Milk",
            Des: "asd asd asd asd asd asd asd",
            Price: "90"
        },
        {
            ProductName: "Butter",
            Des: "asd asd asd asd asd asd asd",
            Price: "50"
        },
        {
            ProductName: "Curd ",
            Des: "asd asd asd asd asd asd asd",
            Price: "60"
        },
        {
            ProductName: "Khova",
            Des: "asd asd asd asd asd asd asd",
            Price: "40"
        },

    ]
}, {
    "FILLING": [{
            ProductName: "Caramel Topping",
            Des: "asd asd asd asd asd asd asd",
            Price: "290"
        },
        {
            ProductName: "Thick Chocolate Syrup",
            Des: "asd asd asd asd asd asd asd",
            Price: "280"
        },
        {
            ProductName: "Pancake Syrup",
            Des: "asd asd asd asd asd asd asd",
            Price: "300"
        }

    ]
}, {
    "FROZENNV": [{
            ProductName: "Chicken Burger Patty",
            Des: "asd asd asd asd asd asd asd",
            Price: "140"
        },
        {
            ProductName: "Chicken Salami Roll",
            Des: "asd asd asd asd asd asd asd",
            Price: "200"
        },
        {
            ProductName: "Chicken sheek kabab",
            Des: "asd asd asd asd asd asd asd",
            Price: "150"
        },
        {
            ProductName: "Chicken Sausage",
            Des: "asd asd asd asd asd asd asd",
            Price: "190"

        },
        {
            ProductName: "meat balls",
            Des: "asd asd asd asd asd asd asd",
            Price: "160"

        }
    ]
}, {
    "FROZENV": [{
            ProductName: "Veg Spring Roll",
            Des: "asd asd asd asd asd asd asd",
            Price: "89"
        },
        {
            ProductName: "Veg momos",
            Des: "asd asd asd asd asd asd asd",
            Price: "124"
        },
        {
            ProductName: "Veg Nuggets",
            Des: "asd asd asd asd asd asd asd",
            Price: "78"
        },
        {
            ProductName: "Paneer Tatters",
            Des: "asd asd asd asd asd asd asd",
            Price: "132"

        },
        {
            ProductName: "French Fries",
            Des: "asd asd asd asd asd asd asd",
            Price: "141"

        }
    ]

}, {
    "TINNED": [{
            ProductName: "Mango Pulp",
            Des: "asd asd asd asd asd asd asd",
            Price: "250"
        },
        {
            ProductName: "Mushroom ",
            Des: "asd asd asd asd asd asd asd",
            Price: "237"
        },
        {
            ProductName: "Gherkins",
            Des: "asd asd asd asd asd asd asd",
            Price: "126"
        },
        {
            ProductName: "Lychee",
            Des: "asd asd asd asd asd asd asd",
            Price: "180"

        },
        {
            ProductName: "Red Cherry",
            Des: "asd asd asd asd asd asd asd",
            Price: "325"

        }
    ]
}, {
    "CULLINARY": [{
        ProductName: "Sweet Chilli Sauce",
        Des: "asd asd asd asd asd asd asd",
        Price: "190"
    }, {
        ProductName: "Mexican Salsa Sauce",
        Des: "asd asd asd asd asd asd asd",
        Price: "210"
    }, {
        ProductName: "Tomato Sauce",
        Des: "asd asd asd asd asd asd asd",
        Price: "200"
    }]
}]



var username = "";
var condition = false;
var productList = [];

mongoose.connect("mongodb://localhost:27017/foodProduct", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    userid: { type: String, unique: true },
    password: String,
    phone: Number,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cart' }],
    delivery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'delivery' }]
});
const User = mongoose.model("userlogs", userSchema) //Collection-1

//Product
const cartSchema = new mongoose.Schema({
    productName: String,
    imageId: String,
    price: Number,
    quantity: Number
})
const Cart = mongoose.model("cart", cartSchema)


const deliverySchema = new mongoose.Schema({
    deliveryDate: Date,
    address: String,
    totalPrice: Number,
    products: [{ productName: String, imageId: String, price: Number, quantity: Number }]
})
const Delivery = mongoose.model("delivery", deliverySchema)



app.get("/", (req, res) => {
    res.render("index", { username: username });
})
app.get("/login", (req, res) => {
    res.render("login", { msg: "", username: username });
})
app.get("/product", (req, res) => {
    res.render("product", { products: products, username: username });
})
app.get("/contact", (req, res) => {
    res.render("contact", { username: username });
})
app.get("/admin", (req, res) => {

    User.find({}, (err, output) => {
        if (!err) {
            res.render("admin", { userlist: output, msg: "" });
        }
    })
})


// Login
app.post("/login", (req, res) => {
    var userid = req.body.userName
    var pass = req.body.Password

    User.findOne({ userid: userid }, (err, output) => {
        if (!err) {
            if (output) {
                if (output.password == pass) {
                    username = userid;

                    //Session Handling!
                    if (condition) {
                        const NewCart = new Cart({
                                productName: productList[0],
                                imageId: productList[1],
                                quantity: productList[2],
                                price: productList[3]
                            })
                            // console.log(userid);
                        productList = []
                        User.findOne({ userid: userid }, (err, output) => {
                            if (!err) {
                                output.cart.push(NewCart);
                                output.save((err) => {
                                    if (!err) {
                                        NewCart.save();
                                        res.redirect("/product");
                                    }
                                })
                            }
                        })
                    } else {
                        // console.log("Error");
                        res.redirect("product");
                    }

                } else {
                    res.render("login", { msg: "Wrong Password!", username: username });
                }
            } else {
                res.render("login", { msg: "UserID Not Found! Pls SignUp", username: username });
            }
        }
    })
})
app.post("/signup", (req, res) => {
    var userid = req.body.userName
    var pass = req.body.Password
    var repass = req.body.RePassword
    var phone = req.body.phone

    User.findOne({ userid: userid }, (err, output) => {
        if (!err) {
            if (!output) {
                if (pass != repass) {
                    res.render("login", { msg: "SingUp Failed! Re-Type the Correct Password", username: username });
                } else {
                    const newuser = new User({
                        userid: userid,
                        password: pass,
                        phone: phone
                    })
                    newuser.save()
                    res.render("login", { msg: "successfully Registed!", username: username });
                }
            } else {
                res.render("login", { msg: "User-ID Already Exits!", username: username });
            }
        }
    })



})
app.post("/adminsign", (req, res) => {
    var userid = req.body.userid;
    var pass = req.body.pass;

    if (userid == "admin") {
        if (pass == "admin") {
            res.redirect("admin");
            // console.log("Successfully Loged in Admin page");
        } else {
            res.render("login", { msg: "Wrong Admin Password!", username: username });
        }
    } else {
        res.render("login", { msg: "Wrong Admin UserID!", username: username });
    }

})


// remover User
app.post("/removeUser", (req, res) => {
    var id = req.body.id
        // User.findOneAndDelete({age: {$gte:5} }, function (err, docs) {
    User.findOneAndDelete({ _id: id }, (err) => {
        if (!err) {
            User.find({}, (err, output) => {
                if (!err) {
                    res.render("admin", { userlist: output, msg: "Successfully Removed!", username: username });
                }
            })
        }
    })

})


// Cart
app.get("/cart", (req, res) => {

    if (username == "") {
        res.render("login", { msg: "Log In to See the CART", username: "" });
    } else {
        User.findOne({ userid: username }).populate('cart').exec((err, output) => {
            if (!err) {
                // console.log(output.cart);
                // console.log(username);
                res.render("cart", { found: output.cart, NoOfProducts: 1, username: username });
            }
        })
    }
})
app.post("/cart", (req, res) => {
    var price = parseInt(req.body.price);
    var quantity = parseInt(req.body.quantity);
    var productName = req.body.product;
    var userid = req.body.userid;
    var imageId = req.body.image;

    if (username == "") {
        condition = true;
        productList.push(productName)
        productList.push(imageId)
        productList.push(quantity)
        productList.push(quantity * price)
        res.render("login", { msg: "Log In to ADD up your Product", username: "" });
    } else {

        // console.log(userid);

        User.findOne({ userid: userid }).populate('cart').exec((err, output) => {
            if (!err) {
                var foundValue = -1;
                output.cart.forEach((e) => {
                    if (e.productName == productName) {
                        foundValue = e._id;
                    }
                });

                if (foundValue == -1) {
                    // adding New product
                    const NewCart = new Cart({
                        productName: productName,
                        imageId: imageId,
                        quantity: quantity,
                        price: quantity * price
                    })

                    output.cart.push(NewCart);
                    output.save((err) => {
                        if (!err) {
                            NewCart.save();
                            res.redirect("/product");
                        }
                    })
                } else {
                    //Updating the Products
                    Cart.findOne({ _id: foundValue }, (err, product) => {
                        product.quantity += quantity;
                        product.price += quantity * price;
                        product.save((err) => {
                            if (!err) {
                                res.redirect("/product");
                            }
                        });
                    })

                }
            }
        });

    }

})

app.get("/deliverysts", (req, res) => {

    if (username != "") {
        User.findOne({ userid: username }).populate('delivery').exec((err, output) => {
            if (!err) {
                // console.log(output.delivery[0]);
                res.render("deliverysts", { username: username, products: output.delivery[0] });
            }
        })
    } else {
        res.render("login", { msg: "Log In to See Delivery status", username: "" });
    }
})

// place Order
app.post("/placeorder", (req, res) => {
    var amount = req.body.amount;
    var deliveryDate = req.body.deliveryDate;
    var address = req.body.address;
    console.log(amount);

    User.findOne({ userid: username }).populate('cart').exec((err, usercart) => {
        if (!err) {
            const productArray = [];
            usercart.cart.forEach(e => {
                var productList = { productName: e.productName, imageId: e.imageId, price: e.price, quantity: e.quantity }
                productArray.push(productList);
            });

            //Adding Delivery info
            const newDelivery = new Delivery({
                deliveryDate: deliveryDate,
                address: address,
                totalPrice: amount,
                products: productArray
            })
            usercart.delivery.push(newDelivery);
            usercart.cart = [];
            usercart.save((error) => {
                if (!error) {
                    newDelivery.save((err) => {
                        if (!err) {
                            res.redirect("cart")
                        }
                    });
                }
            })

        }
    })


})

// remove item
app.post("/removeProduct", (req, res) => {
    const id = req.body.id;
    // console.log(username);
    Cart.findOneAndDelete({ _id: id }, (err) => {
        if (!err) {
            User.findOne({ userid: username }, (err, output) => {
                if (!err) {

                    //Removes the Id in Array
                    const index = output.cart.indexOf(id);
                    if (index > -1) {
                        output.cart.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    output.save((err) => {
                        if (!err) {
                            res.redirect("/cart")
                        }
                    })
                }
            })
        }
    })
})

// Log Out
app.get("/logout", (req, res) => {
    username = ""
    res.redirect("/")
})
app.listen(9000, () => {
    console.log("server is running on port 9000");
})