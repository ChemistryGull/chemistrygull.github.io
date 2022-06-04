// --- uses input to determine which level is loadet
$(window).on("keydown", function (e) {
  console.log(e.key);
  if (e.key == "l") {
    $(".levelSelectorCon").show();
  }
})



var currentLevel = "default";

$(window).on("load", function () { // --- only for creating
  $(".levelSelectorCon").hide();

  // var script = document.createElement("script");
  // script.src = "maps/map(60x60)_firstMaze.js";
  // document.getElementById("Script").appendChild(script);
  //
  // var script = document.createElement("script");
  // script.src = "js/entities.js";
  // document.getElementById("Script").appendChild(script);
  // console.log("default");


  //
  // var script = document.createElement("script");
  // script.src = "level/level_pre_1/map.js";
  // document.getElementById("Script").appendChild(script);
  //
  // var script = document.createElement("script");
  // script.src = "level/level_pre_1/entities.js";
  // document.getElementById("Script").appendChild(script);

  if (localStorage.PM_doStorage != undefined) {
    doStorage = JSON.parse(localStorage.PM_doStorage);
    if (localStorage.PM_currentLevel == undefined) {
      localStorage.setItem("PM_currentLevel", JSON.stringify(currentLevel));
    }
    if (doStorage) {
      currentLevel = JSON.parse(localStorage.PM_currentLevel);
    }
  }


  var script = document.createElement("script");
  script.src = "level/" + currentLevel + "/map.js";
  document.getElementById("Script").appendChild(script);

  var script = document.createElement("script");
  script.src = "level/" + currentLevel + "/entities.js";
  document.getElementById("Script").appendChild(script);


  var script = document.createElement("script");
  script.src = "js/game.js";
  document.getElementById("Script").appendChild(script);

})

$("#startGameBTN").on("click", function () {
  $(".levelSelectorCon").hide();
  var lvlsel = $('#selectLevelSelector').find(":selected").val();

  if (doStorage) {


    localStorage.setItem("PM_currentLevel", JSON.stringify(lvlsel));

    // localStorage.removeItem("PM_entities");
  }


  location.reload();



  //
  //
  // var script = document.createElement("script");
  // script.src = "js/game.js";
  // document.getElementById("Script").appendChild(script);


})


// $('<script src="js/game.js"></script>').insertAfter($("."))
