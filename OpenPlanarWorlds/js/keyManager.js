var keys = [];
var keyCode = {
  mLeft: "KeyA", //A
  mRight: "KeyD", //D
  mUp: "KeyW", //W
  mDown: "KeyS", //S

  mSpeed: "ShiftLeft", //Shift
  interact: "Space", //Space
  openInv: "KeyE", //E
  f12: "F12",
  f5: "F5"
}

// document.addEventListener("mousemove", function(ev){
//   cursorPos = [ev.clientX, ev.clientY];
//   if (InvEngine.holding != null) {
//     document.getElementById('itemAtPointer').style.transform = 'translateY(' + (ev.clientY - Ui.invItemH / 3) + 'px)';
//     document.getElementById('itemAtPointer').style.transform += 'translateX(' + (ev.clientX - Ui.invItemH / 3) + 'px)';     
//   }
       
// });

document.addEventListener("keypress", function (e) {
  // e.preventDefault()
  // console.log(e);
  
  if (e.code == "Space") {
    if (app.ticker.started == true) {
      app.ticker.stop()
      console.log("### Main Loop Paused ###");
    }
    else {
      app.ticker.start()
      console.log("### Main Loop Started ###");
    }
  }
  // if (e.code == keyCode.openInv) {
  //   console.log("Toggle inv");
  //   $(".gameUi").toggle();
  // }


});



window.addEventListener("keydown", function (e) {
  if (e.target != document.body) {
    return;
  }
  if (e.code == keyCode.f12 || e.code == keyCode.f5 ) {
    return;
  }

  

  keys = (keys || []);
  keys[e.code] = true;


});

window.addEventListener("keyup", function (e) {
  keys[e.code] = false;
  keysUp = e.code;
});
