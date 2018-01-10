AFRAME.registerComponent("object-changer", {
  schema: {},
  init: function() {
    this.menuText = document.getElementById("menu_text");
    this.submenuText = document.getElementById("submenu_text");
    this.menu = {
      submenus: [
        {
          component: "material",
          attribute: "color",
          options: [
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "violet",
            "white",
            "black"
          ],
          index: 0
        },
        {
          component: "geometry",
          attribute: "primitive",
          options: [
            "box",
            "circle",
            "cone",
            "cylinder",
            "dodecahedron",
            "ring",
            "torus"
          ],
          index: 0
        }
      ],
      index: 0
    };
    this.onMenuUp = this.onMenuUp.bind(this);
    this.el.sceneEl.addEventListener("menu_up", this.onMenuUp);
    this.onMenuDown = this.onMenuDown.bind(this);
    this.el.sceneEl.addEventListener("menu_down", this.onMenuDown);
    this.onSubmenuUp = this.onSubmenuUp.bind(this);
    this.el.sceneEl.addEventListener("submenu_up", this.onSubmenuUp);
    this.onSubmenuDown = this.onSubmenuDown.bind(this);
    this.el.sceneEl.addEventListener("submenu_down", this.onSubmenuDown);

    this.onInputMappingChanged = this.onInputMappingChanged.bind(this);
    this.el.sceneEl.addEventListener(
      "current-input-mapping-changed",
      this.onInputMappingChanged
    );
  },

  onInputMappingChanged: function(evt) {
    const { curr, prev } = evt.detail;
    if (curr == "object_menu") {
      var submenu = this.menu.submenus[this.menu.index];
      this.menuText.setAttribute("text", {
        value: submenu.component + " " + submenu.attribute
      });
      this.submenuText.setAttribute("text", {
        value: submenu.options[submenu.index]
      });
      this.submenuText.setAttribute("visible", true);
      this.menuText.setAttribute("visible", true);
    } else {
      this.submenuText.setAttribute("visible", false);
      this.menuText.setAttribute("visible", false);
    }
  },

  onMenuUp: function(evt) {
    this.menu.index = (this.menu.index + 1) % this.menu.submenus.length;
    var submenu = this.menu.submenus[this.menu.index];
    this.menuText.setAttribute("text", {
      value: submenu.component + " " + submenu.attribute
    });
    this.submenuText.setAttribute("text", {
      value: submenu.options[submenu.index]
    });
  },

  onMenuDown: function(evt) {
    this.menu.index =
      (this.menu.submenus.length + this.menu.index - 1) %
      this.menu.submenus.length;

    var submenu = this.menu.submenus[this.menu.index];
    this.menuText.setAttribute("text", {
      value: submenu.component + " " + submenu.attribute
    });
    this.submenuText.setAttribute("text", {
      value: submenu.options[submenu.index]
    });
  },
  onSubmenuUp: function(evt) {
    var submenu = this.menu.submenus[this.menu.index];
    if (this.el.sceneEl.activeObject === this.el) {
      submenu.index = (submenu.index + 1) % submenu.options.length;
      this.el.sceneEl.activeObject.setAttribute(
        submenu.component,
        submenu.attribute,
        submenu.options[submenu.index]
      );
      this.submenuText.setAttribute("text", {
        value: submenu.options[submenu.index]
      });
    }
  },

  onSubmenuDown: function(evt) {
    var submenu = this.menu.submenus[this.menu.index];
    if (this.el.sceneEl.activeObject === this.el) {
      submenu.index =
        (submenu.options.length + submenu.index - 1) % submenu.options.length;
      this.el.sceneEl.activeObject.setAttribute(
        submenu.component,
        submenu.attribute,
        submenu.options[submenu.index]
      );
      this.submenuText.setAttribute("text", {
        value: submenu.options[submenu.index]
      });
    }
  },

  tick: function(dt) {}
});
