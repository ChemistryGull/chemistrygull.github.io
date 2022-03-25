// --- uses input to determine which level is loadet

$(window).on("load", function () { // --- only for creating
  $(".levelSelectorCon").hide();

  var script = document.createElement("script");
  script.src = "maps/map(60x60)_firstMaze.js";
  document.getElementById("Script").appendChild(script);

  var script = document.createElement("script");
  script.src = "js/entities.js";
  document.getElementById("Script").appendChild(script);
  console.log("default");
  //

  // 
  // var script = document.createElement("script");
  // script.src = "level/level_pre_1/map.js";
  // document.getElementById("Script").appendChild(script);
  //
  // var script = document.createElement("script");
  // script.src = "level/level_pre_1/entities.js";
  // document.getElementById("Script").appendChild(script);




  var script = document.createElement("script");
  script.src = "js/game.js";
  document.getElementById("Script").appendChild(script);

})

$("#startGameBTN").on("click", function () {
  $(".levelSelectorCon").hide();
  var lvlsel = $('#selectLevelSelector').find(":selected").val();

  if (lvlsel == "default") {
    var script = document.createElement("script");
    script.src = "maps/map(60x60)_firstMaze.js";
    document.getElementById("Script").appendChild(script);

    var script = document.createElement("script");
    script.src = "js/entities.js";
    document.getElementById("Script").appendChild(script);

  } else {
    var script = document.createElement("script");
    script.src = "level/" + lvlsel + "/map.js";
    document.getElementById("Script").appendChild(script);

    var script = document.createElement("script");
    script.src = "level/" + lvlsel + "/entities.js";
    document.getElementById("Script").appendChild(script);
  }





  var script = document.createElement("script");
  script.src = "js/game.js";
  document.getElementById("Script").appendChild(script);


})


// $('<script src="js/game.js"></script>').insertAfter($("."))
