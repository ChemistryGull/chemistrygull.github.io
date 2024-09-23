var Ui = {
  w: $(window).width(),
  h: $(window).height(),

  resize: function () {
    this.w = $(window).width()
    this.h = $(window).height()


    // --- inventory
    this.invW = 200;
    this.invH = 300;
    this.itemNumFsize = 16;
    this.screenSize = 0;

    var gridCenterH = $(".gridCenter").height() - 50;
    var gridCenterW = $(".gridCenter").width() - 50;

    if (gridCenterH < 300 || gridCenterW / 2 < 240) {
      console.log("Screen Size 0 (Min)");
      this.screenSize = 0;
      this.invH = 200;
      this.itemNumFsize = 8;

    } else if (gridCenterH < 400 || gridCenterW / 2 < 320) {
      console.log("Screen Size 1");
      this.screenSize = 1;
      this.invH = 300;
      this.itemNumFsize = 14;

    } else if (gridCenterH < 500 || gridCenterW / 2 < 400) {
      console.log("Screen Size 2");
      this.screenSize = 2;
      this.invH = 400;
      this.itemNumFsize = 18;

    } else if (gridCenterH < 600 || gridCenterW / 2 < 480) {
      console.log("Screen Size 3");
      this.screenSize = 3;
      this.invH = 500;
      this.itemNumFsize = 24;

    } else if (gridCenterH < 700 || gridCenterW / 2 < 560) {
      console.log("Screen Size 4");
      this.screenSize = 4;
      this.invH = 600;
      this.itemNumFsize = 28;

    } else {
      console.log("Screen Size 5 (Max)");
      this.screenSize = 5;
      this.invH = 700;
      this.itemNumFsize = 30;

    }

    console.log(this.screenSize);
    $(".invItem > div").css({"font-size": this.itemNumFsize})

    this.invW = Math.floor(this.invH / 5 * 4);
    $(".gridCenter").children().css({"width": this.invW + "px", "height": this.invH + "px"})

    if (this.screenSize >= 3) {
      $(".invItemWrapper").css({"border": "3px inset darkgray"})
      this.invItemW = (this.invW - 16 * 2) / 6 - 8
    } else {
      $(".invItemWrapper").css({"border": "2px inset darkgray"})
      this.invItemW = (this.invW - 16 * 2) / 6 - 6
    }

    this.invItemH = this.invItemW;

    this.itemSizeBG = this.invItemW * 1020 / 32;

    $(".invItemWrapper").width(this.invItemW);
    $(".invItemWrapper").height(this.invItemH);
    $(".invItem").width(this.invItemW);
    $(".invItem").height(this.invItemH);




    // --- Stat Bar Stacking
    var statVitalChildren = $(".statVital").children().length;
    if ($(".statVital").width() <= statVitalChildren * 205) {

      $(".statVital div:nth-last-child(1)").height("27px");
      $(".statVital div:nth-last-child(2)").height("27px");

      $(".statVital div:nth-last-child(1)").css({"grid-row": "2"})
      $(".statVital div:nth-last-child(2)").css({"grid-row": "1"})


      statVitalChildren -= 1;
      $(".statVital").css({"grid-template-columns": "repeat(" + statVitalChildren + ", 200px)"})

      if (statVitalChildren + 1 > 3 && $(".statVital").width() <= statVitalChildren * 205) {
        $(".statVital div:nth-last-child(3)").height("27px");
        $(".statVital div:nth-last-child(4)").height("27px");

        $(".statVital div:nth-last-child(3)").css({"grid-row": "2"})
        $(".statVital div:nth-last-child(4)").css({"grid-row": "1"})
        statVitalChildren -= 1;
        $(".statVital").css({"grid-template-columns": "repeat(" + statVitalChildren + ", 200px)"})


      } else {
        $(".statVital div:nth-last-child(3)").height("60px");
        $(".statVital div:nth-last-child(4)").height("60px");

        $(".statVital div:nth-last-child(3)").css({"grid-row": "1 / 3"})
        $(".statVital div:nth-last-child(4)").css({"grid-row": "1 / 3"})
      }
    } else {
      $(".statVital").children().height("60px");
      $(".statVital").children().css({"grid-row": "1 / 3"});

    }
    $(".statVital").css({"grid-template-columns": "repeat(" + statVitalChildren + ", 200px)"})
    // if ($(".statVital").width() <= statVitalChildren * 205) {
    //   console.log("Again!");
    //   Ui.resize();
    // }


  },
}


var InvEngine = {
  invOpen: {
    "hotbar": "player.hotbar",
    "inv1inv": "player.inventory",
    "inv2inv": null
  },
  holding: null,
  holdingCloud: null,
  build: function () {
    // invBuildup($(".hotbar"), player.hotbar);
    // invBuildup($(".invWrapper"), player.inventory);
    for (var tarInv in InvEngine.invOpen) {
      if (InvEngine.invOpen[tarInv] != null) {
        var parent = $("." + tarInv)
        var inventory = eval(InvEngine.invOpen[tarInv]);

        for (var i = 0; i < inventory.length; i++) {
          var newID = tarInv + "|" + i;

          var newChild = $('<div id="' + newID + '" class="invItem"> <div></div> </div>');

          parent.append(newChild)
        }

      }
    }

    // $(".invItem").on("dragstart", DnD.drag)
    // $(".invItem").on("contextmenu", DnD.rightClick)
    // $(".invItemWrapper").on("dragover", DnD.allowDrop)
    // $(".invItemWrapper").on("drop", DnD.drop)

    $(".invItem").on("click", InvEngine.pick);
    $(".invItem").on("contextmenu", InvEngine.pick);
    // $(".invItem").on("contextmenu", InvEngine.half);

    InvEngine.update();



  },
  update: function () {
    
    for (var tarInv in InvEngine.invOpen) {
      if (InvEngine.invOpen[tarInv] != null) {
        var inventory = eval(InvEngine.invOpen[tarInv]);

        $("." + tarInv).children().each(function (i) {   

          if (inventory[i][0] == "_") {
            $(this).css("background", "none");
          } else {

            $(this).css("background", "url(assets/IMG_Items.png) " + (itemList[inventory[i][0]][0] * -Ui.invItemW) + "px " + (itemList[inventory[i][0]][1] * -Ui.invItemW) + "px ")
            // because width is not 32, it is dynamic, therefore we have to take the real width to account (not height, because it is not always finished), same above.
            $(this).css("background-size", Ui.itemSizeBG + "px " + Ui.itemSizeBG + "px ");
          }

          $(this).attr('item', inventory[i][0] + "|" + inventory[i][1]);

          $(this).children().html(inventory[i][1]);
          if ($(this).children().html() <= 1) {
            $(this).children().hide()
          } else {
            $(this).children().show()
          }
        
        })

      }
    }
    
  },
  pick: function (e) {
    var t1 = window.performance.now()
    e.preventDefault();
    var isRightClick = e.type == "contextmenu";
    var pickedItem = e.currentTarget.getAttribute("item").split("|");
    pickedItem.unshift(e.currentTarget.id);

    if (InvEngine.holding == null) {
      // --- Pick up Item
      if (pickedItem[1] == "_") {
        return;
      }

      InvEngine.holding = pickedItem;

      InvEngine.cloudSend(pickedItem, isRightClick);

      
    } else {

      if (InvEngine.holding[1] == pickedItem[1]) {
        // --- Both are the same -> Add till max stack size

        InvEngine.cloudAdd(pickedItem, isRightClick);
        

      } else {
        // --- Not the same -> Swap!
        InvEngine.cloudDrop(pickedItem, isRightClick);
      }

    }

    InvEngine.updateCloudBox();
    InvEngine.update()

    // console.log(window.performance.now() - t1)



  },
  cloudSend: function (ITEM, doHalf) {
    if (doHalf) {
      var numPickUp = Math.ceil(ITEM[2] / 2)
      var numLeave = Math.floor(ITEM[2] / 2)
    } else {
      var numPickUp = ITEM[2]
      var numLeave = 0
    }

    document.getElementById('itemAtPointer').style.transform = 'translateY(' + (cursorPos[1] - Ui.invItemH / 3) + 'px)';
    document.getElementById('itemAtPointer').style.transform += 'translateX(' + (cursorPos[0] - Ui.invItemH / 3)+'px)';

    $("#itemAtPointer").css("background", $("#" + ITEM[0].replace("|", "\\|")).css("background"));

    // --- ITEM to cloud
    InvEngine.holdingCloud = [...eval(InvEngine.invOpen[ITEM[0].split("|")[0]])[ITEM[0].split("|")[1]]];
    InvEngine.holdingCloud[1] = numPickUp;

    console.log(InvEngine.holdingCloud[1]);

    if (numLeave == 0) {
      // --- remove ITEM from space
      eval(InvEngine.invOpen[ITEM[0].split("|")[0]])[ITEM[0].split("|")[1]] = ["_", 0];
    } else {
      // --- leave behind half ITEM
      eval(InvEngine.invOpen[ITEM[0].split("|")[0]])[ITEM[0].split("|")[1]][1] = numLeave;
    }

    console.log(InvEngine.holdingCloud[1]);

    
  },
  cloudDrop: function (ITEM, doSingle) {
    if (doSingle) {
      var numHold = InvEngine.holdingCloud[1] - 1;
      var numPlace = 1;
    } else {
      var numHold = 0;
      var numPlace = Number(InvEngine.holdingCloud[1]);
    }


    // $("#itemAtPointer").hide();
    

    if (ITEM[1] == "_") {
      // --- place ITEM from cloud in EMPTY space
      eval(InvEngine.invOpen[ITEM[0].split("|")[0]])[ITEM[0].split("|")[1]] = [...InvEngine.holdingCloud];
      eval(InvEngine.invOpen[ITEM[0].split("|")[0]])[ITEM[0].split("|")[1]][1] = numPlace;

      InvEngine.holdingCloud[1] = numHold;
    } else {
      // --- swap ITEM with cloud
      [eval(InvEngine.invOpen[ITEM[0].split("|")[0]])[ITEM[0].split("|")[1]], InvEngine.holdingCloud] = [InvEngine.holdingCloud, eval(InvEngine.invOpen[ITEM[0].split("|")[0]])[ITEM[0].split("|")[1]]];
      $("#itemAtPointer").css("background", $("#" + ITEM[0].replace("|", "\\|")).css("background"));

    }

    if (InvEngine.holdingCloud[1] < 1) {
      InvEngine.holding = null;
      InvEngine.holdingCloud = null;
      // $("#itemAtPointer").hide()
    }


  },
  cloudAdd: function (ITEM, doSingle) {
    if (doSingle) {
      var numHold = InvEngine.holdingCloud[1] - 1;
      var numPlace = 1;
    } else {
      var numHold = 0;
      var numPlace = Number(InvEngine.holdingCloud[1]);
    }

    var numTotal = Number(ITEM[2]) + numPlace;

    if (numTotal > S.itemMaxStackSize) {
      numHold += numTotal - S.itemMaxStackSize;
      numPlace = S.itemMaxStackSize - ITEM[2];
    }

    eval(InvEngine.invOpen[ITEM[0].split("|")[0]])[ITEM[0].split("|")[1]][1] += numPlace;
    InvEngine.holdingCloud[1] = numHold;
    
    if (InvEngine.holdingCloud[1] < 1) {
      InvEngine.holding = null;
      InvEngine.holdingCloud = null;
    }

  },
  updateCloudBox: function () {
    if (InvEngine.holdingCloud != null && InvEngine.holdingCloud[0] != "_") {
      if (InvEngine.holdingCloud[1] > 1) {
        $("#itemAtPointer").children().html(InvEngine.holdingCloud[1]);
        $("#itemAtPointer").children().show()
      } else {
        $("#itemAtPointer").children().hide()
      }
      $("#itemAtPointer").show()
    } else {
      $("#itemAtPointer").hide()
    } 
  },
  pick_OLD: function (e) {

    // var pickedItem = [e.currentTarget.id, e.currentTarget.getAttribute("item").split("|")];
    var pickedItem = e.currentTarget.getAttribute("item").split("|");
    pickedItem.unshift(e.currentTarget.id);
    console.log(pickedItem);

    
    if (InvEngine.holding == null) {
      // --- Pick up Item
      if (pickedItem[1] == "_") {
        return;
      }

      InvEngine.holding = pickedItem;


      document.getElementById('itemAtPointer').style.transform = 'translateY(' + (cursorPos[1] - Ui.invItemH / 3) + 'px)';
      document.getElementById('itemAtPointer').style.transform += 'translateX(' + (cursorPos[0] - Ui.invItemH / 3)+'px)';
      
      // $("body").css("cursor", "none")
      // $(".inv").css("cursor", "none")

      $("#itemAtPointer").css("background", $("#" + pickedItem[0].replace("|", "\\|")).css("background"));

      $("#itemAtPointer").children().html(pickedItem[2]);
      if ($("#itemAtPointer").children().html() <= 1) {
        $("#itemAtPointer").children().hide()
      } else {
        $("#itemAtPointer").children().show()
      }

      $("#itemAtPointer").show();

      $("#" + pickedItem[0].replace("|", "\\|")).css("background", "none");
      $("#" + pickedItem[0].replace("|", "\\|")).children().html("");


    } else {
      // --- Drop and Swap item

      var picked1 = InvEngine.holding[0].split("|");
      var picked2 = pickedItem[0].split("|");

      console.log(eval(InvEngine.invOpen[picked1[0]])[picked1[1]]);
      if (InvEngine.holding[1] == pickedItem[1]) {
        // --- Both are the same -> Add till max stack size
        var totalAmoutn = Number(InvEngine.holding[2]) + Number(pickedItem[2])

        if (totalAmoutn > S.itemMaxStackSize) {
          // --- Add only Part of it to stack

          eval(InvEngine.invOpen[picked2[0]])[picked2[1]][1] = S.itemMaxStackSize;
          InvEngine.holdingCloud = eval(InvEngine.invOpen[picked1[0]])[picked1[1]];
          eval(InvEngine.invOpen[picked1[0]])[picked1[1]] = ["_", 0];

          InvEngine.holding[2] = totalAmoutn - S.itemMaxStackSize;
          InvEngine.holdingCloud[1] = totalAmoutn - S.itemMaxStackSize;

          $("#itemAtPointer").children().html(InvEngine.holding[2]);
          if ($("#itemAtPointer").children().html() <= 1) {
            $("#itemAtPointer").children().hide()
          } else {
            $("#itemAtPointer").children().show()
          }


        } else {
          // --- Add all to stack
          eval(InvEngine.invOpen[picked2[0]])[picked2[1]][1] += Number(InvEngine.holding[2]);
          eval(InvEngine.invOpen[picked1[0]])[picked1[1]] = ["_", 0];

          $("body").css("cursor", "default")
          $(".inv").css("cursor", "cell")
          $("#itemAtPointer").hide();
          InvEngine.holding = null;
        }

      } else {
        // --- Not the same -> Swap!

        $("body").css("cursor", "default")
        $(".inv").css("cursor", "cell")
        $("#itemAtPointer").hide();
        
        
        if (InvEngine.holdingCloud == null) {
          // --- just Swap
          [eval(InvEngine.invOpen[picked1[0]])[picked1[1]], eval(InvEngine.invOpen[picked2[0]])[picked2[1]]] = [eval(InvEngine.invOpen[picked2[0]])[picked2[1]], eval(InvEngine.invOpen[picked1[0]])[picked1[1]]];
        } else {
          // --- There is some item floating (it has no home), put the floating item in. 
          eval(InvEngine.invOpen[picked1[0]])[picked1[1]] = eval(InvEngine.invOpen[picked2[0]])[picked2[1]];
          eval(InvEngine.invOpen[picked2[0]])[picked2[1]] = InvEngine.holdingCloud;
        }

        InvEngine.holding = null;
        InvEngine.holdingCloud = null;
      }

      InvEngine.update();

    }
  }
}


