import {IBallImpact, IBallProps} from "./types";
import {ICoordinates} from "../table/types";

//to remove
export default class Ball{
    private _cord: ICoordinates
    private _fill: string
    private _r: number

    private _toRemove = false

    private prevCord: ICoordinates | null = null

    private _vector: ICoordinates | null = null
    private _energy = 0
    
    private m: number

    constructor(props: IBallProps) {
        this._cord = {...props.cord}
        this._r = props.r
        this._fill = props.fill
        this.m = props.r * props.r
    }

    public get cord(): ICoordinates{
        return {...this._cord}
    }

    public get energy(): number{
        return this._energy
    }
    public get fill(): string{
        return this._fill
    }

    public get r(): number{
        return this._r
    }

    public get vector(): ICoordinates  {
        return this._vector ? {...this._vector} : {x: 0, y: 0}
    }

    public get toRemove(): boolean{
        return this._toRemove
    }

    public set toRemove(v: boolean){
        this._toRemove = v
    }

    public getProps(): IBallProps {
        return {
            cord: {...this._cord},
            r: this._r,
            fill: this._fill,
            // prevCord: this.prevCord
        }
    }

    public getPrevCord(): ICoordinates | null{
        if(this.prevCord)
            return {...this.prevCord}
        else  return null
    }

    public isInside(energy: MouseEvent): boolean{
        return (
            energy.offsetX <= this._cord.x + this.r &&
            energy.offsetX >= this._cord.x - this.r &&
            energy.offsetY <= this._cord.y + this.r &&
            energy.offsetY >= this._cord.y - this.r
        )
    }

    public setImpact(impact: IBallImpact){
        this._energy = impact.energy
        this._vector = impact.vector
    }

    public move(): void{
        if(!this.energy || !this._vector) {
            this._vector = null
            this._energy = 0
            return
        }
        this.prevCord = {...this._cord}

        this._cord = {
            x: this._cord.x + this._vector.x,
            y: this._cord.y + this._vector.y,
        }
        this._energy -= 1

        this._vector = {x: this._vector.x * 0.9, y: this._vector.y * 0.9}
    }

    public setCollision(collision: {newCord: ICoordinates, newVector: ICoordinates}){
        this._vector = collision.newVector
        this._cord = collision.newCord
    }

    private decToZero(num: number): number{
        if(num === 0)
            return num
        else if(num > 0)
            return num - 1
        else
            return num + 1
    }

    private getVector(energy: MouseEvent): ICoordinates{
        return {
            x: this._cord.x - energy.offsetX,
            y: this._cord.y - energy.offsetY,
        }
    }
}