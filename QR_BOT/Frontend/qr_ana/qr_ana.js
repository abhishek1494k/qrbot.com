const wrapper = document.querySelector(".wrapper"),
  form = wrapper.querySelector("form"),
  fileInp = form.querySelector("input");
(infoText = form.querySelector("p")),
  (closeBtn = wrapper.querySelector(".close")),
  (copyBtn = wrapper.querySelector(".copy"));

function fetchRequest(formData, file) {
  infoText.innerText = "Scanning QR Code...";
  fetch("https://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
    mode: "cors",
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldn't Scan QR Code";
      if (!result) return;
      addQRResult(result);
      wrapper.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't Scan QR Code";
    });
}
fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
  copyBtn.innerText = "Copied";
});
form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
  window.location.reload();
});

async function addQRResult(data) {
    let obj = {
    url: data,
  };
  try {
    let res = await fetch("http://localhost:5500/qrana/post", { //!!----------//
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
      });
  } catch (error) {
    console.log(error);
  }
}
