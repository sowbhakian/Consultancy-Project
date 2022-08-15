const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

const products = [{

    "DAIRY": [{
            ProductName: "Paneer",
            Des: "Paneer is a fresh cheese used in a wide variety of Indian recipes, made by heating and then curdling milk using acid. It's very mild and milky in flavor, white in color, and its texture is soft, spongy, and squeaky. This texture helps it to absorb the flavors of sauces or marinades.",
            Price: "70"
        },
        {
            ProductName: "Flovoured Milk",
            Des: "Flavored milk is a sweetened dairy drink made with milk, sugar, flavorings, and sometimes food colorings.",
            Price: "90"
        },
        {
            ProductName: "Butter",
            Des: "It is a dairy product made by churning either fresh fermented cream or milk.Butter contributes desirable flavor and texture to food and bakery products.",
            Price: "50"
        },
        {
            ProductName: "Curd ",
            Des: "Refreshing, creamy curd made from pure milk and zero chemicals ID natural curd is made without the use of artificial culture Simply scoop from the pack and use",
            Price: "60"
        },
        {
            ProductName: "Khova",
            Des: "It is made of either dried whole milk or milk thickened by heating in an open iron pan. It is lower in moisture than typical fresh cheeses .",
            Price: "40"
        },

    ]
}, {
    "FILLING": [{
            ProductName: "Caramel Topping",
            Des: "Caramel is a confectionery product used for flavoring, topping and filling in variety of foods and beverages.",
            Price: "290"
        },
        {
            ProductName: "Thick Chocolate Syrup",
            Des: "Chocolate syrup is a sweet, chocolate-flavored condiment. It is often used as a topping or dessert sauce for various desserts, such as ice cream, or mixed with milk to make chocolate milk or blended with milk and ice cream to make a chocolate milkshake.",
            Price: "280"
        },
        {
            ProductName: "Pancake Syrup",
            Des: "Maple syrup is a sweet, sticky, brown liquid made from the sap of maple trees, that can be eaten with pancakes or used to make desserts.",
            Price: "300"
        }

    ]
}, {
    "FROZENNV": [{
            ProductName: "Chicken Burger Patty",
            Des: "A hot sandwich made of a patty of chicken in a bun, often with other ingredients.",
            Price: "140"
        },
        {
            ProductName: "Chicken Salami Roll",
            Des: "Tasty and healthy Chicken Salami is well Textured, Aromatic Chicken Salami with an Excellent Flavor Profile. This fully cooked salami is a great way to come up with a fantastic, hassle-free meal anytime!",
            Price: "200"
        },
        {
            ProductName: "Chicken sheek kabab",
            Des: "Chicken Seekh Kabab is the special delight of minced chicken, poppy seeds and spices. The nice mixture of minced chicken is simply molded onto the skewers and cooked in the hot oil. Learn the easiest way to make tastiest chicken seekh kabab in your own kitchen.",
            Price: "150"
        },
        {
            ProductName: "Chicken Sausage",
            Des: "Chicken sausage is a type of sausage made from ground chicken meat. It is usually made from dark meat, and is often flavored with sage, parsley, or other herbs. It's high in protein and low in fat, and is a good source of iron and zinc.",
            Price: "190"

        },
        {
            ProductName: "meat balls",
            Des: "It's an exceptionally accessible dish, simple and affordable. Meatballs can be made with nearly any kind of meat, and since that meat is ground and mixed with herbs and other flavors, cheap cuts of meat can be transformed into something delicious.",
            Price: "160"

        }
    ]
}, {
    "FROZENV": [{
            ProductName: "Veg Spring Roll",
            Des: "Eating spring rolls is a way to welcome the arrival of spring. The golden cylindrical-shaped rolls represent gold bars — which symbolize wealth.",
            Price: "89"
        },
        {
            ProductName: "Veg momos",
            Des: "These round soft dough balls are filled with juicy veg stuffings and are served with a spicy dip.",
            Price: "124"
        },
        {
            ProductName: "Veg Nuggets",
            Des: "Veggie Nuggets is an amazing combination of potatoes, vegetables and a bold tandoori seasoning, that is finely coated in crispy golden bread crumbs, our Veggie Nuggets will make sure that you enjoy every bite thoroughly!",
            Price: "78"
        },
        {
            ProductName: "Paneer Tatters",
            Des: "Paneer TATTERS is an Indian dish made from chunks of paneer marinated in spices and grilled in a tandoor.",
            Price: "132"

        },
        {
            ProductName: "French Fries",
            Des: "FRENCH FIRESnack typically made from deep-fried potatoes that have been cut into various shapes, especially thin strips. Fries are often salted and served",
            Price: "141"

        }
    ]

}, {
    "TINNED": [{
            ProductName: "Mango Pulp",
            Des: "Mango pulp is the inner fleshy yellow, sweet part of the mango. Pulp of mango can be easily extracted by peeling any variety of mango and then crushing it. In order to extract mango pulp, crush using your hands or put the pieces in a mixer or food processor and blend to a pulp.",
            Price: "250"
        },
        {
            ProductName: "Mushroom ",
            Des: "Mushrooms are a rich, low calorie source of fiber, protein, and antioxidants.",
            Price: "237"
        },
        {
            ProductName: "Gherkins",
            Des: "Gherkins are a specific kind of cucumber. They are the kind that is most often used for pickling.",
            Price: "126"
        },
        {
            ProductName: "Lychee",
            Des: "The aromatic lychee is sweet, with slightly floral and acidic notes. Upon biting, you'll get a juicy flavor burst with a taste similar to a strawberry or pear with a hint of citrus. Some also compare the floral taste to rose.",
            Price: "180"

        },
        {
            ProductName: "Red Cherry",
            Des: "A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe. Commercial cherries are obtained from cultivars of several species, such as the sweet Prunus avium and the sour Prunus cerasus.",
            Price: "325"

        }
    ]
}, {
    "CULLINARY": [{
        ProductName: "Sweet Chilli Sauce",
        Des: "It is commonly made with red chili peppers , rice wine vinegar, sometimes garlic, sometimes fish sauce, and a sweetening ingredient such as fruit or a refined sugar or honey.",
        Price: "190"
    }, {
        ProductName: "Mexican Salsa Sauce",
        Des: "A salsa is a mixture of chopped vegetables or fruit with a variety of flavourings. A side dish originating in Mexican cuisine, it is now popular served with barbequed meats, chicken or seafood. Tomatoes are often used as the base and combined with cucumber, onion, garlic, herbs and lemon or lime juice.",
        Price: "210"
    }, {
        ProductName: "Tomato Sauce",
        Des: "A tomato sauce consists of chopped tomatoes  in olive oil and simmered until they lose their raw flavor, seasoned to taste with salt, or other herbs or spices.",
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

//Contact US
const contactSchema = new mongoose.Schema({
    email: String,
    message: String
})
const Contact = mongoose.model("contact", contactSchema)


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
                if (productArray.length == 0) {
                    res.redirect("cart")
                } else {


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

app.post("/feedBack", (req, res) => {
    var email = req.body.email;
    var message = req.body.message;

    const newFeedBack = new Contact({
        email: email,
        message: message
    })
    newFeedBack.save()
    res.redirect("/contact");
})


// Admin
// remover User
app.get("/feedBack", (req, res) => {
    Contact.find({}, (err, output) => {
        if (!err) {

            res.render("feedBack", { username: adminSign, feedback: output });
        }
    })
})
app.post("/removeFeedback", (req, res) => {
    var id = req.body.id;
    Contact.deleteOne({ _id: id }, (err) => {
        if (!err) {
            res.redirect("/feedBack");
        }
    })
})

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

app.post("/viewUserHistory", (req, res) => {
    var username = req.body.username;
    var page = req.body.admin;
    User.findOne({ userid: username }).populate('history').exec((err, output) => {
        if (!err) {
            res.render("adminHistory", { products: output.history, username: username, cartCount: output.cart.length });
        }
    })

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
    var page = req.body.pageName;

    Delivery.updateOne({ userid: user, _id: id }, { paidStatus: "Paid" }, (err, output) => {

        if (page == "admin") {
            res.redirect("/admin");
        } else {
            res.redirect("/delivery");
        }
    })
})

app.post("/delivered", (req, res) => {
    var user = req.body.user;
    var id = req.body.id;
    var page = req.body.pageName;

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
                                                if (page == "admin") {
                                                    res.redirect("/admin");
                                                } else {
                                                    res.redirect("/delivery");
                                                }
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