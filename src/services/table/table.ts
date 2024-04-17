import {IBilliardSize} from "../../components/billiards/types";
import Ball from "../ball/ball";
import {ICoordinates, IHolle, ITableProps} from "./types";
import {IGameSize} from "../game/types";
import {Observable} from "rxjs";
import CanvasTable from "../canvasTable/canvasTable";
import {IBallImpact} from "../ball/types";

export default class Table {
    private readonly gameSize: IGameSize
    private balls: Ball[] = []
    private holes: IHolle[] = []
    private canvasTable: CanvasTable

    constructor(props: ITableProps) {
        this.gameSize = props.gameSize
        this.canvasTable = new CanvasTable(props.gameSize, props.context)
        this.initHoles()
        this.initBalls()
    }

    public setImpact(e: MouseEvent) {
        for (const ball of this.balls) {
            if (ball.isInside(e)) {
                ball.setImpact(this.getImpact(ball , e))
                break;
            }


        }
        // console.log(e.clientX)
    }

    private getImpact(ball: Ball, i: MouseEvent | Ball): IBallImpact{
        if(i instanceof MouseEvent){
            return {
                vector: {
                    x: ball.cord.x - i.offsetX,
                    y: ball.cord.y - i.offsetY
                },
                energy: 100,
            }
        }
        else return {
            vector: {
                x: ball.cord.x - i.cord.x,
                y: ball.cord.y - i.cord.y,
            },
            energy: i.energy/2 || ball.energy/2,
        }

    }

    public gameTick(){
        this.removeBalls()
        this.moveBalls()
        this.canvasTable.doReDrawBalls(this.balls)
        this.canvasTable.doDrawHoles(this.holes)
    }

    private moveBalls(){
        for(const ball of this.balls){
            ball.move()
            this.checkCollisions(ball)
        }
    }

    private checkCollisions(ball: Ball){
        const holesCollision = this.getHolesCollision(ball)
        if(holesCollision){
            ball.toRemove = true
            return
        }

        const ballCollision = this.getBallsCollision(ball)
        if(ballCollision){
            console.log('123')
            ball.setImpact(this.getImpact(ball, ballCollision))
            ballCollision.setImpact(this.getImpact(ballCollision, ball))
        }

        const tableCollision = this.getTableCollision(ball)
        if(tableCollision)
            ball.setCollision(tableCollision)


    }

    private getBallsCollision(ball: Ball): Ball | null{
        for (const secondBall of this.balls){
            if(secondBall === ball) continue
            if(Math.sqrt(Math.pow(ball.cord.x - secondBall.cord.x, 2) + Math.pow(ball.cord.y - secondBall.cord.y, 2)) < ball.r + secondBall.r)
                return secondBall
        }
        return null
    }

    private removeBalls(){
        this.balls = this.balls.filter((ball, index) => {
            if(ball.toRemove){
                this.canvasTable.removeBall(ball)
                return false
            }
            return true
        })
    }

    private getHolesCollision(ball: Ball): IHolle | null{
        for (const hole of this.holes){
            if(Math.sqrt(Math.pow(ball.cord.x - hole.cord.x, 2) + Math.pow(ball.cord.y - hole.cord.y, 2)) < hole.r)
                return hole
        }
        return null
    }

    private getTableCollision(ball: Ball): {newCord: ICoordinates, newVector: ICoordinates} | null{
        if(ball.cord.x - ball.r <= 0){
            return {
                newCord: {
                    x: ball.r,
                    y: ball.cord.y
                },
                newVector:{
                    x: Math.abs(ball.vector.x),
                    y: ball.vector.y
                }
            }
        }

        else if(ball.cord.x + ball.r >= this.gameSize.width){
            return {
                newCord: {
                    x: this.gameSize.width - ball.r,
                    y: ball.cord.y
                },
                newVector:{
                    x: -Math.abs(ball.vector.x),
                    y: ball.vector.y
                }
            }
        }

        else if(ball.cord.y - ball.r <= 0){
            return {
                newCord: {
                    x: ball.cord.x,
                    y: ball.r,
                },
                newVector:{
                    x: ball.vector.x,
                    y: Math.abs(ball.vector.y)
                }
            }
        }

        else if(ball.cord.y + ball.r >= this.gameSize.height){
            return {
                newCord: {
                    x: ball.cord.x ,
                    y: this.gameSize.height - ball.r
                },
                newVector:{
                    x: ball.vector.x,
                    y: -(Math.abs(ball.vector.y))
                }
            }
        }

        else return null
    }

    private initBalls(){
        this.balls.push(new Ball({
            cord: {x: this.gameSize.width / 2, y: this.gameSize.height / 2},
            r: +(this.gameSize.width / 30).toFixed(),
            fill: 'white'
        }))
        this.balls.push(new Ball({
            cord: {x: this.gameSize.width / 1.5, y: this.gameSize.height / 1.5},
            r: +(this.gameSize.width / 15).toFixed(),
            fill: 'white'
        }))
        this.canvasTable.doDrawBalls(this.balls)
    }

    private initHoles(){
        const defaultR = this.gameSize.width / 22
        this.holes.push({cord: {x: 0, y: 0}, r: defaultR})
        this.holes.push({cord: {x: this.gameSize.width, y: 0}, r: defaultR})
        this.holes.push({cord: {x: 0, y: this.gameSize.height}, r: defaultR})
        this.holes.push({cord: {x: this.gameSize.width, y: this.gameSize.height}, r: defaultR})
        this.holes.push({cord: {x: this.gameSize.width / 2, y: this.gameSize.height}, r: defaultR})
        this.holes.push({cord: {x: this.gameSize.width / 2, y: 0}, r: defaultR})
        this.canvasTable.doDrawHoles(this.holes)
    }
}
