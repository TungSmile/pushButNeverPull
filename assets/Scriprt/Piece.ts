import { _decorator, Collider2D, Component, Contact2DType, ERigidBody2DType, IPhysics2DContact, log, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Piece')
export class Piece extends Component {

    collider: any = null;
    obstacle: boolean = false;
    l: string = "";
    r: string = "";
    u: string = "";
    d: string = ""; F

    dir = ["", "", "", ""];

    start() {
        this.collider = this.getComponent(Collider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this);
        this.collider.on(Contact2DType.END_CONTACT, this.endContact, this);

    }
    beginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        let t = this;
        // const worldManifold = contact.getWorldManifold();
        // const points = worldManifold.points;
        // const normal = worldManifold.normal;
        // console.log('Bcontact', contact ? contact.getTangentSpeed() : "o");
        // console.log('sefl', selfCollider);
        // console.log('other', otherCollider);
        if (selfCollider.getComponent(RigidBody2D).type == ERigidBody2DType.Kinematic && otherCollider.getComponent(RigidBody2D).type == ERigidBody2DType.Static) {
            const worldManifold = contact.getWorldManifold();
            t.obstacle = true;
            if (worldManifold) {
                let temp = worldManifold.normal;
                if (temp.x > 0.5) {
                    t.dir[0] = otherCollider.node.name;
                } else if (temp.x < -0.5) {
                    t.dir[1] = otherCollider.node.name;
                } else if (temp.y > 0.5) {
                    t.dir[2] = otherCollider.node.name;
                } else if (temp.y < -0.5) {
                    t.dir[3] = otherCollider.node.name;
                }
                log(selfCollider.node.name + ': ' + temp.x + '-' + temp.y);
                log(t.dir);
            }


        }
    }

    endContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        let t = this;
        // const worldManifold = contact.getWorldManifold();
        // const points = worldManifold.points;
        // const normal = worldManifold.normal;
        t.dir.forEach(e => {
            e == selfCollider.node.name ? e = "" : null;
        })
        t.obstacle = false;

    }

    update(deltaTime: number) {

    }
}

