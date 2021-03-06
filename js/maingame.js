const calc_distance = (el1, el2) => {
    const pos1 = el1.object3D.position;
    const pos2 = el2.object3D.position;
    return pos1.distanceTo(pos2).toFixed(2);
}

window.onload = function () {

  const places = document.getElementsByClassName("direction");
  const camera = document.getElementById("js--camera");
  const restart = document.getElementsByClassName("js--restart");
  const start = document.getElementsByClassName("js--start");
  const zombies = document.getElementsByClassName("zombie");
  const successSound = new Audio('../assets/success.mp3');
  const failureSound = new Audio('../assets/failure.mp3');
  const zombieSound = new Audio('../assets/zombie/zombie.mp3');
  const background = new Audio('../assets/background.mp3');


  background.play();
  background.volume = 0.2;



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
        places[i].classList.add('js--place');
      }
    });
  }

  setInterval(onTimerTick, 33);

  function onTimerTick() {
    for (let i = 0; i < zombies.length; i++) {
      const user = document.getElementById("js--player-model");
      let zombie = zombies[i];
      let userPos = user.object3D.position;
      let zombiePos = zombie.object3D.position;
      let distance = userPos.distanceTo(zombiePos);

      if(distance <= 3.5) {
        victory = false;
        zombieSound.play();
      }
    }
  }

  function gameEnd() {
    // cursor.setAttribute("cursor", "fuseTimeout: 100;")
    //
    // for (let i = 0; i < zombies.length; i++) {
    //   zombies[i].classList.add('js--zombie');
    // }

    setTimeout(function () {
      if (victory) {


        camera.innerHTML +=
          '<a-entity><a-plane id="js--hold" class="js--pickup" color="green" position="-2 1 -3" width="1.5" height="1.5"><a-text position="0 0.3 0"><a-text id="menu-title" align="center" value="Gefeliciteerd!" width="5" color="black"></a-text></a-plane><a-plane position="-2 0.7 -3" color="green" geometry="height: 0.25" ><a-text wrap-count="20" value="U gaat nu naar het eindscherm!" interactive-feedback color="black" text="align: center" width="1.5"></a-text></a-plane></a-entity>'

        successSound.play();
        background.pause();

        setTimeout(function () {
          console.log("naar eindpagina");
          navigateToEndscreen();
        }, 8000);

      }
      if (!victory) {
        camera.innerHTML +=
          '<a-entity sound="src: url(../assets/failure.mp3); autoplay: true;"><a-plane id="js--hold" class="js--pickup" color="red" position="-2 1 -3" width="1.5" height="1.5"><a-text position="0 0.3 0"><a-text id="menu-title" align="center" value="Helaas!" width="4" color="black"></a-text></a-plane><a-plane position="-2 0.7 -3" color="red" geometry="height: 0.25" ><a-text wrap-count="20" value="U gaat nu naar het eindscherm!" interactive-feedback color="black" text="align: center" width="1.5"></a-text></a-plane></a-entity>'

        failureSound.play();
        background.pause();

        setTimeout(function () {
          console.log("naar eindpagina");
          navigateToEndscreen();
        }, 8000);

      }
    }, 8000);
  }

  for (let i = 0; i < places.length; i++) {
    places[i].addEventListener("click", function (evt) {
      let att = document.createAttribute("animation");
      att.value = "property: position; easing: linear; dur: 8000; to: " + this.getAttribute('position').x + " 3 " +
        this.getAttribute('position').z;
      camera.setAttribute("animation", att.value);
      gameEnd();
    });
  }
};
