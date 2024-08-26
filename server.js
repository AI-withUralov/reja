const http = require("http");  // bu internet orqali ma'lumotlarni uzatish uchun ishlatiladigan protokol.
const mongodb = require("mongodb"); // bu documentga asoslangan NoSQL ma'lumotlar bazasi tizimi.


let db;
const connectionString = "mongodb+srv://SherzodBek:Werzod%402001@cluster1.oliai.mongodb.net/Reja"; // mongodb atlasga ulanish



mongodb.connect(connectionString, {    /// useNewUrlParser: true —-> eski URL parseridan yangisiga o'tishni ta'minlaydi.
    useNewUrlParser: true, useUnifiedTopology: true,   // useUnifiedTopology: true — bu yangi Topology menejmentini qo'llab-quvvatlaydi va ba'zi eski xatoliklarni bartaraf etadi.
}, (err, client) => {
    if (err) console.log("Error on connection to Mongodb");
    else {
        console.log("MongoDB connection succed!");
        module.exports = client;   // connect bulgan MongoDB ni file package orqali export qilinyabdi
        const app = require('./app');
        const server = http.createServer(app); // bu yerda server yaratilyabdi 
        let PORT = 3000;
        server.listen(PORT, function(){ // bu yerda portni ishlayotgani haqida serverga log qilinyabdi
            console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
        }); 
    } 
})


