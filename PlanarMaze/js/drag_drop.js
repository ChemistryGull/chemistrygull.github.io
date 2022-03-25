var activeInvs = [];

function buildInvSpace(invList, targetInv) {

  var timeBuildInv_Start = performance.now()

  var targetId = targetInv.split("-")[1]
  // var targetInvID = targetInv;
  // var targetInv = targetInv.split(",")[0]

  var elemInventory = $("<div>").attr({class: "inventory", id: targetInv})
  var elemInventoryCon = $("<div>").attr({class: "inventoryCon"})
  var elemInventoryConCon = $("<div>").attr({class: "inventoryConCon"})

  if (invList.length < 8) {
    elemInventory.css("grid-template-columns", "repeat(" + invList.length + ", " + 100 / invList.length + "%)")
    // elemInventory.css("width", "50%")
  }


  elemInventoryCon.append(elemInventory)

  elemInventoryConCon.append($("<h1>").text(targetInv).attr({class: "chestAddiInfo"}))
  // elemInventoryConCon.append($("<p>").text("lol").attr({class: "chestAddiInfo"}))
  // elemInventoryConCon.append($("<p>").text("lol").attr({class: "chestAddiInfo"}))
  // elemInventoryConCon.append($("<p>").text("lol").attr({class: "chestAddiInfo"}))
  elemInventoryConCon.append(elemInventoryCon)

  $("#sideMenu").append(elemInventoryConCon)

  for (var i = 0; i < invList.length; i++) {
    var itemSpace = $("<div>").attr({class: "itemCon", id: "iC|" + i + "|" + targetInv});





    var itemI = $("<div>").attr({title: itemTypes[invList[i]].name, draggable: true, id: "item|" + invList[i] + "|" + i + "|" + targetInv});

    var finItem = itemSpace.append(itemI);


    $("#" + targetInv).append(finItem);

    if (invList[i] == "x") {
      itemSpace.css("background-color", "red");
      itemI.attr({draggable: false});
      continue;
    }

    if (invList[i] == "") {
      itemI.attr({draggable: false})
    }

    itemSpace.get(0).addEventListener("drop", function (ev) {
      ev.preventDefault();

      // --- Frontend Change

      var elementMoved = document.getElementById(ev.dataTransfer.getData("text")); // This is the element the cursor holds (it is dragged).
      var placeFrom = elementMoved.parentNode; // This is the Container where the item you hold is from (it is now empty, the replacedItem has to jump there).
      var replacedItem = ev.currentTarget.firstElementChild; // This is the item on which you drop the item you hold.
      var targetPlace = ev.currentTarget; // The container you currently hover over. The items will be replaced on drop.

      targetPlace.replaceChild(elementMoved, replacedItem);
      placeFrom.appendChild(replacedItem);

      // --- Backend Change (moved to saveInvChange)

      // var itemHold = elementMoved.id.split("|")[1];
      // var itemSwitch = replacedItem.id.split("|")[1];
      //
      //
      //
      // var itemHoldToPlace = targetPlace.id.split("|")[1];
      // var itemSwitchToPlace = placeFrom.id.split("|")[1];
      //
      //
      //
      // invList[itemHoldToPlace] = itemHold;
      // invList[itemSwitchToPlace] = itemSwitch;



      saveInvChange();

      // drawInvItems(invList, targetInv);

    })
    itemSpace.get(0).addEventListener("dragover", function (ev) {
      ev.preventDefault();

    })
    itemI.get(0).addEventListener("dragstart", function (ev) {

      ev.dataTransfer.setData("text", ev.target.id);

      ev.dataTransfer.effectAllowed = "move";
    })

    // if (invList[i] == "") {
    //   itemI.attr("draggable", false);
    // }

    // console.log(itemI.get(0));


    // ilol.appendTo($(".inventory"))
    // console.log(finItem);
  }
  drawInvItems(invList, targetInv);
  // drawInvItems(invList, targetInv);

  var timeBuildInv_End = performance.now()
  console.log("--- Create " + targetInv + " Time: " + Math.round((timeBuildInv_End - timeBuildInv_Start) * 10) / 10);

  // console.log(activeInvs);
  // if (activeInvs.length < 0 ) {
  //   activeInvs = [];
  //   console.log("empty");
  // }
  //
  // activeInvs.push(targetInv);
}



function invSize(targetInv) {

  $(".itemCon").height(function(){return $(this).width();});

  var h2 = 0;
  var h1 = 0;
  var w2 = 0;
  var w1 = 0;

  var maxInvSizeLoop = 0;

  // h2 = $(".sideMenu").innerHeight() / 2 - $(".inventoryConCon").eq(1).children("h1").height();

  var h2_toH = 0;
  var h1_toH = 0;
  $("#" + targetInv).parents(".inventoryConCon").children(".chestAddiInfo").each(function () {
    h2_toH += $(this).outerHeight();
  });

  h2 = $(".sideMenu").innerHeight() / 2 - h2_toH;


  if (h2 > 100) {
    while (maxInvSizeLoop < 10) {
      w1 = $(".inventory").width();
      // h1 = $(".inventoryConCon").first().children("h1").outerHeight() + $(".inventoryConCon").first().children("div").outerHeight();

      h1_toH = 0;

      $(".inventoryConCon").first().children().each(function () {
        h1_toH += $(this).outerHeight();
      });

      h1 = h1_toH;



      w2 = (h2 * w1) / (h1);

      if (Math.abs(w1 - w2) > 1) {

        maxInvSizeLoop++;

        $(".inventory").width(w2);
        $(".itemCon").height(function(){return $(this).width();});

        continue;
      }
      break;
    }

    $(".inventory").width(w2);
    $(".inventoryConCon").height($(".sideMenu").height() / 2);

  } else {
    $(".inventory").width("100%")
    $(".inventoryConCon").height("auto");

  }

  // console.log("h2: " + h2);
  // console.log("w1: " + w1);
  // console.log("h1: " + h1);
  // console.log("w2: " + $(".inventory").width());
  // console.log("--------------------------");
  // $(".itemCon").height($(".itemCon").width());
  $(".itemCon").height(function(){return $(this).width();});
}

function drawInvItems(invList, targetInv) {
  invSize(targetInv)

  for (var i = 0; i < invList.length; i++) {
    if (invList[i] == "x") {
      continue;
    }
    if (invList[i] == "") {
      $("#" + targetInv).children().eq(i).children().css("background", "none");
      continue;
    }

    $("#" + targetInv).children().eq(i).children().css("background", "url(assets/Item_TEX.png) " + itemTypes[invList[i]].x * -$("#" + targetInv).children().eq(i).width() + "px " + itemTypes[invList[i]].y * -$("#" + targetInv).children().eq(i).width() + "px ");

    var itemSizeBG = $("#" + targetInv).children().eq(i).children().width() * itemTEX_size / 34; // because width is not 34, it is dynamic, therefore we have to take the real width to account (not height, because it is not always finished), same above.

    $("#" + targetInv).children().eq(i).children().css("background-size", itemSizeBG + "px " + itemSizeBG + "px ");

  }



}

function saveInvChange() {


  // --- ACHTUNG: Bissi pfusch, funktioniert nicht dynamisch, weil es nicht möglich ist invList von beiden (target item & swap item) witer zu geben (nur wo item gedroppt wird)
  // --- Wird erst probleme machen, wenn irgendwas ein inventar hat, des ned a chest is

  for (var i = 0; i < $(".inventory").length; i++) {
    var invListTemp = [];
    for (var e = 0; e < $(".inventory").eq(i).children().children().length; e++) {
      invListTemp.push($(".inventory").eq(i).children().children().eq(e).attr("id").split("|")[1]);
    }

    if ($(".inventory").eq(i).attr("id") == "invPlayer") {
      player.inv = invListTemp;
    }
    if ($(".inventory").eq(i).attr("id").split("-")[0] == "invChest") {
      entities[entities.findIndex(e => { return e.id == $(".inventory").eq(i).attr("id").split("-")[1]})].custom.inv = invListTemp;
    }
  }


}


$(window).on("resize", function () {

  // buildInvSpace(30, "invChest")


})
