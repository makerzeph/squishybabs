/*
 * Squishy Babs by Zephyrus Todd (with help from James Todd)
 *
 */

import {} from "piu/MC";
import config from "mc/config";

//const desktopTexture = new Texture("desktop.png");
const desktopSkin = new Skin({ fill: "blue" });

const babsTexture = new Texture("babs.png");
const babsSkin = new Skin({ texture: babsTexture, x:0, y:0, width: 215, height: 178});

const foodTexture = new Texture("foods.png");
const foodSkin = new Skin({ texture: foodTexture, x:0, y:0, width: 50, height: 50, variants:50});

const buttonTexture = new Texture("button.png");
const buttonSkin = new Skin({ texture:buttonTexture, x:0, y:0, width:60, height:40, states:40, tiles:{ left:20, right:20 } });
const buttonStyle = new Style({ font:"600 28px Open Sans", color:["red", "white"], });

class DragBehavior extends Behavior {
  onFinished(content) {
    //content.state = 0;
  }
  onTimeChanged(content) {
    //content.state = 2 - Math.quadEaseOut(content.fraction);
  }
  onTouchBegan(content, id, x, y, ticks) {
    let anchor = this.anchor = content.position;
    anchor.x -= x;
    anchor.y -= y;
    content.state = 2;
  }
  onTouchMoved(content, id, x, y, ticks) {
    let anchor = this.anchor;
    content.position = { x:anchor.x + x, y:anchor.y + y };
  }
  onTouchEnded(content, id, x, y, ticks) {
    //content.duration = 250;
    content.time = 0;
    content.start();
  }
}

const sideBar = $ =>
  Container($, {
    left: 0, top:0, width: 60, height: 240,
    skin: new Skin({fill: "purple"}),
    contents: [
      Content(4, {left:5, top:5, skin:foodSkin, active:true, variant:2, Behavior:DragBehavior}),
      Content(3, {left:5, top:65, skin:foodSkin, active:true, variant:4, Behavior:DragBehavior}),
      Content(2, {left:5, top:125, skin:foodSkin, active:true, variant:6, Behavior:DragBehavior}),
      Content(1, {left:5, top:185, skin:foodSkin, active:true, variant:7, Behavior:DragBehavior}),
    ]
  });

const playSpace = $ =>
  Container($, {
    right: 0, top:0, width: 240, height: 240,
    skin: new Skin({fill: "green"}),
    contents: [
      Content(0, {skin:babsSkin}),
    ]
  });

let DragApplication = Application.template($ => ({
  skin:desktopSkin, style:buttonStyle,
  contents: [
    playSpace($),
    sideBar($)
  ]
}));

export default new DragApplication(null, { commandListLength:4096, displayListLength:4096, touchCount:config.touchCount });
