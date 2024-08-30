//console.log("Jack Ma tog'a maslahatlari!");

const list = [
    "Yaxshi talaba buling!",  // 0-20
    "To'g'ri boshliq tanlang va hatolardan hulosa chiqaring!", // 20 -30
    "O'z ustingizda ishlashni boshlang!", // 30-40
    "Siz kuchli bo'lgan narsalarni qiling!", // 40 - 50
    "Yoshlarga investitsiya qiling!", // 50 -60
    "O'limga tayyorlaning!" // 60 +
];

// function maslahatBering(a , calback) {
//     if (typeof a !== "number") calback("Please Insert Number:", null);
//     else if (a <= 20) calback (null, list[0]);
//     else if (a >= 20 && a <= 30) calback(null, list[1]);
//     else if (a >= 30 && a <= 40) calback(null, list[2]);
//     else if (a >= 40 && a <= 50) calback(null, list[3]);
//     else if (a >= 50 && a <= 60) calback(null, list[4]);
//     else {
//         setTimeout(function() {
//             calback(null, list[5])
//         }, 5000);
//     }
// }
// console.log("Passed here 0")
// maslahatBering(70, (err, data) => {
//     if (err) console.log("Error:", err);
//     else {
//         console.log("javob:", data);
//     }
// });

// console.log("Passed here 1");


// Qachonki barcha synchoronous functionlar ishga tushib bo'lganda async function ishga tushadi
async function maslahatBering(a ) {
    if (typeof a !== "number") throw new Error("Please Insert Number:");
    else if (a <= 20) return list[0];
    else if (a >= 20 && a <= 30) return list[1];
    else if (a >= 30 && a <= 40) return list[2];
    else if (a >= 40 && a <= 50) return list[3];
    else if (a >= 50 && a <= 60) return list[4];
    else {
        return new Promise((resolve ,reject) => {
            setTimeout(function() {
                resolve (list[5]);
            }, 5000);
        })
        // return list[5];
        
    }
}

// // then // catch methods
// console.log("Passed here 0")
// maslahatBering(23).then((data) => {
//     console.log("Javob: ", data);
// }).catch((err) => {
//     console.log("Error: ", err);
// })

// console.log("Passed here 1");

async function run() {
    let javob = await maslahatBering(20);
    console.log(javob);
    javob = await maslahatBering(63);
    console.log(javob);
    javob = await maslahatBering(44);
    console.log(javob);
    javob = await maslahatBering(12);
    console.log(javob);
}
//run();

// <<-------- Task A-------->>
// Shunday 2 parametrli function tuzing, hamda birinchi parametrdagi letterni ikkinchi parametrdagi sozdan qatnashga sonini return qilishi kerak boladi.
// MASALAN countLetter("e", "engineer") 3ni return qiladi.


function Task_A(letter, word) {
    let count = 0;
    for (let i = 0; i < word.length; i++){
        if(word[i] === letter){
            count ++ ; 
        }
    }
    return count ;
}


const javob = Task_A("a", "applaaa");
//console.log("Ushbu harf berilgan so'zda ", javob, " martta qatnashgan")


// <<-------- Task B-------->>

// Shunday function tuzing, u 1ta string parametrga ega bolsin, hamda osha stringda qatnashgan raqamlarni sonini bizga return qilsin.
// MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return qiladi.

function string(a){
    const digitCount = a.match(/\d/g).length || 0;
    console.log('Qatnashgan raqamlar soni:', digitCount)
}
//string("df3g4vf2gr41");

// <<-------- Task C -------->>
// Shunday function tuzing, u 2ta string parametr ega bolsin, hamda agar har ikkala string bir hil harflardan iborat bolsa true aks holda false qaytarsin
// MASALAN checkContent("mitgroup", "gmtiprou") return qiladi true;

function checker(str1, str2) {

    const normalizeString = str => str
        .toLowerCase()               // Convert to lowercase
        .replace(/[^a-z]/g, '')      // Remove non-alphabetic characters
        .split('')                   // Split into an array of characters
        .sort()                      // Sort the array
        .join('');                   // Join back into a string

    const normalizedStr1 = normalizeString(str1);
    const normalizedStr2 = normalizeString(str2);

    return normalizedStr1 === normalizedStr2;
}

//console.log(checker('MIT15', 'TIM15')); // true
//console.log(checker('Hello', 'World'));   // false

// <<-------- Task C -------->>
// Shunday class tuzing nomi Shop, va uni constructoriga 3 hil mahsulot pass bolsin, 
// hamda classning 3ta methodi bolsin, biri qoldiq, biri sotish va biri qabul. 
// Har bir method ishga tushgan vaqt ham log qilinsin.
// MASALAN: const shop = new Shop(4, 5, 2); shop.qoldiq() return hozir 20:40da 4ta non, 
// 5ta lagmon va 2ta cola mavjud! shop.sotish('non', 3) & shop.qabul('cola', 4) & shop.qoldiq() return 
// hozir 20:50da 1ta non, 5ta lagmon va 6ta cola mavjud!



class Shop {
    constructor(non, lagmon, cola) {
      this.products = {
        non: non,
        lagmon: lagmon,
        cola: cola
      };
    }
  
    // Method to get the current date and time formatted
    getCurrentTime() {
      const now = new Date();
      return now.toTimeString().split(' ')[0]; // Returns HH:MM:SS
    }
  
    // Method to show the current stock of products
    qoldiq() {
      const currentTime = this.getCurrentTime();
      console.log(`Hozir ${currentTime}da ${this.products.non}ta non, ${this.products.lagmon}ta lagmon va ${this.products.cola}ta cola mavjud!`);
    }
  
    // Method to sell a product
    sotish(product, quantity) {
      const currentTime = this.getCurrentTime();
      if (this.products[product] !== undefined && this.products[product] >= quantity) {
        this.products[product] -= quantity;
        console.log(`Hozir ${currentTime}da ${quantity}ta ${product} sotildi.`);
      } else {
        console.log(`Hozir ${currentTime}da yetarli miqdorda ${product} yo'q yoki mavjud emas.`);
      }
    }
  
    // Method to receive stock of a product
    qabul(product, quantity) {
      const currentTime = this.getCurrentTime();
      if (this.products[product] !== undefined) {
        this.products[product] += quantity;
        console.log(`Hozir ${currentTime}da ${quantity}ta ${product} qabul qilindi.`);
      } else {
        console.log(`Hozir ${currentTime}da bunday mahsulot mavjud emas.`);
      }
    }
  }
  
  // Usage example
  // const shop = new Shop(4, 5, 2);
  // shop.qoldiq(); 
  // shop.sotish('non', 3); 
  // shop.qabul('cola', 4); 
  // shop.qoldiq(); 
  


// <<-------- Task E -------->>

  //Shunday function tuzing, u bitta string argumentni qabul qilib osha stringni teskari qilib return qilsin.
  //MASALAN: getReverse("hello") return qilsin "olleh"
  
function ReverseStr (str) {
  return str.split('').reverse().join('');
}

const result = ReverseStr("hello");
console.log(result)