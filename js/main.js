window.onload = () => {

  AFRAME.registerComponent('rotation-reader', {
  tick: function () {
    // `this.el` is the element.
    // `object3D` is the three.js object.

    // `rotation` is a three.js Euler using radians. `quaternion` also available.
    console.log(this.el.object3D.rotation);

    // `position` is a three.js Vector3.
    console.log(this.el.object3D.position);
  }
});

    // const cursor = document.getElementById("js--cursor");
    // const box = document.getElementById("box");
    // const button = document.getElementById("button");
    // const toast = document.getElementById("toast");
    //
    //
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

}
