// "import" requires webpack

//import { oculus_touch_joystick_dpad4 } from "./behaviours/oculus-touch-joystick-dpad4";
//import { ReverseY } from "./activators/reverseY";
const actions = {
  moving_and_target_finding: {
    move: { label: "move" }, // vector 2
    snap_left: { label: "snap left" }, // bool
    snap_right: { label: "snap right" }, // bool
    ray_origin: { label: "ray origin" }, // can't configure this 6DOF yet
    grab: { label: "grab" } //bool
  },
  object_menu: {
    menu_up: { label: "menu up" }, // bool
    menu_down: { label: "menu up" }, // bool
    submenu_up: { label: "submenu up" }, // bool
    submenu_down: { label: "submenu down" }, // bool
    release: { label: "release" } //bool
  }
};

const config = {
  behaviours: {
    default: {
      "oculus-touch-controls": {
        joystick: "oculus_touch_joystick_dpad4"
      }
    }
  },
  mappings: {
    moving_and_target_finding: {
      "oculus-touch-controls": {
        "axismove.reverseY": { left: "move" },
        joystick_dpad4_west: {
          right: "snap_left"
        },
        joystick_dpad4_east: {
          right: "snap_right"
        },
        triggerdown: {
          right: "grab"
        }
      }
    },
    object_menu: {
      "oculus-touch-controls": {
        joystick_dpad4_north: {
          left: "menu_up",
          right: "submenu_up"
        },
        joystick_dpad4_south: {
          left: "menu_down",
          right: "submenu_down"
        },
        triggerdown: {
          right: "release"
        }
      }
    }
  }
};

AFRAME.registerInputBehaviour(
  "oculus_touch_joystick_dpad4",
  oculus_touch_joystick_dpad4
);
AFRAME.registerInputActivator("reverseY", ReverseY);
AFRAME.registerInputActions(actions, "moving_and_target_finding");
AFRAME.registerInputMappings(config);
