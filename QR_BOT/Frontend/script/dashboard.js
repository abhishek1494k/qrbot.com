let baseURL="https://qrbot-backend.onrender.com/"




let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let gen = document.getElementById("gen");
let analysed = document.getElementById("analysed");

btn1.addEventListener("click", () => {
  gen.style.display = "block";
  analysed.style.display = "none";
  document.getElementById("g").innerHTML = "";
  showAllUsers();
});

async function showAllUsers() {
  let email = JSON.parse(localStorage.getItem("email"));
  let res = await fetch(baseURL+`admin/usersQR/${email}`) //!!----------//
    .then((res) => res.json())
    .then((res) => {
      let arr1 = res.data;
      renderData(arr1);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderData(arr1) {
  arr1.map((item, index) => {
    let gen = document.getElementById("g");
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    td1.innerHTML = index + 1;
    td2.innerHTML = item.url;
    td3.innerHTML = item.size;
    td4.innerHTML = "12:00:45";
    tr.append(td1, td2, td3, td4);
    gen.append(tr);
  });
}

btn2.addEventListener("click", () => {
  gen.style.display = "none";
  analysed.style.display = "block";
  document.getElementById("a").innerHTML = "";
  showAllUsersQRAna();
});

async function showAllUsersQRAna() {
  let email = JSON.parse(localStorage.getItem("email"));
  let res = await fetch(baseURL+`admin/usersQRAna/${email}`) //!!----------//
    .then((res) => res.json())
    .then((res) => {
      let arr1 = res.data;
      renderDataQRAna(arr1);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderDataQRAna(data) {
  data.map((item, index) => {
    let ana = document.getElementById("a");
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td4 = document.createElement("td");
    td1.innerHTML = index + 1;
    td2.innerHTML = item.url;
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    td4.innerHTML = `${hours}:${minutes}:${seconds}`
    tr.append(td1, td2, td4);
    ana.append(tr);
  });
}

let name1 = JSON.parse(localStorage.getItem("name"));
let nameDisplay = document.getElementById("name");
nameDisplay.innerHTML = name1;
