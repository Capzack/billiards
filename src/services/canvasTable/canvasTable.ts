import {ICoordinates, IHolle} from "../table/types";
import Ball from "../ball/ball";
import {IGameSize} from "../game/types";
import {IBallProps} from "../ball/types";

export default class CanvasTable{
    private size: IGameSize
    private context: CanvasRenderingContext2D
    constructor(size: IGameSize, context: CanvasRenderingContext2D) {
        this.size = size
        this.context = context
        this.context.fill()
    }

    public doDrawBalls(balls: Ball[]): void{
        for (const ball of balls){
            this.doRawCircle(ball.getProps())
        }
    }

    public removeBall(ball: Ball){
        this.doRemoveCircle(ball.cord, ball.r)
    }

    public doReDrawBalls(balls: Ball[]):void{
        for (const ball of balls){
            const ballPrevCord= ball.getPrevCord()
            if(!ballPrevCord)
                continue
            const ballProps = ball.getProps()
            this.doRemoveCircle(ballPrevCord, ballProps.r)
            this.doRawCircle(ballProps)
        }

    }

    private doRemoveCircle(cord: ICoordinates, r: number){
        this.context.clearRect(
            cord.x - r - 1,
            cord.y - r - 1,
            r * 2 + 2,
            r * 2 + 2
        )
    }

    public doDrawHoles(holes: IHolle[]): void {
        const defaultFill = 'black'
        for (const hole of holes){
            this.doRawCircle({...hole, fill: defaultFill})
        }
    }

    private doRawCircle(props: IBallProps): void {
        this.context.beginPath()
        this.context.arc(props.cord.x, props.cord.y, props.r, 0, 2 * Math.PI, false)
        this.context.fillStyle = props.fill;
        this.context.fill();
        this.context.strokeStyle = 'black'
        this.context.lineWidth = 1
        this.context.stroke();
    }
}