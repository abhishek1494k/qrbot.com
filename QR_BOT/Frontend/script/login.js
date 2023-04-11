const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  if (email == "" || password == "") {
    swal("", "Fill all Credentials", "warning").then(function () {
      window.location.href = "./login.html";
    });
  } else {
    let obj = {
      email,
      password,
    };
    fetch_login(obj);
  }
});

async function fetch_login(obj) {
  try {
    let response = await fetch("http://localhost:5500/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(obj),
    });
    if (response.ok) {
      let result = await response.json();
      result.msg=== "Login Successful"?
      swal("", `${result.msg}`, "success").then(function () {
        if (result.name == "Admin") {
          window.location.href = "../HTML/admin.html";
        } else {
          localStorage.setItem("name", JSON.stringify(result.name));
          localStorage.setItem("token", JSON.stringify(result.token));
          localStorage.setItem("email", JSON.stringify(result.email));
          window.location.href = "../index.html";
        }
      }):swal("", `${result.msg}`, "warning")
      console.log(result.msg)
    }
  } catch (error) {
    swal("", "Error Login", "warning").then(function () {
      window.location.href = "./login.html";
    });
  }
}
