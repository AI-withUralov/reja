console.log("Jack Ma tog'a maslahatlari!");

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
run();


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
console.log("Ushbu harf berilgan so'zda ", javob, " martta qatnashgan")

