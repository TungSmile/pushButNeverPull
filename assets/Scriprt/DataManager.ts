import { _decorator, Component, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Component {
    private static _instance: any = null;
    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }
        return this._instance
    }

    static get instance() {
        return this.getInstance<DataManager>()
    }
    countDone: number = 0;
    countFail: number = 0;
    done: boolean = false;
    eff: any;
    mapGame: any = null;
    anim: boolean = true;

    stageMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


}

