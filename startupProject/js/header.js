

// --- Toggle the main mobile menu
$("#menu_dropdown").on("click", function () {
    $("#menu").toggle();
})

$("#menu_overflow,.menu").hover(function () {
    $("#menu").toggle();
})