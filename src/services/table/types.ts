import React from "react";
import {IBilliardSize} from "../../components/billiards/types";
import {IGameProps, IGameSize} from "../game/types";
import {Observable} from "rxjs";


export interface ITableProps{
    context: CanvasRenderingContext2D,
    gameSize: IGameSize,
}

export interface ICoordinates{
    x: number,
    y: number,
}

export interface IBall{
    cord: ICoordinates,
    r: number,
    fill: string,
}

export interface IHolle{
    cord: ICoordinates,
    r: number,
}