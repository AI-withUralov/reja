console.log("Web Serverni boshlash");
const express = require('express');
const app = express();
const http = require("http");

//1 Kirish code
app.use(express.static('public'));  /// har qanday browserdan kirib kelgan zaproslar uchun public folder ochiq
app.use(express.json()); // malumotni object holatiga ugirb beradi
app.use(express.urlencoded({extended: true}));  // html forumdan yuborilgan narsalarni qabul qilib oladi



//2 Session code


//3 Views code
app.set("views", "views");
app.set("view engine", "ejs")

//4 Routing code
app.post("/create-item", (req, res) => {    // malumotni olib keladi va databasega yozadi
    console.log(req.body);
    res.json({test: "success"});
})

app.get('/', function (req, res) {   /// databasedagi ma'lumotni uqsh uchun get
    res.render('harid');
});


const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function(){
    console.log(`The server is running successfully on port: ${PORT}`);
});
