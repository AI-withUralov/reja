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

app.post("/delete-item", (req, res) => {   // /delete-item URL  orqali kelgan POST so'rovlariga bu funksiya javob beradi.
    const id = req.body.id;    // o'chirilishi kerak bo'lgan elementni id ga tenglab oladi
    db.collection("plans").deleteOne(  /// plans kolleksiyasidan id ga mos keladigan birinchi hujjatni o'chiradi.
      { _id: new mongodb.ObjectId(id) }, // id qiymati MongoDB ning ObjectId turiga aylantiriladi.
      function (err, data) {
        res.json({ state: "success" });
      }
    );
  });

app.post("/delete-all", (req, res) => {
    if (req.body.delete_all) {
      db.collection("plans").deleteMany(function () {
        res.json({ state: "hamma rejalar ochirildi" });
      });
    }
});
  

  
app.post("/edit-item", (req, res) => {
    const data = req.body;
    console.log(data);
    db.collection("plans").findOneAndUpdate(
      { _id: new mongodb.ObjectId(data.id) },
      { $set: { reja: data.new_input } },  /// reja maydoni data.new_input qiymatiga o'zgartiriladi.
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