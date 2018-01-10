var scene = document.querySelector("a-scene");

if (scene.hasLoaded) {
  init();
} else {
  scene.addEventListener("loaded", init);
}

function init() {
  var raycasterEl = AFRAME.scenes[0].querySelector("[raycaster]");
  raycasterEl.components.raycaster.refreshObjects();
}
