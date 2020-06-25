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
        settings.setAttribute('position', '1000, 1000, 1000');
        general.setAttribute('visible', false);
        general.setAttribute('position', '1000, 1000, 1000');
    }
    openSettings() {
        const settings = document.getElementById("settings-menu-scene");
        const general = document.getElementById("generic-menu");
        settings.setAttribute('visible', true);
        settings.setAttribute('position', '0, 0, 0');
        general.setAttribute('visible', true);
        general.setAttribute('position', '0, 0, 0');
    }
}

window.Settings = new SettingsService();

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