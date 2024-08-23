const http = require("http");
const mongodb = require("mongodb");


let db;
const connectionString = "mongodb+srv://SherzodBek:Werzod%402001@mycluster.oliai.mongodb.net/Reja?authSource=admin&replicaSet=atlas-1371sn-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";


mongodb.connect(connectionString, {
    useNewUrlParser: true, useUnifiedTopology: true,
}, (err, client) => {
    if (err) console.log("Error on connection to Mongodb");
    else {
        console.log("MongoDB connection succed!");
        module.exports = client;
        const app = require('./app');
        const server = http.createServer(app);
        let PORT = 3000;
        server.listen(PORT, function(){
            console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
        }); 
    } 
})


