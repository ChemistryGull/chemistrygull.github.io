

// --- Toggle the main mobile menu
$("#menu_dropdown").on("click", function () { // --- BUG: problem when clicking and hovering over menu at the same time
    $("#menu").toggle();
})

$("#menu_dropdown,.menu").hover(function () {
    $("#menu").toggle();
})