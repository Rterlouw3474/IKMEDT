window.onload = function() {
  const camera = document.getElementById("js--camera");
  const start = document.getElementsByClassName("js--start");
  const places = document.getElementsByClassName("buttons");

  for (let i = 0; i < start.length; i++) {
    start[i].addEventListener("click", function(evt) {
      informationPopup.setAttribute("visible",false);
      for (let i = 0; i < places.length; i++) {
        places[i].classList.add('js--place')
      }
    });
  }
}

const calc_distance = (el1, el2) => {
    const pos1 = el1.object3D.position;
    const pos2 = el2.object3D.position;
    return pos1.distanceTo(pos2).toFixed(2);
}

class SettingsService {
    constructor() {
        this.soundIsOn = false;
        this.distance = 1.5;
        this.unit = 'metric'
    }
    toggleSound(val) {
        this.soundIsOn = val;
        console.log("sound ", val)
    }

    setDistance(dist) {
        this.distance = dist;
        console.log("distance ", dist)
    }
    setUnit(unit) {
        this.unit = unit;
        console.log("unit ", unit)
    }
    closeSettings() {
        const settings = document.getElementById("settings-menu-scene");
        const general = document.getElementById("generic-menu");
        settings.setAttribute('visible', false);
        settings.setAttribute('position', '1000 1000 1000');
        general.setAttribute('visible', false);
        general.setAttribute('position', '1000 1000 1000');
    }
    openSettings() {
        const settings = document.getElementById("settings-menu-scene");
        const general = document.getElementById("generic-menu");
        settings.setAttribute('visible', true);
        settings.setAttribute('position', '0 0 0');
        general.setAttribute('visible', true);
        general.setAttribute('position', '0 0 0');
    }
}

class TutorialService {
    constructor(settings) {
        this.settings = settings;
        this.cubeLocations = [
            "1 0.5 -2.5", "1.8 0.5 -0.5", "1.8 0.5 -0.2", "1 0.5 -0.4", "1.2 0.5 -0.4", "1.5 0.5 -0.6", "0 0.5 -1 ", "0 0.5 -1.21", "-0.6 0.5 -1.21", "-0.6 0.5 -1.5"
        ]
        this.totalQuestions = 10;
        this.currQuestion = 1;
        this.rightAnswers = 0;
    }

    startTutorial() {
        const tutorialCounter = document.getElementById("tutorial-counter");
        tutorialCounter.setAttribute("visible", "true");
        tutorialCounter.setAttribute("text", "value: 1/10");
    }

    endTutorial() {
        const tutorialScene = document.getElementById("tutorial-game-scene");

    }

    setAnswer(yesOrNo) {
        const tutorialCounter = document.getElementById("tutorial-counter");
        const user = document.getElementById("user")
        const currBox = document.getElementById("box");
        const distance = calc_distance(user, currBox);
        if (distance >= this.settings.distance) {
            if (yesOrNo == "yes") {
                Toast.showToast("Goedzo! De afstand was " + distance);
                this.rightAnswers += 1;
            } else {
                Toast.showToast("Helaas! De afstand was " + distance);
            }
        } else {
            if (yesOrNo == "no") {
                Toast.showToast("Goedzo! De afstand was " + distance);
                this.rightAnswers += 1;
            } else {
                Toast.showToast("Helaas! De afstand was " + distance);

            }
        }
        this.currQuestion += 1;
        tutorialCounter.setAttribute("text", 'value: ' + this.currQuestion + '/10');
        if (this.currQuestion == this.totalQuestions) {
            // endscreen
        } else {
            this.newBox();
        }
    }

    newBox() {
        const box = document.getElementById("box");
        const randomSpot = this.cubeLocations[Math.floor(Math.random() * this.cubeLocations.length)];
        box.setAttribute("position", randomSpot);
    }
}


window.Settings = new SettingsService();
window.Tutorial = new TutorialService(window.Settings);

const cursor = document.getElementById("js--cursor");
const box = document.getElementById("box");
// const button = document.getElementById("button");
const soundOn = document.getElementById("sound-on");
const soundOff = document.getElementById("sound-off");


window.Toast = (function () {
    const toast = document.getElementById("toast");

    function showToast(message) {
        const text = toast.firstElementChild;
        text.setAttribute('value', message);
        toast.setAttribute("visible", true);
        setTimeout(() => { toast.setAttribute("visible", false) }, 3000);
    }
    return {
        showToast
    }
})();



// button.addEventListener('click', () => {
//     var color = box.getAttribute('color');
//     if (color == "red") {
//         const text = toast.firstElementChild;
//         text.setAttribute('value', "It's green!");
//         toast.setAttribute('color', 'green');
//         box.setAttribute('color', 'green');
//     }
//     else if (color == "green") {
//         const text = toast.firstElementChild;
//         text.setAttribute('value', "It's red!");
//         toast.setAttribute('color', 'red');
//         box.setAttribute('color', 'red');
//     }
// })
