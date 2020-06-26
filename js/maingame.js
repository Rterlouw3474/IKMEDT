window.onload = function () {
  const places = document.getElementsByClassName("direction");
  const camera = document.getElementById("js--camera");
  const restart = document.getElementsByClassName("js--restart");
  const start = document.getElementsByClassName("js--start");
  const zombies = document.getElementsByClassName("zombie");
  const success = document.getElementsByClassName("sound-success");
  const failure = document.getElementsByClassName("sound-failure");

  let victory = true;

  for (let i = 0; i < restart.length; i++) {
    restart[i].addEventListener("click", function (evt) {
      window.location.reload();
    });
  }

  for (let i = 0; i < start.length; i++) {
    start[i].addEventListener("click", function (evt) {
      informationPopup.setAttribute("visible", false);
      for (let i = 0; i < places.length; i++) {
        places[i].classList.add('js--place')
      }
    });
  }

  function gameEnd() {
    console.log(zombies);
    console.log(victory);
    cursor.setAttribute("cursor", "fuseTimeout: 100;")

    for (let i = 0; i < zombies.length; i++) {
      zombies[i].classList.add('js--zombie');
      zombies[i].addEventListener('click', evt => {
        victory = false;
      })
    }

    setTimeout(function () {
      if (victory) {

        for (let i = 0; i < success.length; i++) {
          success[i].setAttribute("autoplay", "true");
        }

        camera.innerHTML +=
          '<a-entity><a-plane id="js--hold" class="js--pickup" color="green" position="-2 1 -3" width="1.5" height="1.5"><a-text position="0 0.3 0"><a-text id="menu-title" align="center" value="Gefeliciteerd!" width="5" color="black"></a-text></a-plane><a-plane position="-2 0.7 -3" color="green" geometry="height: 0.25" ><a-text wrap-count="20" value="U gaat nu naar het eindscherm!" interactive-feedback color="black" text="align: center" width="1.5"></a-text></a-plane></a-entity>'

        // setTimeout(function () {
        //   console.log("naar eindpagina");
        //   navigateToEndscreen();
        // }, 2000);

      }
      if (!victory) {

        for (let i = 0; i < failure.length; i++) {
          failure[i].setAttribute("autoplay", "true");
        }

        camera.innerHTML +=
          '<a-entity sound="src: url(../assets/failure.mp3); autoplay: true;"><a-plane id="js--hold" class="js--pickup" color="red" position="-2 1 -3" width="1.5" height="1.5"><a-text position="0 0.3 0"><a-text id="menu-title" align="center" value="Helaas!" width="4" color="black"></a-text></a-plane><a-plane position="-2 0.7 -3" color="red" geometry="height: 0.25" ><a-text wrap-count="20" value="U gaat nu naar het eindscherm!" interactive-feedback color="black" text="align: center" width="1.5"></a-text></a-plane></a-entity>'

        // setTimeout(function () {
        //   console.log("naar eindpagina");
        //   navigateToEndscreen();
        // }, 2000);

      }
    }, 2000);
  }

  for (let i = 0; i < places.length; i++) {
    places[i].addEventListener("click", function (evt) {
      let att = document.createAttribute("animation");
      att.value = "property: position; easing: linear; dur: 2000; to: " + this.getAttribute('position').x + " 3 " +
        this.getAttribute('position').z;
      camera.setAttribute("animation", att.value);
      gameEnd();
    });
  }
};
