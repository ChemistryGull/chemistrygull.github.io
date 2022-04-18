

window.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 66: // --- "b"
      if (!window.location.href.includes("index.html")) {
        window.location.href = "../../index.html";
      }
      break;
    default:

  }
  console.log(e.keyCode);
})
