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
$(".DDwrap").hover(function (e) {
  $(this).children(".DDcontent").toggle();
  console.log(e.type);
})

function stickyNavbar() {
  if (navbarTop < window.pageYOffset) {
    $(".navbar").css("position", "fixed")
  } else {
    $(".navbar").css("position", "static")
  }
}
