let motherDiv = document.getElementsByClassName("sales-details");
let dashboard = document.getElementById("dashboard");
let details = document.getElementById("details");
let deleteBtn = document.getElementById("deleteBtn");

let bag = [];
let qr = 0;
let count = 0;
let total = 0;

dashboard.addEventListener("click", async () => {
  showAllUsers();
});

details.addEventListener("click", async () => {
  showUsers();
  console.log("users clicked");
});

deleteBtn.addEventListener("click", async () => {
  deleteUsers();
  console.log("delete clicked");
});

async function showAllUsers() {
  let res = await fetch("http://localhost:5500/admin/allData")
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data);
      total = res.data.length;
      qr = res.qr.length;
      count = res.count;
      bag = [...res.data];
      render(bag);
      renderData(total, qr, count);
    })
    .catch((err) => {
      console.log(err);
    });
}
showAllUsers();

async function render(bag) {
  motherDiv.innerHTML = "";
  let nameDiv = document.getElementById("name");
  let emailDiv = document.getElementById("email");
  let statusDiv = document.getElementById("status");
  nameDiv.innerHTML = `<li class="topic">Name</li>
    ${bag
      .map((item) => {
        let id = item._id;
        let name = item.name;
        return renderName(name, id);
      })
      .join("")}
    `;
  emailDiv.innerHTML = `<li class="topic">Email</li>
    ${bag
      .map((item) => {
        let email = item.email;
        return renderEmail(email);
      })
      .join("")}
    `;
  statusDiv.innerHTML = `<li class="topic">Status</li>
    ${bag
      .map((item) => {
        let status = item.status;
        return renderStatus(status);
      })
      .join("")}
    `;

  //   let delete_btns = document.querySelectorAll(".delete-btn");
  //   for (delete_btn of delete_btns) {
  //     delete_btn.addEventListener("click", function () {
  //       let id = event.target.dataset.id;
  //       deletePdt(id);
  //     });
  //   }
}
function renderName(name, id) {
  return `<li><a href="#">${name}</a></li>`;
}
function renderEmail(email) {
  return `<li><a href="#">${email}</a></li>`;
}
function renderStatus(status) {
  return status
    ? `<li><a style="color:blue;" href="#">Active</a></li>`
    : `<li><a style="color:red;" href="#">Blocked</a></li>`;
}
function renderData(total, qr, count) {
  document.getElementById("total").innerText = total;
  document.getElementById("qr").innerText = qr;
  document.getElementById("count").innerText = count;
}

//----------------------------------------------------------------------------------------

async function showUsers() {
  let res = await fetch("http://localhost:5500/admin/allData")
    .then((res) => res.json())
    .then((res) => {
      renderUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function renderUser(bag) {
  motherDiv.innerHTML = "";
  let nameDiv = document.getElementById("name");
  let emailDiv = document.getElementById("email");
  let statusDiv = document.getElementById("status");
  nameDiv.innerHTML = `<li class="topic">Name</li>
      ${bag
        .map((item) => {
          let id = item._id;
          let name = item.name;
          return renderName(name, id);
        })
        .join("")}
      `;
  emailDiv.innerHTML = `<li class="topic">Email</li>
      ${bag
        .map((item) => {
          let email = item.email;
          return renderEmail(email);
        })
        .join("")}
      `;
  statusDiv.innerHTML = `<li class="topic">Status</li>
      ${bag
        .map((item) => {
          let status = item.status;
          let id = item._id;
          return renderUserStatus(status, id);
        })
        .join("")}
      `;

  let block_btns = document.querySelectorAll(".block-btn");
  for (block_btn of block_btns) {
    block_btn.addEventListener("click", function (event) {
      let id = event.target.dataset.id;
      blockPdt(id);
    });
  }

  let activate_btns = document.querySelectorAll(".activate-btn");
  for (activate_btn of activate_btns) {
    activate_btn.addEventListener("click", function (event) {
      let id = event.target.dataset.id;
      activatePdt(id);
    });
  }
}

function renderUserStatus(status, id) {
  return status
    ? `<li><button data-id=${id}  class="block-btn" style="color:red;" href="#"> Block❌ </button></li>`
    : `<li><button data-id=${id} class="activate-btn" style="color:blue;" href="#"> Activate </button></li>`;
}

async function blockPdt(id){
    console.log(id)
    let res = await fetch(`http://localhost:5500/admin/blockUser/${id}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res.msg)
        showUsers();
        count++
        renderData(total, qr, count);
    })
}
async function activatePdt(id){
    console.log(id)
    let res = await fetch(`http://localhost:5500/admin/unblockUser/${id}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res.msg)
        showUsers();
        count--
        renderData(total, qr, count);
    })
}

//------------------------------------------------------------------------

async function deleteUsers() {
  let res = await fetch("http://localhost:5500/admin/allData")
    .then((res) => res.json())
    .then((res) => {
      renderDeleteUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function renderDeleteUser(bag) {
  motherDiv.innerHTML = "";
  let nameDiv = document.getElementById("name");
  let emailDiv = document.getElementById("email");
  let statusDiv = document.getElementById("status");
  nameDiv.innerHTML = `<li class="topic">Name</li>
      ${bag
        .map((item) => {
          let id = item._id;
          let name = item.name;
          return renderName(name, id);
        })
        .join("")}
      `;
  emailDiv.innerHTML = `<li class="topic">Email</li>
      ${bag
        .map((item) => {
          let email = item.email;
          return renderEmail(email);
        })
        .join("")}
      `;
  statusDiv.innerHTML = `<li class="topic">Actions</li>
      ${bag
        .map((item) => {
          // let status = item.status;
          let id = item._id;
          // console.log(id)
          return renderDeleteUserStatus(id);
        })
        .join("")}
      `;

  let delete_btns = document.querySelectorAll(".delete-btn");
  for (delete_btn of delete_btns) {
    delete_btn.addEventListener("click", function (event) {
      let id = event.target.dataset.id;
      // console.log(id)
      deletePdt(id);
    });
  }
}

function renderDeleteUserStatus(id) {
  return  `<li><button data-id=${id}  class="delete-btn"  href="#"> DELETE  </button></li>`
    
}

async function deletePdt(id){
    // console.log(id)
    let res = await fetch(`http://localhost:5500/admin/deleteUser/${id}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res.msg)
        showUsers();
        total--;
        count--;
        renderData(total, qr, count);
    })
}


// //DELETE PDT------------------------------------------------>
// async function deletePdt(id) {
//   let res = await fetch(`https://good-rose-goshawk-yoke.cyclic.app/pdt/${id}`, {
//     method: "DELETE",
//     headers: { Authorization: localStorage.getItem("token") },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       alert(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   let res2 = await fetch("https://good-rose-goshawk-yoke.cyclic.app/pdt", {
//     headers: { Authorization: localStorage.getItem("token") },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       bag = [...res];
//       render(bag); //  DISPLAY********************************------>
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// //UPDATE PDT------------------------------------------------>
// async function updatePdt(id) {
//   localStorage.setItem("id", id);
//   motherDiv.innerHTML = "";
//   let div1 = document.createElement("div");
//   div1.setAttribute("id", "updatePdt");
//   motherDiv.append(div1);

//   document.getElementById("updatePdt").innerHTML = "";
//   document.getElementById("updatePdt").innerHTML = `
//     <div id="register1">
//       <label for="">Name</label>
//       <input type="text" id="name" placeholder="Enter Name" />
//       <label for="">Image</label>
//       <input type="text" id="image" placeholder="Enter Pdt Image" />
//       <label for="">Rating</label>
//       <input type="number" id="rating" placeholder="Enter Rating" />
//       <label for="">Low Price</label>
//       <input type="number" id="lowprice" placeholder="Enter Low Price" />
//       <label for="">High Price</label>
//       <input type="number" id="highprice" placeholder="Enter High Price" />
//       <label for="">Quantity</label>
//       <input type="number" id="quantity" placeholder="Enter Quantity" />
//       <label for="">Category</label>
//       <input type="text" id="category" placeholder="Enter Category" />
//       <input onclick="update()" type="submit" id="updatebtn" />
//     </div>
//     `;

//   let res = await fetch(`https://good-rose-goshawk-yoke.cyclic.app/pdt/${id}`, {
//     headers: { Authorization: localStorage.getItem("token") },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       document.getElementById("name").value = res.name;
//       document.getElementById("image").value = res.image;
//       document.getElementById("rating").value = res.rating;
//       document.getElementById("lowprice").value = res.lowprice;
//       document.getElementById("highprice").value = res.highprice;
//       document.getElementById("quantity").value = res.quantity;
//       document.getElementById("category").value = res.category;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// async function update() {
//   let name = document.getElementById("name").value;
//   let image = document.getElementById("image").value;
//   let rating = document.getElementById("rating").value;
//   let lowprice = document.getElementById("lowprice").value;
//   let highprice = document.getElementById("highprice").value;
//   let quantity = document.getElementById("quantity").value;
//   let category = document.getElementById("category").value;
//   let data = {
//     name,
//     image,
//     rating,
//     lowprice,
//     highprice,
//     quantity,
//     category,
//   };
//   let id = localStorage.getItem("id");
//   console.log(id);
//   bag = { ...data };

//   let res = await fetch(`https://good-rose-goshawk-yoke.cyclic.app/pdt/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("token"),
//     },
//     body: JSON.stringify(bag),
//   });
//   const msg = await res.json();
//   alert(msg);

//   let res2 = await fetch("https://good-rose-goshawk-yoke.cyclic.app/pdt", {
//     headers: { Authorization: localStorage.getItem("token") },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       // console.log(res);
//       bag = [...res];
//       render(bag); //Display------------------------------------------------>
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// //---------------------------USERS-----------------------------//

// let showuser = document.getElementById("showUserBtn");
// let user = [];
// showuser.addEventListener("click", async () => {
//   let res = await fetch("https://good-rose-goshawk-yoke.cyclic.app/showuser")
//     .then((res) => res.json())
//     .then((res) => {
//       user = [...res];
//       console.log(user);
//       renderUser(user); //  DISPLAY********************************------>
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// function renderUser(user) {
//   //  DISPLAY***********************------>
//   console.log("ABC");
//   motherDiv.innerHTML = "";
//   let div = document.createElement("div");
//   div.setAttribute("id", "showUser");
//   motherDiv.append(div);

//   document.getElementById("showUser").innerHTML = "";
//   document.getElementById("showUser").innerHTML = `
//   ${user
//     .map((item) => {
//       let id = item._id;
//       let name = item.name;
//       let email = item.email;
//       let mob = item.mob;
//       return `<div>
//       <div><h5>Name: ${name}</h5></div>
//       <div><h5>Email: ${email} </h5></div>
//       <div><h5>Mobile: ${mob}</h5></div>
//       <div><button  class="user_delete-btn" data-id=${id} >Delete</button></div>
//       </div>`;
//     })
//     .join("")}
//   `;

//   let user_delete_btns = document.querySelectorAll(".user_delete-btn");
//   for (delete_btn of user_delete_btns) {
//     delete_btn.addEventListener("click", function () {
//       let id = event.target.dataset.id;
//       deleteUser(id);
//     });
//   }
// }

// async function deleteUser(id) {
//   let res = await fetch(
//     `https://good-rose-goshawk-yoke.cyclic.app/deleteuser/${id}`,
//     {
//       method: "DELETE",
//     }
//   )
//     .then((res) => res.json())
//     .then((res) => {
//       alert(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   let res2 = await fetch("https://good-rose-goshawk-yoke.cyclic.app/showuser")
//     .then((res) => res.json())
//     .then((res) => {
//       user = [...res];
//       renderUser(user); //  DISPLAY********************************------>
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
