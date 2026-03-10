import { _decorator, AudioClip, Collider2D, ERigidBody2DType, Component, Contact2DType, EventTouch, find, IPhysics2DContact, Node, RigidBody2D, SpriteFrame, tween, UITransform, v3, Vec3, view, log, Vec2, Size, geometry, Camera, PhysicsSystem } from 'cc';
import super_html_playable from './plugin/super_html_playable';
const { ccclass, property } = _decorator;

@ccclass('MainLogic')
export class MainLogic extends Component {

    @property(Node)
    hand: Node = null;
    @property(Node)
    CamMain: Node = null;
    ads: Node;
    cVas: Node;
    isMove: boolean = false;
    piece: Node = null;
    effHand: any;

    // setting for game
    @property({ type: [AudioClip] })
    sound: AudioClip[] = [];
    @property({ type: [SpriteFrame] })
    img: SpriteFrame[] = [];

    // node
    @property(Node)
    taskMissions: Node = null;
    @property(Node)
    gamePlay: Node = null;

    // data game
    // mapGame: any = null;
    // @property()
    // mapH: number = 7;
    // @property()
    // mapW: number = 6;


    // temp
    pos: Vec3 = new Vec3();



    start() {
        let t = this;
        t.cVas = find('Canvas');
        t.ads = find('Canvas/Ads');
        // t.registerEvent();
        // t.activeHand();
        view.on("canvas-resize", () => {
            // t.resize();
        });
        // t.resize();

        t.addEventGame();
    }





    // header
    // setTaskMissions() {
    //     let t = this;
    //     t.taskMissions.children.forEach(e => {
    //         if (t.taskMissions.children.length <= 5) {
    //         } else {
    //         }
    //     })
    // }





    // game play
    addEventGame() {
        let t = this;
        t.gamePlay.on(Node.EventType.TOUCH_START, t.pickPiece, t);
        t.gamePlay.children.forEach(e => {
            // e.on(Node.EventType.TOUCH_START, t.touchPiece, t);
            e.on(Node.EventType.TOUCH_MOVE, t.movePiece, t);
            e.on(Node.EventType.TOUCH_END, t.endMovePiece, t);
            e.on(Node.EventType.TOUCH_CANCEL, t.endMovePiece, t);
            e.getChildByName("block").getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, t.beginContact, t);
            e.getChildByName("block").getComponent(Collider2D).on(Contact2DType.END_CONTACT, t.endContact, t);
            // e.getChildByName("block").setPosition(0, 0, 0);
        })
    }

    // setUpMap() {
    //     let t = this;
    //     if (true) {
    //         t.mapGame = new Array(t.mapH * t.mapW).fill(-1);
    //     } else
    //         t.mapGame = DataManager.instance.stageMap;

    // }


    dropPieceToBroad(posPiece: Vec3, sizePiece: Size) {
        let t = this;


    }



    pickPiece(event: EventTouch) {
        let t = this;
        let ray = new geometry.Ray();
        const camera = t.CamMain.getComponent(Camera);
        camera.screenPointToRay(event.getLocationX(), event.getLocationY(), ray);
        const mask = 0xffffffff;
        const maxDistance = 10000000;
        const queryTrigger = true;
        const bResult = PhysicsSystem.instance.raycastClosest(ray, mask, maxDistance, queryTrigger);
        if (bResult) {
            const results = PhysicsSystem.instance.raycastResults;
            const raycastClosestResult = PhysicsSystem.instance.raycastClosestResult;
            const collider = raycastClosestResult.collider;
            if (collider.node) {
                tween(collider.node)
                    .to(0.1, { scale: new Vec3(1.05, 1.05, 1.05) })
                    .call(() => {
                        t.piece = event.target;
                        t.piece.getChildByName("block").getComponent(RigidBody2D).type = ERigidBody2DType.Kinematic;
                    })
                    .start();
            }
        }
    }

    touchPiece(event: EventTouch) {
        let t = this;
        if (t.piece != null) return;
        tween(event.target)
            .to(0.1, { scale: new Vec3(1.05, 1.05, 1.05) })
            .call(() => {
                t.piece = event.target;
                t.piece.getChildByName("block").getComponent(RigidBody2D).type = ERigidBody2DType.Kinematic;
                // t.piece.getChildByName("block").getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, t.beginContact, t);
                // t.piece.getComponent(Collider2D).on(Contact2DType.POST_SOLVE, t.postContact, t);
                // t.piece.getComponent(Collider2D).on(Contact2DType.PRE_SOLVE, t.preContact, t);
                // t.piece.getComponent(Collider2D).on(Contact2DType.END_CONTACT, t.endContact, t);
            })
            .start();
    }


    movePiece(event: EventTouch) {
        let t = this;
        if (t.piece == null) return;
        const mousePosition = new Vec3(event.getUILocation().x, event.getUILocation().y, 0);
        let localPosition = new Vec3();
        t.gamePlay.getComponent(UITransform).convertToNodeSpaceAR(mousePosition, localPosition);
        let size = t.piece.getComponent(UITransform).contentSize;
        if (localPosition.x >= (415 - size.x / 2)) {
            localPosition.x = (415 - size.x / 2);
        }
        if (localPosition.x <= (-415 + size.x / 2)) {
            localPosition.x = (-415 + size.x / 2);
        }
        if (localPosition.y >= (490 - size.y / 2)) {
            localPosition.y = (490 - size.y / 2);
        }
        if (localPosition.y <= (-490 + size.y / 2)) {
            localPosition.y = (-490 + size.y / 2);
        }



        if (t.obstacle) {

        }
        t.piece.position = localPosition;
        t.piece.getChildByName("block").setPosition(0, 0, 0);
    }

    endMovePiece(event: EventTouch) {
        let t = this;
        if (t.piece == null) return;
        t.piece.getChildByName("block").getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT, t.beginContact, t);
        // t.piece.getComponent(Collider2D).off(Contact2DType.POST_SOLVE, t.postContact, t);
        // t.piece.getComponent(Collider2D).off(Contact2DType.PRE_SOLVE, t.preContact, t);
        // t.piece.getComponent(Collider2D).off(Contact2DType.END_CONTACT, t.endContact, t);
        t.piece.getChildByName("block").getComponent(RigidBody2D).type = ERigidBody2DType.Static;
        t.piece.setScale(1, 1, 1);
        t.dropPieceToBroad(t.piece.position, t.piece.getComponent(UITransform).contentSize);
        t.piece = null;


    }


    obstacle: boolean = false;
    leftRight: number = 0;
    updown: number = 0;
    beginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        let t = this;
        // const worldManifold = contact.getWorldManifold();
        // const points = worldManifold.points;
        // const normal = worldManifold.normal;
        // console.log('Bcontact', contact ? contact.getTangentSpeed() : "o");
        // console.log('sefl', selfCollider);
        // console.log('other', otherCollider);
        if (otherCollider.node.name) {
            const worldManifold = contact.getWorldManifold();
            if (worldManifold) {
                // t.director = worldManifold.normal;
                // log('director', t.director);
            }


        }
    }



    // postContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // const worldManifold = contact.getWorldManifold();
    //     // const points = worldManifold.points;
    //     // const normal = worldManifold.normal;
    //     console.log('Pocontact', contact);
    //     console.log('sefl', selfCollider);
    //     console.log('other', otherCollider);
    // }


    // preContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // const worldManifold = contact.getWorldManifold();
    //     // const points = worldManifold.points;
    //     // const normal = worldManifold.normal;
    //     console.log('Precontact', contact);
    //     console.log('sefl', selfCollider);
    //     console.log('other', otherCollider);
    // }

    endContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        let t = this;
        // const worldManifold = contact.getWorldManifold();
        // const points = worldManifold.points;
        // const normal = worldManifold.normal;
    }




    update(deltaTime: number) {

        // if (DataManager.instance.countDone >= 0
        //     || DataManager.instance.countFail >= 1
        // ) {
        //     this.ads.active = true
        //     if (!DataManager.instance.done) {
        //         DataManager.instance.done = true;
        //         // DataManager.instance.playAudio(this.node, this.cVas.getComponent(MainLogic).sound[1], 'noLoop');
        //         // this.EventNetWork();
        //         this.node.getComponent(AdManager).openAdUrl();
        //     }
        // }
    }


    fristHint: boolean = false;
    activeHand() {
        let t = this;
        // action  hint 
        let time = t.fristHint ? 1 : 0.5;
        let nodeE1: Node = find("Canvas/Game/nextStage")
        let nodeE: Node = find("Canvas/Game/hintS")
        let nodeS: Node = find('Canvas/Game/cua')
        let posEnd1 = nodeE1.position;
        let posEnd = nodeE.position;
        let posStart = nodeS.position;
        t.hand.setPosition(posStart.x, posStart.y, posStart.z);
        t.hand.active = t.fristHint;
        t.fristHint = true;
        let eff = tween()
            .by(time / 2, { scale: new Vec3(-0.03, -0.03, - 0.03) })
            .to(time / 5, { position: new Vec3(posStart.x, posStart.y, posStart.z) })
            .call(() => {
                t.hand.getChildByName('m').active = true;
            })
            .by(time / 2, { scale: new Vec3(0.03, 0.03, 0.03) })

        let eff1 = tween()
            .to(time / 2, { position: new Vec3(posEnd.x, posEnd.y, posEnd.z) })

        let eff2 = tween()
            .by(time / 4, { scale: v3(0.01, 0.01, 0.01) })
            .by(time / 4, { scale: v3(-0.01, -0.01, - 0.01) })
            .call(() => {
                t.hand.getChildByName('m').active = false;
            })
            .to(time / 2, { position: new Vec3(posEnd1.x, posEnd1.y, posEnd1.z) })
            .call(() => {
                t.hand.getChildByName('n').active = true;
            })
            .delay(time / 2)
            .call(() => {
                t.hand.getChildByName('n').active = false;
            })
            .call(() => {
                this.hand.active = false;

            })

        this.effHand = tween(this.hand)
            .sequence(
                eff,
                eff1,
                eff2,
                tween().call(() => {
                    t.activeHand();
                })
            )
            .start();
    }
    stopHandTween() {
        if (this.effHand) {
            this.effHand.stop();
            this.effHand = null;
            this.hand.active = false;
        }
    }
    EventNetWork() {
        super_html_playable.game_end();
        super_html_playable.download();
    }
}

