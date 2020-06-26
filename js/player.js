AFRAME.registerComponent('syn-player', {
    tick: function () {
      const camera = document.getElementById("js--camera myCamera");
      const playermodel = document.getElementById("js--player-model");

      console.log("move player model");
      playermodel.setAttribute("position", camera.getAttribute("position").x + " " + "0" + " " + camera.getAttribute("position").z);
    },
});
