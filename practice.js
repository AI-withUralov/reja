class Array {
    arr = [2,4,6,20,1];

    constructor(new_arr = []){
        this.new_arr = new_arr;
    }
    kupaytir(num){
        return num + 10
    } 
    map(){
        for(let i = 0; i < this.arr.length; i++) {
            this.new_arr.push(this.kupaytir(this.arr[i]))
        }
        return this.new_arr
    }   
   
   
}

const instance = new Array();

const javob = instance.map();
console.log("Natija =",javob)


module.exports = Array;