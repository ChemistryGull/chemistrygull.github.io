// --- Puts List of screens to index.html

var sl = $(".screen_list"); // --- gets Screen List div

var list = [
  "balls",
  "black",
  "YouTube"
];

for (var i = 0; i < list.length; i++) {
  sl.append('<div class="sl_item"><a href="screens/' + list[i] + '/' + list[i] + '.html">' + list[i] + '</a></div>');
}

// $.getJSON("./json/list.json", function(data) {
//   console.log(data);
// })
