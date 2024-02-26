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



var DnD = {
  itemDrag: null,
  itemSwap: null,
  invOpen: {
    "hotbar": "player.hotbar",
    "inv1inv": "player.inventory",
    "inv2inv": null
  },

  rightClick: function (e) {
    e.preventDefault();

    var item1 = DnD.itemDrag;
    // var item2 = e.currentTarget.children[0];
    //
    // var itemSlot1 = DnD.itemDrag.parentElement.id.split("|") // --- Where the item was dragged away from
    // var itemSlot2 = e.currentTarget.id.split("|") // --- The Slot that the dragged item is put in


    console.log(item1);
    // console.log(item2);
    // console.log(itemSlot1);
    // console.log(itemSlot2);

  },

  allowDrop: function (e) {
    e.preventDefault()
  },
  drag: function (e) {
    DnD.itemDrag = e.currentTarget;
    // e.currentTarget.style.cursor = "grabbing";

  },
  drop: function (e) {
    e.preventDefault();


    // --- Do the backend Swap in the inventory arrays
    var item1 = DnD.itemDrag;
    var item2 = e.currentTarget.children[0];

    var itemSlot1 = DnD.itemDrag.parentElement.id.split("|") // --- Where the item was dragged away from
    var itemSlot2 = e.currentTarget.id.split("|") // --- The Slot that the dragged item is put in

    itemSlot1.push(DnD.itemDrag.id)
    itemSlot1.push(DnD.itemDrag.children[0].innerHTML)
    itemSlot2.push(e.currentTarget.children[0].id)
    itemSlot2.push(e.currentTarget.children[0].children[0].innerHTML)

    if (itemSlot1.toString() != itemSlot2.toString()) {
      // --- Only react if Item is not dragged in the same Space

      if (itemSlot1[2] == itemSlot2[2]) {
        // --- Stack Items
        if (Number(itemSlot1[3]) + Number(itemSlot2[3]) <= 64) {
          eval(DnD.invOpen[itemSlot2[0]])[itemSlot2[1]][1] = Number(itemSlot1[3]) + Number(itemSlot2[3])
          eval(DnD.invOpen[itemSlot1[0]])[itemSlot1[1]] = ["_", 0];

          $(item1).css("background", "none");
          $(item2).css("background", "url(assets/IMG_Items.png) " + (itemList[itemSlot1[2]][0] * -Ui.invItemW) + "px " + (itemList[itemSlot1[2]][1] * -Ui.invItemW) + "px ");
          $(item2).css("background-size", Ui.itemSizeBG + "px " + Ui.itemSizeBG + "px ");

          item1.children[0].innerHTML = 0;
          item2.children[0].innerHTML = Number(itemSlot1[3]) + Number(itemSlot2[3]);

          $(item1).css("display", "none");
          if ($(item2).children().html() <= 1) {
            $(item2).children().css("display", "none");
          } else {
            $(item2).children().css("display", "block");
          }

        }

      } else {
        eval(DnD.invOpen[itemSlot1[0]])[itemSlot1[1]] = [itemSlot2[2], Number(itemSlot2[3])];
        eval(DnD.invOpen[itemSlot2[0]])[itemSlot2[1]] = [itemSlot1[2], Number(itemSlot1[3])];

        // --- Do the frontend swap
        DnD.itemSwap = $(e.currentTarget.children[0]).clone(true)[0]
        e.currentTarget.children[0].replaceWith($(DnD.itemDrag).clone(true)[0]);
        DnD.itemDrag.replaceWith(DnD.itemSwap);

      }
    }



    // console.log(item1);
    // console.log(item2);
    // console.log(itemSlot1);
    // console.log(itemSlot2);







    // console.log(DnD.itemDrag.id);





    DnD.itemDrag = null;
    DnD.itemSwap = null;
    // console.log(iDragSpace);
  },
  invBuildup: function () {
    // invBuildup($(".hotbar"), player.hotbar);
    // invBuildup($(".invWrapper"), player.inventory);
    for (var tarInv in DnD.invOpen) {
      if (DnD.invOpen[tarInv] != null) {
        var parent = $("." + tarInv)
        var inventory = eval(DnD.invOpen[tarInv]);

        for (var i = 0; i < inventory.length; i++) {
          var newChild = $('<div class="invItemWrapper" id="' + tarInv + "|" + i + '"><div id="' + inventory[i][0] + '" class="invItem" draggable="true"> <div>' + inventory[i][1] + '</div> </div></div>')
          // newChild.children().css({"background-color": inventory[i][0]})
          // newChild.children().css("background", "url(assets/Item_TEX.png) " + itemTypes[invList[i]].x * -$("#" + targetInv).children().eq(i).width() + "px " + itemTypes[invList[i]].y * -$("#" + targetInv).children().eq(i).width() + "px "))

          if (inventory[i][0] == "_") {
            newChild.children().css("background", "none");
          } else {

            newChild.children().css("background", "url(assets/IMG_Items.png) " + (itemList[inventory[i][0]][0] * -Ui.invItemW) + "px " + (itemList[inventory[i][0]][1] * -Ui.invItemW) + "px ")
             // because width is not 32, it is dynamic, therefore we have to take the real width to account (not height, because it is not always finished), same above.

            newChild.children().css("background-size", Ui.itemSizeBG + "px " + Ui.itemSizeBG + "px ");
          }

          if (newChild.children().children().html() <= 1) {
            newChild.children().children().css("display", "none")
          }


          parent.append(newChild)
        }




        // $(".invItem").addEventListener("ondragstart", DnD.drag(event))
        // $(".invItemWrapper").addEventListener("ondragover", DnD.allowDrop(event))
        //  $(".invItemWrapper").addEventListener("ondrop", DnD.drop(event))
      }
    }

    $(".invItem").on("dragstart", DnD.drag)
    $(".invItem").on("contextmenu", DnD.rightClick)
    $(".invItemWrapper").on("dragover", DnD.allowDrop)
    $(".invItemWrapper").on("drop", DnD.drop)


  }
}
