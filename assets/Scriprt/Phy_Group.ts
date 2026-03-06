export enum PHY_GROUP {
    DEFAULT = 1 << 0,
    Unlock = 1 << 1,
    Key = 4,
    Item = 1 << 3,
    Guy = 1 << 4,


}

export enum Config {
    timeAnimPick = 0.2,
    colEven = 5,
    rowEven = 7,
    colOdd = 4,
    rowOdd = 6,
    maxSlotTask = 7,
    timeAnimDone = 0.2,
}

export enum UI {
    rangeBrick = 160,
    rangeEven = 0,
    rangeOdd = 80,
    rangeTask = 115,
    scaleChildBrick=0.31,
}