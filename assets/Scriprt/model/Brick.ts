import { _decorator, Component, log, Node, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('Brick')
export class Brick extends Component {
    color: number = 0;
    type: number = 0;
    localPosition: Vec3 = new Vec3();
    layer: number = 1;
    x: number = 0;
    y: number = 1

    start() {

    }


    initBrick(layer: number = 0, x: number = 0, y: number = 0, color: number = 0, type: number = 0, img: SpriteFrame = null) {
        let t = this;
        t.layer = layer;
        t.x = x;
        t.y = y;
        t.color = color;
        t.type = type;
        img != null ? t.node.getChildByName("icon").getComponent(Sprite).spriteFrame = img : 0;

        t.color = color;

        // t.node.on(Node.EventType.TOUCH_START, t.actionPick, t);
    }

    // setPosBrick(layer: number = 0, x: number = 0, y: number = 0) {
    //     let t = this;
    //     let pos = new Vec3();
    //     if (layer % 2 == 0) {
    //         pos.x = x * 160;
    //         pos.y = -layer * 80;
    //     }
    // }

    // actionInit() {
    //     let t = this;

    // }

    // actionPick() {
    //     let t = this;
    //     log('pick brick: ' + t.node.name);
    // }

    // actionCorrect() {
    //     let t = this;
    // }




    update(deltaTime: number) {

    }
}

