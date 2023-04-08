let baseURL = "https://real-lime-greyhound-garb.cyclic.app/";

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let name = document.getElementById("name").value;
  let password = document.getElementById("pass").value;
  if (email == "" || name == "" || password == "") {
    alert("Pleasse Fill all Credentials");
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
    let response = await fetch(`${baseURL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(obj),
    });
    if (response.ok) {
      let ans = await response.json();
      alert(ans.msg);
      if (ans.msg === "You have been Blocked") {
        window.location.href = "../index.html";
      } else {
        window.location.href = "./login.html";
      }
    } else {
      console.log("Something wrong");
    }
  } catch (error) {
    console.log(error);
  }
}
