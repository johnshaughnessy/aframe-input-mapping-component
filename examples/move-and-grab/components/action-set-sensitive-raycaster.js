AFRAME.registerComponent("action-set-sensitive-raycaster", {
  schema: {},

  init: function() {
    this.raycaster = this.el.components.raycaster;
    this.onInputMappingChanged = this.onInputMappingChanged.bind(this);
    this.el.sceneEl.addEventListener(
      "current-input-mapping-changed",
      this.onInputMappingChanged
    );
    this.onGrab = this.onGrab.bind(this);
    this.el.sceneEl.addEventListener("grab", this.onGrab);
    this.onRelease = this.onRelease.bind(this);
    this.el.sceneEl.addEventListener("release", this.onRelease);
  },

  onInputMappingChanged: function(evt) {
    if (evt.detail.curr == "moving_and_target_finding") {
      this.el.setAttribute("raycaster");
      this.el.setAttribute("raycaster", "recursive", "true");
      this.el.setAttribute("raycaster", "showLine", "true");
      this.el.setAttribute("raycaster", "objects", ".grabbable");
      this.raycaster = this.el.components.raycaster;
    } else {
      this.el.removeAttribute("raycaster");
    }
  },

  tick: (function() {
    var prevInputMapping = AFRAME.currentInputMapping;
    return function(dt) {
      if (AFRAME.currentInputMapping != prevInputMapping) {
        this.el.sceneEl.emit("current-input-mapping-changed", {
          prev: prevInputMapping,
          curr: AFRAME.currentInputMapping
        });
        prevInputMapping = AFRAME.currentInputMapping;
      }
    };
  })(),

  onGrab: function(evt) {
    if (this.raycaster.intersectedEls.length > 0) {
      AFRAME.currentInputMapping = "object_menu";
      this.el.sceneEl.activeObject = this.raycaster.intersectedEls[0];
    }
  },
  onRelease: function(evt) {
    AFRAME.currentInputMapping = "moving_and_target_finding";
    this.el.sceneEl.activeObject = null;
  }
});
