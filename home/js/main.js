// $(function(){
//   $("#header").load("header.html");
//   $("#footer").load("footer.html");
// });

var navbarTop;

$(document).ready(function () {
  navbarTop = $(".navbar").offset().top;
  stickyNavbar();
})

$(window).scroll(function () {
  stickyNavbar();
})


// --- DropDown
$(".DDtitle").hover(function () {
  $(this).siblings(".DDcontent").toggle();
})

function stickyNavbar() {
  if (navbarTop < window.pageYOffset) {
    $(".navbar").css("position", "fixed")
  } else {
    $(".navbar").css("position", "static")
  }
}
