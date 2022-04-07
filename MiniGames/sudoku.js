var sdkMap = [
  // "", "", "", "", "", "", "", "", "",
  // "", "", "", "", "", "", "", "", "",
  // "", "", "", "", "", "", "", "", "",
  // "", "", "", "", "", "", "", "", "",
  // "", "", "", "", "", "", "", "", "",
  // "", "", "", "", "", "", "", "", "",
  // "", "", "", "", "", "", "", "", "",
  // "", "", "", "", "", "", "", "", "",
  // "", "", "", "", "", "", "", "", "",

  "","","6","2","5","","1","","","5","1","9","6","","7","","2","","7","","4","9","","","5","8","6","6","5","","","","1","","3","7","9","","3","7","2","","","","","","7","","","4","","","","","2","","","","","","","","8","","5","","5","3","","","9","1","8","","","1","6","","","","3"
  // "5","3","4","6","7","8","9","1","2","6","7","2","1","9","5","3","4","8","1","9","8","3","4","2","5","6","7","8","5","9","7","6","1","4","2","3","4","2","6","8","5","3","7","9","1","7","1","3","9","2","4","8","5","6","9","6","1","5","3","7","2","8","4","2","8","7","4","1","9","6","3","5","3","4","5","2","8","6","1","7","9"
]

var sdk_Correct

$(window).on("load", function () {
  sdk_drawGrid();

})

function sdk_drawGrid() {
  for (var i = 0; i < 81; i++) {
    var sdkCell = $("<div>").attr({id: "sdkCell_" + i, tabindex: i, class: "sdkCell"});

    if (i < 9) {
      sdkCell.css("border-top-width", "2px");
    } else if (i < 18) {

    } else if (i < 27) {
      // console.log("hererhe: " + i);
      sdkCell.css("border-bottom-width", "2px");
    } else if (i < 36) {
      sdkCell.css("border-top-width", "2px");
    } else if (i < 45) {

    } else if (i < 54) {
      sdkCell.css("border-bottom-width", "2px");
    } else if (i < 63) {
      sdkCell.css("border-top-width", "2px");
    } else if (i < 72) {

    } else if (i < 81) {
      sdkCell.css("border-bottom-width", "2px");
    }



    if (i % 3 == 0) {
      sdkCell.css("border-left-width", "2px");
    } else if ((i + 1) % 3 == 0) {
      sdkCell.css("border-right-width", "2px");
    }

    sdkCell.on("click", function () {
      // $(".mGameGrid div").css("border-style", "outset");
      // $(this).css("border-style", "inset");

      $(".mGameGrid div").css("outline", "none");
      $(this).css("outline", "-webkit-focus-ring-color auto 1px");

      // console.log($(this).attr("id").split("_")[1]);
    })

    sdkCell.on("keydown", function (ev) {

      if (!$(this).attr("class").split(" ").includes("sdk_locked")) {
        if (Number.isInteger(Number(ev.key)) && ev.key != 0) {
          $(this).text(ev.key)

        } else if (ev.keyCode == 8) {
          $(this).empty("");

        }

        sdkMap[$(this).attr("id").split("_")[1]] = $(this).text();

      }

    })

    // --- Add sdkMap Numbers
    sdkCell.text(sdkMap[i]);
    if (sdkMap[i] != "") {
      sdkCell.attr({class: "sdk_locked"});
      // ^- only outcommented when debug
      // ^^- !!! NEEDS TO BE CHANGED FOR STORING PURPOSES PROBABLY, MEANWHILE STORING OF CLASS sdk_locked IS NOT POSSIBLE !!!
    }


    $("#mGameGrid").append(sdkCell);
    // sdkCell.height(sdkCell.width())
  }
}

function sdk_checkMap() {
  console.group("Checking AI")
  if (!sdkMap.includes("")) {
    console.info("All cells filled")

    for (var w = 0; w < 9; w++) {
      var temp_sdkMapX = []
      var temp_sdkMapY = []
      for (var h = 0; h < 9; h++) {

        if (temp_sdkMapX.includes(sdkMap[9 * w + h])) {
          console.warn("--- DUBLICATE_X: " + sdkMap[9 * w + h] + " on index " + (9 * w + h));
          $(".sdkCell").eq(9 * w + h).css("color", "red");
          $(".sdkCell").eq(temp_sdkMapX.indexOf(sdkMap[9 * w + h]) + w * 9).css("color", "red"); // --- get the other duplicate

          // return;
        }
        temp_sdkMapX.push(sdkMap[9 * w + h])

        if (temp_sdkMapY.includes(sdkMap[9 * h + w])) {
          console.warn("--- DUBLICATE_Y: " + sdkMap[9 * h + w] + " on index " + (9 * h + w));
          $(".sdkCell").eq(9 * h + w).css("color", "red");
          $(".sdkCell").eq(temp_sdkMapY.indexOf(sdkMap[9 * h + w]) * 9 + w).css("color", "red"); // --- get the other duplicate
        }
        temp_sdkMapY.push(sdkMap[9 * h + w])
      }

    }

    for (var w = 0; w < 3; w++) {
      for (var h = 0; h < 3; h++) {
        var temp_sdkMap = []
        for (var y = 0; y < 3; y++) {
          for (var x = 0; x < 3; x++) {

            if (temp_sdkMap.includes(sdkMap[x + y * 9 + w * 3 + h * 9 * 3])) {
              console.warn("--- DUBLICATE_O: " + sdkMap[x + y * 9 + w * 3 + h * 9 * 3] + " on index " + (x + y * 9 + w * 3 + h * 9 * 3));
              $(".sdkCell").eq(x + y * 9 + w * 3 + h * 9 * 3).css("color", "red");
              $(".sdkCell").eq(temp_sdkMap.indexOf(sdkMap[x + y * 9 + w * 3 + h * 9 * 3]) + Math.floor(temp_sdkMap.indexOf(sdkMap[x + y * 9 + w * 3 + h * 9 * 3]) / 3) * 6 + w * 3 + h * 9 * 3).css("color", "red");


              // return;
            }
            // console.log(temp_sdkMap);
            // console.log(sdkMap[x + y * 9 + w * 3 + h * 9 * 3]);
            // console.log(temp_sdkMap.includes(x + y * 9 + w * 3 + h * 9 * 3));

            temp_sdkMap.push(sdkMap[x + y * 9 + w * 3 + h * 9 * 3])
          }
        }
      }
    }

  } else {
    console.log("Some cells are still empty!")
    alert("Some cells are still empty!")
  }
  console.groupEnd()
}
