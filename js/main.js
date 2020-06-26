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
    }

    setDistance(dist) {
        this.distance = dist;
        console.log("distance ", dist)
        const question = document.getElementById("question");
        if (this.unit == "Feet") {
            this.distance = this.distance * 3.28;
        }
        question.setAttribute("value", "Meer dan " + this.distance + this.unit + "?")
    }
    setUnit(unit) {
        this.unit = unit;
        console.log("unit ", unit)
        const question = document.getElementById("question");
        if (this.unit == "Feet") {
            this.distance = this.distance * 3.28;
        }
        question.setAttribute("value", "Meer dan " + this.distance + this.unit + "?")
    }
    closeSettings() {
        const settings = document.getElementById("settings-menu-scene");
        const general = document.getElementById("generic-menu");
        const questionPane = document.getElementById("box questionPane");
        questionPane.setAttribute("visible", true);
        questionPane.setAttribute('position', '-0.6 0.5 -1.5');
        settings.setAttribute('visible', false);
        settings.setAttribute('position', '1000 1000 1000');
        general.setAttribute('visible', false);
        general.setAttribute('position', '1000 1000 1000');
    }
    openSettings() {
        const settings = document.getElementById("settings-menu-scene");
        const general = document.getElementById("generic-menu");
        const cameraPosition = document.getElementById("js--camera").getAttribute("position");
        const questionPane = document.getElementById("box questionPane");
        questionPane.setAttribute("visible", false);
        questionPane.setAttribute('position', '1000 1000 1000');
        console.log(cameraPosition);
        settings.setAttribute('visible', true);
        settings.setAttribute('position', cameraPosition.x + " 0 " + cameraPosition.z);
        general.setAttribute('visible', true);
        general.setAttribute('position', cameraPosition.x + " 0 " + cameraPosition.z);
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
        this.reset();
        const tutorialCounter = document.getElementById("tutorial-counter");
        tutorialCounter.setAttribute("visible", "true");
        tutorialCounter.setAttribute("text", "value: 1/10");
    }

    endTutorial() {
        const tutorialResult = document.getElementById("tutorial-result");
        tutorialResult.setAttribute("visible", "true");
        tutorialResult.setAttribute("position", "0 0 0");

        const achieved = document.getElementById("achieved");
        const tutorialMessage = document.getElementById("tutorial-message");

        if (this.rightAnswers >= 6) {
            achieved.setAttribute("value", "Gehaald!");
        } else {
            achieved.setAttribute("value", "Niet gehaald")
        }
        tutorialMessage.setAttribute("value", this.rightAnswers + "/" + this.totalQuestions + " geraden");

        const tutorialScene = document.getElementById("tutorial-game-scene");
        tutorialScene.setAttribute("visible", "false");
        tutorialScene.setAttribute("position", "1000 1000 1000");
    }

    reset() {
        const tutorialResult = document.getElementById("tutorial-result");
        tutorialResult.setAttribute("visible", "false");
        tutorialResult.setAttribute("position", "1000 1000 1000");

        const tutorialScene = document.getElementById("tutorial-game-scene");
        tutorialScene.setAttribute("visible", "true");
        tutorialScene.setAttribute("position", "0 0 0");
    }

    setAnswer(yesOrNo) {
        const tutorialCounter = document.getElementById("tutorial-counter");
        const user = document.getElementById("user")
        const currBox = document.getElementById("box questionPane");
        const distance = calc_distance(user, currBox);
        let currElement = currBox;
        if (distance >= this.settings.distance) {
            if (yesOrNo == "yes") {
                window.Toast.showToast("Goedzo! De afstand was " + distance, "green");
                this.rightAnswers += 1;
            } else {
                window.Toast.showToast("Helaas! De afstand was " + distance, "red");
            }
        } else {
            if (yesOrNo == "no") {
                window.Toast.showToast("Goedzo! De afstand was " + distance, "green");
                this.rightAnswers += 1;
            } else {
                window.Toast.showToast("Helaas! De afstand was " + distance, "red");

            }
        }
        this.currQuestion += 1;
        tutorialCounter.setAttribute("text", 'value: ' + this.currQuestion + '/10');
        if (this.currQuestion == this.totalQuestions - 1) {
            currBox.setAttribute("visible", "false");
            const toilet = document.getElementById("toilet");
            toilet.setAttribute("visible", "true");
            currElement = toilet;
        }
        if (this.currQuestion == this.totalQuestions) {
            this.endTutorial();
        } else {
            this.newBox(currElement);
        }
    }

    newBox(element) {
        const box = document.getElementById("box questionPane");
        const randomSpot = this.cubeLocations[Math.floor(Math.random() * this.cubeLocations.length)];
        box.setAttribute("position", randomSpot);
    }
}


window.Toast = (function () {
    const toast = document.getElementById("toast");

    function showToast(message, color) {
        const text = toast.firstElementChild;
        text.setAttribute('value', message);
        toast.setAttribute("color", color);
        toast.setAttribute("visible", true);
        setTimeout(() => { toast.setAttribute("visible", false) }, 3000);
    }
    return {
        showToast
    }
})();

window.Settings = new SettingsService();
window.Tutorial = new TutorialService(window.Settings);
