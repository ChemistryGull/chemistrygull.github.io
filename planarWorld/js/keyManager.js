var keys = [];
var keyCode = {
  mLeft: 65, //A
  mRight: 68, //D
  mUp: 87, //W
  mDown: 83, //S

  mSpeed: 16, //Shift
  interact: 32, //Space
  openInv: 69, //E
  f12: 123,
  f5: 116
}

document.addEventListener("keypress", function (e) {
  // e.preventDefault()
  if (e.keyCode == 32) {
    if (running) {
      console.log("### STOP GAME ###");
      running = false;
    } else {
      console.log("### START GAME ###");
      running = true;
      Time.lastTime = Date.now();
      startAnimating(S.fps)

    }
  }


});

window.addEventListener("keydown", function (e) {
  if (e.target != document.body) {
    return;
  }
  if (e.keyCode == keyCode.f12 || e.keyCode == keyCode.f5 ) {
    return;
  }

  // if (e.keyCode == keyCode.mLeft) {
  //   player.x -= 1;
  // }
  // if (e.keyCode == keyCode.mRight) {
  //   player.x += 1;
  // }
  // if (e.keyCode == keyCode.mUp) {
  //   player.y -= 1;
  // }
  // if (e.keyCode == keyCode.mDown) {
  //   player.y += 1;
  // }


  keys = (keys || []);
  keys[e.keyCode] = true;

});

window.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
  keysUp = e.keyCode;
});
