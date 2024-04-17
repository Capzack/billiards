import {ICoordinates} from "../table/types";

export interface IBallProps{
    cord: ICoordinates,
    r: number,
    fill: string,
}

export interface IBallImpact{
    energy: number,
    vector: ICoordinates
}