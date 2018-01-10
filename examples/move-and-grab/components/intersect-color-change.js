/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent("intersect-color-change", {
  init: function() {
    var el = this.el;
    var material = el.getAttribute("material");
    this.initialColor = material.color;
    this.initialOpacity = material.opacity;
    var that = this;

    // Set color using raycaster parent color.
    el.addEventListener("raycaster-intersected", function(evt) {
      var raycasterEl = evt.detail.el;
      el.setAttribute("material", "color", "tomato");
      el.setAttribute("material", "opacity", 1.0);
    });

    // Reset color.
    el.addEventListener("raycaster-intersected-cleared", function(evt) {
      el.setAttribute("material", "color", that.initialColor);
      el.setAttribute("material", "opacity", that.initialOpacity);
    });

    this.onInputMappingChanged = this.onInputMappingChanged.bind(this);
    el.sceneEl.addEventListener(
      "current-input-mapping-changed",
      this.onInputMappingChanged
    );
  },

  onInputMappingChanged: function(evt) {
    var el = this.el;
    const { curr, prev } = evt.detail;
    if (prev == "moving_and_target_finding") {
      el.setAttribute("material", "color", this.initialColor);
      el.setAttribute("material", "opacity", this.initialOpacity);
    }

    if (curr == "moving_and_target_finding") {
      var material = el.getAttribute("material");
      this.initialColor = material.color;
      this.initialOpacity = material.opacity;
    }
  }
});
