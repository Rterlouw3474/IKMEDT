AFRAME.registerComponent('syn-player', {
    tick: function () {
      const camera = document.getElementById("js--camera myCamera");
      const playermodel = document.getElementById("js--player-model");

      console.log("move player model");
      console.log(camera.getAttribute("rotation").y);
      playermodel.setAttribute("position", camera.getAttribute("position").x + " " + "0" + " " + camera.getAttribute("position").z);
      playermodel.setAttribute("rotation", playermodel.getAttribute("rotation").x + " " + (camera.getAttribute("rotation").y+90) + " " + playermodel.getAttribute("rotation").z);
    },
});
