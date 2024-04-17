export interface IGameProps{
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    gameSize: IGameSize,
}

export interface IGameSize{
    width: number,
    height: number,
}