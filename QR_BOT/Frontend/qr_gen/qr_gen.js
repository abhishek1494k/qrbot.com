const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  // Validate url
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector("img").src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
  if (size !== "" && url !== "") {
    let obj = {
      url,
      size,
    };
    fetch_QR(obj);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  // link.classList =
  //   "bg-[#0cc0df] hover:bg-[#055664]-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = `<i class="fa-solid fa-file-arrow-down"></i> Save Image`;
  document.getElementById("generated").appendChild(link);
};

hideSpinner();
form.addEventListener("submit", onGenerateSubmit);

const fetch_QR = async (obj) => {

  try {
    let response = await fetch(
      "http://localhost:5500/qr/post", //!!----------//
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify(obj),
      }
    );
    if (response.ok) {
      let ans = await response.json();
      console.log(ans);
    }
  } catch (error) {
    console.log(error);
  }
};
