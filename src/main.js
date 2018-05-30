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

const buttonTexture = new Texture("button.png");
const buttonSkin = new Skin({ texture:buttonTexture, x:0, y:0, width:60, height:40, states:40, tiles:{ left:20, right:20 } });
const buttonStyle = new Style({ font:"600 28px Open Sans", color:["red", "white"], });

class DragBehavior extends Behavior {
  onFinished(content) {
    content.state = 0;
  }
  onTimeChanged(content) {
    content.state = 2 - Math.quadEaseOut(content.fraction);
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
    content.duration = 250;
    content.time = 0;
    content.start();
  }
}

const sideBar = $ =>
  Container($, {
    left: 0, top:0, width: 60, height: 240,
    skin: new Skin({fill: "red"}),
    contents: [
      Label($, {left:10, top:10, width:40, height:40, skin:buttonSkin, string:"A", active:true, Behavior:DragBehavior}),
      Label($, {left:10, top:70, width:40, height:40, skin:buttonSkin, string:"B", active:true, Behavior:DragBehavior}),
      Label($, {left:10, top:130, width:40, height:40, skin:buttonSkin, string:"C", active:true, Behavior:DragBehavior}),
      Label($, {left:10, top:190, width:40, height:40, skin:buttonSkin, string:"D", active:true, Behavior:DragBehavior}),
    ]
  });

const playSpace = $ =>
  Container($, {
    right: 0, top:0, width: 240, height: 240,
    skin: new Skin({fill: "green"}),
    contents: [
      Label($, {left:10, top:10, width:200, height:40, skin:buttonSkin, string:"Play Space", active:true, Behavior:DragBehavior}),
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
