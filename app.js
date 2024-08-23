console.log("Web Serverni boshlash");
const express = require('express');
const app = express();

const fs = require('fs');

let user;
fs.readFile('database/user.json', 'utf8', (err, data) => {
    if(err) {
        console.log('Error:', err);
    }else {
        user = JSON.parse(data)
    }
});

// MongoDB chaqirish
const db = require("./server").db();


//1 Kirish code
app.use(express.static('public'));  /// har qanday browserdan kirib kelgan zaproslar uchun public folder ochiq
app.use(express.json()); // malumotni object holatiga ugirb beradi
app.use(express.urlencoded({extended: true}));  // html forumdan requestlani kirishiga ruhsat beradi



//2 Session code


//3 Views code
app.set("views", "views");  /// tells Express to look for view templates in the views directory.
app.set("view engine", "ejs") /// This line tells Express which templating engine to use when rendering views.

//4 Routing code
app.post("/create-item", (req, res) => {    // malumotni olib keladi va databasega yozadi
    console.log("User entered /");
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
        if (err) {
            console.log(err);
            res.end("something went wrong");
        }else {
            res.end("successfully added!")
        }
    })
})

// app.get('/author', (req, res) => {          ///This route handles GET requests sent to /author. GET routes are typically used to retrieve and display data.
//     res.render('author',  {user: user});
// });

app.get('/', function (req, res) {   /// databasedagi ma'lumotni uqsh uchun get
    console.log("User entered /");
    db.collection("plans").find()
    .toArray((err, data) => {
        if (err) {
            console.log(err)
            res.end("Something went wrong!");
        }else {
            res.render("reja", {items: data });
        }
    })
});


module.exports = app;