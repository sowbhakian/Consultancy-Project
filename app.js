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

mongoose.connect("mongodb://localhost:27017/foodProduct", { useNewUrlParser: true });


var username = "";
var adminSign = "admin";
var condition = false;
var productList = [];


const userSchema = new mongoose.Schema({
    userid: { type: String, unique: true },
    password: String,
    phone: Number,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cart' }],
    delivery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'delivery' }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'history' }]
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

//Delivery
const deliverySchema = new mongoose.Schema({
    userid: String,
    deliveryDate: Date,
    address: String,
    totalPrice: Number,
    paidStatus: { type: String, default: "Not Paid" },
    deliveryStatus: { type: String, default: "Not Done" },
    products: [{ productName: String, imageId: String, price: Number, quantity: Number }]
})
const Delivery = mongoose.model("delivery", deliverySchema)

//History
const historySchema = new mongoose.Schema({
    userid: String,
    deliveryDate: Date,
    address: String,
    totalPrice: Number,
    paidStatus: { type: String, default: "Not paid" },
    deliveryStatus: { type: String, default: "Done" },
    products: [{ productName: String, imageId: String, price: Number, quantity: Number }]
})
const History = mongoose.model("history", historySchema)



app.get("/", (req, res) => {
    res.render("index", { username: username, cartCount: 0 });
})
app.get("/login", (req, res) => {
    if (username == "") {
        res.render("login", { msg: "", username: username, cartCount: 0 });
    } else {
        User.findOne({ userid: username }).populate('cart').exec((err, output) => {
            if (!err) {
                res.render("login", { msg: "Log Out for another login!", username: username, cartCount: output.cart.length });
            }
        })

    }
})
app.get("/product", (req, res) => {
    if (username == "") {
        res.render("product", { products: products, username: username, cartCount: 0 });
    } else {
        User.findOne({ userid: username }).populate('history').exec((err, output) => {
            if (!err) {
                res.render("product", { products: products, username: username, cartCount: output.cart.length });
            }
        })
    }
})
app.get("/contact", (req, res) => {
    if (username == "") {
        res.render("contact", { username: username, cartCount: 0 });
    } else {
        User.findOne({ userid: username }).populate('history').exec((err, output) => {
            if (!err) {
                res.render("contact", { username: username, cartCount: output.cart.length });
            }
        })
    }
})

//Admin
app.get("/admin", (req, res) => {
    if (adminSign != "") {
        User.find({}, (err, output) => {
            if (!err) {
                // console.log(adminSign);
                res.render("admin", { userlist: output, msg: "", username: adminSign });
            }
        })
    } else {
        res.render("login", { msg: "Login To Admin Pannel", username: "", cartCount: 0 });
    }
})

//Admin
app.get("/delivery", (req, res) => {
    Delivery.find({}, (err, output) => {
        if (!err) {

            res.render("yetToDelivery", { products: output, username: adminSign });
        }
    })
})


app.get("/history", (req, res) => {
    if (username == "") {
        res.render("login", { msg: "Log In to See the HISTORY", username: "", cartCount: 0 });
    } else {
        User.findOne({ userid: username }).populate('history').exec((err, output) => {
            if (!err) {
                res.render("history", { products: output.history, username: username, cartCount: output.cart.length });

            }
        })
    }
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
                    res.render("login", { msg: "Wrong Password!", username: username, cartCount: 0 });
                }
            } else {
                res.render("login", { msg: "UserID Not Found! Pls SignUp", username: username, cartCount: 0 });
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
                    res.render("login", { msg: "SingUp Failed! Re-Type the Correct Password", username: username, cartCount: 0 });
                } else {
                    const newuser = new User({
                        userid: userid,
                        password: pass,
                        phone: phone
                    })
                    newuser.save()
                    res.render("login", { msg: "successfully Registed!", username: username, cartCount: 0 });
                }
            } else {
                res.render("login", { msg: "User-ID Already Exits!", username: username, cartCount: 0 });
            }
        }
    })
})

app.post("/adminsign", (req, res) => {
    var userid = req.body.userid;
    var pass = req.body.pass;

    if (userid == "admin") {
        if (pass == "admin") {
            adminSign = "admin"
            res.redirect("admin");
        } else {
            res.render("login", { msg: "Wrong Admin Password!", username: adminSign });
        }
    } else {
        res.render("login", { msg: "Wrong Admin UserID!", username: adminSign });
    }

})

// Cart
app.get("/cart", (req, res) => {

    if (username == "") {
        res.render("login", { msg: "Log In to See the CART", username: "", cartCount: 0 });
    } else {
        User.findOne({ userid: username }).populate('cart').exec((err, output) => {
            if (!err) {
                res.render("cart", { found: output.cart, NoOfProducts: 1, username: username, cartCount: output.cart.length });
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
        res.render("login", { msg: "Log In to ADD up your Product", username: "", cartCount: 0 });
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
                    // console.log(output.delivery);
                    if (output.delivery[0] == undefined) {
                        res.render("deliverysts", { username: username, products: [], cartCount: 0 });
                    } else {
                        User.findOne({ userid: username }).populate('cart').populate('delivery').exec((err, output) => {
                            if (!err) {
                                res.render("deliverysts", { username: username, products: output.delivery, cartCount: output.cart.length });

                            }
                        })

                    }
                }
            })
        } else {
            res.render("login", { msg: "Log In to See Delivery status", username: "", cartCount: 0 });
        }
    })
    // place Order
app.post("/placeorder", (req, res) => {
        var amount = req.body.amount;
        var deliveryDate = req.body.deliveryDate;
        var address = req.body.address;
        // console.log(amount);

        User.findOne({ userid: username }).populate('cart').exec((err, usercart) => {
            if (!err) {
                const productArray = [];
                usercart.cart.forEach(e => {
                    var productList = { productName: e.productName, imageId: e.imageId, price: e.price, quantity: e.quantity }
                    productArray.push(productList);
                });

                //Adding Delivery info
                const newDelivery = new Delivery({
                    userid: username,
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


// Admin
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

app.post("/viewUserDeliveryProducts", (req, res) => {
    var id = req.body.id
        // console.log(userId);
    User.findById({ _id: id }).populate('delivery').exec((err, output) => {
        if (!err) {
            if (output.delivery[0] == undefined) {
                res.render("develiveryTemp", { username: "Admin", products: [] });
            } else {
                res.render("develiveryTemp", { username: "Admin", products: output.delivery });
            }
        }
    })
})

app.get("/toDelivery", (req, res) => {
    if (adminSign != "") {
        User.findOne({}).populate('delivery').exec((err, output) => {
            if (!err) {
                res.render("toDelivery", { username: adminSign, userArray: output })
            }
        })
    } else {
        res.render("login", { msg: "Login To Admin Pannel", username: "", cartCount: 0 });
    }
})


// Log Out  
app.get("/logout", (req, res) => {
    username = ""
    res.redirect("/")
})
app.get("/logoutAdmin", (req, res) => {
    adminSign = ""
    res.redirect("/")
})

app.post("/paid", (req, res) => {
    var user = req.body.user;
    var id = req.body.id;

    Delivery.updateOne({ userid: user, _id: id }, { paidStatus: "Paid" }, (err, output) => {
        res.redirect("/delivery");
    })
})

app.post("/delivered", (req, res) => {
    var user = req.body.user;
    var id = req.body.id;
    Delivery.updateOne({ userid: user, _id: id }, { deliveryStatus: "Done" }, (err, output) => {
        if (!err) {
            const productArray = [];
            Delivery.findOne({ userid: user }, (err, output) => {
                output.products.forEach(e => {
                    var productList = { productName: e.productName, imageId: e.imageId, price: e.price, quantity: e.quantity }
                    productArray.push(productList);
                });
                const newHistory = new History({
                    userid: output.userid,
                    deliveryDate: output.deliveryDate,
                    address: output.address,
                    totalPrice: output.totalPrice,
                    paidStatus: output.paidStatus,
                    deliveryStatus: "Delivered",
                    products: productArray
                })
                newHistory.save((e) => {
                    if (!e) {
                        Delivery.deleteOne({ _id: id }, (err) => {
                            if (!err) {
                                User.findOne({ userid: output.userid }).populate('cart').populate('delivery').exec((err, history) => {
                                    if (!err) {

                                        const index = history.delivery.indexOf(id);
                                        if (index > -1) {
                                            history.delivery.splice(index, 1); // 2nd parameter means remove one item only
                                        }

                                        history.history.push(newHistory)
                                        history.save((err) => {
                                            if (!err) {
                                                res.redirect("/delivery");
                                                // res.redirect("/");
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }
    })
})

app.listen(9000, () => {
    console.log("server is running on port 9000");
})