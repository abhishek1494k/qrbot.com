const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let name = document.getElementById("name").value;
  let password = document.getElementById("pass").value;
  if (email == "" || name == "" || password == "") {
    alert("Please Fill all Credentials");
  } else {
    let obj = {
      email,
      password,
      name,
    };
    fetch_sign(obj);
  }
});

async function fetch_sign(obj) {
  try {
    let response = await fetch(`https://tough-tan-narwhal.cyclic.app/signup`, {//!!----------//
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(obj),
    });
    if (response.ok) {
      localStorage.clear();
      let ans = await response.json();
      ans.msg === "Successfully Signed Up"
        ? swal("", `${ans.msg}`, "success").then(function () {
            window.location.href = "./login.html";
          })
        : swal("", `${ans.msg}`, "warning");
    } else {
      swal("", "Error", "warning");
    }
  } catch (error) {
    console.log(error);
    swal("", "Error", "warning").then(function () {
      window.location.href = "./login.html";
    });
  }
}

