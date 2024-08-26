const express = require("express");
const app = express();
const port = 4;

app.get('/', (req, res) => {
    res.send("Expressga kirdek");
});

app.listen(port, () => {
    console.log(`example app is listening on the port ${port}`);
});

app.post('/', (req, res) => {
    res.send('Post yetib keldi!')
})

































// class Array {
//     arr = [2,4,6,20,1];
//     constructor(new_arr = []){
//         this.new_arr = new_arr;
//     }
//     kupaytir(num){
//         return num + 10
//     } 
//     map(){
//         for(let i = 0; i < this.arr.length; i++) {
//             this.new_arr.push(this.kupaytir(this.arr[i]))
//         }
//         return this.new_arr
//     }   
// }
// const instance = new Array();
// const javob = instance.map();
// console.log("Natija =",javob)
// module.exports = Array;


