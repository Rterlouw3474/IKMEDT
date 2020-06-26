window.onload = function() {
  const places = document.getElementsByClassName("js--place");
  const camera = document.getElementById("js--camera");
  const restart = document.getElementsByClassName("js--restart");

  let victory = true;

  for (let i = 0; i < restart.length; i++) {
    restart[i].addEventListener("click", function(evt) {
      window.location.reload();
    });
  }

  function gameEnd() {
    console.log("oi");

    setTimeout(function() {
      if (victory) {
        camera.innerHTML +=
        '<a-entity><a-plane id="js--hold" class="js--pickup" color="green" position="-2 1 -3" width="1.5" height="1.5"><a-text position="0 0.3 0"><a-text id="menu-title" align="center" value="Congratulations!" width="4" color="black"></a-text></a-plane><a-plane position="-2 0.7 -3" color="green" geometry="height: 0.25" ><a-text value="Look at the sun to play again!" interactive-feedback color="black" text="align: center" width="2.5"></a-text></a-plane></a-entity>'
      }
      if (!victory){
        camera.innerHTML +=
        '<a-plane id="js--hold" class="js--pickup" color="red" position="-2 1 -3" width="1.5" height="2"><a-text><a-text id="menu-title" align="center" value="You lost!" width="2" color="black"></a-text></a-plane>'
      }
    }, 2000);
  }

  for (let i = 0; i < places.length; i++) {
    places[i].addEventListener("click", function(evt) {
      let att = document.createAttribute("animation");
      att.value = "property: position; easing: linear; dur: 2000; to: " + this.getAttribute('position').x + " 3 " +
      this.getAttribute('position').z;
      camera.setAttribute("animation", att.value);
      gameEnd();
    });
  }
};
