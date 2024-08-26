console.log("Web Serverni boshlash");
const express = require('express'); 
const app = express();


const fs = require('fs');

let user;
fs.readFile('database/user.json', 'utf8', (err, data) => {    // user.json file cihidagi ma'lumotni uqib beradi
    if(err) {
        console.log('Error:', err);
    }else {
        user = JSON.parse(data)
    }
});

// MongoDB chaqirish
const db = require("./server").db();   /// Import qilingan modullardan db nomli funksiyani chaqiradi
const mongodb = require("mongodb"); 

//1 Kirish code
app.use(express.static('public'));  /// public papkangizdagi barcha fayllar web orqali bevosita kirish uchun ochiq bo'ladi.
app.use(express.json()); // malumotni json formatdan -> object formatiga ugirb beradi
app.use(express.urlencoded({extended: true}));  // html forumdan requestlani kirishiga ruhsat beradi



//2 Session code


//3 Views code
app.set("views", "views");  /// tells Express to look for view templates in the views directory. buyerda 2- views bu papka nomi
app.set("view engine", "ejs") /// This line tells Express which templating engine to use when rendering views. Bu yerda ejs - view engine dan foydalanilyabdi

//4 Routing code  ---> bu serverga kelgan HTTP so’rovlarini (request) qaysi yo’nalishga (route) yuborish kerakligini belgilash jarayonidir.
app.post("/create-item", (req, res) => {    // malumotni olib keladi va databasega yozadi
    console.log("User entered /");
    console.log(req.body)
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => { /// bu code MongoDB dagi plans nomli collectionga new_reja dagi malumotni qushib beradi
      console.log(data.ops);
      res.json(data.ops[0]);
    });
});

app.post("/delete-item", (req, res) => {
    const id = req.body.id;
    db.collection("plans").deleteOne(
      { _id: new mongodb.ObjectId(id) },
      function (err, data) {
        res.json({ state: "success" });
      }
    );
  });
  
  


// app.get('/author', (req, res) => {          ///This route handles GET requests sent to /author. GET routes are typically used to retrieve and display data.
//     res.render('author',  {user: user});
// });

app.get('/', function (req, res) {   /// databasedagi ma'lumotni uqsh uchun get ishlatiladi
    console.log("User entered /");
    db.collection("plans").find()   /// bu code MongoDBdagi plans nomli collectiondan malumotlarni olib Express.js yordamida HTML sahifada ko'rsatadi
    .toArray((err, data) => {
        if (err) {
            console.log(err)
            res.end("Something went wrong!");
        }else { // Agar ma'lumot muvaffaqiyatli olingan bo'lsa,  reja nomli viewga yuboradi.
            res.render("reja", {items: data }); // bu yerda data massivini items deb nomlab olinyabdi
        }
    })
});


module.exports = app;