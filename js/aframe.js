AFRAME.registerComponent('toast', {
    schema: {
        message: { type: 'string', default: 'Hello world' }
    },
    init: function () {
        this.el.addEventListener('click', (event) => {
            Toast.showToast(this.data.message)
        })
    }
});

AFRAME.registerComponent("interactive-feedback", {
    schema: {
        light: { type: 'boolean', default: true }
    },
    init() {
        const cursor = document.getElementById("js--cursor");
        this.el.addEventListener("mouseenter", () => {
            cursor.object3D.scale.set(1.5, 1.5, 1);
            this.el.setAttribute("material", "emissive", "#222");
            this.el.object3D.scale.set(1.05, 1.05, 1.05);
        });
        this.el.addEventListener("mouseleave", () => {
            cursor.object3D.scale.set(1, 1, 1);
            this.el.setAttribute("material", "emissive", "#000");
            this.el.object3D.scale.set(1, 1, 1);
        });
    },
});
