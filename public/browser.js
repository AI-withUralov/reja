console.log("Browser JS ishga tushdi");

function itemTemplate(item) {
   return `<li class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
        <span class="item-text"> ${item.reja} </span><div>
        <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">O'zgartish</button>  
        <button data-id="${item._id}"  class="delete-me btn btn-danger btn-sm">O'chirish</button>
        </div> <!-- data-id atributi orqali item ning _id qiymatini saqlaydi. -->
                    
    </li>`
}


let createField = document.getElementById("create_field");  /// forumdan keladigan input ID ni tenglab olyabmiz

document.getElementById("create-form").addEventListener('submit', function (e) {
    e.preventDefault(); // Boshqa page ga utib ketmasilig uchun yani sahifa qayta avtomatik yuklanmaydi

    axios.post("/create-item", {reja: createField.value}) // Axios - Rest API hosil qilishda ishlatiladi.
    .then((response) =>{ 
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data)); // Bu qism yangi yaratilgan itemni (reja) sahifadagi ro'yxatni oxiriga qo'shadi:
        createField.value = "" // Yangi item qo'shilgandan so'ng, input maydonini tozalaydi
        createField.focus(); // Input maydoniga avtomatik fokus o'rnatadi
    }).catch((err) => {
        console.log("Iltimos qaytadan harakat qiling")
    });
});


document.addEventListener("click", function (e) {
    // delete oper
    console.log(e.target);  // click qilingan element consolega chiqadi
    if (e.target.classList.contains("delete-me")) { // click qilingan elementning class ro'yxatida "delete-me" nomli klass bor yoki yo'qligi tekshiriladi.
      if (confirm("Aniq ochirmoqchimisiz?")) { // o'chirishni tasdiqlash talab qilinadi.
        axios
          .post("/delete-item", { id: e.target.getAttribute("data-id") })  // "delete-me" tugmasining data-id atributidagi qiymat olinadi
          .then((respose) => {
            console.log(respose.data);
            e.target.parentElement.parentElement.remove(); // buyerda e parametrini ikkinchi parenti uchiriladi- yani butunlay viewdan olib tashlanadi
          })
          .catch((err) => {
            console.log("Iltimos qaytadan harakat qiling!");
          });
      }
    }
    // edit oper
    if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "O'zgartirish kiriting",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
        if (userInput) {
      axios
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"),
          new_input: userInput,
        })
        .then((response) => {
          console.log(response.data);
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch((err) => {
          console.log("Iltimos qaytadan harakat qiling!");
        });
    }
  }
  
});
  
document.getElementById("clean-all").addEventListener("click", function () {
    axios.post("/delete-all", { delete_all: true })
      .then((response) => {
        alert(response.data.state);
        document.location.reload();
      });
  });
  
  

