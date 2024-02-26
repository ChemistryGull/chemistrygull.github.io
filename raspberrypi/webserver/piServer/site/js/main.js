var socket = io();

socket.on("connect", () => {
  console.log("~main.js~: You connected with id: " + socket.id);
})

socket.on("recieve-msg", msg => {
  console.log("Got msg from server: " + JSON.stringify(msg));

  const node = document.createElement("p");
  const textnode = document.createTextNode(JSON.stringify(msg));
  node.appendChild(textnode);
  document.getElementById("msgLog").appendChild(node);


})

function sendMessage() {
  var msg = {};
  msg.text = document.getElementById("msgInp").value;
  msg.user = socket.id;

  socket.emit("send-msg", msg)
}
