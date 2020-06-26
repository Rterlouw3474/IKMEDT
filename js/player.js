window.setInterval(function () {

  const camera = document.getElementById("js--camera");
  const playermodel = document.getElementById("js--player-model");

  console.log("move player model");
  playermodel.setAttribute("position", camera.getAttribute("position").x + " " + "0" + " " + camera.getAttribute("position").z);


}, 10);