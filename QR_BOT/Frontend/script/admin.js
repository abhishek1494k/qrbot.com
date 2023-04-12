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
  let res = await fetch("hhttps://tough-tan-narwhal.cyclic.app/admin/allData")//!!----------//
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data);
      total = res.data.length;
      qr = res.qr.length;
      count = res.count;
      qrAna = res.qrAna.length;
      bag = [...res.data];
      render(bag);
      renderData(total, qr, count, qrAna);
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
        let name = item.name;
        let status = item.status;
        return renderStatus(status, name);
      })
      .join("")}
    `;
}
function renderName(name, id) {
  if (name !== "Admin") return `<li><a href="#">${name}</a></li>`;
}
function renderEmail(email) {
  if (email !== "admin@gmail.com") return `<li><a href="#">${email}</a></li>`;
}
function renderStatus(status, name) {
  if (name !== "Admin") {
    return status
      ? `<li><a style="color:blue;" href="#">Active</a></li>`
      : `<li><a style="color:red;" href="#">Blocked</a></li>`;
  }
}
function renderData(total, qr, count, qrAna) {
  document.getElementById("total").innerText = total;
  document.getElementById("qr").innerText = qr;
  document.getElementById("count").innerText = count;
  document.getElementById("qrAna").innerText = qrAna;
}

//----------------------------------------------------------------------------------------

async function showUsers() {
  let res = await fetch("https://tough-tan-narwhal.cyclic.app/admin/allData") //!!----------//
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

async function blockPdt(id) {
  console.log(id);
  let res = await fetch(`https://tough-tan-narwhal.cyclic.app/admin/blockUser/${id}`, { //!!----------//
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.msg);
      showUsers();
      count++;
      renderData(total, qr, count);
    });
}
async function activatePdt(id) {
  console.log(id);
  let res = await fetch(`https://tough-tan-narwhal.cyclic.app/admin/unblockUser/${id}`, { //!!----------//
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.msg);
      showUsers();
      count--;
      renderData(total, qr, count);
    });
}

//------------------------------------------------------------------------

async function deleteUsers() {
  let res = await fetch("hhttps://tough-tan-narwhal.cyclic.app/admin/allData") //!!----------//
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
          return renderDeleteUserStatus(id);
        })
        .join("")}
      `;

  let delete_btns = document.querySelectorAll(".delete-btn");
  for (delete_btn of delete_btns) {
    delete_btn.addEventListener("click", function (event) {
      let id = event.target.dataset.id;
      deletePdt(id);
    });
  }
}

function renderDeleteUserStatus(id) {
  return `<li><button data-id=${id}  class="delete-btn"  href="#"> DELETE  </button></li>`;
}

async function deletePdt(id) {
  let res = await fetch(`https://tough-tan-narwhal.cyclic.app/admin/deleteUser/${id}`, { //!!----------//
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.msg);
      showUsers();
      total--;
      count--;
      renderData(total, qr, count);
    });
}
